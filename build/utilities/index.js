(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utilities/constants.ts":
/*!************************************!*\
  !*** ./src/utilities/constants.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EPSILON = void 0;
exports.EPSILON = 1e-6;


/***/ }),

/***/ "./src/utilities/index.ts":
/*!********************************!*\
  !*** ./src/utilities/index.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.vectorAlmostZero = vectorAlmostZero;
exports.vectorsAlmostEqual = vectorsAlmostEqual;
exports.valueInInterval = valueInInterval;
exports.intervalsOverlap = intervalsOverlap;
exports.overlapInterval = overlapInterval;
const constants = __importStar(__webpack_require__(/*! ./constants */ "./src/utilities/constants.ts"));
const types_1 = __webpack_require__(/*! ./types */ "./src/utilities/types.ts");
__exportStar(__webpack_require__(/*! ./types */ "./src/utilities/types.ts"), exports);
function vectorAlmostZero(v) {
    if ((0, types_1.isVec3)(v)) {
        return (Math.abs(v.x) < constants.EPSILON &&
            Math.abs(v.y) < constants.EPSILON &&
            Math.abs(v.z) < constants.EPSILON);
    }
    if ((0, types_1.isVec2)(v)) {
        return (Math.abs(v.x) < constants.EPSILON && Math.abs(v.y) < constants.EPSILON);
    }
    return false;
}
function vectorsAlmostEqual(a, b) {
    if ((0, types_1.isVec3)(a) && (0, types_1.isVec3)(b)) {
        return (Math.abs(a.x - b.x) < constants.EPSILON &&
            Math.abs(a.y - b.y) < constants.EPSILON &&
            Math.abs(a.z - b.z) < constants.EPSILON);
    }
    if ((0, types_1.isVec2)(a) && (0, types_1.isVec2)(b)) {
        return (Math.abs(a.x - b.x) < constants.EPSILON &&
            Math.abs(a.y - b.y) < constants.EPSILON);
    }
    return false;
}
/**
 * Check if a value is within a specified interval
 */
function valueInInterval(value, interval) {
    const { min, minInclusive = true, max, maxInclusive = true } = interval;
    return ((minInclusive ? value >= min : value > min) &&
        (maxInclusive ? value <= max : value < max));
}
/**
 * Check if two intervals (a1, a2) and (b1, b2) overlap
 */
function intervalsOverlap(a, b) {
    return Math.max(a.min, b.min) <= Math.min(a.max, b.max);
}
/**
 * Get the overlapping part of two intervals (a1, a2) and (b1, b2)
 *
 * If the intervals do not overlap, return null
 */
function overlapInterval(a, b) {
    if (!intervalsOverlap(a, b)) {
        return null;
    }
    return { min: Math.max(a.min, b.min), max: Math.min(a.max, b.max) };
}


/***/ }),

/***/ "./src/utilities/types.ts":
/*!********************************!*\
  !*** ./src/utilities/types.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isVec2 = isVec2;
exports.isVec3 = isVec3;
/**
 * Check if a value is a vec2
 */
function isVec2(value) {
    return (value &&
        typeof value === 'object' &&
        'x' in value &&
        typeof value.x === 'number' &&
        'y' in value &&
        typeof value.y === 'number' &&
        !('z' in value));
}
/**
 * Check if a value is a vec3
 */
function isVec3(value) {
    return (value &&
        typeof value === 'object' &&
        'x' in value &&
        typeof value.x === 'number' &&
        'y' in value &&
        typeof value.y === 'number' &&
        'z' in value &&
        typeof value.z === 'number');
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/utilities/index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});