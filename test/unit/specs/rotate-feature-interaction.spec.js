/* global describe, it, expect, sinon, beforeEach, afterEach */
import Map from 'ol/map'
import View from 'ol/view'
import Feature from 'ol/feature'
import Point from 'ol/geom/point'
import Collection from 'ol/collection'
import VectorLayer from 'ol/layer/vector'
import VectorSource from 'ol/source/vector'
import RotateFeatureInteraction from '../../../src'

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

describe('rotate feature interaction', function () {
  let map, features

  beforeEach(() => {
    features = new Collection([
      new Feature(new Point([ 10000000, 10000000 ])),
      new Feature(new Point([ 0, 0 ]))
    ])
    map = new Map({
      target: createTargetElement(),
      view: new View({
        center: [ 0, 0 ],
        zoom: 1
      }),
      layers: [
        new VectorLayer({
          source: new VectorSource({ features })
        })
      ]
    })
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
      const rotate = new RotateFeatureInteraction({
        angle: 0.5,
        features: [ new Feature(new Point([ 10, 10 ])) ]
      })
      expect(rotate.angle).to.be.equal(0.5)
      expect(rotate.arrowFeature.get('angle')).to.be.equal(0.5)

      rotate.angle = 0.75
      expect(rotate.angle).to.be.equal(0.75)
      expect(rotate.arrowFeature.get('angle')).to.be.equal(0.75)
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

  // todo add tests on rotations events, features update and etc.
})

function createTargetElement () {
  let target = document.createElement('div')
  let style = target.style
  style.width = '500px'
  style.height = '500px'
  document.body.appendChild(target)

  return target
}
