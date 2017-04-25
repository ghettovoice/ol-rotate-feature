/*!
 * Rotate vector features interaction for OpenLayers
 * 
 * @package ol-rotate-feature
 * @author Vladimir Vershinin <ghettovoice@gmail.com>
 * @version 1.2.4
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
})(this, function(__WEBPACK_EXTERNAL_MODULE_95__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 47);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(71)
  , defined = __webpack_require__(16);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(10)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(9)
  , IE8_DOM_DEFINE = __webpack_require__(37)
  , toPrimitive    = __webpack_require__(27)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(3) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(1)
  , core      = __webpack_require__(0)
  , ctx       = __webpack_require__(35)
  , hide      = __webpack_require__(7)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(5)
  , createDesc = __webpack_require__(13);
module.exports = __webpack_require__(3) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(25)('wks')
  , uid        = __webpack_require__(14)
  , Symbol     = __webpack_require__(1).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(11);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(42)
  , enumBugKeys = __webpack_require__(17);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(54);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(53);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(9)
  , dPs         = __webpack_require__(77)
  , enumBugKeys = __webpack_require__(17)
  , IE_PROTO    = __webpack_require__(24)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(36)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(70).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(22)
  , createDesc     = __webpack_require__(13)
  , toIObject      = __webpack_require__(2)
  , toPrimitive    = __webpack_require__(27)
  , has            = __webpack_require__(4)
  , IE8_DOM_DEFINE = __webpack_require__(37)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(3) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(5).f
  , has = __webpack_require__(4)
  , TAG = __webpack_require__(8)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(25)('keys')
  , uid    = __webpack_require__(14);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(11);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(1)
  , core           = __webpack_require__(0)
  , LIBRARY        = __webpack_require__(19)
  , wksExt         = __webpack_require__(29)
  , defineProperty = __webpack_require__(5).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(8);

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(60), __esModule: true };

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(62), __esModule: true };

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(30);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 34 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(66);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(11)
  , document = __webpack_require__(1).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(3) && !__webpack_require__(10)(function(){
  return Object.defineProperty(__webpack_require__(36)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(19)
  , $export        = __webpack_require__(6)
  , redefine       = __webpack_require__(44)
  , hide           = __webpack_require__(7)
  , has            = __webpack_require__(4)
  , Iterators      = __webpack_require__(18)
  , $iterCreate    = __webpack_require__(73)
  , setToStringTag = __webpack_require__(23)
  , getPrototypeOf = __webpack_require__(41)
  , ITERATOR       = __webpack_require__(8)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(42)
  , hiddenKeys = __webpack_require__(17).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 40 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(4)
  , toObject    = __webpack_require__(45)
  , IE_PROTO    = __webpack_require__(24)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(4)
  , toIObject    = __webpack_require__(2)
  , arrayIndexOf = __webpack_require__(68)(false)
  , IE_PROTO     = __webpack_require__(24)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(6)
  , core    = __webpack_require__(0)
  , fails   = __webpack_require__(10);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(16);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_get__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_inherits__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_openlayers__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_openlayers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_openlayers__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__util__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__rotate_feature_event__ = __webpack_require__(48);









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
  __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_inherits___default()(RotateFeatureInteraction, _ol$interaction$Poin);

  /**
   * @param {InteractionOptions} options
   */
  function RotateFeatureInteraction() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(this, RotateFeatureInteraction);

    /**
     * @type {string}
     * @private
     */
    var _this = __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default()(this, (RotateFeatureInteraction.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(RotateFeatureInteraction)).call(this, {
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
    _this.overlay_ = new __WEBPACK_IMPORTED_MODULE_8_openlayers___default.a.layer.Vector({
      style: options.style || getDefaultStyle(),
      source: new __WEBPACK_IMPORTED_MODULE_8_openlayers___default.a.source.Vector({
        features: new __WEBPACK_IMPORTED_MODULE_8_openlayers___default.a.Collection()
      })
    });
    /**
     * @type {ol.Collection<ol.Feature>}
     * @private
     */
    _this.features_ = undefined;
    if (options.features) {
      if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__util__["a" /* isArray */])(options.features)) {
        _this.features_ = new __WEBPACK_IMPORTED_MODULE_8_openlayers___default.a.Collection(options.features);
      } else if (options.features instanceof __WEBPACK_IMPORTED_MODULE_8_openlayers___default.a.Collection) {
        _this.features_ = options.features;
      } else {
        throw new Error('Features option should be an array or collection of features, ' + 'got ' + __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(options.features));
      }
    } else {
      _this.features_ = new __WEBPACK_IMPORTED_MODULE_8_openlayers___default.a.Collection();
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


  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(RotateFeatureInteraction, [{
    key: 'setMap',


    /**
     * @param {ol.Map} map
     */
    value: function setMap(map) {
      this.overlay_.setMap(map);
      __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_get___default()(RotateFeatureInteraction.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(RotateFeatureInteraction.prototype), 'setMap', this).call(this, map);
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

      __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_get___default()(RotateFeatureInteraction.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(RotateFeatureInteraction.prototype), 'setActive', this).call(this, active);
    }

    /**
     * Set current angle of interaction features.
     *
     * @param {number} angle
     */

  }, {
    key: 'setAngle',
    value: function setAngle(angle) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__util__["b" /* assert */])(!isNaN(parseFloat(angle)), 'Numeric value passed');

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
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__util__["b" /* assert */])(anchor == null || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__util__["a" /* isArray */])(anchor) && anchor.length === 2, 'Array of two elements passed');

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

        this.anchorFeature_ = new __WEBPACK_IMPORTED_MODULE_8_openlayers___default.a.Feature((_ref = {
          geometry: new __WEBPACK_IMPORTED_MODULE_8_openlayers___default.a.geom.Point(anchor)
        }, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_ref, ANGLE_PROP, angle), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_ref, ANCHOR_KEY, true), _ref));
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

        this.arrowFeature_ = new __WEBPACK_IMPORTED_MODULE_8_openlayers___default.a.Feature((_ref2 = {
          geometry: new __WEBPACK_IMPORTED_MODULE_8_openlayers___default.a.geom.Point(anchor)
        }, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_ref2, ANGLE_PROP, angle), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_ref2, ARROW_KEY, true), _ref2));
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
      this.dispatchEvent(new __WEBPACK_IMPORTED_MODULE_10__rotate_feature_event__["a" /* default */](__WEBPACK_IMPORTED_MODULE_10__rotate_feature_event__["b" /* RotateFeatureEventType */].START, features, this.getAngle(), this.getAnchor()));
    }

    /**
     * @param {ol.Collection<ol.Feature>} features
     * @private
     */

  }, {
    key: 'dispatchRotatingEvent_',
    value: function dispatchRotatingEvent_(features) {
      this.dispatchEvent(new __WEBPACK_IMPORTED_MODULE_10__rotate_feature_event__["a" /* default */](__WEBPACK_IMPORTED_MODULE_10__rotate_feature_event__["b" /* RotateFeatureEventType */].ROTATING, features, this.getAngle(), this.getAnchor()));
    }

    /**
     * @param {ol.Collection<ol.Feature>} features
     * @private
     */

  }, {
    key: 'dispatchRotateEndEvent_',
    value: function dispatchRotateEndEvent_(features) {
      this.dispatchEvent(new __WEBPACK_IMPORTED_MODULE_10__rotate_feature_event__["a" /* default */](__WEBPACK_IMPORTED_MODULE_10__rotate_feature_event__["b" /* RotateFeatureEventType */].END, features, this.getAngle(), this.getAnchor()));
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
}(__WEBPACK_IMPORTED_MODULE_8_openlayers___default.a.interaction.Pointer);

/**
 * @param {ol.MapBrowserEvent} evt Map browser event.
 * @return {boolean} `false` to stop event propagation.
 * @this {RotateFeatureInteraction}
 * @private
 */


/* harmony default export */ __webpack_exports__["a"] = (RotateFeatureInteraction);
function handleEvent(evt) {
  // disable selection of inner features
  var foundFeature = evt.map.forEachFeatureAtPixel(evt.pixel, __WEBPACK_IMPORTED_MODULE_9__util__["c" /* identity */]);
  if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__util__["d" /* includes */])(['click', 'singleclick', 'dblclick'], evt.type) && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__util__["d" /* includes */])([this.anchorFeature_, this.arrowFeature_], foundFeature)) {
    return false;
  }

  return __WEBPACK_IMPORTED_MODULE_8_openlayers___default.a.interaction.Pointer.handleEvent.call(this, evt);
}

