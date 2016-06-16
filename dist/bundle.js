/*!
 * OpenLayers 3 rotate interaction.
 * Allows vector feature rotation.
 * 
 * @package ol3-rotate-feature
 * @author Vladimir Vershinin <ghettovoice@gmail.com>
 * @version 1.0.0
 * @licence MIT https://opensource.org/licenses/MIT
 *          Based on OpenLayers 3. Copyright 2005-2016 OpenLayers Contributors. All rights reserved. http://openlayers.org
 * @copyright (c) 2016, Vladimir Vershinin <ghettovoice@gmail.com>
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("ol"));
	else if(typeof define === 'function' && define.amd)
		define(["ol"], factory);
	else if(typeof exports === 'object')
		exports["RotateFeature"] = factory(require("ol"));
	else
		root["ol"] = root["ol"] || {}, root["ol"]["interaction"] = root["ol"]["interaction"] || {}, root["ol"]["interaction"]["RotateFeature"] = factory(root["ol"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
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

	var _intraction = __webpack_require__(6);

	var _intraction2 = _interopRequireDefault(_intraction);

	var _rotate = __webpack_require__(1);

	var _rotate2 = _interopRequireDefault(_rotate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * OpenLayers 3 rotate interaction.
	 * Allows vector feature rotation.
	 *
	 * @author Vladimir Vershinin <ghettovoice@gmail.com>
	 * @licence MIT https://opensource.org/licenses/MIT
	 *          Based on OpenLayers 3. Copyright 2005-2015 OpenLayers Contributors. All rights reserved. http://openlayers.org
	 * @copyright (c) 2016, Vladimir Vershinin
	 */


	_intraction2.default.rotateGeometry = _rotate2.default;
	exports.default = _intraction2.default;
	module.exports = exports["default"];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.rotate = rotate;
	exports.default = rotateGeometry;

	var _openlayers = __webpack_require__(3);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _geometry = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @param {Array.<number>} flatCoordinates Flat coordinates.
	 * @param {number} offset Offset.
	 * @param {number} end End.
	 * @param {number} stride Stride.
	 * @param {number} angle Angle.
	 * @param {Array.<number>} anchor Rotation anchor point.
	 * @param {Array.<number>=} opt_dest Destination.
	 * @return {Array.<number>} Transformed coordinates.
	 * @link https://github.com/openlayers/ol3/blob/v3.16.0/src/ol/geom/flat/transformflatgeom.js#L48
	 */
	/**
	 * Polyfill of OpenLayers 3 ol.geom.SimpleGeometry.prototype.rotate method.
	 * Use it for old versions.
	 */
	function rotate(flatCoordinates, offset, end, stride, angle, anchor, opt_dest) {
	    var dest = opt_dest ? opt_dest : [];
	    var cos = Math.cos(angle);
	    var sin = Math.sin(angle);
	    var anchorX = anchor[0];
	    var anchorY = anchor[1];
	    var i = 0;

	    for (var j = offset; j < end; j += stride) {
	        var deltaX = flatCoordinates[j] - anchorX;
	        var deltaY = flatCoordinates[j + 1] - anchorY;

	        dest[i++] = anchorX + deltaX * cos - deltaY * sin;
	        dest[i++] = anchorY + deltaX * sin + deltaY * cos;

	        for (var k = j + 2; k < j + stride; ++k) {
	            dest[i++] = flatCoordinates[k];
	        }
	    }

	    if (opt_dest && dest.length != i) {
	        dest.length = i;
	    }

	    return dest;
	}

	/**
	 * @param {ol.geom.GeometryCollection | ol.geom.SimpleGeometry} geometry
	 * @param {number} angle
	 * @param {ol.Coordinate} anchor
	 */
	function rotateGeometry(geometry, angle, anchor) {
	    if (geometry instanceof _openlayers2.default.geom.GeometryCollection) {
	        var geometries = geometry.getGeometries();

	        for (var i = 0, l = geometries.length; i < l; ++i) {
	            rotateGeometry(geometries[i], angle, anchor);
	        }
	    } else {
	        var flatCoordinates = [];
	        var offsetOrEnds = (0, _geometry.deflateGeometryCoordinates)(geometry, flatCoordinates);

	        if (flatCoordinates) {
	            rotate(flatCoordinates, 0, flatCoordinates.length, (0, _geometry.getStrideForLayout)(geometry.getLayout()), angle, anchor, flatCoordinates);
	            (0, _geometry.setGeometryCoordinatesFromFlatCoordinates)(geometry, flatCoordinates, offsetOrEnds);
	        }
	    }

	    geometry.changed();
	}

