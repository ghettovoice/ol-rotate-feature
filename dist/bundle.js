/*!
 * OpenLayers 3 rotate interaction.
 * Allows vector feature rotation.
 * 
 * @package ol3-rotate-interaction
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
		exports["olRotateInteraction"] = factory(require("ol"));
	else
		root["olRotateInteraction"] = factory(root["ol"]);
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

	var _rotate = __webpack_require__(1);

	var _rotate2 = _interopRequireDefault(_rotate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _rotate2.default; /**
	                                     * OpenLayers 3 rotate interaction.
	                                     * Allows vector feature rotation.
	                                     *
	                                     * @author Vladimir Vershinin <ghettovoice@gmail.com>
	                                     * @version 1.0.0
	                                     * @licence MIT https://opensource.org/licenses/MIT
	                                     *          Based on OpenLayers 3. Copyright 2005-2015 OpenLayers Contributors. All rights reserved. http://openlayers.org
	                                     * @copyright (c) 2015, Vladimir Vershinin
	                                     * @package ol3-rotate-interaction
	                                     */

	module.exports = _rotate2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _openlayers = __webpack_require__(2);

	var _openlayers2 = _interopRequireDefault(_openlayers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Rotate interaction class.
	 * Adds controls to rotate vector features.
	 * Options:
	 *      todo write options
	 * @class
	 * @extends ol.interaction.Interaction
	 * @package ol3-rotate-interaction/rotate
	 * @author Vladimir Vershinin <ghettovoice@gmail.com>
	 */

	var Rotate = function (_ol$interaction$Inter) {
	    _inherits(Rotate, _ol$interaction$Inter);

	    function Rotate() {
	        _classCallCheck(this, Rotate);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Rotate).call(this, {
	            handleDownEvent: Rotate.handleDownEvent_,
	            handleEvent: Rotate.handleEvent,
	            handleUpEvent: Rotate.handleUpEvent_
	        }));

	        console.log('created');
	        return _this;
	    }

	    return Rotate;
	}(_openlayers2.default.interaction.Interaction);

	exports.default = Rotate;


	Rotate.handleEvent = function () {};

	Rotate.handleDownEvent_ = function () {};

	Rotate.handleUpEvent_ = function () {};

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;