/**
 * @param {ol.MapBrowserEvent} evt Event.
 * @return {boolean}
 * @this {RotateFeatureInteraction}
 * @private
 */
function handleDownEvent(evt) {
  var foundFeature = evt.map.forEachFeatureAtPixel(evt.pixel, __WEBPACK_IMPORTED_MODULE_9__util__["c" /* identity */]);

  // handle click & drag on features for rotation
  if (foundFeature && !this.lastCoordinate_ && (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__util__["d" /* includes */])(this.features_.getArray(), foundFeature) || foundFeature === this.arrowFeature_)) {
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
  var foundFeature = map.forEachFeatureAtPixel(pixel, __WEBPACK_IMPORTED_MODULE_9__util__["c" /* identity */]);

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
  } else if (foundFeature && (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__util__["d" /* includes */])(this.features_.getArray(), foundFeature) || foundFeature === this.arrowFeature_)) {
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

  var styles = (_styles = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_styles, ANCHOR_KEY, [new __WEBPACK_IMPORTED_MODULE_8_openlayers___default.a.style.Style({
    image: new __WEBPACK_IMPORTED_MODULE_8_openlayers___default.a.style.RegularShape({
      fill: new __WEBPACK_IMPORTED_MODULE_8_openlayers___default.a.style.Fill({
        color: [0, 153, 255, 0.8]
      }),
      stroke: new __WEBPACK_IMPORTED_MODULE_8_openlayers___default.a.style.Stroke({
        color: blue,
        width: 1
      }),
      radius: 4,
      points: 6
    }),
    zIndex: Infinity
  })]), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_styles, ARROW_KEY, [new __WEBPACK_IMPORTED_MODULE_8_openlayers___default.a.style.Style({
    fill: new __WEBPACK_IMPORTED_MODULE_8_openlayers___default.a.style.Fill({
      color: transparent
    }),
    stroke: new __WEBPACK_IMPORTED_MODULE_8_openlayers___default.a.style.Stroke({
      color: white,
      width: width + 2
    }),
    text: new __WEBPACK_IMPORTED_MODULE_8_openlayers___default.a.style.Text({
      font: '12px sans-serif',
      offsetX: 20,
      offsetY: -20,
      fill: new __WEBPACK_IMPORTED_MODULE_8_openlayers___default.a.style.Fill({
        color: 'blue'
      }),
      stroke: new __WEBPACK_IMPORTED_MODULE_8_openlayers___default.a.style.Stroke({
        color: white,
        width: width + 1
      })
    }),
    zIndex: Infinity
  }), new __WEBPACK_IMPORTED_MODULE_8_openlayers___default.a.style.Style({
    fill: new __WEBPACK_IMPORTED_MODULE_8_openlayers___default.a.style.Fill({
      color: transparent
    }),
    stroke: new __WEBPACK_IMPORTED_MODULE_8_openlayers___default.a.style.Stroke({
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
        var geom = new __WEBPACK_IMPORTED_MODULE_8_openlayers___default.a.geom.Polygon([[[coordinates[0], coordinates[1] - 6 * resolution], [coordinates[0] + 8 * resolution, coordinates[1] - 12 * resolution], [coordinates[0], coordinates[1] + 30 * resolution], [coordinates[0] - 8 * resolution, coordinates[1] - 12 * resolution], [coordinates[0], coordinates[1] - 6 * resolution]]]);

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
  features = features instanceof __WEBPACK_IMPORTED_MODULE_8_openlayers___default.a.Collection ? features.getArray() : features;
  if (!features.length) return;

  return new __WEBPACK_IMPORTED_MODULE_8_openlayers___default.a.geom.GeometryCollection(features.map(function (feature) {
    return feature.getGeometry();
  })).getExtent();
}

/**
 * @param {ol.Collection<ol.Feature> | Array<ol.Feature>} features
 * @return {ol.Coordinate | undefined}
 */
function getFeaturesCentroid(features) {
  features = features instanceof __WEBPACK_IMPORTED_MODULE_8_openlayers___default.a.Collection ? features.getArray() : features;
  if (!features.length) return;

  return __WEBPACK_IMPORTED_MODULE_8_openlayers___default.a.extent.getCenter(getFeaturesExtent(features));
}

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rotate_feature_interaction__ = __webpack_require__(46);
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
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return RotateFeatureEventType; });


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
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, RotateFeatureEvent);

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


  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(RotateFeatureEvent, [{
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
/* 49 */
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
function uniqId(prefix) {
  prefix || (prefix = 'default');
  counters[prefix] = counters[prefix] == null ? 0 : counters[prefix];

  return String(prefix) + ++counters[prefix];
}

function includes(arr, value) {
  return arr.indexOf(value) !== -1;
}

function isArray(val) {
  return Object.prototype.toString.call(val) === '[object Array]';
}

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(59), __esModule: true };

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(61), __esModule: true };

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(63), __esModule: true };

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(64), __esModule: true };

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(65), __esModule: true };

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(30);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _getPrototypeOf = __webpack_require__(31);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = __webpack_require__(51);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(52);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(50);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(15);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(15);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(84);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(85);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(86);
var $Object = __webpack_require__(0).Object;
module.exports = function getOwnPropertyDescriptor(it, key){
  return $Object.getOwnPropertyDescriptor(it, key);
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(87);
module.exports = __webpack_require__(0).Object.getPrototypeOf;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(88);
module.exports = __webpack_require__(0).Object.setPrototypeOf;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(91);
__webpack_require__(89);
__webpack_require__(92);
__webpack_require__(93);
module.exports = __webpack_require__(0).Symbol;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(90);
__webpack_require__(94);
module.exports = __webpack_require__(29).f('iterator');

/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(2)
  , toLength  = __webpack_require__(82)
  , toIndex   = __webpack_require__(81);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(12)
  , gOPS    = __webpack_require__(40)
  , pIE     = __webpack_require__(22);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1).document && document.documentElement;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(34);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(34);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(20)
  , descriptor     = __webpack_require__(13)
  , setToStringTag = __webpack_require__(23)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(7)(IteratorPrototype, __webpack_require__(8)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(12)
  , toIObject = __webpack_require__(2);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(14)('meta')
  , isObject = __webpack_require__(11)
  , has      = __webpack_require__(4)
  , setDesc  = __webpack_require__(5).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(10)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(5)
  , anObject = __webpack_require__(9)
  , getKeys  = __webpack_require__(12);

module.exports = __webpack_require__(3) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(2)
  , gOPN      = __webpack_require__(39).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(11)
  , anObject = __webpack_require__(9);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(35)(Function.call, __webpack_require__(21).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(26)
  , defined   = __webpack_require__(16);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(26)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(26)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(67)
  , step             = __webpack_require__(74)
  , Iterators        = __webpack_require__(18)
  , toIObject        = __webpack_require__(2);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(38)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(6)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(20)});

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(6);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(3), 'Object', {defineProperty: __webpack_require__(5).f});

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = __webpack_require__(2)
  , $getOwnPropertyDescriptor = __webpack_require__(21).f;

