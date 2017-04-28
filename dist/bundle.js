/*!
 * Rotate vector features interaction for OpenLayers
 * 
 * @package ol-rotate-feature
 * @author Vladimir Vershinin <ghettovoice@gmail.com>
 * @version 1.3.0
 * @licence MIT
 * @copyright (c) 2016-2017, Vladimir Vershinin <ghettovoice@gmail.com>
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("openlayers"));
	else if(typeof define === 'function' && define.amd)
		define(["openlayers"], factory);
	else if(typeof exports === 'object')
		exports["RotateFeature"] = factory(require("openlayers"));
	else
		root["ol"] = root["ol"] || {}, root["ol"]["interaction"] = root["ol"]["interaction"] || {}, root["ol"]["interaction"]["RotateFeature"] = factory(root["ol"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rotate_feature_interaction__ = __webpack_require__(3);
/**
 * Rotate interaction for OpenLayers.
 * Allows vector feature rotation.
 *
 * @author Vladimir Vershinin <ghettovoice@gmail.com>
 * @licence MIT https://opensource.org/licenses/MIT
 * @copyright (c) 2016-2017, Vladimir Vershinin
 */


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__rotate_feature_interaction__["a" /* default */]);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Rotate interaction for OpenLayers.
 * Allows vector feature rotation.
 *
 * @author Vladimir Vershinin <ghettovoice@gmail.com>
 * @licence MIT https://opensource.org/licenses/MIT
 * @copyright (c) 2016-2017, Vladimir Vershinin
 */
var RotateFeatureInteraction = __webpack_require__(0).default;

module.exports = RotateFeatureInteraction;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return RotateFeatureEventType; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

/* harmony default export */ __webpack_exports__["a"] = (RotateFeatureEvent);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_openlayers__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_openlayers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_openlayers__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rotate_feature_event__ = __webpack_require__(2);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };



function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Rotate interaction class.
 * Adds controls to rotate vector features.
 * Writes out total angle in radians (positive is counter-clockwise) to property for each feature.
 */



var ANCHOR_KEY = 'rotate-anchor';
var ARROW_KEY = 'rotate-arrow';

var ANGLE_PROP = 'angle';
var ANCHOR_PROP = 'anchor';

/**
 * @todo todo добавить опцию condition - для возможности переопределения клавиш
 */

