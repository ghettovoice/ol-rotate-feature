/**
 * This file is part of ol-rotate-feature package.
 * @module ol-rotate-feature
 * @license MIT
 * @author Vladimir Vershinin
 */
/**
 * Rotate interaction class.
 * Adds controls to rotate vector features.
 * Writes out total angle in radians (positive is counter-clockwise) to property for each feature.
 */
import PointerInteraction from 'ol/interaction/Pointer'
import Collection from 'ol/Collection'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import Polygon from 'ol/geom/Polygon'
import GeometryCollection from 'ol/geom/GeometryCollection'
import Style from 'ol/style/Style'
import RegularShape from 'ol/style/RegularShape'
import Stroke from 'ol/style/Stroke'
import Fill from 'ol/style/Fill'
import Text from 'ol/style/Text'
import {getCenter as getExtentCenter} from 'ol/extent'
import { always, mouseOnly } from 'ol/events/condition';
import { assert, identity, includes, isArray } from './util'
import RotateFeatureEvent, { RotateFeatureEventType } from './event'
import { mouseActionButton } from './shim'

const ANCHOR_KEY = 'rotate-anchor'
const ARROW_KEY = 'rotate-arrow'

const ANGLE_PROP = 'angle'
const ANCHOR_PROP = 'anchor'

/**
 * @todo todo добавить опцию condition - для возможности переопределения клавиш
 */
export default class RotateFeatureInteraction extends PointerInteraction {
  /**
   * @param {InteractionOptions} options
   */
  constructor (options = {}) {
    super({
      // handleEvent: handleEvent,
      handleDownEvent,
      handleUpEvent,
      handleDragEvent,
      handleMoveEvent
    })
    /**
     * @type {string}
     * @private
     */
    this.previousCursor_ = undefined
    /**
     * @type {Feature}
     * @private
     */
    this.anchorFeature_ = undefined
    /**
     * @type {Feature}
     * @private
     */
    this.arrowFeature_ = undefined
    /**
     * @type {Coordinate}
     * @private
     */
    this.lastCoordinate_ = undefined
    /**
     * @type {boolean}
     * @private
     */
    this.anchorMoving_ = false
    /**
     * @type {Vector}
     * @private
     */
    this.overlay_ = new VectorLayer({
      style: options.style || getDefaultStyle(),
      source: new VectorSource({
        features: new Collection()
      })
    })
    /**
     * @private
     * @type {module:ol/events/condition~Condition}
     */
    this.condition_ = options.condition ? options.condition : always;
    /**
     * @type {Collection<Feature>}
     * @private
     */
    this.features_ = undefined
    if (options.features) {
      if (isArray(options.features)) {
        this.features_ = new Collection(options.features)
      } else if (options.features instanceof Collection) {
        this.features_ = options.features
      } else {
        throw new Error('Features option should be an array or collection of features, ' +
                        'got ' + (typeof options.features))
      }
    } else {
      this.features_ = new Collection()
    }

    /**
     * @type {boolean}
     * @public
     */
    this.allowAnchorMovement = options.allowAnchorMovement === undefined ? true : options.allowAnchorMovement;

    this.setAnchor(options.anchor || getFeaturesCentroid(this.features_))
    this.setAngle(options.angle || 0)

    this.features_.on('add', ::this.onFeatureAdd_)
    this.features_.on('remove', ::this.onFeatureRemove_)
    this.on('change:' + ANGLE_PROP, ::this.onAngleChange_)
    this.on('change:' + ANCHOR_PROP, ::this.onAnchorChange_)

    this.createOrUpdateAnchorFeature_()
    this.createOrUpdateArrowFeature_()
  }

  /**
   * @type {Collection<Feature>}
   */
  get features () {
    return this.features_
  }

  /**
   * @type {number}
   */
  get angle () {
    return this.getAngle()
  }

  /**
   * @param {number} angle
   */
  set angle (angle) {
    this.setAngle(angle)
  }

  /**
   * @type {Coordinate|number[]|undefined}
   */
  get anchor () {
    return this.getAnchor()
  }

  /**
   * @param {Coordinate|undefined} anchor
   */
  set anchor (anchor) {
    this.setAnchor(anchor)
  }

  /**
   * @param {PluggableMap} map
   */
  set map (map) {
    this.setMap(map)
  }

  /**
   * @type {PluggableMap}
   */
  get map() {
    return this.getMap()
  }

  /**
   * @param {boolean} active
   */
  set active (active) {
    this.setActive(active)
  }

  /**
   * @type {boolean}
   */
  get active () {
    return this.getActive()
  }