/***/ },
/* 2 */
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

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
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
	   */

	  function RotateFeatureEvent(type, features) {
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.GeometryType = exports.GeometryLayout = undefined;
	exports.deflateCoordinate = deflateCoordinate;
	exports.deflateCoordinates = deflateCoordinates;
	exports.deflateCoordinatess = deflateCoordinatess;
	exports.deflateCoordinatesss = deflateCoordinatesss;
	exports.inflateCoordinates = inflateCoordinates;
	exports.inflateCoordinatess = inflateCoordinatess;
	exports.inflateCoordinatesss = inflateCoordinatesss;
	exports.getStrideForLayout = getStrideForLayout;
	exports.deflateGeometryCoordinates = deflateGeometryCoordinates;
	exports.setGeometryCoordinatesFromFlatCoordinates = setGeometryCoordinatesFromFlatCoordinates;

	var _util = __webpack_require__(2);

	/**
	 * @enum {string}
	 */
	var GeometryLayout = exports.GeometryLayout = {
	    XY: 'XY',
	    XYZ: 'XYZ',
	    XYM: 'XYM',
	    XYZM: 'XYZM'
	};

	/**
	 * @enum {string}
	 */
	var GeometryType = exports.GeometryType = {
	    POINT: 'Point',
	    MULTI_POINT: 'MultiPoint',
	    LINE_STRING: 'LineString',
	    MULTI_LINE_STRING: 'MultiLineString',
	    POLYGON: 'Polygon',
	    MULTI_POLYGON: 'MultiPolygon',
	    GEOMETRY_COLLECTION: 'GeometryCollection'
	};

	/**
	 * @param {Array.<number>} flatCoordinates Flat coordinates.
	 * @param {number} offset Offset.
	 * @param {ol.Coordinate} coordinate Coordinate.
	 * @param {number} stride Stride.
	 * @return {number} offset Offset.
	 */
	function deflateCoordinate(flatCoordinates, offset, coordinate, stride) {
	    (0, _util.assert)(coordinate.length == stride);
	    var i, ii;
	    for (i = 0, ii = coordinate.length; i < ii; ++i) {
	        flatCoordinates[offset++] = coordinate[i];
	    }
	    return offset;
	}

	/**
	 * @param {Array.<number>} flatCoordinates Flat coordinates.
	 * @param {number} offset Offset.
	 * @param {Array.<ol.Coordinate>} coordinates Coordinates.
	 * @param {number} stride Stride.
	 * @return {number} offset Offset.
	 */
	function deflateCoordinates(flatCoordinates, offset, coordinates, stride) {
	    var i, ii;
	    for (i = 0, ii = coordinates.length; i < ii; ++i) {
	        var coordinate = coordinates[i];
	        (0, _util.assert)(coordinate.length == stride);
	        var j;
	        for (j = 0; j < stride; ++j) {
	            flatCoordinates[offset++] = coordinate[j];
	        }
	    }
	    return offset;
	}

	/**
	 * @param {Array.<number>} flatCoordinates Flat coordinates.
	 * @param {number} offset Offset.
	 * @param {Array.<Array.<ol.Coordinate>>} coordinatess Coordinatess.
	 * @param {number} stride Stride.
	 * @param {Array.<number>=} opt_ends Ends.
	 * @return {Array.<number>} Ends.
	 */
	function deflateCoordinatess(flatCoordinates, offset, coordinatess, stride, opt_ends) {
	    var ends = opt_ends !== undefined ? opt_ends : [];
	    var i = 0;
	    var j, jj;
	    for (j = 0, jj = coordinatess.length; j < jj; ++j) {
	        var end = deflateCoordinates(flatCoordinates, offset, coordinatess[j], stride);
	        ends[i++] = end;
	        offset = end;
	    }
	    ends.length = i;
	    return ends;
	}

	/**
	 * @param {Array.<number>} flatCoordinates Flat coordinates.
	 * @param {number} offset Offset.
	 * @param {Array.<Array.<Array.<ol.Coordinate>>>} coordinatesss Coordinatesss.
	 * @param {number} stride Stride.
	 * @param {Array.<Array.<number>>=} opt_endss Endss.
	 * @return {Array.<Array.<number>>} Endss.
	 */
	function deflateCoordinatesss(flatCoordinates, offset, coordinatesss, stride, opt_endss) {
	    var endss = opt_endss !== undefined ? opt_endss : [];
	    var i = 0;
	    var j, jj;
	    for (j = 0, jj = coordinatesss.length; j < jj; ++j) {
	        var ends = deflateCoordinatess(flatCoordinates, offset, coordinatesss[j], stride, endss[i]);
	        endss[i++] = ends;
	        offset = ends[ends.length - 1];
	    }
	    endss.length = i;
	    return endss;
	}

	/**
	 * @param {Array.<number>} flatCoordinates Flat coordinates.
	 * @param {number} offset Offset.
	 * @param {number} end End.
	 * @param {number} stride Stride.
	 * @param {Array.<ol.Coordinate>=} opt_coordinates Coordinates.
	 * @return {Array.<ol.Coordinate>} Coordinates.
	 */
	function inflateCoordinates(flatCoordinates, offset, end, stride, opt_coordinates) {
	    var coordinates = opt_coordinates != undefined ? opt_coordinates : [];
	    var i = 0;
	    var j;
	    for (j = offset; j < end; j += stride) {
	        coordinates[i++] = flatCoordinates.slice(j, j + stride);
	    }
	    coordinates.length = i;
	    return coordinates;
	}

	/**
	 * @param {Array.<number>} flatCoordinates Flat coordinates.
	 * @param {number} offset Offset.
	 * @param {Array.<number>} ends Ends.
	 * @param {number} stride Stride.
	 * @param {Array.<Array.<ol.Coordinate>>=} opt_coordinatess Coordinatess.
	 * @return {Array.<Array.<ol.Coordinate>>} Coordinatess.
	 */
	function inflateCoordinatess(flatCoordinates, offset, ends, stride, opt_coordinatess) {
	    var coordinatess = opt_coordinatess != undefined ? opt_coordinatess : [];
	    var i = 0;
	    var j, jj;
	    for (j = 0, jj = ends.length; j < jj; ++j) {
	        var end = ends[j];
	        coordinatess[i++] = inflateCoordinates(flatCoordinates, offset, end, stride, coordinatess[i]);
	        offset = end;
	    }
	    coordinatess.length = i;
	    return coordinatess;
	}

	/**
	 * @param {Array.<number>} flatCoordinates Flat coordinates.
	 * @param {number} offset Offset.
	 * @param {Array.<Array.<number>>} endss Endss.
	 * @param {number} stride Stride.
	 * @param {Array.<Array.<Array.<ol.Coordinate>>>=} opt_coordinatesss
	 *     Coordinatesss.
	 * @return {Array.<Array.<Array.<ol.Coordinate>>>} Coordinatesss.
	 */
	function inflateCoordinatesss(flatCoordinates, offset, endss, stride, opt_coordinatesss) {
	    var coordinatesss = opt_coordinatesss != undefined ? opt_coordinatesss : [];
	    var i = 0;
	    var j, jj;
	    for (j = 0, jj = endss.length; j < jj; ++j) {
	        var ends = endss[j];
	        coordinatesss[i++] = inflateCoordinatess(flatCoordinates, offset, ends, stride, coordinatesss[i]);
	        offset = ends[ends.length - 1];
	    }
	    coordinatesss.length = i;
	    return coordinatesss;
	}

	/**
	 * @param {ol.geom.GeometryLayout} layout Layout.
	 * @return {number} Stride.
	 */
	function getStrideForLayout(layout) {
	    if (layout == GeometryLayout.XY) {
	        return 2;
	    } else if (layout == GeometryLayout.XYZ) {
	        return 3;
	    } else if (layout == GeometryLayout.XYM) {
	        return 3;
	    } else if (layout == GeometryLayout.XYZM) {
	        return 4;
	    } else {
	        throw new Error('unsupported layout: ' + layout);
	    }
	}

	/**
	 * @param {ol.geom.SimpleGeometry} geometry
	 * @param {Array<number>} flatCoordinates Destination array.
	 * @returns {Array|number} Result of deflate is offset or array of stop indexes.
	 */
	function deflateGeometryCoordinates(geometry, flatCoordinates) {
	    var stride = getStrideForLayout(geometry.getLayout());
	    var coordinates = geometry.getCoordinates();
	    var result;

	    switch (true) {
	        case geometry.getType() === GeometryType.POINT:
	            result = deflateCoordinate(flatCoordinates, 0, coordinates, stride);
	            break;
	        case [GeometryType.MULTI_POINT, GeometryType.LINE_STRING].includes(geometry.getType()):
	            result = deflateCoordinates(flatCoordinates, 0, coordinates, stride);
	            break;
	        case [GeometryType.MULTI_LINE_STRING, GeometryType.POLYGON].includes(geometry.getType()):
	            result = deflateCoordinatess(flatCoordinates, 0, coordinates, stride);
	            flatCoordinates.length = result.length === 0 ? 0 : result[result.length - 1];
	            break;
	        case geometry.getType() === GeometryType.MULTI_POLYGON:
	            result = deflateCoordinatesss(flatCoordinates, 0, coordinates, stride);

	            if (result.length === 0) {
	                flatCoordinates.length = 0;
	            } else {
	                var lastEnds = result[result.length - 1];
	                flatCoordinates.length = lastEnds.length === 0 ? 0 : lastEnds[lastEnds.length - 1];
	            }
	            break;
	    }

	    return result;
	}

	/**
	 * @param {ol.geom.SimpleGeometry} geometry
	 * @param {Array<number>} flatCoordinates
	 * @param {Array | number} offsetOrEnds
	 */
	function setGeometryCoordinatesFromFlatCoordinates(geometry, flatCoordinates, offsetOrEnds) {
	    var coordinates = [];
	    var stride = getStrideForLayout(geometry.getLayout());

	    switch (true) {
	        case geometry.getType() === GeometryType.POINT:
	            geometry.setCoordinates(flatCoordinates.slice(flatCoordinates.length - offsetOrEnds));
	            break;
	        case [GeometryType.MULTI_POINT, GeometryType.LINE_STRING].includes(geometry.getType()):
	            inflateCoordinates(flatCoordinates, 0, offsetOrEnds, stride, coordinates);
	            geometry.setCoordinates(coordinates);
	            break;
	        case [GeometryType.MULTI_LINE_STRING, GeometryType.POLYGON].includes(geometry.getType()):
	            inflateCoordinatess(flatCoordinates, 0, offsetOrEnds, stride, coordinates);
	            geometry.setCoordinates(coordinates);
	            break;
	        case geometry.getType() === GeometryType.MULTI_POLYGON:
	            inflateCoordinatesss(flatCoordinates, 0, offsetOrEnds, stride, coordinates);
	            geometry.setCoordinates(coordinates);
	            break;
	    }

	    return coordinates;
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _openlayers = __webpack_require__(3);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	var _util = __webpack_require__(2);

	var _event = __webpack_require__(4);

	var _rotate = __webpack_require__(1);

	var _rotate2 = _interopRequireDefault(_rotate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @typedef {Object} InteractionOptions
	 * @property {ol.Collection<ol.Feature>} features The features the interaction works on. Required.
	 * @property {ol.style.Style | Array<ol.style.Style> | ol.style.StyleFunction | undefined} style  Style of the overlay.
	 * @property {string} angleProperty Property name where to save current rotation angle. Default is  'angle'.
	 * @property {string} anchorProperty Property name where to save current rotation anchor coordinates. Default is  'anchor'.
	 */
	var InteractionOptions;

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
	 * todo добавить опцию condition - для возможности переопределения клавиш
	 * todo возможно добавить ghost feature для отображения начального угла
	 */

	var RotateFeatureInteraction = function (_ol$interaction$Point) {
	    _inherits(RotateFeatureInteraction, _ol$interaction$Point);

	    /**
	     * @param {InteractionOptions} options
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
	         * @type {string}
	         * @private
	         */
	        _this.anchorProperty_ = options.anchorProperty || 'anchor';
	        /**
	         * @type {ol.FeatureOverlay}
	         * @private
	         */
	        _this.overlay_ = new _openlayers2.default.FeatureOverlay({
	            style: options.style || getDefaultStyle.call(_this, _this.angleProperty_)
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
	        /**
	         * @type {ol.Extent}
	         * @private
	         */
	        _this.featuresExtent_ = undefined;

	        _this.features_.on('add', _this.handleFeatureAdd_, _this);
	        _this.features_.on('remove', _this.handleFeatureRemove_, _this);
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


	        /**
	         * @param {ol.Map} map
	         */
	        value: function setMap(map) {
	            this.overlay_.setMap(map);
	            _get(Object.getPrototypeOf(RotateFeatureInteraction.prototype), "setMap", this).call(this, map);

	            if (map) {
	                this.updateInteractionFeatures_();
	            } else {
	                this.reset_();
	            }
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

	            this.featuresExtent_ = getFeaturesExtent(this.features_);

	            this.createOrUpdateAnchorFeature_();
	            this.createOrUpdateArrowFeature_();
	        }

	        /**
	         * @private
	         */

	    }, {
	        key: "reset_",
	        value: function reset_() {
	            var _this2 = this;

	            [this.anchorFeature_, this.arrowFeature_].forEach(function (feature) {
	                if (feature) {
	                    _this2.overlay_.removeFeature(feature);
	                }
	            });

	            this.anchorFeature_ = this.arrowFeature_ = this.lastCoordinate_ = this.featuresExtent_ = undefined;
	            this.anchorMoving_ = false;
	        }

	        /**
	         * @private
	         */

	    }, {
	        key: "createOrUpdateAnchorFeature_",
	        value: function createOrUpdateAnchorFeature_() {
	            var _this3 = this;

	            var firstFeature = this.features_.item(0);
	            var coordinate, angle;

	            if (firstFeature) {
	                angle = firstFeature.get(this.angleProperty_) || 0;
	                coordinate = firstFeature.get(this.anchorProperty_);
	            }

	            if (!coordinate || !coordinate.length) {
	                coordinate = _openlayers2.default.extent.getCenter(this.featuresExtent_);
	            }

	            if (this.anchorFeature_) {
	                this.anchorFeature_.getGeometry().setCoordinates(coordinate);
	            } else {
	                var _ref;

	                this.anchorFeature_ = new _openlayers2.default.Feature((_ref = {
	                    geometry: new _openlayers2.default.geom.Point(coordinate)
	                }, _defineProperty(_ref, ANCHOR_KEY, true), _defineProperty(_ref, this.angleProperty_, angle), _ref));
	                this.overlay_.addFeature(this.anchorFeature_);

	                this.features_.forEach(function (feature) {
	                    return feature.set(_this3.anchorProperty_, coordinate);
	                });
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
	            var firstFeature = this.features_.item(0);
	            var coordinate, angle;

	            if (firstFeature) {
	                angle = firstFeature.get(this.angleProperty_) || 0;
	                coordinate = firstFeature.get(this.anchorProperty_);
	            }

	            if (!coordinate || !coordinate.length) {
	                coordinate = _openlayers2.default.extent.getCenter(this.featuresExtent_);
	            }

	            if (this.arrowFeature_) {
	                this.arrowFeature_.getGeometry().setCoordinates(coordinate);
	            } else {
	                var _ref2;

	                this.arrowFeature_ = new _openlayers2.default.Feature((_ref2 = {
	                    geometry: new _openlayers2.default.geom.Point(coordinate)
	                }, _defineProperty(_ref2, ARROW_KEY, true), _defineProperty(_ref2, this.angleProperty_, angle), _ref2));
	                this.overlay_.addFeature(this.arrowFeature_);
	            }
	        }

	        /**
	         * @param {ol.Feature} element
	         * @this RotateFeatureInteraction
	         * @private
	         */

	    }, {
	        key: "handleFeatureAdd_",
	        value: function handleFeatureAdd_(_ref3) {
	            var element = _ref3.element;

	            (0, _util.assertInstanceOf)(element, _openlayers2.default.Feature);

	            this.updateInteractionFeatures_();
	        }

	        /**
	         * @param {ol.Feature} element
	         * @this RotateFeatureInteraction
	         * @private
	         */

	    }, {
	        key: "handleFeatureRemove_",
	        value: function handleFeatureRemove_(_ref4) {
	            var element = _ref4.element;

	            (0, _util.assertInstanceOf)(element, _openlayers2.default.Feature);

	            this.updateInteractionFeatures_();
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
	 * @param {ol.MapBrowserEvent} evt Map browser event.
	 * @return {boolean} `false` to stop event propagation.
	 * @this {RotateFeatureInteraction}
	 * @public
	 */


	exports.default = RotateFeatureInteraction;
	RotateFeatureInteraction.handleEvent = function (evt) {
	    // disable selection of inner features
	    var foundFeature = evt.map.forEachFeatureAtPixel(evt.pixel, function (feature) {
	        return feature;
	    });
	    if (['click', 'singleclick'].includes(evt.type) && foundFeature && [this.anchorFeature_, this.arrowFeature_].includes(foundFeature)) {
	        return false;
	    }

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
	    if (foundFeature && !this.lastCoordinate_ && (this.features_.getArray().includes(foundFeature) || foundFeature === this.arrowFeature_)) {
	        this.lastCoordinate_ = evt.coordinate;

	        handleMoveEvent.call(this, evt);
	        this.dispatchEvent(new _event.RotateFeatureEvent(_event.RotateFeatureEventType.START, this.features_));

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
	        this.dispatchEvent(new _event.RotateFeatureEvent(_event.RotateFeatureEventType.END, this.features_));

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
	    var _this4 = this;

	    var newCoordinate = evt.coordinate;
	    var anchorCoordinate = this.anchorFeature_.getGeometry().getCoordinates();

	    var updateAngleProperty = function updateAngleProperty(feature, angle) {
	        return feature.set(_this4.angleProperty_, (feature.get(_this4.angleProperty_) || 0) + angle);
	    };

	    // handle drag of features by angle
	    if (this.lastCoordinate_) {
	        (function () {
	            // calculate vectors of last and current pointer positions
	            var lastVector = [_this4.lastCoordinate_[0] - anchorCoordinate[0], _this4.lastCoordinate_[1] - anchorCoordinate[1]];
	            var newVector = [newCoordinate[0] - anchorCoordinate[0], newCoordinate[1] - anchorCoordinate[1]];

	            // calculate angle between last and current vectors (positive angle counter-clockwise)
	            var angle = Math.atan2(lastVector[0] * newVector[1] - newVector[0] * lastVector[1], lastVector[0] * newVector[0] + lastVector[1] * newVector[1]);

	            _this4.features_.forEach(function (feature) {
	                (0, _rotate2.default)(feature.getGeometry(), angle, anchorCoordinate);
	                updateAngleProperty(feature, angle);
	            });

	            [_this4.anchorFeature_, _this4.arrowFeature_].forEach(function (feature) {
	                return updateAngleProperty(feature, angle);
	            });

	            _this4.dispatchEvent(new _event.RotateFeatureEvent(_event.RotateFeatureEventType.ROTATING, _this4.features_));

	            _this4.lastCoordinate_ = evt.coordinate;
	        })();
	    }
	    // handle drag of the anchor
	    else if (this.anchorMoving_) {
	            var deltaX = newCoordinate[0] - anchorCoordinate[0];
	            var deltaY = newCoordinate[1] - anchorCoordinate[1];

	            this.anchorFeature_.getGeometry().translate(deltaX, deltaY);
	            this.arrowFeature_.getGeometry().translate(deltaX, deltaY);

	            this.features_.forEach(function (feature) {
	                return feature.set(_this4.anchorProperty_, newCoordinate);
	            });
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
	        var angle = feature.get(angleProperty) || 0;

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
	                (0, _rotate2.default)(geom, angle, coordinates);
	                style[0].setGeometry(geom);
	                style[1].setGeometry(geom);
	                style[0].getText().setText(Math.round(-angle * 180 / Math.PI) + '°');

	                return style;
	        }
	    };
	}

	/**
	 * @param {ol.Collection<ol.Feature> | Array<ol.Feature>} features
	 * @returns {ol.Extent}
	 * @private
	 */
	function getFeaturesExtent(features) {
	    return new _openlayers2.default.geom.GeometryCollection((Array.isArray(features) ? features : features.getArray()).map(function (feature) {
	        return feature.getGeometry();
	    })).getExtent();
	}
	module.exports = exports["default"];

/***/ }
/******/ ])
});
;