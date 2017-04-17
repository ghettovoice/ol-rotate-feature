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
import RotateFeature from '../src'

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

const rotate = new RotateFeature({
  features: select.getFeatures(),
  angle: -1.5708
})

rotate.on('rotatestart', evt => console.log('rotate start', evt))
rotate.on('rotating', evt => console.log('rotating', evt))
rotate.on('rotateend', evt => console.log('rotate end', evt))

map.addInteraction(select)
map.addInteraction(rotate)