__webpack_require__(43)('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = __webpack_require__(45)
  , $getPrototypeOf = __webpack_require__(41);

__webpack_require__(43)('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(6);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(79).set});

/***/ }),
/* 89 */
/***/ (function(module, exports) {



/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(80)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(38)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(1)
  , has            = __webpack_require__(4)
  , DESCRIPTORS    = __webpack_require__(3)
  , $export        = __webpack_require__(6)
  , redefine       = __webpack_require__(44)
  , META           = __webpack_require__(76).KEY
  , $fails         = __webpack_require__(10)
  , shared         = __webpack_require__(25)
  , setToStringTag = __webpack_require__(23)
  , uid            = __webpack_require__(14)
  , wks            = __webpack_require__(8)
  , wksExt         = __webpack_require__(29)
  , wksDefine      = __webpack_require__(28)
  , keyOf          = __webpack_require__(75)
  , enumKeys       = __webpack_require__(69)
  , isArray        = __webpack_require__(72)
  , anObject       = __webpack_require__(9)
  , toIObject      = __webpack_require__(2)
  , toPrimitive    = __webpack_require__(27)
  , createDesc     = __webpack_require__(13)
  , _create        = __webpack_require__(20)
  , gOPNExt        = __webpack_require__(78)
  , $GOPD          = __webpack_require__(21)
  , $DP            = __webpack_require__(5)
  , $keys          = __webpack_require__(12)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(39).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(22).f  = $propertyIsEnumerable;
  __webpack_require__(40).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(19)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(7)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28)('asyncIterator');

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28)('observable');

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(83);
var global        = __webpack_require__(1)
  , hide          = __webpack_require__(7)
  , Iterators     = __webpack_require__(18)
  , TO_STRING_TAG = __webpack_require__(8)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),
/* 95 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_95__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=bundle.js.map