import Map from 'ol/map'
import View from 'ol/view'
import TileLayer from 'ol/layer/tile'
import VectorLayer from 'ol/layer/vector'
import OSMSource from 'ol/source/osm'
import VectorSource from 'ol/source/vector'
import Feature from 'ol/feature'
import Point from 'ol/geom/point'
import LineString from 'ol/geom/linestring'
import Polygon from 'ol/geom/polygon'
import Select from 'ol/interaction/select'
import Style from 'ol/style/style'
import RegularShape from 'ol/style/regularshape'
import Fill from 'ol/style/fill'
import Stroke from 'ol/style/stroke'
import Text from 'ol/style/text'
import 'ol/ol.css'
import RotateFeatureInteraction from '../src'

const point = new Feature({
  name: 'point',
  geometry: new Point([ 2384267.0573564973, 7557371.884852641 ])
})
const line = new Feature({
  name: 'line',
  geometry: new LineString([ [ -603697.2100018249, -239432.60826165066 ], [ 4190433.20404443, 2930563.8287811787 ] ])
})
const polygon = new Feature({
  name: 'polygon',
  geometry: new Polygon([ [
    [ -14482348.171434438, 6661491.741627443 ],
    [ -9541458.663080638, 6221214.458704827 ],
    [ -11473786.738129886, 3300708.4819848104 ],
    [ -14482348.171434438, 6661491.741627443 ]
  ] ])
})

const map = new Map({
  view: new View({
    center: [ 0, 0 ],
    zoom: 2
  }),
  layers: [
    new TileLayer({
      source: new OSMSource()
    }),
    new VectorLayer({
      source: new VectorSource({
        projection: 'EPSG:33857',
        features: [ point, line, polygon ]
      })
    })
  ],
  target: 'map',
  projection: 'EPSG:3857'
})

const select = new Select()
select.getFeatures().extend([ point, line, polygon ])

const rotate = new RotateFeatureInteraction({
  features: select.getFeatures(),
  anchor: [ 0, 0 ],
  angle: -90 * Math.PI / 180,
  style: createStyle ()
})

rotate.on('rotatestart', evt => console.log('rotate start', evt))
rotate.on('rotating', evt => console.log('rotating', evt))
rotate.on('rotateend', evt => console.log('rotate end', evt))

map.addInteraction(select)
map.addInteraction(rotate)

function createStyle () {
  let white = [ 255, 255, 255, 0.8 ]
  let blue = [ 0, 153, 255, 0.8 ]
  let red = [ 209, 0, 26, 0.9 ]
  let width = 2

  let styles = {
    anchor: [
      new Style({
        image: new RegularShape({
          fill: new Fill({
            color: blue
          }),
          stroke: new Stroke({
            color: blue,
            width: 1
          }),
          radius: 4,
          points: 6
        }),
        zIndex: Infinity
      })
    ],
    arrow: [
      new Style({
        stroke: new Stroke({
          color: white,
          width: width + 3,
          lineDash: [ 10, 10 ]
        }),
        text: new Text({
          font: '14px sans-serif',
          offsetX: 25,
          offsetY: -25,
          fill: new Fill({
            color: 'blue'
          }),
          stroke: new Stroke({
            color: white,
            width: width + 1
          })
        }),
        zIndex: Infinity
      }),
      new Style({
        stroke: new Stroke({
          color: red,
          width: width + 1,
          lineDash: [ 10, 10 ]
        }),
        zIndex: Infinity
      })
    ]
  }

  return function (feature, resolution) {
    let style
    let angle = feature.get('angle') || 0

    switch (true) {
      case feature.get('rotate-anchor'):
        style = styles[ 'anchor' ]
        style[ 0 ].getImage().setRotation(-angle)

        return style
      case feature.get('rotate-arrow'):
        style = styles[ 'arrow' ]

        let coordinates = feature.getGeometry().getCoordinates()
        // generate arrow polygon
        let geom = new LineString([
          coordinates,
          [ coordinates[ 0 ], coordinates[ 1 ] + 100 * resolution ]
        ])

        // and rotate it according to current angle
        geom.rotate(angle, coordinates)
        style[ 0 ].setGeometry(geom)
        style[ 1 ].setGeometry(geom)
        style[ 0 ].getText().setText(Math.round(-angle * 180 / Math.PI) + '°')

        return style
    }
  }
}
