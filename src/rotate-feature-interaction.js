import PointerInteraction from 'ol/interaction/pointer'
import Collection from 'ol/collection'
import VectorLayer from 'ol/layer/vector'
import VectorSource from 'ol/source/vector'
import Feature from 'ol/feature'
import Point from 'ol/geom/point'
import Polygon from 'ol/geom/polygon'
import GeometryCollection from 'ol/geom/geometrycollection'
import Style from 'ol/style/style'
import RegularShape from 'ol/style/regularshape'
import Stroke from 'ol/style/stroke'
import Fill from 'ol/style/fill'
import Text from 'ol/style/text'
import extentHelper from 'ol/extent'
import { assert, assertInstanceOf, coalesce, identity } from './util'
import RotateFeatureEvent, { RotateFeatureEventType } from './rotate-feature-event'

const ANCHOR_KEY = 'anchor'
const ARROW_KEY = 'arrow'
// const GHOST_KEY = 'ghost'

const ANGLE_PROP = 'angle'
const ANCHOR_PROP = 'anchor'

/**
 * todo добавить опцию condition - для возможности переопределения клавиш
 *
 * Rotate interaction class.
 * Adds controls to rotate vector features.
 * Writes out total angle in radians (positive is counter-clockwise) to property for each feature.
 */
export default class RotateFeatureInteraction extends PointerInteraction {
  /**
   * @param {InteractionOptions} options
   */
  constructor (options = {}) {
    super({
      handleEvent: RotateFeatureInteraction.handleEvent,
      handleDownEvent: handleDownEvent,
      handleUpEvent: handleUpEvent,
      handleDragEvent: handleDragEvent,
      handleMoveEvent: handleMoveEvent
    })

    if (options.angle != null) {
      this.setAngle(options.angle)
    }

    if (options.anchor != null) {
      this.setAnchor(options.anchor)
    }

    /**
     * @type {ol.Collection<ol.Feature>}
     * @private
     */
    this.features_ = options.features

    assertInstanceOf(this.features_, Collection)

    /**
     * @type {ol.layer.Vector}
     * @private
     */
    this.overlay_ = new VectorLayer({
      style: options.style || getDefaultStyle(),
      source: new VectorSource({
        features: new Collection()
      })
    })
    /**
     * @type {string}
     * @private
     */
    this.previousCursor_ = undefined
//        /**
//         * Rotated feature.
//         *
//         * @type {ol.Feature}
//         * @private
//         */
//        this.ghostFeature_ = undefined
    /**
     * @type {ol.Feature}
     * @private
     */
    this.anchorFeature_ = undefined
    /**
     * @type {ol.Feature}
     * @private
     */
    this.arrowFeature_ = undefined
    /**
     * @type {ol.Coordinate}
     * @private
     */
    this.lastCoordinate_ = undefined
    /**
     * @type {boolean}
     * @private
     */
    this.anchorMoving_ = false

    this.features_.on('add', this.onFeatureAdd_, this)
    this.features_.on('remove', this.onFeatureRemove_, this)

    this.on('change:active', this.onChangeActive_, this)
    this.on('change:' + ANGLE_PROP, this.onAngleChange_, this)
    this.on('change:' + ANCHOR_PROP, this.onAnchorChange_, this)
  }

  /**
   * @type {ol.Collection<ol.Feature>}
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
  set angle(angle) {
    this.setAngle(angle)
  }

  /**
   * @type {ol.Coordinate|undefined}
   */
  get anchor () {
    return this.getAnchor()
  }

  /**
   * @param {ol.Coordinate|undefined} anchor
   */
  set anchor (anchor) {
    this.setAnchor(anchor)
  }

  /**
   * @param {ol.MapBrowserEvent} evt Map browser event.
   * @return {boolean} `false` to stop event propagation.
   * @this {RotateFeatureInteraction}
   * @public
   */
  static handleEvent (evt) {
    // disable selection of inner features
    const foundFeature = evt.map.forEachFeatureAtPixel(evt.pixel, identity)
    if (
      [ 'click', 'singleclick' ].includes(evt.type) &&
      [ this.anchorFeature_, this.arrowFeature_ ].includes(foundFeature)
    ) {
      return false
    }

    return this::PointerInteraction.handleEvent(evt)
  }

  /**
   * @param {ol.Map} map
   */
  setMap (map) {
    this.overlay_.setMap(map)
    super.setMap(map)

    if (map) {
      this.updateInteractionFeatures_()
    } else {
      this.reset_(true)
    }
  }

  /**
   * @private
   */
  onChangeActive_ () {
    if (this.getActive()) {
      this.updateInteractionFeatures_()
    } else {
      this.reset_(true)
    }
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
    return coalesce(this.get(ANGLE_PROP), 0)
  }

