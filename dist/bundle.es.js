/*!
Rotate vector features interaction for OpenLayers

@package ol-rotate-feature
@author Vladimir Vershinin <ghettovoice@gmail.com>
@version 1.2.4
@licence MIT
@copyright (c) 2016-2017, Vladimir Vershinin <ghettovoice@gmail.com>
*/
import _defineProperty from '../node_modules/babel-runtime/helpers/defineProperty.js';
import _typeof from '../node_modules/babel-runtime/helpers/typeof.js';
import _Object$getPrototypeOf from '../node_modules/babel-runtime/core-js/object/get-prototype-of.js';
import _classCallCheck from '../node_modules/babel-runtime/helpers/classCallCheck.js';
import _createClass from '../node_modules/babel-runtime/helpers/createClass.js';
import _possibleConstructorReturn from '../node_modules/babel-runtime/helpers/possibleConstructorReturn.js';
import _get from '../node_modules/babel-runtime/helpers/get.js';
import _inherits from '../node_modules/babel-runtime/helpers/inherits.js';
import PointerInteraction from '../node_modules/ol/interaction/pointer.js';
import Collection from '../node_modules/ol/collection.js';
import VectorLayer from '../node_modules/ol/layer/vector.js';
import VectorSource from '../node_modules/ol/source/vector.js';
import Feature from '../node_modules/ol/feature.js';
import Point from '../node_modules/ol/geom/point.js';
import Polygon from '../node_modules/ol/geom/polygon.js';
import GeometryCollection from '../node_modules/ol/geom/geometrycollection.js';
import Style from '../node_modules/ol/style/style.js';
import RegularShape from '../node_modules/ol/style/regularshape.js';
import Stroke from '../node_modules/ol/style/stroke.js';
import Fill from '../node_modules/ol/style/fill.js';
import Text from '../node_modules/ol/style/text.js';
import extentHelper from '../node_modules/ol/extent.js';

/**
 * @param {boolean} condition
 * @param {string} message
 * @throws Error
 */
function assert(condition) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  message = ['Assertion failed', message].join(': ');

  if (!condition) {
    throw new Error(message);
  }
}

/**
 * Checks if the value is an instance of the user-defined type.
 *
 * @param {*} value
 * @param {*} type
 * @throws Error
 */
function assertInstanceOf(value, type) {
  assert(value instanceof type, 'Expected instanceof ' + getValueType(type) + ' but got ' + getValueType(value) + '.');
}

/**
 * Null function. Do nothing.
 */


/**
 * @param {*} arg
 * @returns {*}
 */
function identity(arg) {
  return arg;
}

/**
 * Returns the type of a value. If a constructor is passed, and a suitable
 * string cannot be found, 'unknown type name' will be returned.
 *
 * @param {*} value
 * @returns string
 */
function getValueType(value) {
  if (value instanceof Function) {
    return value.name || 'unknown type name';
  } else if (value instanceof Object) {
    return value.constructor.name || Object.prototype.toString.call(value);
  } else {
    return value === null ? 'null' : typeof value === 'undefined' ? 'undefined' : _typeof(value);
  }
}

/**
 * @param {...*} args
 * @return {*}
 */
function coalesce() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.filter(function (value) {
    return value != null;
  }).shift();
}

/**
 * @enum {string}
 */
var RotateFeatureEventType = {
  /**
   * Triggered upon feature rotate start.
   * @event RotateFeatureEvent#rotatestart
   */
  START: 'rotatestart',
  /**
   * Triggered upon feature rotation.
   * @event RotateFeatureEvent#rotating
   */
  ROTATING: 'rotating',
  /**
   * Triggered upon feature rotation end.
   * @event RotateFeatureEvent#rotateend
   */
  END: 'rotateend'
};

/**
 * Events emitted by RotateFeatureInteraction instances are instances of this type.
 *
 * @class
 * @author Vladimir Vershinin
 */