  /**
   * @param {ol.Map} map
   */
  setMap (map) {
    this.overlay_.setMap(map)
    super.setMap(map)
  }

  /**
   * @param {boolean} active
   */
  setActive (active) {
    if (this.overlay_) {
      this.overlay_.setMap(active ? this.map : undefined)
    }

    super.setActive(active)
  }

  /**
   * Set current angle of interaction features.
   *
   * @param {number} angle
   */
  setAngle (angle) {
    assert(!isNaN(parseFloat(angle)), 'Numeric value passed')

    this.set(ANGLE_PROP, parseFloat(angle))
  }

  /**
   * Returns current angle of interaction features.
   *
   * @return {number}
   */
  getAngle () {
    return this.get(ANGLE_PROP)
  }

  /**
   * Set current anchor position.
   *
   * @param {Coordinate | undefined} anchor
   */
  setAnchor (anchor) {
    assert(anchor == null || isArray(anchor) && anchor.length === 2, 'Array of two elements passed')

    this.set(ANCHOR_PROP, anchor != null ? anchor.map(parseFloat) : getFeaturesCentroid(this.features_))
  }

  /**
   * Returns current anchor position.
   *
   * @return {Coordinate | undefined}
   */
  getAnchor () {
    return this.get(ANCHOR_PROP)
  }

  /**
   * @private
   */
  createOrUpdateAnchorFeature_ () {
    const angle = this.getAngle()
    const anchor = this.getAnchor()

    if (!anchor) return

    if (this.anchorFeature_) {
      this.anchorFeature_.getGeometry().setCoordinates(anchor)
      this.anchorFeature_.set(ANGLE_PROP, angle)
    } else {
      this.anchorFeature_ = new Feature({
        geometry: new Point(anchor),
        [ ANGLE_PROP ]: angle,
        [ ANCHOR_KEY ]: true
      })
      this.overlay_.getSource().addFeature(this.anchorFeature_)
    }
  }

  /**
   * @private
   */
  createOrUpdateArrowFeature_ () {
    const angle = this.getAngle()
    const anchor = this.getAnchor()

    if (!anchor) return

    if (this.arrowFeature_) {
      this.arrowFeature_.getGeometry().setCoordinates(anchor)
      this.arrowFeature_.set(ANGLE_PROP, angle)
    } else {
      this.arrowFeature_ = new Feature({
        geometry: new Point(anchor),
        [ ANGLE_PROP ]: angle,
        [ ARROW_KEY ]: true
      })
      this.overlay_.getSource().addFeature(this.arrowFeature_)
    }
  }

  /**
   * @private
   */
  resetAngleAndAnchor_() {
    this.resetAngle_();
    this.resetAnchor_();
  }

  /**
   * @private
   */
  resetAngle_() {
    this.set(ANGLE_PROP, 0, true);
    this.arrowFeature_ && this.arrowFeature_.set(ANGLE_PROP, this.getAngle());
    this.anchorFeature_ && this.anchorFeature_.set(ANGLE_PROP, this.getAngle());
  }

  /**
   * @private
   */
  resetAnchor_() {
    this.set(ANCHOR_PROP, getFeaturesCentroid(this.features_), true);

    if (this.getAnchor()) {
      this.arrowFeature_ && this.arrowFeature_.getGeometry().setCoordinates(this.getAnchor());
      this.anchorFeature_ && this.anchorFeature_.getGeometry().setCoordinates(this.getAnchor());
    }
  }

  /**
   * @private
   */
  onFeatureAdd_ () {
    this.resetAngleAndAnchor_()
    this.createOrUpdateAnchorFeature_()
    this.createOrUpdateArrowFeature_()
  }

  /**
   * @private
   */
  onFeatureRemove_ () {
    this.resetAngleAndAnchor_()

    if (this.features_.getLength()) {
      this.createOrUpdateAnchorFeature_()
      this.createOrUpdateArrowFeature_()
    } else {
      this.overlay_.getSource().clear()
      this.anchorFeature_ = this.arrowFeature_ = undefined
    }
  }

  /**
   * @private
   */
  onAngleChange_({ oldValue }) {
    this.features_.forEach(feature => feature.getGeometry().rotate(this.getAngle() - oldValue, this.getAnchor()))
    this.arrowFeature_ && this.arrowFeature_.set(ANGLE_PROP, this.getAngle())
    this.anchorFeature_ && this.anchorFeature_.set(ANGLE_PROP, this.getAngle())
  }