  /**
   * Set current anchor position.
   *
   * @param {ol.Coordinate | undefined} anchor
   */
  setAnchor (anchor) {
    assert(anchor == null || Array.isArray(anchor) && anchor.length === 2, 'Array of two elements passed')
    this.set(ANCHOR_PROP, anchor != null ? anchor.map(parseFloat) : undefined)
  }

  /**
   * Returns current anchor position.
   *
   * @return {ol.Coordinate | undefined}
   */
  getAnchor () {
    return coalesce(this.get(ANCHOR_PROP), getFeaturesCentroid(this.features_))
  }

  /**
   * Creates or updates all interaction helper features.
   * @private
   */
  updateInteractionFeatures_ () {
    if (!this.features_.getLength()) {
      this.reset_()

      return
    }

    this.createOrUpdateAnchorFeature_()
    this.createOrUpdateArrowFeature_()
  }

  /**
   * @param {boolean} [resetAngleAndAnchor]
   * @private
   */
  reset_ (resetAngleAndAnchor = false) {
    if (resetAngleAndAnchor) {
      this.resetAngleAndAnchor_()
    }

    [ this.anchorFeature_, this.arrowFeature_ ].forEach(feature => {
      if (feature) {
        this.overlay_.getSource().removeFeature(feature)
      }
    })

    this.anchorFeature_ = this.arrowFeature_ = this.lastCoordinate_ = undefined
    this.anchorMoving_ = false
  }

  /**
   * @private
   */
  resetAngleAndAnchor_ () {
    this.resetAngle_()
    this.resetAnchor_()
  }

  /**
   * @private
   */
  resetAngle_ () {
    this.set(ANGLE_PROP, 0, true)
    this.arrowFeature_ && this.arrowFeature_.set(ANGLE_PROP, this.getAngle())
    this.anchorFeature_ && this.anchorFeature_.set(ANGLE_PROP, this.getAngle())
  }

  /**
   * @private
   */
  resetAnchor_ () {
    this.set(ANCHOR_PROP, getFeaturesCentroid(this.features_), true)

    if (this.getAnchor()) {
      this.arrowFeature_ && this.arrowFeature_.getGeometry().setCoordinates(this.getAnchor())
      this.anchorFeature_ && this.anchorFeature_.getGeometry().setCoordinates(this.getAnchor())
    }
  }

  /**
   * @private
   */
  createOrUpdateAnchorFeature_ () {
    const angle = this.getAngle()
    const anchor = this.getAnchor()

    if (this.anchorFeature_) {
      this.anchorFeature_.getGeometry().setCoordinates(anchor)
    } else {
      this.anchorFeature_ = new Feature({
        geometry: new Point(anchor),
        [ANCHOR_KEY]: true,
        [ANGLE_PROP]: angle
      })
      this.overlay_.getSource().addFeature(this.anchorFeature_)
    }
  }

//    /**
//     * @private
//     */
//    createOrUpdateGhostFeature_() {
//        if (this.ghostFeature_) {
//            this.ghostFeature_.getGeometry().setGeometries(geometries)
//        } else {
//            this.ghostFeature_ = new ol.Feature({
//                geometry: new ol.geom.GeometryCollection(geometries),
//                [GHOST_KEY]: true
//            })
//            this.overlay_.addFeature(this.ghostFeature_)
//        }
//    }

  /**
   * @private
   */
  createOrUpdateArrowFeature_ () {
    const angle = this.getAngle()
    const anchor = this.getAnchor()

    if (this.arrowFeature_) {
      this.arrowFeature_.getGeometry().setCoordinates(anchor)
    } else {
      this.arrowFeature_ = new Feature({
        geometry: new Point(anchor),
        [ARROW_KEY]: true,
        [ANGLE_PROP]: angle
      })
      this.overlay_.getSource().addFeature(this.arrowFeature_)
    }
  }

  /**
   * @param {ol.Feature} element
   * @private
   */
  onFeatureAdd_ ({ element }) {
    if (!this.getActive()) {
      return
    }

    assertInstanceOf(element, Feature)

    this.resetAngleAndAnchor_()
    this.updateInteractionFeatures_()
  }

  /**
   * @param {ol.Feature} element
   * @private
   */
  onFeatureRemove_ ({ element }) {
    if (!this.getActive()) {
      return
    }

    assertInstanceOf(element, Feature)

    this.resetAngleAndAnchor_()
    this.updateInteractionFeatures_()
  }

  /**
   * @private
   */
  onAngleChange_ ({ oldValue }) {
    this.features_.forEach(feature => {
      feature.getGeometry()
        .rotate(
          this.getAngle() - oldValue,
          this.anchorFeature_.getGeometry().getCoordinates()
        )
    })
    this.arrowFeature_ && this.arrowFeature_.set(ANGLE_PROP, this.getAngle())
    this.anchorFeature_ && this.anchorFeature_.set(ANGLE_PROP, this.getAngle())
  }

