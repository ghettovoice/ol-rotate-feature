/* global describe, it, expect, sinon, beforeEach, afterEach */
import Map from 'ol/Map'
import View from 'ol/View'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import Collection from 'ol/Collection'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import PointerEvent from 'ol/pointer/PointerEvent'
import MapBrowserPointerEvent from 'ol/MapBrowserPointerEvent'
import olEvent from 'ol/events/Event'
import RotateFeatureInteraction from '../../../src'
import RotateFeatureEvent from '../../../src/event'

Object.defineProperties(RotateFeatureInteraction.prototype, /** @lends RotateFeatureInteraction.prototype */{
  overlay: {
    get () {
      return this.overlay_
    }
  },
  anchorFeature: {
    get () {
      return this.anchorFeature_
    }
  },
  arrowFeature: {
    get () {
      return this.arrowFeature_
    }
  }
})

let map, features, width, height

width = height = 500

describe('rotate feature interaction', function () {
  beforeEach(done => {
    features = new Collection([
      new Feature(new Point([ 20, 20 ])),
      new Feature(new Point([ 0, 0 ]))
    ])
    map = new Map({
      target: createTargetElement(width, height),
      view: new View({
        center: [ 0, 0 ],
        zoom: 1,
        projection: 'EPSG:4326'
      }),
      layers: [
        new VectorLayer({
          source: new VectorSource({ features })
        })
      ]
    })

    map.once('postrender', () => done())
  })

  afterEach(() => {
    map.setTarget(undefined)
    map = features = undefined
  })

  /** @test RotateFeatureInteraction */
  describe('constructor', () => {
    it('should throws on invalid options', () => {
      expect(() => new RotateFeatureInteraction({
        features: 'wrong value'
      })).to.throw(Error, /features option should be an array or collection of features/i)
    })

    it('should initialize with empty collection', () => {
      const rotate = new RotateFeatureInteraction()

      expect(rotate.features).to.be.instanceof(Collection)
      expect(rotate.features.getLength()).to.be.equal(0)
      expect(rotate.angle).to.be.equal(0)
      expect(rotate.anchor).to.be.undefined
    })

    it('should initialize with features as array', () => {
      const features = [
        new Feature(new Point([ 10, 10 ])),
        new Feature(new Point([ 0, 0 ]))
      ]
      const rotate = new RotateFeatureInteraction({ features })

      expect(rotate.features).to.be.instanceof(Collection)
      expect(rotate.features.getLength()).to.be.equal(2)
      expect(rotate.features.getArray().every((feature, i) => feature === features[ i ])).to.be.true
      expect(rotate.angle).to.be.equal(0)
      expect(rotate.anchor).to.be.deep.equal([ 5, 5 ])
    })

    it('should initialize with features as collection', () => {
      const features = new Collection([
        new Feature(new Point([ -10, -10 ])),
        new Feature(new Point([ -5, -5 ]))
      ])
      const rotate = new RotateFeatureInteraction({ features })

      expect(rotate.features).to.be.equal(features)
      expect(rotate.features.getLength()).to.be.equal(2)
      expect(rotate.angle).to.be.equal(0)
      expect(rotate.anchor).to.be.deep.equal([ -7.5, -7.5 ])
    })

    it('should initialize with initial angle and anchor', () => {
      const angle = 90 * Math.PI / 180
      const anchor = [ 10, 10 ]
      const rotate = new RotateFeatureInteraction({ angle, anchor })

      expect(rotate.angle).to.be.equal(angle)
      expect(rotate.anchor).to.be.deep.equal(anchor)
    })
  })

  /**
   * @test RotateFeatureInteraction#setMap
   */
  describe('setMap', () => {
    describe('add to map', () => {
      it('should add internal features to map', done => {
        const rotate = new RotateFeatureInteraction({ features })

        map.addInteraction(rotate)

        map.once('postrender', () => {
          let found = 0
          let internalFeatures = rotate.overlay.getSource().getFeatures()
          map.forEachFeatureAtPixel(map.getPixelFromCoordinate(rotate.anchor), feature => {
            if (internalFeatures.indexOf(feature) !== -1) {
              found++
            }
          })

          expect(found).to.be.equal(2)
          done()
        })
      })
    })

    describe('remove from map', () => {
      it('should remove internal features', done => {
        const rotate = new RotateFeatureInteraction({ features })

        map.addInteraction(rotate)

        map.once('postrender', () => {
          map.removeInteraction(rotate)

          map.once('postrender', () => {
            let found = 0
            let internalFeatures = rotate.overlay.getSource().getFeatures()
            map.forEachFeatureAtPixel(map.getPixelFromCoordinate(rotate.anchor), feature => {
              if (internalFeatures.indexOf(feature) !== -1) {
                found++
              }
            })

            expect(found).to.be.equal(0)
            done()
          })
        })
      })
    })
  })

  /**
   * @test RotateFeatureInteraction#setActive
   */
  describe('setActive', () => {
    describe('deactivate', () => {
      it('should remove internal features', done => {
        const rotate = new RotateFeatureInteraction({ features })

        map.addInteraction(rotate)
        rotate.active = false

        map.once('postrender', () => {
          let found = 0
          let internalFeatures = rotate.overlay.getSource().getFeatures()
          map.forEachFeatureAtPixel(map.getPixelFromCoordinate(rotate.anchor), feature => {
            if (internalFeatures.indexOf(feature) !== -1) {
              found++
            }
          })

          expect(found).to.be.equal(0)
          done()
        })
      })
    })

    describe('reactivate', () => {
      it('should add internal features', done => {
        const rotate = new RotateFeatureInteraction({ features })

        map.addInteraction(rotate)
        rotate.active = false

        map.once('postrender', () => {
          rotate.active = true

          map.once('postrender', () => {
            let found = 0
            let internalFeatures = rotate.overlay.getSource().getFeatures()
            map.forEachFeatureAtPixel(map.getPixelFromCoordinate(rotate.anchor), feature => {
              if (internalFeatures.indexOf(feature) !== -1) {
                found++
              }
            })

            expect(found).to.be.equal(2)
            done()
          })
        })
      })
    })
  })

  /**
   * @test RotateFeatureInteraction#setAngle
   * @test RotateFeatureInteraction#getAngle
   */
  describe('angle setter/getter', () => {
    it('should throw on invalid value', () => {
      expect(() => new RotateFeatureInteraction({ angle: 'qwerty' })).to.throw(Error, /numeric value passed/i)

      const rotate = new RotateFeatureInteraction()
      expect(() => { rotate.angle = 'qwerty' }).to.throw(Error, /numeric value passed/i)
    })

    it('should get/set through ES5 setter/getter', () => {
      const point = new Point([ 10, 10 ])
      sinon.spy(point, 'rotate')

      const rotate = new RotateFeatureInteraction({
        angle: -90 * Math.PI / 180,
        anchor: [ 0, 0 ],
        features: [ new Feature(point) ]
      })
      expect(rotate.angle).to.be.equal(-90 * Math.PI / 180)
      expect(rotate.arrowFeature.get('angle')).to.be.equal(-90 * Math.PI / 180)
      expect(point.getCoordinates()).to.be.deep.equal([ 10, 10 ])

      rotate.angle = 90 * Math.PI / 180
      expect(rotate.angle).to.be.equal(90 * Math.PI / 180)
      expect(rotate.arrowFeature.get('angle')).to.be.equal(90 * Math.PI / 180)
      expect(point.getCoordinates().map(x => parseFloat(x.toPrecision(6)))).to.be.deep.equal([ -10, -10 ])
      expect(point.rotate).to.be.calledWith(Math.PI, [ 0, 0 ])

      point.rotate.restore()
    })
  })

  /**
   * @test RotateFeatureInteraction#setAnchor
   * @test RotateFeatureInteraction#getAnchor
   */
  describe('anchor setter/getter', () => {
    it('should throw on invalid value', () => {
      expect(() => new RotateFeatureInteraction({ anchor: 'qwerty' })).to.throw(Error, /array of two elements passed/i)

      const rotate = new RotateFeatureInteraction()
      expect(() => { rotate.anchor = 'qwerty' }).to.throw(Error, /array of two elements passed/i)
    })

    it('should get/set through ES5 setter/getter', () => {
      const rotate = new RotateFeatureInteraction({
        anchor: [ 5, 10 ],
        features: [ new Feature(new Point([ 10, 10 ])) ]
      })
      expect(rotate.anchor).to.be.deep.equal([ 5, 10 ])
      expect(rotate.anchorFeature.getGeometry().getCoordinates()).to.be.deep.equal([ 5, 10 ])

      rotate.anchor = [ -5, 0 ]
      expect(rotate.anchor).to.be.deep.equal([ -5, 0 ])
      expect(rotate.anchorFeature.getGeometry().getCoordinates()).to.be.deep.equal([ -5, 0 ])
    })
  })

  describe('features collection listener', () => {
    it('should update anchor/angle/internal features on feature add', () => {
      const rotate = new RotateFeatureInteraction()
      expect(rotate.angle).to.be.equal(0)
      expect(rotate.anchor).to.be.undefined
      expect(rotate.arrowFeature).to.be.undefined
      expect(rotate.anchorFeature).to.be.undefined

      rotate.features.push(new Feature(new Point([ 10, 10 ])))
      expect(rotate.angle).to.be.equal(0)
      expect(rotate.anchor).to.be.deep.equal([ 10, 10 ])
      expect(rotate.arrowFeature.get('angle')).to.be.equal(0)
      expect(rotate.anchorFeature.getGeometry().getCoordinates()).to.be.deep.equal([ 10, 10 ])

      rotate.angle = 90 * Math.PI / 180
      rotate.features.push(new Feature(new Point([ 5, 5 ])))
      expect(rotate.angle).to.be.equal(0)
      expect(rotate.anchor).to.be.deep.equal([ 7.5, 7.5 ])
      expect(rotate.arrowFeature.get('angle')).to.be.equal(0)
      expect(rotate.anchorFeature.getGeometry().getCoordinates()).to.be.deep.equal([ 7.5, 7.5 ])
    })

    it('should update anchor/angle/internal features on feature remove', () => {
      const rotate = new RotateFeatureInteraction({
        features: [
          new Feature(new Point([ 10, 10 ])),
          new Feature(new Point([ 5, 5 ]))
        ]
      })
      expect(rotate.angle).to.be.equal(0)
      expect(rotate.anchor).to.be.deep.equal([ 7.5, 7.5 ])
      expect(rotate.arrowFeature.get('angle')).to.be.equal(0)
      expect(rotate.anchorFeature.getGeometry().getCoordinates()).to.be.deep.equal([ 7.5, 7.5 ])

      rotate.angle = 90 * Math.PI / 180
      rotate.features.pop()
      expect(rotate.angle).to.be.equal(0)
      expect(rotate.anchor).to.be.deep.equal([ 5, 10 ])
      expect(rotate.arrowFeature.get('angle')).to.be.equal(0)
      expect(rotate.anchorFeature.getGeometry().getCoordinates()).to.be.deep.equal([ 5, 10 ])

      rotate.angle = 1
      rotate.features.pop()
      expect(rotate.angle).to.be.equal(0)
      expect(rotate.anchor).to.be.undefined
      expect(rotate.arrowFeature).to.be.undefined
      expect(rotate.anchorFeature).to.be.undefined
    })
  })

  describe('rotation', () => {
    let rotate
    beforeEach(done => {
      rotate = new RotateFeatureInteraction({ features })
      map.addInteraction(rotate)
      map.once('postrender', () => done())
    })
    afterEach(done => {
      map.removeInteraction(rotate)
      rotate = undefined
      map.once('postrender', () => done())
    })

    it('should rotate features from collection', () => {
      const listener = trackEvents(features.item(0).getGeometry(), rotate)

      expect(rotate.anchor).to.be.deep.equal([ 10, 10 ])
      expect(rotate.angle).to.be.equal(0)

      // simulate rotation to 45deg around [ 10, 10 ] anchor
      let startPixel = map.getPixelFromCoordinate(features.item(0).getGeometry().getCoordinates())
      let endPixel = map.getPixelFromCoordinate([ 0, 20 ])
      simulateEvent('pointerdown', startPixel)
      simulateEvent('pointerdrag', endPixel)
      simulateEvent('pointerup', endPixel)

      expect(features.getArray().every(feature => (feature.getGeometry() instanceof Point))).to.be.true
      const expectedCoords = [
        [ 0, 20 ],
        [ 20, 0 ]
      ]
      const errRes = features.getArray().every((feature, i) => coordSatisfyError(feature.getGeometry().getCoordinates(), expectedCoords[ i ]))
      expect(errRes).to.be.true

      const calls = listener.getCalls()
      expect(calls).to.have.lengthOf(4)

      expect(calls[ 0 ].args[ 0 ]).to.be.an.instanceof(RotateFeatureEvent)
      expect(calls[ 0 ].args[ 0 ].type).to.be.equal('rotatestart')
      expect(calls[ 0 ].args[ 0 ].angle).to.be.equal(0)
      expect(calls[ 0 ].args[ 0 ].anchor).to.be.deep.equal([ 10, 10 ])
      expect(calls[ 0 ].args[ 0 ].features).to.be.deep.equal(features)

      expect(calls[ 1 ].args[ 0 ]).to.be.an.instanceof(olEvent)
      expect(calls[ 1 ].args[ 0 ].type).to.be.equal('change')

      expect(calls[ 2 ].args[ 0 ]).to.be.an.instanceof(RotateFeatureEvent)
      expect(calls[ 2 ].args[ 0 ].type).to.be.equal('rotating')
      expect(satisfyError(calls[ 2 ].args[ 0 ].angle, 90 * Math.PI / 180)).to.be.true
      expect(calls[ 2 ].args[ 0 ].anchor).to.be.deep.equal([ 10, 10 ])
      expect(calls[ 2 ].args[ 0 ].features).to.be.deep.equal(features)

      expect(calls[ 3 ].args[ 0 ]).to.be.an.instanceof(RotateFeatureEvent)
      expect(calls[ 3 ].args[ 0 ].type).to.be.equal('rotateend')
      expect(satisfyError(calls[ 3 ].args[ 0 ].angle, 90 * Math.PI / 180)).to.be.true
      expect(calls[ 3 ].args[ 0 ].anchor).to.be.deep.equal([ 10, 10 ])
      expect(calls[ 3 ].args[ 0 ].features).to.be.deep.equal(features)
    })
  })

  // todo add test on anchor moving
  // todo add test on cursor changes
})