var RotateFeatureEvent = function () {
  /**
   * @param {string} type Type.
   * @param {ol.Collection<ol.Feature>} features Rotated features.
   * @param {number} angle Angle in radians.
   * @param {ol.Coordinate} anchor Anchor position.
   */
  function RotateFeatureEvent(type, features, angle, anchor) {
    _classCallCheck(this, RotateFeatureEvent);

    /**
     * @type {boolean}
     * @private
     */
    this.propagationStopped_ = false;

    /**
     * The event type.
     * @type {string}
     * @private
     */
    this.type_ = type;

    /**
     * The features being rotated.
     * @type {ol.Collection<ol.Feature>}
     * @private
     */
    this.features_ = features;
    /**
     * Current angle in radians.
     * @type {number}
     * @private
     */
    this.angle_ = angle;
    /**
     * Current rotation anchor.
     * @type {ol.Coordinate}
     * @private
     */
    this.anchor_ = anchor;
  }

  /**
   * @type {boolean}
   */


  _createClass(RotateFeatureEvent, [{
    key: 'preventDefault',


    /**
     * Prevent event propagation.
     */
    value: function preventDefault() {
      this.propagationStopped_ = true;
    }

    /**
     * Stop event propagation.
     */

  }, {
    key: 'stopPropagation',
    value: function stopPropagation() {
      this.propagationStopped_ = true;
    }
  }, {
    key: 'propagationStopped',
    get: function get() {
      return this.propagationStopped_;
    }

    /**
     * @type {RotateFeatureEventType}
     */

  }, {
    key: 'type',
    get: function get() {
      return this.type_;
    }

    /**
     * @type {ol.Collection<ol.Feature>}
     */

  }, {
    key: 'features',
    get: function get() {
      return this.features_;
    }

    /**
     * @type {number}
     */

  }, {
    key: 'angle',
    get: function get() {
      return this.angle_;
    }

    /**
     * @type {ol.Coordinate}
     */

  }, {
    key: 'anchor',
    get: function get() {
      return this.anchor_;
    }
  }]);

  return RotateFeatureEvent;
}();

var ANCHOR_KEY = 'anchor';
var ARROW_KEY = 'arrow';
// const GHOST_KEY = 'ghost'

var ANGLE_PROP = 'angle';
var ANCHOR_PROP = 'anchor';

/**
 * todo добавить опцию condition - для возможности переопределения клавиш
 *
 * Rotate interaction class.
 * Adds controls to rotate vector features.
 * Writes out total angle in radians (positive is counter-clockwise) to property for each feature.
 */

