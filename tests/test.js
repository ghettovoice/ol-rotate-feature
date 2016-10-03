var assert = chai.assert;

var map = new ol.Map({
    target: 'map',
    view: new ol.View({
        center: [ 0, 0 ],
        zoom: 2
    }),
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
});

var feature = new ol.Feature(new ol.geom.Polygon([
    [
        [ 0, 0 ],
        [ 0, 10 ],
        [ 10, 10 ],
        [ 10, 0 ],
        [ 0, 0 ]
    ]
]));
var features = new ol.Collection([
    feature
]);
var rotate = new ol.interaction.RotateFeature({
    features: features,
    angle: -1.5708 // 90 degrees
});

map.addInteraction(rotate);

describe('Rotate feature interaction', function () {
    it('Check initial value of angle and anchor properties', function () {
        assert.strictEqual(rotate.getAngle(), -1.5708, 'Initial angle is -1.5708 = 90 degress');
        assert.deepEqual(rotate.getAnchor(), [5, 5], 'Initial anchor is [5, 5]');
    });

    it('Check feature add / remove', function () {
        features.remove(feature);
        assert(rotate.anchorFeature_ == null, 'Anchor feature is undefined');
        assert(rotate.arrowFeature_ == null, 'Arrow feature is undefined');
        assert(rotate.getAnchor() == null, 'Anchor is undefined');

        features.push(feature);

        assert(rotate.anchorFeature_ instanceof ol.Feature, 'Anchor feature created');
        assert(rotate.arrowFeature_ instanceof ol.Feature, 'Arrow feature created');
        assert.deepEqual(rotate.getAnchor(), [5, 5], 'Anchor is equal [5, 5] - center of features extent');
    });


    it('Check angle / anchor setters', function () {
        var checkFeature = feature.clone();
        checkFeature.getGeometry().rotate(-0.785398, rotate.getAnchor());

        // rotate to 45 degrees
        rotate.setAngle(-0.785398);

        assert.strictEqual(rotate.getAngle(), -0.785398, 'Angle is -0.785398 = 45 degrees');
        assert.strictEqual(rotate.anchorFeature_.get('angle'), -0.785398, 'Anchor feature angle is -0.785398');
        assert.strictEqual(rotate.arrowFeature_.get('angle'), -0.785398, 'Arrow feature angle is -0.785398');
        assert.deepEqual(rotate.anchorFeature_.getGeometry().getCoordinates(), [5, 5], 'Anchor feature coordinate is [5, 5]');
        assert.deepEqual(rotate.arrowFeature_.getGeometry().getCoordinates(), [5, 5], 'Arrow feature coordinate is [5, 5]');
        assert.deepEqual(feature.getGeometry().getCoordinates(), checkFeature.getGeometry().getCoordinates(), 'Rotated feature coordinates are valid');
    });
});