  /**
   * @private
   */
  onAnchorChange_ () {
    const anchor = this.getAnchor()

    if (anchor) {
      this.anchorFeature_ && this.anchorFeature_.getGeometry().setCoordinates(anchor)
      this.arrowFeature_ && this.arrowFeature_.getGeometry().setCoordinates(anchor)
    }
  }

  /**
   * @param {ol.Collection<ol.Feature>} features
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
   * @param {ol.Collection<ol.Feature>} features
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
   * @param {ol.Collection<ol.Feature>} features
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
 * @param {ol.MapBrowserEvent} evt Event.
 * @return {boolean}
 * @this {RotateFeatureInteraction}
 * @private
 */
function handleDownEvent (evt) {
  const foundFeature = evt.map.forEachFeatureAtPixel(evt.pixel, identity)

  // handle click & drag on features for rotation
  if (
    foundFeature && !this.lastCoordinate_ &&
    (
      this.features_.getArray().includes(foundFeature) ||
      foundFeature === this.arrowFeature_
    )
  ) {
    this.lastCoordinate_ = evt.coordinate

    handleMoveEvent.call(this, evt)
    this.dispatchRotateStartEvent_(this.features_)

    return true
  }
  // handle click & drag on rotation anchor feature
  else if (foundFeature && foundFeature === this.anchorFeature_) {
    this.anchorMoving_ = true
    handleMoveEvent.call(this, evt)

    return true
  }

  return false
}

/**
 * @param {ol.MapBrowserEvent} evt Event.
 * @return {boolean}
 * @this {RotateFeatureInteraction}
 * @private
 */
function handleUpEvent (evt) {
  // stop drag sequence of features
  if (this.lastCoordinate_) {
    this.lastCoordinate_ = undefined

    handleMoveEvent.call(this, evt)
    this.dispatchRotateEndEvent_(this.features_)

    return true
  }
  // stop drag sequence of the anchors
  else if (this.anchorMoving_) {
    this.anchorMoving_ = false
    handleMoveEvent.call(this, evt)

    return true
  }

  return false
}

/**
 * @param {ol.MapBrowserEvent} evt Event.
 * @return {boolean}
 * @this {RotateFeatureInteraction}
 * @private
 */
function handleDragEvent (evt) {
  const newCoordinate = evt.coordinate
  const anchorCoordinate = this.anchorFeature_.getGeometry().getCoordinates()

  // handle drag of features by angle
  if (this.lastCoordinate_) {
    // calculate vectors of last and current pointer positions
    const lastVector = [
      this.lastCoordinate_[ 0 ] - anchorCoordinate[ 0 ],
      this.lastCoordinate_[ 1 ] - anchorCoordinate[ 1 ]
    ]
    const newVector = [
      newCoordinate[ 0 ] - anchorCoordinate[ 0 ],
      newCoordinate[ 1 ] - anchorCoordinate[ 1 ]
    ]

    // calculate angle between last and current vectors (positive angle counter-clockwise)
    let angle = Math.atan2(
      lastVector[ 0 ] * newVector[ 1 ] - newVector[ 0 ] * lastVector[ 1 ],
      lastVector[ 0 ] * newVector[ 0 ] + lastVector[ 1 ] * newVector[ 1 ]
    )

    this.setAngle(this.getAngle() + angle)
    this.dispatchRotatingEvent_(this.features_)

    this.lastCoordinate_ = evt.coordinate
  }
  // handle drag of the anchor
  else if (this.anchorMoving_) {
    this.setAnchor(newCoordinate)
  }
}

/**
 * @param {ol.MapBrowserEvent} evt Event.
 * @return {boolean}
 * @this {RotateFeatureInteraction}
 * @private
 */
function handleMoveEvent (evt) {
  const elem = evt.map.getTargetElement()
  const foundFeature = evt.map.forEachFeatureAtPixel(evt.pixel, identity)

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
      this.features_.getArray().includes(foundFeature) ||
      foundFeature === this.arrowFeature_
    )
  ) {
    this.previousCursor_ = elem.style.cursor
    setCursor('grab', true)
  } else if (( foundFeature && foundFeature === this.anchorFeature_ ) || this.anchorMoving_) {
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
 * @param {ol.Collection<ol.Feature>|Array<ol.Feature>} features
 * @returns {ol.Extent | undefined}
 * @private
 */
function getFeaturesExtent (features) {
  features = features instanceof Collection ? features.getArray() : features
  if (!features.length) return

  return new GeometryCollection(features.map(feature => feature.getGeometry())).getExtent()
}

/**
 * @param {ol.Collection<ol.Feature> | Array<ol.Feature>} features
 * @return {ol.Coordinate | undefined}
 */
function getFeaturesCentroid (features) {
  features = features instanceof Collection ? features.getArray() : features
  if (!features.length) return

  return extentHelper.getCenter(getFeaturesExtent(features))
}