  /**
   * @private
   */
  onAnchorChange_() {
    const anchor = this.getAnchor()

    if (anchor) {
      this.anchorFeature_ && this.anchorFeature_.getGeometry().setCoordinates(anchor)
      this.arrowFeature_ && this.arrowFeature_.getGeometry().setCoordinates(anchor)
    }
  }

  /**
   * @param {Collection<Feature>} features
   * @private
   */
  dispatchRotateStartEvent_ (features) {
    this.dispatchEvent(
      new RotateFeatureEvent(
        RotateFeatureEventType.START,
        features,
        this.getAngle(),
        this.getAnchor()
      )
    )
  }

  /**
   * @param {Collection<Feature>} features
   * @private
   */
  dispatchRotatingEvent_ (features) {
    this.dispatchEvent(
      new RotateFeatureEvent(
        RotateFeatureEventType.ROTATING,
        features,
        this.getAngle(),
        this.getAnchor()
      )
    )
  }

  /**
   * @param {Collection<Feature>} features
   * @private
   */
  dispatchRotateEndEvent_ (features) {
    this.dispatchEvent(
      new RotateFeatureEvent(
        RotateFeatureEventType.END,
        features,
        this.getAngle(),
        this.getAnchor()
      )
    )
  }
}

/**
 * @param {MapBrowserEvent} evt Map browser event.
 * @return {boolean} `false` to stop event propagation.
 * @this {RotateFeatureInteraction}
 * @private
 */
// function handleEvent (evt) {
//   // disable selection of inner features
//   const foundFeature = evt.map.forEachFeatureAtPixel(evt.pixel, identity)
//   if (
//     includes([ 'click', 'singleclick', 'dblclick' ], evt.type) &&
//     includes([ this.anchorFeature_, this.arrowFeature_ ], foundFeature)
//   ) {
//     return false
//   }
//
//   return this::baseHandleEvent(evt)
// }

/**
 * @param {MapBrowserEvent} evt Event.
 * @return {boolean}
 * @this {RotateFeatureInteraction}
 * @private
 */
function handleDownEvent (evt) {
  if (!mouseOnly(evt)) {
    return false;
  }

  if (mouseActionButton(evt) && this.condition_(evt)) {
    // disable selection of inner features
    const foundFeature = evt.map.forEachFeatureAtPixel(evt.pixel, identity)
    if (
      includes([ 'click', 'singleclick', 'dblclick' ], evt.type) &&
      includes([ this.anchorFeature_, this.arrowFeature_ ], foundFeature)
    ) {
      return false
    }
    // handle click & drag on features for rotation
    if (
      foundFeature && !this.lastCoordinate_ &&
      (
        includes(this.features_.getArray(), foundFeature) ||
        foundFeature === this.arrowFeature_
      )
    ) {
      this.lastCoordinate_ = evt.coordinate

      this::handleMoveEvent(evt)
      this.dispatchRotateStartEvent_(this.features_)

      return true
    }
    // handle click & drag on rotation anchor feature
    else if (foundFeature && foundFeature === this.anchorFeature_ && this.allowAnchorMovement) {
      this.anchorMoving_ = true
      this::handleMoveEvent(evt)

      return true
    }
  }
  return false
}

/**
 * @param {MapBrowserEvent} evt Event.
 * @return {boolean}
 * @this {RotateFeatureInteraction}
 * @private
 */
function handleUpEvent (evt) {
  // stop drag sequence of features
  if (this.lastCoordinate_) {
    this.lastCoordinate_ = undefined

    this::handleMoveEvent(evt)
    this.dispatchRotateEndEvent_(this.features_)

    return true
  }
  // stop drag sequence of the anchors
  else if (this.anchorMoving_) {
    this.anchorMoving_ = false
    this::handleMoveEvent(evt)

    return true
  }

  return false
}

/**
 * @param {MapBrowserEvent} evt Event.
 * @return {boolean}
 * @this {RotateFeatureInteraction}
 * @private
 */
