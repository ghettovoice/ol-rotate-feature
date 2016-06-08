# Rotate feature interaction for OpenLayers 3

Plugin adds interaction that allows to rotate vector features around some anchor.

## Installation

Install it thought NPM:

```shell
npm install ol3-rotate-feature
```

Or download the latest version archive and add it with script tag:

```html
<script src="ol3-rotate-feature/dist/bundle.min.js"></script>
```

## Usage

Plugin is packed into UMD wrapper and exports an object
`ol3RotateFeature` with three properties:

```js
export {
    RotateFeatureInteraction,
    RotateFeatureEvent,
    RotateFeatureEventType
};
```

In Browser environment it exports to `ol3RotateFeature` global variable.

### Options

| Option         | Type                                                                | Description                                                                            |
|:---------------|:--------------------------------------------------------------------|:---------------------------------------------------------------------------------------|
| features       | _ol.Collection<ol.Feature>_                                         | The features the interaction works on. Required.                                       |
| style          | _ol.style.Style \| Array<ol.style.Style> \| ol.style.StyleFunction_ | Style of the overlay with interaction helper features.                                 |
| angleProperty  | _string_                                                            | Property name where to save current rotation angle. Default is  'angle'.               |
| anchorProperty | _string_                                                            | Property name where to save current rotation anchor coordinates. Default is  'anchor'. |

### Events

All events triggered by the interaction are instances of `RotateFeatureEvent`.

##### Memebers

- **features**    _ol.Collection_     The features being rotated.

| Event       | Arguments            | Description                          |
|:------------|:---------------------|:-------------------------------------|
| rotatestart | _RotateFeatureEvent_ | Triggered upon feature rotate start. |
| rotating    | _RotateFeatureEvent_ | Triggered upon feature rotating.     |
| rotateend   | _RotateFeatureEvent_ | Triggered upon feature rotation end. |

#### Example usage:

```js
import ol from 'openlayers';
import * as ol3RotateFeature from 'ol3-rotate-feature';

const point = new ol.Feature({
    name: 'point',
    geometry: new ol.geom.Point([2384267.0573564973, 7557371.884852641])
});
const line = new ol.Feature({
    name: 'line',
    geometry: new ol.geom.LineString([
        [-603697.2100018249, -239432.60826165066], 
        [4190433.20404443, 2930563.8287811787]
    ])
});
const polygon = new ol.Feature({
    name: 'polygon',
    geometry: new ol.geom.Polygon([[
        [-14482348.171434438, 6661491.741627443], 
        [-9541458.663080638, 6221214.458704827], 
        [-11473786.738129886, 3300708.4819848104], 
        [-14482348.171434438, 6661491.741627443]
    ]])
});

const map = new ol.Map({
    view: new ol.View({
        center: [0, 0],
        zoom: 2
    }),
    layers: [
        new ol.layer.Tile({
            source: new ol.source.MapQuest({ layer: 'osm' })
        }),
        new ol.layer.Vector({
            source: new ol.source.Vector({
                projection: 'EPSG:33857',
                features: [point, line, polygon]
            })
        })
    ],
    target: 'map',
    projection: 'EPSG:3857'
});

const features = new ol.Collection();
const select = new ol.interaction.Select();
const rotate = new ol3RotateFeature.RotateFeatureInteraction({
    features: select.getFeatures()
});

rotate.on(ol3RotateFeature.RotateFeatureEventType.START, evt => console.log('rotate start', evt));
rotate.on(ol3RotateFeature.RotateFeatureEventType.ROTATING, evt => console.log('rotating', evt));
rotate.on(ol3RotateFeature.RotateFeatureEventType.END, evt => console.log('rotate end', evt));

map.addInteraction(select);
map.addInteraction(rotate);
```

Example of usage in Browser environment in `index.html`.

Getting total angle or last anchor coordinates after rotation:

```js
rotate.on(ol3RotateFeature.RotateFeatureEventType.END, evt => {
    evt.features.forEach(feature => {
        // get total angle in radians (positive is counter-clockwise)
        console.log(feature.get('angle') + ' is '+ (-1 * feature.get('angle') * 180 / Math.PI ) + '°');
        // get las anchor coordinates
        console.log(feature.get('anchor'));
    });
});
```

## License

MIT (c) 2016, Vladimir Vershinin
