/*!
 * OpenLayers 3 rotate interaction.
 * Allows vector feature rotation.
 * 
 * @package ol3-rotate-feature
 * @author Vladimir Vershinin <ghettovoice@gmail.com>
 * @version 1.2.0
 * @licence MIT https://opensource.org/licenses/MIT
 *          Based on OpenLayers 3. Copyright 2005-2016 OpenLayers Contributors. All rights reserved. http://openlayers.org
 * @copyright (c) 2016, Vladimir Vershinin <ghettovoice@gmail.com>
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
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _rotatefeatureinteraction = __webpack_require__(2);

	var _rotatefeatureinteraction2 = _interopRequireDefault(_rotatefeatureinteraction);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _rotatefeatureinteraction2.default; /**
	                                                       * OpenLayers 3 rotate interaction.
	                                                       * Allows vector feature rotation.
	                                                       *
	                                                       * @author Vladimir Vershinin <ghettovoice@gmail.com>
	                                                       * @licence MIT https://opensource.org/licenses/MIT
	                                                       *          Based on OpenLayers 3. Copyright 2005-2015 OpenLayers Contributors. All rights reserved. http://openlayers.org
	                                                       * @copyright (c) 2016, Vladimir Vershinin
	                                                       */

	module.exports = exports["default"];

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @enum {string}
	 */
	var RotateFeatureEventType = exports.RotateFeatureEventType = {
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

	var RotateFeatureEvent = exports.RotateFeatureEvent = function () {
	  /**
	   * @param {RotateFeatureEventType} type Type.
	   * @param {ol.Collection<ol.Feature>} features Rotated features.
	   * @param {number} angle Angle in radians.
	   * @param {ol.Coordinate} anchor Anchor position.
	   */

	  function RotateFeatureEvent(type, features, angle, anchor) {
	    _classCallCheck(this, RotateFeatureEvent);

	    /**
	     * @type {boolean}
	     */
	    this.propagationStopped = undefined;

	    /**
	     * The event type.
	     * @type {RotateFeatureEventType}
	     */
	    this.type = type;

	    /**
	     * The features being rotated.
	     * @type {ol.Collection<ol.Feature>}
	     */
	    this.features = features;
	    /**
	     * Current angle in radians.
	     * @type {number}
	     */
	    this.angle = angle;
	    /**
	     * Current rotation anchor.
	     * @type {number[] | ol.Coordinate}
	     */
	    this.anchor = anchor;
	  }

	  /**
	   * Stop event propagation.
	   * @function
	   */


	  _createClass(RotateFeatureEvent, [{
	    key: 'preventDefault',
	    value: function preventDefault() {
	      this.propagationStopped = true;
	    }

	    /**
	     * Stop event propagation.
	     * @function
	     */

	  }, {
	    key: 'stopPropagation',
	    value: function stopPropagation() {
	      this.propagationStopped = true;
	    }
	  }]);

	  return RotateFeatureEvent;
	}();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _openlayers = __webpack_require__(4);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _util = __webpack_require__(3);

	var _rotatefeatureevent = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @typedef {Object} InteractionOptions
	 * @property {ol.Collection<ol.Feature>} features The features the interaction works on. Required.
	 * @property {ol.style.Style | Array<ol.style.Style> | ol.style.StyleFunction | undefined} style  Style of the overlay.
	 * @property {number | undefined} angle Initial angle in radians (positive is counter-clockwise),
	 *                                      applied for features already added to collection. Default is `0`.
	 * @property {number[] | ol.Coordinate | undefined} anchor Initial anchor coordinate. Default is center of features extent.
	 */
	var InteractionOptions;

	var ANCHOR_KEY = 'anchor';
	var ARROW_KEY = 'arrow';
	// const GHOST_KEY = 'ghost';

	var ANGLE_PROP = 'angle';
	var ANCHOR_PROP = 'anchor';

	/**
	 * todo добавить опцию condition - для возможности переопределения клавиш
	 *
	 * Rotate interaction class.
	 * Adds controls to rotate vector features.
	 * Writes out total angle in radians (positive is counter-clockwise) to property for each feature.
	 *
	 * @class
	 * @extends ol.interaction.Interaction
	 * @author Vladimir Vershinin
	 */

	var RotateFeatureInteraction = function (_ol$interaction$Point) {
	    _inherits(RotateFeatureInteraction, _ol$interaction$Point);

	    /**
	     * @param {InteractionOptions} options
	     */

	    function RotateFeatureInteraction() {
	        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	        _classCallCheck(this, RotateFeatureInteraction);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RotateFeatureInteraction).call(this, {
	            handleEvent: RotateFeatureInteraction.handleEvent,
	            handleDownEvent: handleDownEvent,
	            handleUpEvent: handleUpEvent,
	            handleDragEvent: handleDragEvent,
	            handleMoveEvent: handleMoveEvent
	        }));

	        if (options.angle != null) {
	            _this.setAngle(options.angle);
	        }

	        if (options.anchor != null) {
	            _this.setAnchor(options.anchor);
	        }

	        /**
	         * @type {ol.Collection.<ol.Feature>}
	         * @private
	         */
	        _this.features_ = options.features;

	        (0, _util.assertInstanceOf)(_this.features_, _openlayers2.default.Collection);

	        /**
	         * @type {ol.layer.Vector}
	         * @private
	         */
	        _this.overlay_ = new _openlayers2.default.layer.Vector({
	            style: options.style || getDefaultStyle(),
	            source: new _openlayers2.default.source.Vector({
	                features: new _openlayers2.default.Collection()
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
	        //        this.ghostFeature_ = undefined;
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
	        //noinspection JSUnresolvedFunction
	        _this.on('change:active', _this.onChangeActive_, _this);
	        //noinspection JSUnresolvedFunction
	        _this.on('change:' + ANGLE_PROP, _this.onAngleChange_, _this);
	        //noinspection JSUnresolvedFunction
	        _this.on('change:' + ANCHOR_PROP, _this.onAnchorChange_, _this);
	        return _this;
	    }

	    /**
	     * @param {ol.MapBrowserEvent} evt Map browser event.
	     * @return {boolean} `false` to stop event propagation.
	     * @this {RotateFeatureInteraction}
	     * @public
	     */


	    _createClass(RotateFeatureInteraction, [{
	        key: "setMap",


	        //noinspection JSUnusedGlobalSymbols
	        /**
	         * @param {ol.Map} map
	         */
	        value: function setMap(map) {
	            this.overlay_.setMap(map);
	            _get(Object.getPrototypeOf(RotateFeatureInteraction.prototype), "setMap", this).call(this, map);

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
	        key: "onChangeActive_",
	        value: function onChangeActive_() {
	            //noinspection JSUnresolvedFunction
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
	        key: "setAngle",
	        value: function setAngle(angle) {
	            (0, _util.assert)(!isNaN(parseFloat(angle)), 'Numeric value passed');

	            //noinspection JSUnresolvedFunction
	            this.set(ANGLE_PROP, parseFloat(angle));
	        }

	        /**
	         * Returns current angle of interaction features.
	         *
	         * @return {number}
	         */

	    }, {
	        key: "getAngle",
	        value: function getAngle() {
	            //noinspection JSUnresolvedFunction
	            return (0, _util.coalesce)(this.get(ANGLE_PROP), 0);
	        }

	        /**
	         * Set current anchor position.
	         *
	         * @param {number[] | ol.Coordinate | undefined} anchor
	         */

	    }, {
	        key: "setAnchor",
	        value: function setAnchor(anchor) {
	            (0, _util.assert)(anchor == null || Array.isArray(anchor) && anchor.length === 2, 'Array of two elements passed');
	            //noinspection JSUnresolvedFunction
	            this.set(ANCHOR_PROP, anchor != null ? anchor.map(parseFloat) : undefined);
	        }

	        /**
	         * Returns current anchor position.
	         *
	         * @return {number[] | ol.Coordinate | undefined}
	         */

	    }, {
	        key: "getAnchor",
	        value: function getAnchor() {
	            //noinspection JSUnresolvedFunction
	            return (0, _util.coalesce)(this.get(ANCHOR_PROP), getFeaturesCentroid(this.features_));
	        }

	        /**
	         * Creates or updates all interaction helper features.
	         * @private
	         */

	    }, {
	        key: "updateInteractionFeatures_",
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
	        key: "reset_",
	        value: function reset_() {
	            var _this2 = this;

	            var resetAngleAndAnchor = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

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
	        key: "resetAngleAndAnchor_",
	        value: function resetAngleAndAnchor_() {
	            this.resetAngle_();
	            this.resetAnchor_();
	        }

	        /**
	         * @private
	         */

	    }, {
	        key: "resetAngle_",
	        value: function resetAngle_() {
	            //noinspection JSUnresolvedFunction
	            this.set(ANGLE_PROP, 0, true);
	            this.arrowFeature_ && this.arrowFeature_.set(ANGLE_PROP, this.getAngle());
	            this.anchorFeature_ && this.anchorFeature_.set(ANGLE_PROP, this.getAngle());
	        }

	        /**
	         * @private
	         */

	    }, {
	        key: "resetAnchor_",
	        value: function resetAnchor_() {
	            //noinspection JSUnresolvedFunction
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
	        key: "createOrUpdateAnchorFeature_",
	        value: function createOrUpdateAnchorFeature_() {
	            var angle = this.getAngle();
	            var anchor = this.getAnchor();

	            if (this.anchorFeature_) {
	                this.anchorFeature_.getGeometry().setCoordinates(anchor);
	            } else {
	                var _ref;

	                this.anchorFeature_ = new _openlayers2.default.Feature((_ref = {
	                    geometry: new _openlayers2.default.geom.Point(anchor)
	                }, _defineProperty(_ref, ANCHOR_KEY, true), _defineProperty(_ref, ANGLE_PROP, angle), _ref));
	                this.overlay_.getSource().addFeature(this.anchorFeature_);
	            }
	        }

	        //    /**
	        //     * @private
	        //     */
	        //    createOrUpdateGhostFeature_() {
	        //        if (this.ghostFeature_) {
	        //            this.ghostFeature_.getGeometry().setGeometries(geometries);
	        //        } else {
	        //            this.ghostFeature_ = new ol.Feature({
	        //                geometry: new ol.geom.GeometryCollection(geometries),
	        //                [GHOST_KEY]: true
	        //            });
	        //            this.overlay_.addFeature(this.ghostFeature_);
	        //        }
	        //    }

	        /**
	         * @private
	         */

	    }, {
	        key: "createOrUpdateArrowFeature_",
	        value: function createOrUpdateArrowFeature_() {
	            var angle = this.getAngle();
	            var anchor = this.getAnchor();

	            if (this.arrowFeature_) {
	                this.arrowFeature_.getGeometry().setCoordinates(anchor);
	            } else {
	                var _ref2;

	                this.arrowFeature_ = new _openlayers2.default.Feature((_ref2 = {
	                    geometry: new _openlayers2.default.geom.Point(anchor)
	                }, _defineProperty(_ref2, ARROW_KEY, true), _defineProperty(_ref2, ANGLE_PROP, angle), _ref2));
	                this.overlay_.getSource().addFeature(this.arrowFeature_);
	            }
	        }

	        /**
	         * @param {ol.Feature} element
	         * @private
	         */

	    }, {
	        key: "onFeatureAdd_",
	        value: function onFeatureAdd_(_ref3) {
	            var element = _ref3.element;

	            //noinspection JSUnresolvedFunction
	            if (!this.getActive()) {
	                return;
	            }

	            (0, _util.assertInstanceOf)(element, _openlayers2.default.Feature);

	            this.resetAngleAndAnchor_();
	            this.updateInteractionFeatures_();
	        }

	        /**
	         * @param {ol.Feature} element
	         * @private
	         */

	    }, {
	        key: "onFeatureRemove_",
	        value: function onFeatureRemove_(_ref4) {
	            var element = _ref4.element;

	            //noinspection JSUnresolvedFunction
	            if (!this.getActive()) {
	                return;
	            }

	            (0, _util.assertInstanceOf)(element, _openlayers2.default.Feature);

	            this.resetAngleAndAnchor_();
	            this.updateInteractionFeatures_();
	        }

	        /**
	         * @private
	         */

	    }, {
	        key: "onAngleChange_",
	        value: function onAngleChange_(_ref5) {
	            var _this3 = this;

	            var oldValue = _ref5.oldValue;

	            this.features_.forEach(function (feature) {
	                return feature.getGeometry().rotate(_this3.getAngle() - oldValue, _this3.anchorFeature_.getGeometry().getCoordinates());
	            });
	            this.arrowFeature_ && this.arrowFeature_.set(ANGLE_PROP, this.getAngle());
	            this.anchorFeature_ && this.anchorFeature_.set(ANGLE_PROP, this.getAngle());
	        }

	        /**
	         * @private
	         */

	    }, {
	        key: "onAnchorChange_",
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
	        key: "dispatchRotateStartEvent_",
	        value: function dispatchRotateStartEvent_(features) {
	            //noinspection JSUnresolvedFunction
	            this.dispatchEvent(new _rotatefeatureevent.RotateFeatureEvent(_rotatefeatureevent.RotateFeatureEventType.START, features, this.getAngle(), this.getAnchor()));
	        }

	        /**
	         * @param {ol.Collection<ol.Feature>} features
	         * @private
	         */

	    }, {
	        key: "dispatchRotatingEvent_",
	        value: function dispatchRotatingEvent_(features) {
	            //noinspection JSUnresolvedFunction
	            this.dispatchEvent(new _rotatefeatureevent.RotateFeatureEvent(_rotatefeatureevent.RotateFeatureEventType.ROTATING, features, this.getAngle(), this.getAnchor()));
	        }

	        /**
	         * @param {ol.Collection<ol.Feature>} features
	         * @private
	         */

	    }, {
	        key: "dispatchRotateEndEvent_",
	        value: function dispatchRotateEndEvent_(features) {
	            //noinspection JSUnresolvedFunction
	            this.dispatchEvent(new _rotatefeatureevent.RotateFeatureEvent(_rotatefeatureevent.RotateFeatureEventType.END, features, this.getAngle(), this.getAnchor()));
	        }
	    }], [{
	        key: "handleEvent",
	        value: function handleEvent(evt) {
	            // disable selection of inner features
	            var foundFeature = evt.map.forEachFeatureAtPixel(evt.pixel, function (feature) {
	                return feature;
	            });
	            if (['click', 'singleclick'].includes(evt.type) && foundFeature && [this.anchorFeature_, this.arrowFeature_].includes(foundFeature)) {
	                return false;
	            }

	            return _openlayers2.default.interaction.Pointer.handleEvent.call(this, evt);
	        }
	    }]);

	    return RotateFeatureInteraction;
	}(_openlayers2.default.interaction.Pointer);

	/**
	 * @param {ol.MapBrowserEvent} evt Event.
	 * @return {boolean}
	 * @this {RotateFeatureInteraction}
	 * @private
	 */


	exports.default = RotateFeatureInteraction;
	function handleDownEvent(evt) {
	    var foundFeature = evt.map.forEachFeatureAtPixel(evt.pixel, function (feature) {
	        return feature;
	    });

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
	    var foundFeature = evt.map.forEachFeatureAtPixel(evt.pixel, function (feature) {
	        return feature;
	    });

	    var setCursor = function setCursor(cursor) {
	        var vendor = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

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
	 * @returns {ol.style.StyleFunction}
	 * @private
	 */
	function getDefaultStyle() {
	    var _styles;

	    var white = [255, 255, 255, 0.8];
	    var blue = [0, 153, 255, 0.8];
	    var transparent = [255, 255, 255, 0.01];
	    var width = 2;

	    var styles = (_styles = {}, _defineProperty(_styles, ANCHOR_KEY, [new _openlayers2.default.style.Style({
	        image: new _openlayers2.default.style.RegularShape({
	            fill: new _openlayers2.default.style.Fill({
	                color: [0, 153, 255, 0.8]
	            }),
	            stroke: new _openlayers2.default.style.Stroke({
	                color: blue,
	                width: 1
	            }),
	            radius: 4,
	            points: 6
	        }),
	        zIndex: Infinity
	    })]), _defineProperty(_styles, ARROW_KEY, [new _openlayers2.default.style.Style({
	        fill: new _openlayers2.default.style.Fill({
	            color: transparent
	        }),
	        stroke: new _openlayers2.default.style.Stroke({
	            color: white,
	            width: width + 2
	        }),
	        text: new _openlayers2.default.style.Text({
	            font: '12px sans-serif',
	            offsetX: 20,
	            offsetY: -20,
	            fill: new _openlayers2.default.style.Fill({
	                color: 'blue'
	            }),
	            stroke: new _openlayers2.default.style.Stroke({
	                color: white,
	                width: width + 1
	            })
	        }),
	        zIndex: Infinity
	    }), new _openlayers2.default.style.Style({
	        fill: new _openlayers2.default.style.Fill({
	            color: transparent
	        }),
	        stroke: new _openlayers2.default.style.Stroke({
	            color: blue,
	            width: width
	        }),
	        zIndex: Infinity
	    })]), _styles);

	    return function (feature, resolution) {
	        var style;
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
	                var geom = new _openlayers2.default.geom.Polygon([[[coordinates[0], coordinates[1] - 6 * resolution], [coordinates[0] + 8 * resolution, coordinates[1] - 12 * resolution], [coordinates[0], coordinates[1] + 30 * resolution], [coordinates[0] - 8 * resolution, coordinates[1] - 12 * resolution], [coordinates[0], coordinates[1] - 6 * resolution]]]);

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
	 * @param {ol.Collection<ol.Feature> | Array<ol.Feature>} features
	 * @returns {ol.Extent | undefined}
	 * @private
	 */
	function getFeaturesExtent(features) {
	    if (!features.getLength()) {
	        return undefined;
	    }

	    return new _openlayers2.default.geom.GeometryCollection((Array.isArray(features) ? features : features.getArray()).map(function (feature) {
	        return feature.getGeometry();
	    })).getExtent();
	}

	/**
	 * @param {ol.Collection<ol.Feature> | Array<ol.Feature>} features
	 * @return {ol.Coordinate | undefined}
	 */
	function getFeaturesCentroid(features) {
	    if (!features.getLength()) {
	        return undefined;
	    }

	    return _openlayers2.default.extent.getCenter(getFeaturesExtent(features));
	}
	module.exports = exports["default"];

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.assert = assert;
	exports.assertInstanceOf = assertInstanceOf;
	exports.noop = noop;
	exports.identity = identity;
	exports.getValueType = getValueType;
	exports.coalesce = coalesce;

	/**
	 * @param {boolean} condition
	 * @param {string} message
	 * @throws Error
	 */
	function assert(condition) {
	    var message = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

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
	function noop() {}

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
	 * @param {...*} values
	 * @return {*}
	 */
	function coalesce() {
	    for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
	        values[_key] = arguments[_key];
	    }

	    return values.find(function (value) {
	        return value != null;
	    });
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }
/******/ ])
});
;