function createTargetElement (w, h) {
  let target = document.createElement('div')
  let style = target.style
  style.width = `${w}px`
  style.height = `${h}px`
  document.body.appendChild(target)

  return target
}

/**
 * Simulates a browser event on the map viewport.  The client x/y location
 * will be adjusted as if the map were centered at 0,0.
 *
 * @see https://github.com/openlayers/openlayers/blob/master/test/spec/ol/interaction/translate.test.js#L66
 *
 * @param {string} type Event type.
 * @param {number[]} pixelCoordinate Horizontal/vertical offset from bottom left corner.
 */
function simulateEvent(type, [ x, y ]) {
  const viewport = map.getViewport()
  const position = viewport.getBoundingClientRect()
  const evt = new MapBrowserPointerEvent(type, map, new PointerEvent(type, {
    clientX: position.left + x,
    clientY: position.top + y,
    preventDefault () {}
  }))
  map.handleMapBrowserEvent(evt)
}

/**
 * @param {ol.Feature} feature Translated feature.
 * @param {ol.interaction.Translate} interaction The interaction.
 * @return {Object} Listeners hash
 */
function trackEvents (geometry, interaction) {
  const spy = sinon.spy()

  geometry.on('change', spy)
  interaction.on('rotatestart', spy)
  interaction.on('rotateend', spy)
  interaction.on('rotating', spy)

  return spy
}

function coordSatisfyError (coord, expectedCoord, tolerance = 1e-6) {
  return satisfyError(coord[ 0 ], expectedCoord[ 0 ], tolerance) &&
         satisfyError(coord[ 1 ], expectedCoord[ 1 ], tolerance)
}

function satisfyError (val, expected, tolerance = 1e6) {
  return Math.abs(expected - val) < tolerance
}