var RotateFeatureInteraction = function (_PointerInteraction) {
  _inherits(RotateFeatureInteraction, _PointerInteraction);

  /**
   * @param {InteractionOptions} options
   */
  function RotateFeatureInteraction() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, RotateFeatureInteraction);

    /**
     * @type {ol.Collection<ol.Feature>}
     * @private
     */
    var _this = _possibleConstructorReturn(this, (RotateFeatureInteraction.__proto__ || _Object$getPrototypeOf(RotateFeatureInteraction)).call(this, {
      handleEvent: RotateFeatureInteraction.handleEvent,
      handleDownEvent: handleDownEvent,
      handleUpEvent: handleUpEvent,
      handleDragEvent: handleDragEvent,
      handleMoveEvent: handleMoveEvent
    }));

    _this.features_ = undefined;
    if (options.features) {
      if (Array.isArray(options.features)) {
        _this.features_ = new Collection(options.features);
      } else if (options.features instanceof Collection) {
        _this.features_ = options.features;
      } else {
        throw new Error('Features option should be an array or collection of features, got ' + _typeof(options.features));
      }
    } else {
      _this.features_ = new Collection();
    }

    if (options.angle != null) {
      _this.setAngle(options.angle);
    }

    if (options.anchor != null) {
      _this.setAnchor(options.anchor);
    }

    /**
     * @type {ol.layer.Vector}
     * @private
     */
    _this.overlay_ = new VectorLayer({
      style: options.style || getDefaultStyle(),
      source: new VectorSource({
        features: new Collection()
      })
    });
    /**
     * @type {string}
     * @private
     */
    _this.previousCursor_ = undefined;
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
    _this.anchorFeature_ = undefined;
    /**
     * @type {ol.Feature}
     * @private
     */
    _this.arrowFeature_ = undefined;
    /**
     * @type {ol.Coordinate}
     * @private
     */
    _this.lastCoordinate_ = undefined;
    /**
     * @type {boolean}
     * @private
     */
    _this.anchorMoving_ = false;

    _this.features_.on('add', _this.onFeatureAdd_, _this);
    _this.features_.on('remove', _this.onFeatureRemove_, _this);

    _this.on('change:active', _this.onChangeActive_, _this);
    _this.on('change:' + ANGLE_PROP, _this.onAngleChange_, _this);
    _this.on('change:' + ANCHOR_PROP, _this.onAnchorChange_, _this);

    _this.updateInteractionFeatures_();
    return _this;
  }

  /**
   * @type {ol.Collection<ol.Feature>}
   */


  _createClass(RotateFeatureInteraction, [{
    key: 'setMap',


    /**
     * @param {ol.Map} map
     */
    value: function setMap(map) {
      this.overlay_.setMap(map);
      _get(RotateFeatureInteraction.prototype.__proto__ || _Object$getPrototypeOf(RotateFeatureInteraction.prototype), 'setMap', this).call(this, map);

      if (map) {
        this.updateInteractionFeatures_();
      } else {
        this.reset_(true);
      }
    }

    /**
     * @private
     */

  }, {
    key: 'onChangeActive_',
    value: function onChangeActive_() {
      if (this.getActive()) {
        this.updateInteractionFeatures_();
      } else {
        this.reset_(true);
      }
    }

    /**
     * Set current angle of interaction features.
     *
     * @param {number} angle
     */

  }, {
    key: 'setAngle',
    value: function setAngle(angle) {
      assert(!isNaN(parseFloat(angle)), 'Numeric value passed');

      this.set(ANGLE_PROP, parseFloat(angle));
    }

    /**
     * Returns current angle of interaction features.
     *
     * @return {number}
     */

  }, {
    key: 'getAngle',
    value: function getAngle() {
      return coalesce(this.get(ANGLE_PROP), 0);
    }

    /**
     * Set current anchor position.
     *
     * @param {ol.Coordinate | undefined} anchor
     */

  }, {
    key: 'setAnchor',
    value: function setAnchor(anchor) {
      assert(anchor == null || Array.isArray(anchor) && anchor.length === 2, 'Array of two elements passed');
      this.set(ANCHOR_PROP, anchor != null ? anchor.map(parseFloat) : undefined);
    }

    /**
     * Returns current anchor position.
     *
     * @return {ol.Coordinate | undefined}
     */

  }, {
    key: 'getAnchor',
    value: function getAnchor() {
      return coalesce(this.get(ANCHOR_PROP), getFeaturesCentroid(this.features_));
    }

    /**
     * Creates or updates all interaction helper features.
     * @private
     */

  }, {
    key: 'updateInteractionFeatures_',
    value: function updateInteractionFeatures_() {
      if (!this.features_.getLength()) {
        this.reset_();

        return;
      }

      this.createOrUpdateAnchorFeature_();
      this.createOrUpdateArrowFeature_();
    }

    /**
     * @param {boolean} [resetAngleAndAnchor]
     * @private
     */

  }, {
    key: 'reset_',
    value: function reset_() {
      var _this2 = this;

      var resetAngleAndAnchor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (resetAngleAndAnchor) {
        this.resetAngleAndAnchor_();
      }

      [this.anchorFeature_, this.arrowFeature_].forEach(function (feature) {
        if (feature) {
          _this2.overlay_.getSource().removeFeature(feature);
        }
      });

      this.anchorFeature_ = this.arrowFeature_ = this.lastCoordinate_ = undefined;
      this.anchorMoving_ = false;
    }

    /**
     * @private
     */

  }, {
    key: 'resetAngleAndAnchor_',
    value: function resetAngleAndAnchor_() {
      this.resetAngle_();
      this.resetAnchor_();
    }

    /**
     * @private
     */

  }, {
    key: 'resetAngle_',
    value: function resetAngle_() {
      this.set(ANGLE_PROP, 0, true);
      this.arrowFeature_ && this.arrowFeature_.set(ANGLE_PROP, this.getAngle());
      this.anchorFeature_ && this.anchorFeature_.set(ANGLE_PROP, this.getAngle());
    }

    /**
     * @private
     */

  }, {
    key: 'resetAnchor_',
    value: function resetAnchor_() {
      this.set(ANCHOR_PROP, getFeaturesCentroid(this.features_), true);

      if (this.getAnchor()) {
        this.arrowFeature_ && this.arrowFeature_.getGeometry().setCoordinates(this.getAnchor());
        this.anchorFeature_ && this.anchorFeature_.getGeometry().setCoordinates(this.getAnchor());
      }
    }

    /**
     * @private
     */

  }, {
    key: 'createOrUpdateAnchorFeature_',
    value: function createOrUpdateAnchorFeature_() {
      var angle = this.getAngle();
      var anchor = this.getAnchor();

      if (this.anchorFeature_) {
        this.anchorFeature_.getGeometry().setCoordinates(anchor);
      } else {
        var _ref;

        this.anchorFeature_ = new Feature((_ref = {
          geometry: new Point(anchor)
        }, _defineProperty(_ref, ANCHOR_KEY, true), _defineProperty(_ref, ANGLE_PROP, angle), _ref));
        this.overlay_.getSource().addFeature(this.anchorFeature_);
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

  }, {
    key: 'createOrUpdateArrowFeature_',
    value: function createOrUpdateArrowFeature_() {
      var angle = this.getAngle();
      var anchor = this.getAnchor();

      if (this.arrowFeature_) {
        this.arrowFeature_.getGeometry().setCoordinates(anchor);
      } else {
        var _ref2;

        this.arrowFeature_ = new Feature((_ref2 = {
          geometry: new Point(anchor)
        }, _defineProperty(_ref2, ARROW_KEY, true), _defineProperty(_ref2, ANGLE_PROP, angle), _ref2));
        this.overlay_.getSource().addFeature(this.arrowFeature_);
      }
    }

    /**
     * @param {ol.Feature} element
     * @private
     */

  }, {
    key: 'onFeatureAdd_',
    value: function onFeatureAdd_(_ref3) {
      var element = _ref3.element;

      if (!this.getActive()) {
        return;
      }

      assertInstanceOf(element, Feature);

      this.resetAngleAndAnchor_();
      this.updateInteractionFeatures_();
    }

    /**
     * @param {ol.Feature} element
     * @private
     */

  }, {
    key: 'onFeatureRemove_',
    value: function onFeatureRemove_(_ref4) {
      var element = _ref4.element;

      if (!this.getActive()) {
        return;
      }

      assertInstanceOf(element, Feature);

      this.resetAngleAndAnchor_();
      this.updateInteractionFeatures_();
    }

    /**
     * @private
     */

  }, {
    key: 'onAngleChange_',
    value: function onAngleChange_(_ref5) {
      var _this3 = this;

      var oldValue = _ref5.oldValue;

      this.features_.forEach(function (feature) {
        feature.getGeometry().rotate(_this3.getAngle() - (oldValue || 0), _this3.anchorFeature_.getGeometry().getCoordinates());
      });
      this.arrowFeature_ && this.arrowFeature_.set(ANGLE_PROP, this.getAngle());
      this.anchorFeature_ && this.anchorFeature_.set(ANGLE_PROP, this.getAngle());
    }

    /**
     * @private
     */

  }, {
    key: 'onAnchorChange_',
    value: function onAnchorChange_() {
      var anchor = this.getAnchor();

      if (anchor) {
        this.anchorFeature_ && this.anchorFeature_.getGeometry().setCoordinates(anchor);
        this.arrowFeature_ && this.arrowFeature_.getGeometry().setCoordinates(anchor);
      }
    }

    /**
     * @param {ol.Collection<ol.Feature>} features
     * @private
     */

  }, {
    key: 'dispatchRotateStartEvent_',
    value: function dispatchRotateStartEvent_(features) {
      this.dispatchEvent(new RotateFeatureEvent(RotateFeatureEventType.START, features, this.getAngle(), this.getAnchor()));
    }

    /**
     * @param {ol.Collection<ol.Feature>} features
     * @private
     */

  }, {
    key: 'dispatchRotatingEvent_',
    value: function dispatchRotatingEvent_(features) {
      this.dispatchEvent(new RotateFeatureEvent(RotateFeatureEventType.ROTATING, features, this.getAngle(), this.getAnchor()));
    }

    /**
     * @param {ol.Collection<ol.Feature>} features
     * @private
     */

  }, {
    key: 'dispatchRotateEndEvent_',
    value: function dispatchRotateEndEvent_(features) {
      this.dispatchEvent(new RotateFeatureEvent(RotateFeatureEventType.END, features, this.getAngle(), this.getAnchor()));
    }
  }, {
    key: 'features',
    get: function get() {
      return this.features_;
    }

    /**
     * @type {number}
     */

  }, {
    key: 'angle',
    get: function get() {
      return this.getAngle();
    }

    /**
     * @param {number} angle
     */
    ,
    set: function set(angle) {
      this.setAngle(angle);
    }

    /**
     * @type {ol.Coordinate|undefined}
     */

  }, {
    key: 'anchor',
    get: function get() {
      return this.getAnchor();
    }

    /**
     * @param {ol.Coordinate|undefined} anchor
     */
    ,
    set: function set(anchor) {
      this.setAnchor(anchor);
    }

    /**
     * @param {ol.MapBrowserEvent} evt Map browser event.
     * @return {boolean} `false` to stop event propagation.
     * @this {RotateFeatureInteraction}
     * @public
     */

  }], [{
    key: 'handleEvent',
    value: function handleEvent(evt) {
      // disable selection of inner features
      var foundFeature = evt.map.forEachFeatureAtPixel(evt.pixel, identity);
      if (['click', 'singleclick'].includes(evt.type) && [this.anchorFeature_, this.arrowFeature_].includes(foundFeature)) {
        return false;
      }

      return PointerInteraction.handleEvent.call(this, evt);
    }
  }]);

  return RotateFeatureInteraction;
}(PointerInteraction);

function handleDownEvent(evt) {
  var foundFeature = evt.map.forEachFeatureAtPixel(evt.pixel, identity);

  // handle click & drag on features for rotation
  if (foundFeature && !this.lastCoordinate_ && (this.features_.getArray().includes(foundFeature) || foundFeature === this.arrowFeature_)) {
    this.lastCoordinate_ = evt.coordinate;

    handleMoveEvent.call(this, evt);
    this.dispatchRotateStartEvent_(this.features_);

    return true;
  }
  // handle click & drag on rotation anchor feature
  else if (foundFeature && foundFeature === this.anchorFeature_) {
      this.anchorMoving_ = true;
      handleMoveEvent.call(this, evt);

      return true;
    }

  return false;
}

/**
 * @param {ol.MapBrowserEvent} evt Event.
 * @return {boolean}
 * @this {RotateFeatureInteraction}
 * @private
 */
function handleUpEvent(evt) {
  // stop drag sequence of features
  if (this.lastCoordinate_) {
    this.lastCoordinate_ = undefined;

    handleMoveEvent.call(this, evt);
    this.dispatchRotateEndEvent_(this.features_);

    return true;
  }
  // stop drag sequence of the anchors
  else if (this.anchorMoving_) {
      this.anchorMoving_ = false;
      handleMoveEvent.call(this, evt);

      return true;
    }

  return false;
}

/**
 * @param {ol.MapBrowserEvent} evt Event.
 * @return {boolean}
 * @this {RotateFeatureInteraction}
 * @private
 */
function handleDragEvent(evt) {
  var newCoordinate = evt.coordinate;
  var anchorCoordinate = this.anchorFeature_.getGeometry().getCoordinates();

  // handle drag of features by angle
  if (this.lastCoordinate_) {
    // calculate vectors of last and current pointer positions
    var lastVector = [this.lastCoordinate_[0] - anchorCoordinate[0], this.lastCoordinate_[1] - anchorCoordinate[1]];
    var newVector = [newCoordinate[0] - anchorCoordinate[0], newCoordinate[1] - anchorCoordinate[1]];

    // calculate angle between last and current vectors (positive angle counter-clockwise)
    var angle = Math.atan2(lastVector[0] * newVector[1] - newVector[0] * lastVector[1], lastVector[0] * newVector[0] + lastVector[1] * newVector[1]);

    this.setAngle(this.getAngle() + angle);
    this.dispatchRotatingEvent_(this.features_);

    this.lastCoordinate_ = evt.coordinate;
  }
  // handle drag of the anchor
  else if (this.anchorMoving_) {
      this.setAnchor(newCoordinate);
    }
}

/**
 * @param {ol.MapBrowserEvent} evt Event.
 * @return {boolean}
 * @this {RotateFeatureInteraction}
 * @private
 */
function handleMoveEvent(evt) {
  var elem = evt.map.getTargetElement();
  var foundFeature = evt.map.forEachFeatureAtPixel(evt.pixel, identity);

  var setCursor = function setCursor(cursor) {
    var vendor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (vendor) {
      elem.style.cursor = '-webkit-' + cursor;
      elem.style.cursor = '-moz-' + cursor;
    }

    elem.style.cursor = cursor;
  };

  if (this.lastCoordinate_) {
    this.previousCursor_ = elem.style.cursor;
    setCursor('grabbing', true);
  } else if (foundFeature && (this.features_.getArray().includes(foundFeature) || foundFeature === this.arrowFeature_)) {
    this.previousCursor_ = elem.style.cursor;
    setCursor('grab', true);
  } else if (foundFeature && foundFeature === this.anchorFeature_ || this.anchorMoving_) {
    this.previousCursor_ = elem.style.cursor;
    setCursor('crosshair');
  } else {
    setCursor(this.previousCursor_ || '');
    this.previousCursor_ = undefined;
  }
}

/**
 * @returns {StyleFunction}
 * @private
 */
function getDefaultStyle() {
  var _styles;

  var white = [255, 255, 255, 0.8];
  var blue = [0, 153, 255, 0.8];
  var transparent = [255, 255, 255, 0.01];
  var width = 2;

  var styles = (_styles = {}, _defineProperty(_styles, ANCHOR_KEY, [new Style({
    image: new RegularShape({
      fill: new Fill({
        color: [0, 153, 255, 0.8]
      }),
      stroke: new Stroke({
        color: blue,
        width: 1
      }),
      radius: 4,
      points: 6
    }),
    zIndex: Infinity
  })]), _defineProperty(_styles, ARROW_KEY, [new Style({
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
  }), new Style({
    fill: new Fill({
      color: transparent
    }),
    stroke: new Stroke({
      color: blue,
      width: width
    }),
    zIndex: Infinity
  })]), _styles);

  return function (feature, resolution) {
    var style = void 0;
    var angle = feature.get(ANGLE_PROP) || 0;

    switch (true) {
      case feature.get(ANCHOR_KEY):
        style = styles[ANCHOR_KEY];
        style[0].getImage().setRotation(-angle);

        return style;
      case feature.get(ARROW_KEY):
        style = styles[ARROW_KEY];

        var coordinates = feature.getGeometry().getCoordinates();
        // generate arrow polygon
        var geom = new Polygon([[[coordinates[0], coordinates[1] - 6 * resolution], [coordinates[0] + 8 * resolution, coordinates[1] - 12 * resolution], [coordinates[0], coordinates[1] + 30 * resolution], [coordinates[0] - 8 * resolution, coordinates[1] - 12 * resolution], [coordinates[0], coordinates[1] - 6 * resolution]]]);

        // and rotate it according to current angle
        geom.rotate(angle, coordinates);
        style[0].setGeometry(geom);
        style[1].setGeometry(geom);
        style[0].getText().setText(Math.round(-angle * 180 / Math.PI) + '°');

        return style;
    }
  };
}

/**
 * @param {ol.Collection<ol.Feature>|Array<ol.Feature>} features
 * @returns {ol.Extent | undefined}
 * @private
 */
function getFeaturesExtent(features) {
  features = features instanceof Collection ? features.getArray() : features;
  if (!features.length) return;

  return new GeometryCollection(features.map(function (feature) {
    return feature.getGeometry();
  })).getExtent();
}

/**
 * @param {ol.Collection<ol.Feature> | Array<ol.Feature>} features
 * @return {ol.Coordinate | undefined}
 */
function getFeaturesCentroid(features) {
  features = features instanceof Collection ? features.getArray() : features;
  if (!features.length) return;

  return extentHelper.getCenter(getFeaturesExtent(features));
}

/**
 * Rotate interaction for OpenLayers.
 * Allows vector feature rotation.
 *
 * @author Vladimir Vershinin <ghettovoice@gmail.com>
 * @licence MIT https://opensource.org/licenses/MIT
 * @copyright (c) 2016-2017, Vladimir Vershinin
 */

export default RotateFeatureInteraction;
//# sourceMappingURL=bundle.es.js.map