function handleDragEvent ({ coordinate }) {
  const anchorCoordinate = this.anchorFeature_.getGeometry().getCoordinates()

  // handle drag of features by angle
  if (this.lastCoordinate_) {
    // calculate vectors of last and current pointer positions
    const lastVector = [
      this.lastCoordinate_[ 0 ] - anchorCoordinate[ 0 ],
      this.lastCoordinate_[ 1 ] - anchorCoordinate[ 1 ]
    ]
    const newVector = [
      coordinate[ 0 ] - anchorCoordinate[ 0 ],
      coordinate[ 1 ] - anchorCoordinate[ 1 ]
    ]

    // calculate angle between last and current vectors (positive angle counter-clockwise)
    let angle = Math.atan2(
      lastVector[ 0 ] * newVector[ 1 ] - newVector[ 0 ] * lastVector[ 1 ],
      lastVector[ 0 ] * newVector[ 0 ] + lastVector[ 1 ] * newVector[ 1 ]
    )

    this.setAngle(this.getAngle() + angle)
    this.dispatchRotatingEvent_(this.features_)

    this.lastCoordinate_ = coordinate
  }
  // handle drag of the anchor
  else if (this.anchorMoving_) {
    this.setAnchor(coordinate)
  }
}

/**
 * @param {MapBrowserEvent} evt Event.
 * @return {boolean}
 * @this {RotateFeatureInteraction}
 * @private
 */
function handleMoveEvent ({ map, pixel }) {
  const elem = map.getTargetElement()
  const foundFeature = map.forEachFeatureAtPixel(pixel, identity)

  const setCursor = (cursor, vendor = false) => {
    if (vendor) {
      elem.style.cursor = '-webkit-' + cursor
      elem.style.cursor = '-moz-' + cursor
    }

    elem.style.cursor = cursor
  }

  if (this.lastCoordinate_) {
    this.previousCursor_ = elem.style.cursor
    setCursor('grabbing', true)
  } else if (
    foundFeature &&
    (
      includes(this.features_.getArray(), foundFeature) ||
      foundFeature === this.arrowFeature_
    )
  ) {
    this.previousCursor_ = elem.style.cursor
    setCursor('grab', true)
  } else if (( foundFeature && foundFeature === this.anchorFeature_ && this.allowAnchorMovement) || this.anchorMoving_) {
    this.previousCursor_ = elem.style.cursor
    setCursor('crosshair')
  } else {
    setCursor(this.previousCursor_ || '')
    this.previousCursor_ = undefined
  }
}

/**
 * @returns {StyleFunction}
 * @private
 */
function getDefaultStyle () {
  const white = [ 255, 255, 255, 0.8 ]
  const blue = [ 0, 153, 255, 0.8 ]
  const transparent = [ 255, 255, 255, 0.01 ]
  const width = 2

  const styles = {
    [ ANCHOR_KEY ]: [
      new Style({
        image: new RegularShape({
          fill: new Fill({
            color: [ 0, 153, 255, 0.8 ]
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
    [ ARROW_KEY ]: [
      new Style({
        fill: new Fill({
          color: transparent
        }),
        stroke: new Stroke({
          color: white,
          width: width + 2
        }),
        text: new Text({
          font: '12px sans-serif',
          offsetX: 20,
          offsetY: -20,
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
        fill: new Fill({
          color: transparent
        }),
        stroke: new Stroke({
          color: blue,
          width
        }),
        zIndex: Infinity
      })
    ]
  }

  return function (feature, resolution) {
    let style
    const angle = feature.get(ANGLE_PROP) || 0

    switch (true) {
      case feature.get(ANCHOR_KEY):
        style = styles[ ANCHOR_KEY ]
        style[ 0 ].getImage().setRotation(-angle)

        return style
      case feature.get(ARROW_KEY):
        style = styles[ ARROW_KEY ]

        const coordinates = feature.getGeometry().getCoordinates()
        // generate arrow polygon
        const geom = new Polygon([
          [
            [ coordinates[ 0 ], coordinates[ 1 ] - 6 * resolution ],
            [ coordinates[ 0 ] + 8 * resolution, coordinates[ 1 ] - 12 * resolution ],
            [ coordinates[ 0 ], coordinates[ 1 ] + 30 * resolution ],
            [ coordinates[ 0 ] - 8 * resolution, coordinates[ 1 ] - 12 * resolution ],
            [ coordinates[ 0 ], coordinates[ 1 ] - 6 * resolution ],
          ]
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

/**
 * @param {Collection<Feature>|Array<Feature>} features
 * @returns {Extent | number[] | undefined}
 * @private
 */
function getFeaturesExtent (features) {
  features = features instanceof Collection ? features.getArray() : features
  if (!features.length) return

  return new GeometryCollection(features.map(feature => feature.getGeometry())).getExtent()
}

/**
 * @param {Collection<ol.Feature> | Array<Feature>} features
 * @return {Coordinate | number[] | undefined}
 */
function getFeaturesCentroid (features) {
  features = features instanceof Collection ? features.getArray() : features
  if (!features.length) return

  return getExtentCenter(getFeaturesExtent(features))
}
