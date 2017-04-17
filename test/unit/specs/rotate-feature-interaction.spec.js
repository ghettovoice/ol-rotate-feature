import Map from 'ol/map'
import View from 'ol/view'
import TileLayer from 'ol/layer/tile'
import OSMSource from 'ol/source/osm'
import Feature from 'ol/feature'
import Polygon from 'ol/geom/polygon'
import Collection from 'ol/collection'
import RotateFeature from '../../../src'

describe('rotate feature interaction', function () {
  let map, feature, features, rotate

  beforeEach(() => {
    map = new Map({
      target: 'map',
      view: new View({
        center: [ 0, 0 ],
        zoom: 2
      }),
      layers: [
        new TileLayer({
          source: new OSMSource()
        })
      ]
    })

    feature = new Feature(new Polygon([
      [
        [ 0, 0 ],
        [ 0, 10 ],
        [ 10, 10 ],
        [ 10, 0 ],
        [ 0, 0 ]
      ]
    ]))

    features = new Collection()

    rotate = new RotateFeature({
      features: features,
      angle: -1.5708 // 90 degrees
    })

    map.addInteraction(rotate)
  })

  afterEach(() => {
    map.setTarget(undefined)
    map = feature = features = rotate = undefined
  })

  it('should correct setup anchor and angle by default', function () {
    expect(rotate.anchor).to.be.undefined
    expect(rotate.angle).to.be.equal(-1.5708)

    features.push(feature)
    expect(rotate.anchor).to.be.deep.equal([ 5, 5 ])

    features.remove(feature)
    expect(rotate.anchor).to.be.undefined
  })


  it('Check angle / anchor setters', function () {
    const checkFeature = feature.clone()
    checkFeature.getGeometry().rotate(-0.785398, rotate.getAnchor())

    // rotate to 45 degrees
    rotate.setAngle(-0.785398)

    assert.strictEqual(rotate.getAngle(), -0.785398, 'Angle is -0.785398 = 45 degrees')
    assert.strictEqual(rotate.anchorFeature_.get('angle'), -0.785398, 'Anchor feature angle is -0.785398')
    assert.strictEqual(rotate.arrowFeature_.get('angle'), -0.785398, 'Arrow feature angle is -0.785398')
    assert.deepEqual(rotate.anchorFeature_.getGeometry().getCoordinates(), [ 5, 5 ], 'Anchor feature coordinate is [5, 5]')
    assert.deepEqual(rotate.arrowFeature_.getGeometry().getCoordinates(), [ 5, 5 ], 'Arrow feature coordinate is [5, 5]')
    assert.deepEqual(feature.getGeometry().getCoordinates(), checkFeature.getGeometry().getCoordinates(), 'Rotated feature coordinates are valid')
  })
})