var RotateFeatureInteraction = function (_ol$interaction$Poin) {
  _inherits(RotateFeatureInteraction, _ol$interaction$Poin);

  /**
   * @param {InteractionOptions} options
   */
  function RotateFeatureInteraction() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, RotateFeatureInteraction);

    /**
     * @type {string}
     * @private
     */
    var _this = _possibleConstructorReturn(this, (RotateFeatureInteraction.__proto__ || Object.getPrototypeOf(RotateFeatureInteraction)).call(this, {
      handleEvent: handleEvent,
      handleDownEvent: handleDownEvent,
      handleUpEvent: handleUpEvent,
      handleDragEvent: handleDragEvent,
      handleMoveEvent: handleMoveEvent
    }));

    _this.previousCursor_ = undefined;
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
    /**
     * @type {ol.layer.Vector}
     * @private
     */
    _this.overlay_ = new __WEBPACK_IMPORTED_MODULE_0_openlayers___default.a.layer.Vector({
      style: options.style || getDefaultStyle(),
      source: new __WEBPACK_IMPORTED_MODULE_0_openlayers___default.a.source.Vector({
        features: new __WEBPACK_IMPORTED_MODULE_0_openlayers___default.a.Collection()
      })
    });
    /**
     * @type {ol.Collection<ol.Feature>}
     * @private
     */
    _this.features_ = undefined;
    if (options.features) {
      if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* isArray */])(options.features)) {
        _this.features_ = new __WEBPACK_IMPORTED_MODULE_0_openlayers___default.a.Collection(options.features);
      } else if (options.features instanceof __WEBPACK_IMPORTED_MODULE_0_openlayers___default.a.Collection) {
        _this.features_ = options.features;
      } else {
        throw new Error('Features option should be an array or collection of features, ' + 'got ' + _typeof(options.features));
      }
    } else {
      _this.features_ = new __WEBPACK_IMPORTED_MODULE_0_openlayers___default.a.Collection();
    }

    _this.setAnchor(options.anchor || getFeaturesCentroid(_this.features_));
    _this.setAngle(options.angle || 0);

    _this.features_.on('add', _this.onFeatureAdd_.bind(_this));
    _this.features_.on('remove', _this.onFeatureRemove_.bind(_this));
    _this.on('change:' + ANGLE_PROP, _this.onAngleChange_.bind(_this));
    _this.on('change:' + ANCHOR_PROP, _this.onAnchorChange_.bind(_this));

    _this.createOrUpdateAnchorFeature_();
    _this.createOrUpdateArrowFeature_();
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
      _get(RotateFeatureInteraction.prototype.__proto__ || Object.getPrototypeOf(RotateFeatureInteraction.prototype), 'setMap', this).call(this, map);
    }

    /**
     * @param {boolean} active
     */

  }, {
    key: 'setActive',
    value: function setActive(active) {
      if (this.overlay_) {
        this.overlay_.setMap(active ? this.map : undefined);
      }

      _get(RotateFeatureInteraction.prototype.__proto__ || Object.getPrototypeOf(RotateFeatureInteraction.prototype), 'setActive', this).call(this, active);
    }

    /**
     * Set current angle of interaction features.
     *
     * @param {number} angle
     */

  }, {
    key: 'setAngle',
    value: function setAngle(angle) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util__["b" /* assert */])(!isNaN(parseFloat(angle)), 'Numeric value passed');

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
      return this.get(ANGLE_PROP);
    }

    /**
     * Set current anchor position.
     *
     * @param {ol.Coordinate | undefined} anchor
     */

  }, {
    key: 'setAnchor',
    value: function setAnchor(anchor) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util__["b" /* assert */])(anchor == null || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* isArray */])(anchor) && anchor.length === 2, 'Array of two elements passed');

      this.set(ANCHOR_PROP, anchor != null ? anchor.map(parseFloat) : getFeaturesCentroid(this.features_));
    }

    /**
     * Returns current anchor position.
     *
     * @return {ol.Coordinate | undefined}
     */

  }, {
    key: 'getAnchor',
    value: function getAnchor() {
      return this.get(ANCHOR_PROP);
    }

    /**
     * @private
     */

  }, {
    key: 'createOrUpdateAnchorFeature_',
    value: function createOrUpdateAnchorFeature_() {
      var angle = this.getAngle();
      var anchor = this.getAnchor();

      if (!anchor) return;

      if (this.anchorFeature_) {
        this.anchorFeature_.getGeometry().setCoordinates(anchor);
        this.anchorFeature_.set(ANGLE_PROP, angle);
      } else {
        var _ref;

        this.anchorFeature_ = new __WEBPACK_IMPORTED_MODULE_0_openlayers___default.a.Feature((_ref = {
          geometry: new __WEBPACK_IMPORTED_MODULE_0_openlayers___default.a.geom.Point(anchor)
        }, _defineProperty(_ref, ANGLE_PROP, angle), _defineProperty(_ref, ANCHOR_KEY, true), _ref));
        this.overlay_.getSource().addFeature(this.anchorFeature_);
      }
    }

    /**
     * @private
     */

  }, {
    key: 'createOrUpdateArrowFeature_',
    value: function createOrUpdateArrowFeature_() {
      var angle = this.getAngle();
      var anchor = this.getAnchor();

      if (!anchor) return;

      if (this.arrowFeature_) {
        this.arrowFeature_.getGeometry().setCoordinates(anchor);
        this.arrowFeature_.set(ANGLE_PROP, angle);
      } else {
        var _ref2;

        this.arrowFeature_ = new __WEBPACK_IMPORTED_MODULE_0_openlayers___default.a.Feature((_ref2 = {
          geometry: new __WEBPACK_IMPORTED_MODULE_0_openlayers___default.a.geom.Point(anchor)
        }, _defineProperty(_ref2, ANGLE_PROP, angle), _defineProperty(_ref2, ARROW_KEY, true), _ref2));
        this.overlay_.getSource().addFeature(this.arrowFeature_);
      }
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
    key: 'onFeatureAdd_',
    value: function onFeatureAdd_() {
      this.resetAngleAndAnchor_();
      this.createOrUpdateAnchorFeature_();
      this.createOrUpdateArrowFeature_();
    }

    /**
     * @private
     */

  }, {
    key: 'onFeatureRemove_',
    value: function onFeatureRemove_() {
      this.resetAngleAndAnchor_();

      if (this.features_.getLength()) {
        this.createOrUpdateAnchorFeature_();
        this.createOrUpdateArrowFeature_();
      } else {
        this.overlay_.getSource().clear();
        this.anchorFeature_ = this.arrowFeature_ = undefined;
      }
    }

    /**
     * @private
     */

  }, {
    key: 'onAngleChange_',
    value: function onAngleChange_(_ref3) {
      var _this2 = this;

      var oldValue = _ref3.oldValue;

      this.features_.forEach(function (feature) {
        return feature.getGeometry().rotate(_this2.getAngle() - oldValue, _this2.getAnchor());
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
      this.dispatchEvent(new __WEBPACK_IMPORTED_MODULE_2__rotate_feature_event__["a" /* default */](__WEBPACK_IMPORTED_MODULE_2__rotate_feature_event__["b" /* RotateFeatureEventType */].START, features, this.getAngle(), this.getAnchor()));
    }

    /**
     * @param {ol.Collection<ol.Feature>} features
     * @private
     */

  }, {
    key: 'dispatchRotatingEvent_',
    value: function dispatchRotatingEvent_(features) {
      this.dispatchEvent(new __WEBPACK_IMPORTED_MODULE_2__rotate_feature_event__["a" /* default */](__WEBPACK_IMPORTED_MODULE_2__rotate_feature_event__["b" /* RotateFeatureEventType */].ROTATING, features, this.getAngle(), this.getAnchor()));
    }

    /**
     * @param {ol.Collection<ol.Feature>} features
     * @private
     */

  }, {
    key: 'dispatchRotateEndEvent_',
    value: function dispatchRotateEndEvent_(features) {
      this.dispatchEvent(new __WEBPACK_IMPORTED_MODULE_2__rotate_feature_event__["a" /* default */](__WEBPACK_IMPORTED_MODULE_2__rotate_feature_event__["b" /* RotateFeatureEventType */].END, features, this.getAngle(), this.getAnchor()));
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
     * @param {ol.Map} map
     */

  }, {
    key: 'map',
    set: function set(map) {
      this.setMap(map);
    }

    /**
     * @type {ol.Map}
     */
    ,
    get: function get() {
      return this.getMap();
    }

    /**
     * @param {boolean} active
     */

  }, {
    key: 'active',
    set: function set(active) {
      this.setActive(active);
    }

    /**
     * @type {boolean}
     */
    ,
    get: function get() {
      return this.getActive();
    }
  }]);

  return RotateFeatureInteraction;
}(__WEBPACK_IMPORTED_MODULE_0_openlayers___default.a.interaction.Pointer);

/**
 * @param {ol.MapBrowserEvent} evt Map browser event.
 * @return {boolean} `false` to stop event propagation.
 * @this {RotateFeatureInteraction}
 * @private
 */


/* harmony default export */ __webpack_exports__["a"] = (RotateFeatureInteraction);
function handleEvent(evt) {
  // disable selection of inner features
  var foundFeature = evt.map.forEachFeatureAtPixel(evt.pixel, __WEBPACK_IMPORTED_MODULE_1__util__["c" /* identity */]);
  if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util__["d" /* includes */])(['click', 'singleclick', 'dblclick'], evt.type) && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util__["d" /* includes */])([this.anchorFeature_, this.arrowFeature_], foundFeature)) {
    return false;
  }

  return __WEBPACK_IMPORTED_MODULE_0_openlayers___default.a.interaction.Pointer.handleEvent.call(this, evt);
}

