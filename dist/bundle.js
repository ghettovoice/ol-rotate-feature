/*!
 * OpenLayers 3 rotate interaction.
 * Allows vector feature rotation.
 * 
 * @package ol3-rotate-feature
 * @author Vladimir Vershinin <ghettovoice@gmail.com>
 * @version 1.0.0
 * @licence MIT https://opensource.org/licenses/MIT
 *          Based on OpenLayers 3. Copyright 2005-2015 OpenLayers Contributors. All rights reserved. http://openlayers.org
 * @copyright (c) 2016, Vladimir Vershinin <ghettovoice@gmail.com>
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("ol"));
	else if(typeof define === 'function' && define.amd)
		define(["ol"], factory);
	else if(typeof exports === 'object')
		exports["ol3RotateFeature"] = factory(require("ol"));
	else
		root["ol3RotateFeature"] = factory(root["ol"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
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
	exports.RotateFeatureEventType = exports.RotateFeatureEvent = exports.RotateFeatureInteraction = undefined;

	var _rotatefeatureintraction = __webpack_require__(3);

	var _rotatefeatureintraction2 = _interopRequireDefault(_rotatefeatureintraction);

	var _rotatefeatureevent = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * OpenLayers 3 rotate interaction.
	 * Allows vector feature rotation.
	 *
	 * @author Vladimir Vershinin <ghettovoice@gmail.com>
	 * @version 1.0.0
	 * @licence MIT https://opensource.org/licenses/MIT
	 *          Based on OpenLayers 3. Copyright 2005-2015 OpenLayers Contributors. All rights reserved. http://openlayers.org
	 * @copyright (c) 2015, Vladimir Vershinin
	 */
	exports.RotateFeatureInteraction = _rotatefeatureintraction2.default;
	exports.RotateFeatureEvent = _rotatefeatureevent.RotateFeatureEvent;
	exports.RotateFeatureEventType = _rotatefeatureevent.RotateFeatureEventType;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RotateFeatureEvent = exports.RotateFeatureEventType = undefined;

	var _openlayers = __webpack_require__(2);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @enum {string}
	 */
	var RotateFeatureEventType = exports.RotateFeatureEventType = {
	  /**
	   * Triggered upon feature draw start
	   * @event RotateFeatureEvent#rotatestart
	   */
	  START: 'rotatefeaturestart',
	  /**
	   * Triggered upon feature draw start
	   * @event RotateFeatureEvent#rotating
	   */
	  ROTATING: 'rotating',
	  /**
	   * Triggered upon feature draw start
	   * @event RotateFeatureEvent#rotateend
	   */
	  END: 'rotatefeatureend'
	};

	/**
	 * Events emitted by RotateFeatureInteraction instances are instances of this type.
	 *
	 * @class
	 * @extends {ol.events.Event}
	 * @author Vladimir Vershinin
	 */

	var RotateFeatureEvent = exports.RotateFeatureEvent = function (_ol$events$Event) {
	  _inherits(RotateFeatureEvent, _ol$events$Event);

	  /**
	   * @param {RotateFeatureEventType} type Type.
	   * @param {ol.Collection<ol.Feature>} features Rotated features.
	   */

	  function RotateFeatureEvent(type, features) {
	    _classCallCheck(this, RotateFeatureEvent);

	    /**
	     * The feature being drawn.
	     * @type {ol.Feature}
	     */

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RotateFeatureEvent).call(this, type));

	    _this.features = features;
	    return _this;
	  }

	  return RotateFeatureEvent;
	}(_openlayers2.default.events.Event);

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _openlayers = __webpack_require__(2);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _util = __webpack_require__(4);

	var _rotatefeatureevent = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @typedef {Object} RotateFeatureInteractionOptions
	 * @property {ol.Collection<ol.Feature>} features The features the interaction works on. Required.
	 * @property {ol.style.Style | Array<ol.style.Style> | ol.style.StyleFunction | undefined} style  Style of the overlay.
	 * @property {string} angleProperty Property name of the features where to save current angle. Used for exporting total angle value. Default is  'angle'.
	 */

	var ANCHOR_KEY = 'anchor';
	var ARROW_KEY = 'arrow';
	var GHOST_KEY = 'ghost';

	/**
	 * Rotate interaction class.
	 * Adds controls to rotate vector features.
	 * Writes out total angle in radians (positive is counter-clockwise) to property for each feature.
	 *
	 * @class
	 * @extends ol.interaction.Interaction
	 * @author Vladimir Vershinin
	 *
	 * todo возможно добавить ghost feature для отображения начального угла
	 */

	var RotateFeatureInteraction = function (_ol$interaction$Point) {
	    _inherits(RotateFeatureInteraction, _ol$interaction$Point);

	    /**
	     * @param {RotateFeatureInteractionOptions} options
	     */

	    function RotateFeatureInteraction() {
	        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	        _classCallCheck(this, RotateFeatureInteraction);

	        /**
	         * @type {ol.Collection.<ol.Feature>}
	         * @private
	         */

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RotateFeatureInteraction).call(this, {
	            handleEvent: RotateFeatureInteraction.handleEvent,
	            handleDownEvent: handleDownEvent,
	            handleUpEvent: handleUpEvent,
	            handleDragEvent: handleDragEvent,
	            handleMoveEvent: handleMoveEvent
	        }));

	        _this.features_ = options.features;

	        (0, _util.assertInstanceOf)(_this.features_, _openlayers2.default.Collection);

	        /**
	         * @type {string}
	         * @private
	         */
	        _this.angleProperty_ = options.angleProperty || 'angle';
	        /**
	         * @type {ol.layer.Vector}
	         * @private
	         */
	        _this.overlay_ = new _openlayers2.default.layer.Vector({
	            style: options.style || getDefaultStyle.call(_this, _this.angleProperty_),
	            source: new _openlayers2.default.source.Vector({
	                features: new _openlayers2.default.Collection()
	            })
	        });
	        /**
	         * @type {string}
	         * @private
	         */
	        _this.previousCursor_ = undefined;
	        /**
	         * Rotated feature.
	         *
	         * @type {ol.Feature}
	         * @private
	         */
	        _this.ghostFeature_ = undefined;
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

	        _this.features_.on('add', _this.handleFeatureAdd_, _this);
	        _this.features_.on('remove', _this.handleFeatureRemove_, _this);
	        return _this;
	    }

	    /**
	     * @param {ol.Map} map
	     */


	    _createClass(RotateFeatureInteraction, [{
	        key: "setMap",
	        value: function setMap(map) {
	            this.overlay_.setMap(map);
	            _get(Object.getPrototypeOf(RotateFeatureInteraction.prototype), "setMap", this).call(this, map);
	            this.createOrUpdateInteractionFeatures_();
	        }

	        /**
	         * Creates or updates all interaction helper features.
	         * @private
	         */

	    }, {
	        key: "createOrUpdateInteractionFeatures_",
	        value: function createOrUpdateInteractionFeatures_() {
	            var geometries = this.features_.getArray().map(function (feature) {
	                return feature.getGeometry();
	            });
	            var extent = new _openlayers2.default.geom.GeometryCollection(geometries).getExtent();
	            var anchorCoordinate = _openlayers2.default.extent.getCenter(extent);

	            //        this.createOrUpdateGhostFeature_(geometries);
	            this.createOrUpdateAnchorFeature_(anchorCoordinate);
	            this.createOrUpdateArrowFeature_(anchorCoordinate);
	        }

	        /**
	         * @param {ol.Coordinate} coordinate
	         * @private
	         */

	    }, {
	        key: "createOrUpdateAnchorFeature_",
	        value: function createOrUpdateAnchorFeature_(coordinate) {
	            if (this.anchorFeature_) {
	                this.anchorFeature_.getGeometry().setCoordinates(coordinate);
	            } else {
	                this.anchorFeature_ = new _openlayers2.default.Feature(_defineProperty({
	                    geometry: new _openlayers2.default.geom.Point(coordinate)
	                }, ANCHOR_KEY, true));
	                this.overlay_.getSource().addFeature(this.anchorFeature_);
	            }
	        }

	        /**
	         * @param {ol.geom.SimpleGeometry[]} geometries
	         * @private
	         */

	    }, {
	        key: "createOrUpdateGhostFeature_",
	        value: function createOrUpdateGhostFeature_(geometries) {
	            if (this.ghostFeature_) {
	                this.ghostFeature_.getGeometry().setGeometries(geometries);
	            } else {
	                this.ghostFeature_ = new _openlayers2.default.Feature(_defineProperty({
	                    geometry: new _openlayers2.default.geom.GeometryCollection(geometries)
	                }, GHOST_KEY, true));
	                this.overlay_.getSource().addFeature(this.ghostFeature_);
	            }
	        }

	        /**
	         * @param {ol.Coordinate} coordinate
	         * @private
	         */

	    }, {
	        key: "createOrUpdateArrowFeature_",
	        value: function createOrUpdateArrowFeature_(coordinate) {
	            if (this.arrowFeature_) {
	                this.arrowFeature_.getGeometry().setCoordinates(coordinate);
	            } else {
	                this.arrowFeature_ = new _openlayers2.default.Feature(_defineProperty({
	                    geometry: new _openlayers2.default.geom.Point(coordinate)
	                }, ARROW_KEY, true));
	                this.overlay_.getSource().addFeature(this.arrowFeature_);
	            }
	        }

	        /**
	         * @param {ol.Feature} element
	         * @this RotateFeatureInteraction
	         * @private
	         */

	    }, {
	        key: "handleFeatureAdd_",
	        value: function handleFeatureAdd_(_ref4) {
	            var element = _ref4.element;

	            (0, _util.assertInstanceOf)(element, _openlayers2.default.Feature);

	            this.createOrUpdateInteractionFeatures_();
	        }

	        /**
	         * @param {ol.Feature} element
	         * @this RotateFeatureInteraction
	         * @private
	         */

	    }, {
	        key: "handleFeatureRemove_",
	        value: function handleFeatureRemove_(_ref5) {
	            var element = _ref5.element;

	            (0, _util.assertInstanceOf)(element, _openlayers2.default.Feature);

	            this.createOrUpdateInteractionFeatures_();
	        }
	    }]);

	    return RotateFeatureInteraction;
	}(_openlayers2.default.interaction.Pointer);

	/**
	 * @param {ol.MapBrowserEvent} evt Map browser event.
	 * @return {boolean} `false` to stop event propagation.
	 * @this {RotateFeatureInteraction}
	 * @public
	 */


	exports.default = RotateFeatureInteraction;
	RotateFeatureInteraction.handleEvent = function (evt) {
	    return _openlayers2.default.interaction.Pointer.handleEvent.call(this, evt);
	};

	/**
	 * @param {ol.MapBrowserEvent} evt Event.
	 * @return {boolean}
	 * @this {RotateFeatureInteraction}
	 * @private
	 */
	function handleDownEvent(evt) {
	    var foundFeature = evt.map.forEachFeatureAtPixel(evt.pixel, function (feature) {
	        return feature;
	    });

	    // handle click & drag on features for rotation
	    if (foundFeature && !this.lastCoordinate_ && this.features_.getArray().includes(foundFeature) || foundFeature === this.arrowFeature_) {
	        this.lastCoordinate_ = evt.coordinate;

	        handleMoveEvent.call(this, evt);
	        this.dispatchEvent(new _rotatefeatureevent.RotateFeatureEvent(_rotatefeatureevent.RotateFeatureEventType.START, this.features_));

	        return true;
	    }
	    // handle click & drag on rotation anchor feature
	    else if (foundFeature === this.anchorFeature_) {
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
	        this.dispatchEvent(new _rotatefeatureevent.RotateFeatureEvent(_rotatefeatureevent.RotateFeatureEventType.END, this.features_));

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
	    var _this2 = this;

	    var newCoordinate = evt.coordinate;
	    var anchorCoordinate = this.anchorFeature_.getGeometry().getCoordinates();

	    var updateAngleProperty = function updateAngleProperty(feature, angle) {
	        return feature.set(_this2.angleProperty_, (feature.get(_this2.angleProperty_) || 0) + angle);
	    };

	    // handle drag of features by angle
	    if (this.lastCoordinate_) {
	        (function () {
	            // calculate vectors of last and current pointer positions
	            var lastVector = [_this2.lastCoordinate_[0] - anchorCoordinate[0], _this2.lastCoordinate_[1] - anchorCoordinate[1]];
	            var newVector = [newCoordinate[0] - anchorCoordinate[0], newCoordinate[1] - anchorCoordinate[1]];

	            // calculate angle between last and current vectors (positive angle counter-clockwise)
	            var angle = Math.atan2(lastVector[0] * newVector[1] - newVector[0] * lastVector[1], lastVector[0] * newVector[0] + lastVector[1] * newVector[1]);

	            _this2.features_.forEach(function (feature) {
	                feature.getGeometry().rotate(angle, anchorCoordinate);
	                updateAngleProperty(feature, angle);
	            });

	            [_this2.anchorFeature_, _this2.arrowFeature_].forEach(function (feature) {
	                return updateAngleProperty(feature, angle);
	            });

	            _this2.dispatchEvent(new _rotatefeatureevent.RotateFeatureEvent(_rotatefeatureevent.RotateFeatureEventType.ROTATING, _this2.features_));

	            _this2.lastCoordinate_ = evt.coordinate;
	        })();
	    }
	    // handle drag of the anchor
	    else if (this.anchorMoving_) {
	            var deltaX = newCoordinate[0] - anchorCoordinate[0];
	            var deltaY = newCoordinate[1] - anchorCoordinate[1];

	            this.anchorFeature_.getGeometry().translate(deltaX, deltaY);
	            this.arrowFeature_.getGeometry().translate(deltaX, deltaY);
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
	    var foundFeature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
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
	    } else if (this.features_.getArray().includes(foundFeature) || foundFeature === this.arrowFeature_) {
	        this.previousCursor_ = elem.style.cursor;
	        setCursor('grab', true);
	    } else if (foundFeature === this.anchorFeature_ || this.anchorMoving_) {
	        this.previousCursor_ = elem.style.cursor;
	        setCursor('crosshair');
	    } else {
	        setCursor(this.previousCursor_ || '');
	        this.previousCursor_ = undefined;
	    }
	}

	/**
	 * @param {string} angleProperty
	 * @returns {ol.style.StyleFunction}
	 * @this {RotateFeatureInteraction}
	 * @private
	 */
	function getDefaultStyle(angleProperty) {
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
	        zIndex: 10
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
	        })
	    }), new _openlayers2.default.style.Style({
	        fill: new _openlayers2.default.style.Fill({
	            color: transparent
	        }),
	        stroke: new _openlayers2.default.style.Stroke({
	            color: blue,
	            width: width
	        })
	    })]), _styles);

	    return function (feature, resolution) {
	        var style;
	        var angle = feature.get(angleProperty) || 0;

	        switch (true) {
	            case feature.get(ANCHOR_KEY):
	                style = styles[ANCHOR_KEY];
	                style[0].getImage().setRotation(-angle);

	                return style;
	            case feature.get(ARROW_KEY):
	                style = styles[ARROW_KEY];

	                var coordinate = feature.getGeometry().getCoordinates();
	                // generate arrow polygon
	                var geom = new _openlayers2.default.geom.Polygon([[[coordinate[0], coordinate[1] - 6 * resolution], [coordinate[0] + 8 * resolution, coordinate[1] - 12 * resolution], [coordinate[0], coordinate[1] + 30 * resolution], [coordinate[0] - 8 * resolution, coordinate[1] - 12 * resolution], [coordinate[0], coordinate[1] - 6 * resolution]]]);
	                // and rotate it according to current angle
	                geom.rotate(angle, coordinate);
	                style[0].setGeometry(geom);
	                style[1].setGeometry(geom);
	                style[0].getText().setText(Math.round(-angle * 180 / Math.PI) + '°');

	                return style;
	        }
	    };
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.assert = assert;
	exports.assertInstanceOf = assertInstanceOf;
	exports.noop = noop;
	exports.getValueType = getValueType;

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

/***/ }
/******/ ])
});
;