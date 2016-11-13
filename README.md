[![Build Status](https://travis-ci.org/ghettovoice/ol3-rotate-feature.svg?branch=master)](https://travis-ci.org/ghettovoice/ol3-rotate-feature)
[![view on npm](http://img.shields.io/npm/v/ol3-rotate-feature.svg)](https://www.npmjs.org/package/ol3-rotate-feature)

# Rotate feature interaction for OpenLayers 3

Plugin adds interaction that allows to rotate vector features around some anchor.

## Installation

Install it thought NPM or Bower:

```shell
npm install ol3-rotate-feature
bower install ol3-rotate-feature
```

Or download the latest version archive and add it with script tag:

```html
<script src="ol3-rotate-feature/dist/bundle.min.js"></script>
```

## Usage

Plugin is packed into UMD wrapper, import it with CommonJS or ES6:
                                 
```js
import RotateFeatureInteraction from 'ol3-rotate-feature';
const RotateFeatureInteraction = require('ol3-rotate-feature');
```

In Browser environment it is available as `ol.interaction.RotateFeature`.

### Options

| Option         | Type                                                                                               | Description                                                                                                                 |
|:---------------|:---------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------|
| features       | _ol.Collection<ol.Feature>_                                                                        | The features the interaction works on. Required.                                                                            |
| style          | _ol.style.Style &#124; Array&lt;ol.style.Style&gt; &#124; ol.style.StyleFunction &#124; undefined_ | Style of the overlay with interaction helper features.                                                                      |
| angle          | _number &#124; undefined_                                                                          | Initial angle in radians (positive is counter-clockwise), applied for features already added to collection. Default is `0`. |
| anchor         | _number[] &#124; ol.Coordinate &#124; undefined_                                                   | Initial anchor coordinate. Default is center of features extent.                                                            |

### Methods

```js
// Set current angle of interaction features.
RotateFeatureInteraction.prototype.setAngle(angle : number)
```

```js
// Returns current angle of interaction features.
RotateFeatureInteraction.prototype.getAngle() : number
```

```js
// Set current anchor position.
RotateFeatureInteraction.prototype.setAnchor(anchor? : number[] | ol.Coordinate)
```

```js
// Returns current anchor position.
RotateFeatureInteraction.prototype.getAnchor() : number[] | ol.Coordinate | undefined 
```

### Events

All events triggered by the interaction are instances of `RotateFeatureEvent`.

##### Members

- **features**    _ol.Collection_     The features being rotated.
- **angle**       _number_            Current angle in radians.
- **anchor**      _ol.Coordinate_     Current anchor position.

| Event       | Arguments            | Description                          |
|:------------|:---------------------|:-------------------------------------|
| rotatestart | _RotateFeatureEvent_ | Triggered upon feature rotate start. |
| rotating    | _RotateFeatureEvent_ | Triggered upon feature rotating.     |
| rotateend   | _RotateFeatureEvent_ | Triggered upon feature rotation end. |

### Example usage:

```js
import ol from 'openlayers';
import * as ol3RotateFeature from 'ol3-rotate-feature';

const point = new ol.Feature({
    name: 'point',
    geometry: new ol.geom.Point([2384267.0573564973, 7557371.884852641])
});
const line = new ol.Feature({
    name: 'line',
    geometry: new ol.geom.LineString([[-603697.2100018249, -239432.60826165066], [4190433.20404443, 2930563.8287811787]])
});
const polygon = new ol.Feature({
    name: 'polygon',
    geometry: new ol.geom.Polygon([[[-14482348.171434438, 6661491.741627443], [-9541458.663080638, 6221214.458704827], [-11473786.738129886, 3300708.4819848104], [-14482348.171434438, 6661491.741627443]]])
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
const rotate = new ol.interaction.RotateFeature({
    features: select.getFeatures()
});

rotate.on('rotatestart', evt => console.log('rotate start', evt));
rotate.on('rotating', evt => console.log('rotating', evt));
rotate.on('rotateend', evt => console.log('rotate end', evt));

map.addInteraction(select);
map.addInteraction(rotate);
```

Example of usage in Browser environment in `index.html`.

Getting total angle or last anchor coordinates after rotation:

```js
rotate.on('rotateend', evt => {
    // get total angle in degrees
    console.log(evt.angle + ' is '+ (-1 * evt.angle * 180 / Math.PI ) + '°');
    // get last anchor coordinates
    console.log(evt.anchor);
});
```

## License

MIT (c) 2016, Vladimir Vershinin