/**
 * @param {ol.MapBrowserEvent} evt Event.
 * @return {boolean}
 * @this {RotateFeatureInteraction}
 * @private
 */
function handleDownEvent(evt) {
  var foundFeature = evt.map.forEachFeatureAtPixel(evt.pixel, __WEBPACK_IMPORTED_MODULE_1__util__["c" /* identity */]);

  // handle click & drag on features for rotation
  if (foundFeature && !this.lastCoordinate_ && (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util__["d" /* includes */])(this.features_.getArray(), foundFeature) || foundFeature === this.arrowFeature_)) {
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
function handleDragEvent(_ref4) {
  var coordinate = _ref4.coordinate;

  var anchorCoordinate = this.anchorFeature_.getGeometry().getCoordinates();

  // handle drag of features by angle
  if (this.lastCoordinate_) {
    // calculate vectors of last and current pointer positions
    var lastVector = [this.lastCoordinate_[0] - anchorCoordinate[0], this.lastCoordinate_[1] - anchorCoordinate[1]];
    var newVector = [coordinate[0] - anchorCoordinate[0], coordinate[1] - anchorCoordinate[1]];

    // calculate angle between last and current vectors (positive angle counter-clockwise)
    var angle = Math.atan2(lastVector[0] * newVector[1] - newVector[0] * lastVector[1], lastVector[0] * newVector[0] + lastVector[1] * newVector[1]);

    this.setAngle(this.getAngle() + angle);
    this.dispatchRotatingEvent_(this.features_);

    this.lastCoordinate_ = coordinate;
  }
  // handle drag of the anchor
  else if (this.anchorMoving_) {
      this.setAnchor(coordinate);
    }
}

/**
 * @param {ol.MapBrowserEvent} evt Event.
 * @return {boolean}
 * @this {RotateFeatureInteraction}
 * @private
 */
function handleMoveEvent(_ref5) {
  var map = _ref5.map,
      pixel = _ref5.pixel;

  var elem = map.getTargetElement();
  var foundFeature = map.forEachFeatureAtPixel(pixel, __WEBPACK_IMPORTED_MODULE_1__util__["c" /* identity */]);

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
  } else if (foundFeature && (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util__["d" /* includes */])(this.features_.getArray(), foundFeature) || foundFeature === this.arrowFeature_)) {
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

  var styles = (_styles = {}, _defineProperty(_styles, ANCHOR_KEY, [new __WEBPACK_IMPORTED_MODULE_0_openlayers___default.a.style.Style({
    image: new __WEBPACK_IMPORTED_MODULE_0_openlayers___default.a.style.RegularShape({
      fill: new __WEBPACK_IMPORTED_MODULE_0_openlayers___default.a.style.Fill({
        color: [0, 153, 255, 0.8]
      }),
      stroke: new __WEBPACK_IMPORTED_MODULE_0_openlayers___default.a.style.Stroke({
        color: blue,
        width: 1
      }),
      radius: 4,
      points: 6
    }),
    zIndex: Infinity
  })]), _defineProperty(_styles, ARROW_KEY, [new __WEBPACK_IMPORTED_MODULE_0_openlayers___default.a.style.Style({
    fill: new __WEBPACK_IMPORTED_MODULE_0_openlayers___default.a.style.Fill({
      color: transparent
    }),
    stroke: new __WEBPACK_IMPORTED_MODULE_0_openlayers___default.a.style.Stroke({
      color: white,
      width: width + 2
    }),
    text: new __WEBPACK_IMPORTED_MODULE_0_openlayers___default.a.style.Text({
      font: '12px sans-serif',
      offsetX: 20,
      offsetY: -20,
      fill: new __WEBPACK_IMPORTED_MODULE_0_openlayers___default.a.style.Fill({
        color: 'blue'
      }),
      stroke: new __WEBPACK_IMPORTED_MODULE_0_openlayers___default.a.style.Stroke({
        color: white,
        width: width + 1
      })
    }),
    zIndex: Infinity
  }), new __WEBPACK_IMPORTED_MODULE_0_openlayers___default.a.style.Style({
    fill: new __WEBPACK_IMPORTED_MODULE_0_openlayers___default.a.style.Fill({
      color: transparent
    }),
    stroke: new __WEBPACK_IMPORTED_MODULE_0_openlayers___default.a.style.Stroke({
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
        var geom = new __WEBPACK_IMPORTED_MODULE_0_openlayers___default.a.geom.Polygon([[[coordinates[0], coordinates[1] - 6 * resolution], [coordinates[0] + 8 * resolution, coordinates[1] - 12 * resolution], [coordinates[0], coordinates[1] + 30 * resolution], [coordinates[0] - 8 * resolution, coordinates[1] - 12 * resolution], [coordinates[0], coordinates[1] - 6 * resolution]]]);

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
  features = features instanceof __WEBPACK_IMPORTED_MODULE_0_openlayers___default.a.Collection ? features.getArray() : features;
  if (!features.length) return;

  return new __WEBPACK_IMPORTED_MODULE_0_openlayers___default.a.geom.GeometryCollection(features.map(function (feature) {
    return feature.getGeometry();
  })).getExtent();
}

/**
 * @param {ol.Collection<ol.Feature> | Array<ol.Feature>} features
 * @return {ol.Coordinate | undefined}
 */
function getFeaturesCentroid(features) {
  features = features instanceof __WEBPACK_IMPORTED_MODULE_0_openlayers___default.a.Collection ? features.getArray() : features;
  if (!features.length) return;

  return __WEBPACK_IMPORTED_MODULE_0_openlayers___default.a.extent.getCenter(getFeaturesExtent(features));
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = assert;
/* harmony export (immutable) */ __webpack_exports__["c"] = identity;
/* unused harmony export coalesce */
/* unused harmony export uniqId */
/* harmony export (immutable) */ __webpack_exports__["d"] = includes;
/* harmony export (immutable) */ __webpack_exports__["a"] = isArray;
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
 * @param {*} arg
 * @returns {*}
 */
function identity(arg) {
  return arg;
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

var counters = {};
/**
 * @param {string} [prefix]
 * @return {number}
 */
function uniqId() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var ns = prefix || 'default';
  counters[ns] = counters[ns] == null ? 0 : counters[ns];

  return String(prefix) + ++counters[ns];
}

function includes(arr, value) {
  return arr.indexOf(value) !== -1;
}

function isArray(val) {
  return Object.prototype.toString.call(val) === '[object Array]';
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=bundle.js.map