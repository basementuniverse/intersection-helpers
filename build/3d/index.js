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
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@basementuniverse/utils/utils.js":
/*!*******************************************************!*\
  !*** ./node_modules/@basementuniverse/utils/utils.js ***!
  \*******************************************************/
/***/ ((module) => {

/**
 * @overview A library of useful functions
 * @author Gordon Larrigan
 */

/**
 * Memoize a function
 * @param {Function} f The function to memoize
 * @returns {Function} A memoized version of the function
 */
const memoize = f => {
  var cache = {};
  return function(...args) {
    return cache[args] ?? (cache[args] = f.apply(this, args));
  };
};

/**
 * Check if two numbers are approximately equal
 * @param {number} a Number a
 * @param {number} b Number b
 * @param {number} [p=Number.EPSILON] The precision value
 * @return {boolean} True if numbers a and b are approximately equal
 */
const floatEquals = (a, b, p = Number.EPSILON) => Math.abs(a - b) < p;

/**
 * Clamp a number between min and max
 * @param {number} a The number to clamp
 * @param {number} [min=0] The minimum value
 * @param {number} [max=1] The maximum value
 * @return {number} A clamped number
 */
const clamp = (a, min = 0, max = 1) => a < min ? min : (a > max ? max : a);

/**
 * Get the fractional part of a number
 * @param {number} a The number from which to get the fractional part
 * @return {number} The fractional part of the number
 */
const frac = a => a >= 0 ? a - Math.floor(a) : a - Math.ceil(a);

/**
 * Round n to d decimal places
 * @param {number} n The number to round
 * @param {number} [d=0] The number of decimal places to round to
 * @return {number} A rounded number
 */
const round = (n, d = 0) => {
  const p = Math.pow(10, d);
  return Math.round(n * p + Number.EPSILON) / p;
}

/**
 * Do a linear interpolation between a and b
 * @param {number} a The minimum number
 * @param {number} b The maximum number
 * @param {number} i The interpolation value, should be in the interval [0, 1]
 * @return {number} An interpolated value in the interval [a, b]
 */
const lerp = (a, b, i) => a + (b - a) * i;

/**
 * Get the position of i between a and b
 * @param {number} a The minimum number
 * @param {number} b The maximum number
 * @param {number} i The interpolated value in the interval [a, b]
 * @return {number} The position of i between a and b
 */
const unlerp = (a, b, i) => (i - a) / (b - a);

/**
 * Do a bilinear interpolation
 * @param {number} c00 Top-left value
 * @param {number} c10 Top-right value
 * @param {number} c01 Bottom-left value
 * @param {number} c11 Bottom-right value
 * @param {number} ix Interpolation value along x
 * @param {number} iy Interpolation value along y
 * @return {number} A bilinear interpolated value
 */
const blerp = (c00, c10, c01, c11, ix, iy) => lerp(lerp(c00, c10, ix), lerp(c01, c11, ix), iy);

/**
 * Re-map a number i from range a1...a2 to b1...b2
 * @param {number} i The number to re-map
 * @param {number} a1
 * @param {number} a2
 * @param {number} b1
 * @param {number} b2
 * @return {number}
 */
const remap = (i, a1, a2, b1, b2) => b1 + (i - a1) * (b2 - b1) / (a2 - a1);

/**
 * Do a smooth interpolation between a and b
 * @param {number} a The minimum number
 * @param {number} b The maximum number
 * @param {number} i The interpolation value
 * @return {number} An interpolated value in the interval [a, b]
 */
const smoothstep = (a, b, i) => lerp(a, b, 3 * Math.pow(i, 2) - 2 * Math.pow(i, 3));

/**
 * Get an angle in radians
 * @param {number} degrees The angle in degrees
 * @return {number} The angle in radians
 */
const radians = degrees => (Math.PI / 180) * degrees;

/**
 * Get an angle in degrees
 * @param {number} radians The angle in radians
 * @return {number} The angle in degrees
 */
const degrees = radians => (180 / Math.PI) * radians;

/**
 * Get a random float in the interval [min, max)
 * @param {number} min Inclusive min
 * @param {number} max Exclusive max
 * @return {number} A random float in the interval [min, max)
 */
const randomBetween = (min, max) => Math.random() * (max - min) + min;

/**
 * Get a random integer in the interval [min, max]
 * @param {number} min Inclusive min
 * @param {number} max Inclusive max
 * @return {number} A random integer in the interval [min, max]
 */
const randomIntBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Get a normally-distributed random number
 * @param {number} [mu=0.5] The mean value
 * @param {number} [sigma=0.5] The standard deviation
 * @param {number} [samples=2] The number of samples
 * @return {number} A normally-distributed random number
 */
const cltRandom = (mu = 0.5, sigma = 0.5, samples = 2) => {
  let total = 0;
  for (let i = samples; i--;) {
    total += Math.random();
  }
  return mu + (total - samples / 2) / (samples / 2) * sigma;
};

/**
 * Get a normally-distributed random integer in the interval [min, max]
 * @param {number} min Inclusive min
 * @param {number} max Inclusive max
 * @return {number} A normally-distributed random integer
 */
const cltRandomInt = (min, max) => Math.floor(min + cltRandom(0.5, 0.5, 2) * (max + 1 - min));

/**
 * Return a weighted random integer
 * @param {Array<number>} w An array of weights
 * @return {number} An index from w
 */
const weightedRandom = w => {
  let total = w.reduce((a, i) => a + i, 0), n = 0;
  const r = Math.random() * total;
  while (total > r) {
    total -= w[n++];
  }
  return n - 1;
};

/**
 * An interpolation function
 * @callback InterpolationFunction
 * @param {number} a The minimum number
 * @param {number} b The maximum number
 * @param {number} i The interpolation value, should be in the interval [0, 1]
 * @return {number} The interpolated value in the interval [a, b]
 */

/**
 * Return an interpolated value from an array
 * @param {Array<number>} a An array of values interpolate
 * @param {number} i A number in the interval [0, 1]
 * @param {InterpolationFunction} [f=Math.lerp] The interpolation function to use
 * @return {number} An interpolated value in the interval [min(a), max(a)]
 */
const lerpArray = (a, i, f = lerp) => {
  const s = i * (a.length - 1);
  const p = clamp(Math.trunc(s), 0, a.length - 1);
  return f(a[p] || 0, a[p + 1] || 0, frac(s));
};

/**
 * Get the dot product of two vectors
 * @param {Array<number>} a Vector a
 * @param {Array<number>} b Vector b
 * @return {number} a ∙ b
 */
const dot = (a, b) => a.reduce((n, v, i) => n + v * b[i], 0);

/**
 * Get the factorial of a number
 * @param {number} a
 * @return {number} a!
 */
const factorial = a => {
  let result = 1;
  for (let i = 2; i <= a; i++) {
    result *= i;
  }
  return result;
};

/**
 * Get the number of permutations of r elements from a set of n elements
 * @param {number} n
 * @param {number} r
 * @return {number} nPr
 */
const npr = (n, r) => factorial(n) / factorial(n - r);

/**
 * Get the number of combinations of r elements from a set of n elements
 * @param {number} n
 * @param {number} r
 * @return {number} nCr
 */
const ncr = (n, r) => factorial(n) / (factorial(r) * factorial(n - r));

/**
 * Generate all permutations of r elements from an array
 *
 * @example
 * ```js
 * permutations([1, 2, 3], 2);
 * ```
 *
 * Output:
 * ```json
 * [
 *   [1, 2],
 *   [1, 3],
 *   [2, 1],
 *   [2, 3],
 *   [3, 1],
 *   [3, 2]
 * ]
 * ```
 * @param {Array<*>} a
 * @param {number} r The number of elements to choose in each permutation
 * @return {Array<Array<*>>} An array of permutation arrays
 */
const permutations = (a, r) => {
  if (r === 1) {
    return a.map(item => [item]);
  }

  return a.reduce(
    (acc, item, i) => [
      ...acc,
      ...permutations(a.slice(0, i).concat(a.slice(i + 1)), r - 1).map(c => [item, ...c]),
    ],
    []
  );
}

/**
 * Generate all combinations of r elements from an array
 *
 * @example
 * ```js
 * combinations([1, 2, 3], 2);
 * ```
 *
 * Output:
 * ```json
 * [
 *   [1, 2],
 *   [1, 3],
 *   [2, 3]
 * ]
 * ```
 * @param {Array<*>} a
 * @param {number} r The number of elements to choose in each combination
 * @return {Array<Array<*>>} An array of combination arrays
 */
const combinations = (a, r) => {
  if (r === 1) {
    return a.map(item => [item]);
  }

  return a.reduce(
    (acc, item, i) => [
      ...acc,
      ...combinations(a.slice(i + 1), r - 1).map(c => [item, ...c]),
    ],
    []
  );
};

/**
 * Get a cartesian product of arrays
 *
 * @example
 * ```js
 * cartesian([1, 2, 3], ['a', 'b']);
 * ```
 *
 * Output:
 * ```json
 * [
 *   [1, "a"],
 *   [1, "b"],
 *   [2, "a"],
 *   [2, "b"],
 *   [3, "a"],
 *   [3, "b"]
 * ]
 * ```
 */
const cartesian = (...arr) =>
  arr.reduce(
    (a, b) => a.flatMap(c => b.map(d => [...c, d])),
    [[]]
  );

/**
 * A function for generating array values
 * @callback TimesFunction
 * @param {number} i The array index
 * @return {*} The array value
 */

/**
 * Return a new array with length n by calling function f(i) on each element
 * @param {TimesFunction} f
 * @param {number} n The size of the array
 * @return {Array<*>}
 */
const times = (f, n) => Array(n).fill(0).map((_, i) => f(i));

/**
 * Return an array containing numbers 0->(n - 1)
 * @param {number} n The size of the array
 * @return {Array<number>} An array of integers 0->(n - 1)
 */
const range = n => times(i => i, n);

/**
 * Zip multiple arrays together, i.e. ([1, 2, 3], [a, b, c]) => [[1, a], [2, b], [3, c]]
 * @param {...Array<*>} a The arrays to zip
 * @return {Array<Array<*>>}
 */
const zip = (...a) => times(i => a.map(a => a[i]), Math.max(...a.map(a => a.length)));

/**
 * Return array[i] with positive and negative wrapping
 * @param {Array<*>} a The array to access
 * @param {number} i The positively/negatively wrapped array index
 * @return {*} An element from the array
 */
const at = (a, i) => a[i < 0 ? a.length - (Math.abs(i + 1) % a.length) - 1 : i % a.length];

/**
 * Return the last element of an array without removing it
 * @param {Array<*>} a
 * @return {*} The last element from the array
 */
const peek = (a) => {
  if (!a.length) {
    return undefined;
  }

  return a[a.length - 1];
};

/**
 * Return the index for a given position in an unrolled 2d array
 * @param {number} x The x position
 * @param {number} y The y position
 * @param {number} w The width of the 2d array
 * @returns {number} The index in the unrolled array
 */
const ind = (x, y, w) => x + y * w;

/**
 * Return the position for a given index in an unrolled 2d array
 * @param {number} i The index
 * @param {number} w The width of the 2d array
 * @returns {Array<number>} The position as a 2-tuple
 */
const pos = (i, w) => [i % w, Math.floor(i / w)];

/**
 * Chop an array into chunks of size n
 * @param {Array<*>} a
 * @param {number} n The chunk size
 * @return {Array<Array<*>>} An array of array chunks
 */
const chunk = (a, n) => times(i => a.slice(i * n, i * n + n), Math.ceil(a.length / n));

/**
 * Randomly shuffle a shallow copy of an array
 * @param {Array<*>} a
 * @return {Array<*>} The shuffled array
 */
const shuffle = a => a.slice().sort(() => Math.random() - 0.5);

/**
 * Flatten an object
 * @param {object} o
 * @param {string} concatenator The string to use for concatenating keys
 * @return {object} A flattened object
 */
const flat = (o, concatenator = '.') => {
  return Object.keys(o).reduce((acc, key) => {
    if (o[key] instanceof Date) {
      return {
        ...acc,
        [key]: o[key].toISOString(),
      };
    }

    if (typeof o[key] !== 'object' || !o[key]) {
      return {
        ...acc,
        [key]: o[key],
      };
    }
    const flattened = flat(o[key], concatenator);

    return {
      ...acc,
      ...Object.keys(flattened).reduce(
        (childAcc, childKey) => ({
          ...childAcc,
          [`${key}${concatenator}${childKey}`]: flattened[childKey],
        }),
        {}
      ),
    };
  }, {});
};

/**
 * Unflatten an object
 * @param {object} o
 * @param {string} concatenator The string to check for in concatenated keys
 * @return {object} An un-flattened object
 */
const unflat = (o, concatenator = '.') => {
  let result = {}, temp, substrings, property, i;

  for (property in o) {
    substrings = property.split(concatenator);
    temp = result;
    for (i = 0; i < substrings.length - 1; i++) {
      if (!(substrings[i] in temp)) {
        if (isFinite(substrings[i + 1])) {
          temp[substrings[i]] = [];
        } else {
          temp[substrings[i]] = {};
        }
      }
      temp = temp[substrings[i]];
    }
    temp[substrings[substrings.length - 1]] = o[property];
  }

  return result;
};

/**
 * A split predicate
 * @callback SplitPredicate
 * @param {any} value The current value
 * @return {boolean} True if the array should split at this index
 */

/**
 * Split an array into sub-arrays based on a predicate
 * @param {Array<*>} array
 * @param {SplitPredicate} predicate
 * @return {Array<Array<*>>} An array of arrays
 */
const split = (array, predicate) => {
  const result = [];
  let current = [];
  for (const value of array) {
    if (predicate(value)) {
      if (current.length) {
        result.push(current);
      }
      current = [value];
    } else {
      current.push(value);
    }
  }
  result.push(current);

  return result;
};

/**
 * Pluck keys from an object
 * @param {object} o
 * @param {...string} keys The keys to pluck from the object
 * @return {object} An object containing the plucked keys
 */
const pluck = (o, ...keys) => {
  return keys.reduce(
    (result, key) => Object.assign(result, { [key]: o[key] }),
    {}
  );
};

/**
 * Exclude keys from an object
 * @param {object} o
 * @param {...string} keys The keys to exclude from the object
 * @return {object} An object containing all keys except excluded keys
 */
const exclude = (o, ...keys) => {
  return Object.fromEntries(
    Object.entries(o).filter(([key]) => !keys.includes(key))
  );
};

if (true) {
  module.exports = {
    memoize,
    floatEquals,
    clamp,
    frac,
    round,
    lerp,
    unlerp,
    blerp,
    remap,
    smoothstep,
    radians,
    degrees,
    randomBetween,
    randomIntBetween,
    cltRandom,
    cltRandomInt,
    weightedRandom,
    lerpArray,
    dot,
    factorial,
    npr,
    ncr,
    permutations,
    combinations,
    cartesian,
    times,
    range,
    zip,
    at,
    peek,
    ind,
    pos,
    chunk,
    shuffle,
    flat,
    unflat,
    split,
    pluck,
    exclude,
  };
}


/***/ }),

/***/ "./node_modules/@basementuniverse/vec/vec.js":
/*!***************************************************!*\
  !*** ./node_modules/@basementuniverse/vec/vec.js ***!
  \***************************************************/
/***/ ((module) => {

/**
 * @overview A small vector and matrix library
 * @author Gordon Larrigan
 */

const _vec_times = (f, n) => Array(n).fill(0).map((_, i) => f(i));
const _vec_chunk = (a, n) => _vec_times(i => a.slice(i * n, i * n + n), Math.ceil(a.length / n));
const _vec_dot = (a, b) => a.reduce((n, v, i) => n + v * b[i], 0);
const _vec_is_vec2 = a => typeof a === 'object' && 'x' in a && 'y' in a;
const _vec_is_vec3 = a => typeof a === 'object' && 'x' in a && 'y' in a && 'z' in a;

/**
 * A 2d vector
 * @typedef {Object} vec2
 * @property {number} x The x component of the vector
 * @property {number} y The y component of the vector
 */

/**
 * Create a new 2d vector
 * @param {number|vec2} [x] The x component of the vector, or a vector to copy
 * @param {number} [y] The y component of the vector
 * @return {vec2} A new 2d vector
 * @example <caption>various ways to initialise a vector</caption>
 * let a = vec2(3, 2); // (3, 2)
 * let b = vec2(4);    // (4, 4)
 * let c = vec2(a);    // (3, 2)
 * let d = vec2();     // (0, 0)
 */
const vec2 = (x, y) => {
  if (!x && !y) {
    return { x: 0, y: 0 };
  }
  if (_vec_is_vec2(x)) {
    return { x: x.x || 0, y: x.y || 0 };
  }
  return { x: x, y: y ?? x };
};

/**
 * Get the components of a vector as an array
 * @param {vec2} a The vector to get components from
 * @return {Array<number>} The vector components as an array
 */
vec2.components = a => [a.x, a.y];

/**
 * Create a vector from an array of components
 * @param {Array<number>} components The components of the vector
 * @return {vec2} A new vector
 */
vec2.fromComponents = components => vec2(...components.slice(0, 2));

/**
 * Return a unit vector (1, 0)
 * @return {vec2} A unit vector (1, 0)
 */
vec2.ux = () => vec2(1, 0);

/**
 * Return a unit vector (0, 1)
 * @return {vec2} A unit vector (0, 1)
 */
vec2.uy = () => vec2(0, 1);

/**
 * Add vectors
 * @param {vec2} a Vector a
 * @param {vec2|number} b Vector or scalar b
 * @return {vec2} a + b
 */
vec2.add = (a, b) => ({ x: a.x + (b.x ?? b), y: a.y + (b.y ?? b) });

/**
 * Subtract vectors
 * @param {vec2} a Vector a
 * @param {vec2|number} b Vector or scalar b
 * @return {vec2} a - b
 */
vec2.sub = (a, b) => ({ x: a.x - (b.x ?? b), y: a.y - (b.y ?? b) });

/**
 * Scale a vector
 * @param {vec2} a Vector a
 * @param {vec2|number} b Vector or scalar b
 * @return {vec2} a * b
 */
vec2.mul = (a, b) => ({ x: a.x * (b.x ?? b), y: a.y * (b.y ?? b) });

/**
 * Scale a vector by a scalar, alias for vec2.mul
 * @param {vec2} a Vector a
 * @param {number} b Scalar b
 * @return {vec2} a * b
 */
vec2.scale = (a, b) => vec2.mul(a, b);

/**
 * Divide a vector
 * @param {vec2} a Vector a
 * @param {vec2|number} b Vector or scalar b
 * @return {vec2} a / b
 */
vec2.div = (a, b) => ({ x: a.x / (b.x ?? b), y: a.y / (b.y ?? b) });

/**
 * Get the length of a vector
 * @param {vec2} a Vector a
 * @return {number} |a|
 */
vec2.len = a => Math.sqrt(a.x * a.x + a.y * a.y);

/**
 * Get the length of a vector using taxicab geometry
 * @param {vec2} a Vector a
 * @return {number} |a|
 */
vec2.manhattan = a => Math.abs(a.x) + Math.abs(a.y);

/**
 * Normalise a vector
 * @param {vec2} a The vector to normalise
 * @return {vec2} ^a
 */
vec2.nor = a => {
  let len = vec2.len(a);
  return len ? { x: a.x / len, y: a.y / len } : vec2();
};

/**
 * Get a dot product of vectors
 * @param {vec2} a Vector a
 * @param {vec2} b Vector b
 * @return {number} a ∙ b
 */
vec2.dot = (a, b) => a.x * b.x + a.y * b.y;

/**
 * Rotate a vector by r radians
 * @param {vec2} a The vector to rotate
 * @param {number} r The angle to rotate by, measured in radians
 * @return {vec2} A rotated vector
 */
vec2.rot = (a, r) => {
  let s = Math.sin(r),
    c = Math.cos(r);
  return { x: c * a.x - s * a.y, y: s * a.x + c * a.y };
};

/**
 * Fast method to rotate a vector by -90, 90 or 180 degrees
 * @param {vec2} a The vector to rotate
 * @param {number} r 1 for 90 degrees (cw), -1 for -90 degrees (ccw), 2 or -2 for 180 degrees
 * @return {vec2} A rotated vector
 */
vec2.rotf = (a, r) => {
  switch (r) {
    case 1: return vec2(a.y, -a.x);
    case -1: return vec2(-a.y, a.x);
    case 2: case -2: return vec2(-a.x, -a.y);
    default: return a;
  }
};

/**
 * Scalar cross product of two vectors
 * @param {vec2} a Vector a
 * @param {vec2} b Vector b
 * @return {number} a × b
 */
vec2.cross = (a, b) => {
  return a.x * b.y - a.y * b.x;
};

/**
 * Check if two vectors are equal
 * @param {vec2} a Vector a
 * @param {vec2} b Vector b
 * @return {boolean} True if vectors a and b are equal, false otherwise
 */
vec2.eq = (a, b) => a.x === b.x && a.y === b.y;

/**
 * Get the angle of a vector
 * @param {vec2} a Vector a
 * @return {number} The angle of vector a in radians
 */
vec2.rad = a => Math.atan2(a.y, a.x);

/**
 * Copy a vector
 * @param {vec2} a The vector to copy
 * @return {vec2} A copy of vector a
 */
vec2.cpy = a => vec2(a);

/**
 * A function to call on each component of a 2d vector
 * @callback vec2MapCallback
 * @param {number} value The component value
 * @param {'x' | 'y'} label The component label (x or y)
 * @return {number} The mapped component
 */

/**
 * Call a function on each component of a vector and build a new vector from the results
 * @param {vec2} a Vector a
 * @param {vec2MapCallback} f The function to call on each component of the vector
 * @return {vec2} Vector a mapped through f
 */
vec2.map = (a, f) => ({ x: f(a.x, 'x'), y: f(a.y, 'y') });

/**
 * Convert a vector into a string
 * @param {vec2} a The vector to convert
 * @param {string} [s=', '] The separator string
 * @return {string} A string representation of the vector
 */
vec2.str = (a, s = ', ') => `${a.x}${s}${a.y}`;

/**
 * Swizzle a vector with a string of component labels
 *
 * The string can contain:
 * - `x` or `y`
 * - `u` or `v` (aliases for `x` and `y`, respectively)
 * - `X`, `Y`, `U`, `V` (negated versions of the above)
 * - `0` or `1` (these will be passed through unchanged)
 * - `.` to return the component that would normally be at this position (or 0)
 *
 * Any other characters will default to 0
 * @param {vec2} a The vector to swizzle
 * @param {string} [s='..'] The swizzle string
 * @return {Array<number>} The swizzled components
 * @example <caption>swizzling a vector</caption>
 * let a = vec2(3, -2);
 * vec2.swiz(a, 'x');    // [3]
 * vec2.swiz(a, 'yx');   // [-2, 3]
 * vec2.swiz(a, 'xY');   // [3, 2]
 * vec2.swiz(a, 'Yy');   // [2, -2]
 * vec2.swiz(a, 'x.x');  // [3, -2, 3]
 * vec2.swiz(a, 'y01x'); // [-2, 0, 1, 3]
 */
vec2.swiz = (a, s = '..') => {
  const result = [];
  s.split('').forEach((c, i) => {
    switch (c) {
      case 'x': case 'u': result.push(a.x); break;
      case 'y': case 'v': result.push(a.y); break;
      case 'X': case 'U': result.push(-a.x); break;
      case 'Y': case 'V': result.push(-a.y); break;
      case '0': result.push(0); break;
      case '1': result.push(1); break;
      case '.': result.push([a.x, a.y][i] ?? 0); break;
      default: result.push(0);
    }
  });
  return result;
};

/**
 * Polar coordinates for a 2d vector
 * @typedef {Object} polarCoordinates2d
 * @property {number} r The magnitude (radius) of the vector
 * @property {number} theta The angle of the vector
 */

/**
 * Convert a vector into polar coordinates
 * @param {vec2} a The vector to convert
 * @return {polarCoordinates2d} The magnitude and angle of the vector
 */
vec2.polar = a => ({ r: vec2.len(a), theta: Math.atan2(a.y, a.x) });

/**
 * Convert polar coordinates into a vector
 * @param {number} r The magnitude (radius) of the vector
 * @param {number} theta The angle of the vector
 * @return {vec2} A vector with the given angle and magnitude
 */
vec2.fromPolar = (r, theta) => vec2(r * Math.cos(theta), r * Math.sin(theta));

/**
 * A 3d vector
 * @typedef {Object} vec3
 * @property {number} x The x component of the vector
 * @property {number} y The y component of the vector
 * @property {number} z The z component of the vector
 */

/**
 * Create a new 3d vector
 * @param {number|vec3|vec2} [x] The x component of the vector, or a vector to copy
 * @param {number} [y] The y component of the vector, or the z component if x is a vec2
 * @param {number} [z] The z component of the vector
 * @return {vec3} A new 3d vector
 * @example <caption>various ways to initialise a vector</caption>
 * let a = vec3(3, 2, 1);       // (3, 2, 1)
 * let b = vec3(4, 5);          // (4, 5, 0)
 * let c = vec3(6);             // (6, 6, 6)
 * let d = vec3(a);             // (3, 2, 1)
 * let e = vec3();              // (0, 0, 0)
 * let f = vec3(vec2(1, 2), 3); // (1, 2, 3)
 * let g = vec3(vec2(4, 5));    // (4, 5, 0)
 */
const vec3 = (x, y, z) => {
  if (!x && !y && !z) {
    return { x: 0, y: 0, z: 0 };
  }
  if (_vec_is_vec3(x)) {
    return { x: x.x || 0, y: x.y || 0, z: x.z || 0 };
  }
  if (_vec_is_vec2(x)) {
    return { x: x.x || 0, y: x.y || 0, z: y || 0 };
  }
  return { x: x, y: y ?? x, z: z ?? x };
};

/**
 * Get the components of a vector as an array
 * @param {vec3} a The vector to get components from
 * @return {Array<number>} The vector components as an array
 */
vec3.components = a => [a.x, a.y, a.z];

/**
 * Create a vector from an array of components
 * @param {Array<number>} components The components of the vector
 * @return {vec3} A new vector
 */
vec3.fromComponents = components => vec3(...components.slice(0, 3));

/**
 * Return a unit vector (1, 0, 0)
 * @return {vec3} A unit vector (1, 0, 0)
 */
vec3.ux = () => vec3(1, 0, 0);

/**
 * Return a unit vector (0, 1, 0)
 * @return {vec3} A unit vector (0, 1, 0)
 */
vec3.uy = () => vec3(0, 1, 0);

/**
 * Return a unit vector (0, 0, 1)
 * @return {vec3} A unit vector (0, 0, 1)
 */
vec3.uz = () => vec3(0, 0, 1);

/**
 * Add vectors
 * @param {vec3} a Vector a
 * @param {vec3|number} b Vector or scalar b
 * @return {vec3} a + b
 */
vec3.add = (a, b) => ({ x: a.x + (b.x ?? b), y: a.y + (b.y ?? b), z: a.z + (b.z ?? b) });

/**
 * Subtract vectors
 * @param {vec3} a Vector a
 * @param {vec3|number} b Vector or scalar b
 * @return {vec3} a - b
 */
vec3.sub = (a, b) => ({ x: a.x - (b.x ?? b), y: a.y - (b.y ?? b), z: a.z - (b.z ?? b) });

/**
 * Scale a vector
 * @param {vec3} a Vector a
 * @param {vec3|number} b Vector or scalar b
 * @return {vec3} a * b
 */
vec3.mul = (a, b) => ({ x: a.x * (b.x ?? b), y: a.y * (b.y ?? b), z: a.z * (b.z ?? b) });

/**
 * Scale a vector by a scalar, alias for vec3.mul
 * @param {vec3} a Vector a
 * @param {number} b Scalar b
 * @return {vec3} a * b
 */
vec3.scale = (a, b) => vec3.mul(a, b);

/**
 * Divide a vector
 * @param {vec3} a Vector a
 * @param {vec3|number} b Vector or scalar b
 * @return {vec3} a / b
 */
vec3.div = (a, b) => ({ x: a.x / (b.x ?? b), y: a.y / (b.y ?? b), z: a.z / (b.z ?? b) });

/**
 * Get the length of a vector
 * @param {vec3} a Vector a
 * @return {number} |a|
 */
vec3.len = a => Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);

/**
 * Get the length of a vector using taxicab geometry
 * @param {vec3} a Vector a
 * @return {number} |a|
 */
vec3.manhattan = a => Math.abs(a.x) + Math.abs(a.y) + Math.abs(a.z);

/**
 * Normalise a vector
 * @param {vec3} a The vector to normalise
 * @return {vec3} ^a
 */
vec3.nor = a => {
  let len = vec3.len(a);
  return len ? { x: a.x / len, y: a.y / len, z: a.z / len } : vec3();
};

/**
 * Get a dot product of vectors
 * @param {vec3} a Vector a
 * @param {vec3} b Vector b
 * @return {number} a ∙ b
 */
vec3.dot = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z;

/**
 * Rotate a vector using a rotation matrix
 * @param {vec3} a The vector to rotate
 * @param {mat} m The rotation matrix
 * @return {vec3} A rotated vector
 */
vec3.rot = (a, m) => vec3(
  vec3.dot(vec3.fromComponents(mat.row(m, 1)), a),
  vec3.dot(vec3.fromComponents(mat.row(m, 2)), a),
  vec3.dot(vec3.fromComponents(mat.row(m, 3)), a)
);

/**
 * Rotate a vector by r radians around the x axis
 * @param {vec3} a The vector to rotate
 * @param {number} r The angle to rotate by, measured in radians
 * @return {vec3} A rotated vector
 */
vec3.rotx = (a, r) => vec3(
  a.x,
  a.y * Math.cos(r) - a.z * Math.sin(r),
  a.y * Math.sin(r) + a.z * Math.cos(r)
);

/**
 * Rotate a vector by r radians around the y axis
 * @param {vec3} a The vector to rotate
 * @param {number} r The angle to rotate by, measured in radians
 * @return {vec3} A rotated vector
 */
vec3.roty = (a, r) => vec3(
  a.x * Math.cos(r) + a.z * Math.sin(r),
  a.y,
  -a.x * Math.sin(r) + a.z * Math.cos(r)
);

/**
 * Rotate a vector by r radians around the z axis
 * @param {vec3} a The vector to rotate
 * @param {number} r The angle to rotate by, measured in radians
 * @return {vec3} A rotated vector
 */
vec3.rotz = (a, r) => vec3(
  a.x * Math.cos(r) - a.y * Math.sin(r),
  a.x * Math.sin(r) + a.y * Math.cos(r),
  a.z
);

/**
 * Rotate a vector using a quaternion
 * @param {vec3} a The vector to rotate
 * @param {Array<number>} q The quaternion to rotate by
 * @return {vec3} A rotated vector
 */
vec3.rotq = (v, q) => {
  if (q.length !== 4) {
    return vec3();
  }

  const d = Math.sqrt(q[0] * q[0] + q[1] * q[1] + q[2] * q[2] + q[3] * q[3]);
  if (d === 0) {
    return vec3();
  }

  const uq = [q[0] / d, q[1] / d, q[2] / d, q[3] / d];
  const u = vec3(...uq.slice(0, 3));
  const s = uq[3];
  return vec3.add(
    vec3.add(
      vec3.mul(u, 2 * vec3.dot(u, v)),
      vec3.mul(v, s * s - vec3.dot(u, u))
    ),
    vec3.mul(vec3.cross(u, v), 2 * s)
  );
};

/**
 * Rotate a vector using Euler angles
 * @param {vec3} a The vector to rotate
 * @param {vec3} e The Euler angles to rotate by
 * @return {vec3} A rotated vector
 */
vec3.rota = (a, e) => vec3.rotz(vec3.roty(vec3.rotx(a, e.x), e.y), e.z);

/**
 * Get the cross product of vectors
 * @param {vec3} a Vector a
 * @param {vec3} b Vector b
 * @return {vec3} a × b
 */
vec3.cross = (a, b) => vec3(
  a.y * b.z - a.z * b.y,
  a.z * b.x - a.x * b.z,
  a.x * b.y - a.y * b.x
);

/**
 * Check if two vectors are equal
 * @param {vec3} a Vector a
 * @param {vec3} b Vector b
 * @return {boolean} True if vectors a and b are equal, false otherwise
 */
vec3.eq = (a, b) => a.x === b.x && a.y === b.y && a.z === b.z;

/**
 * Get the angle of a vector from the x axis
 * @param {vec3} a Vector a
 * @return {number} The angle of vector a in radians
 */
vec3.radx = a => Math.atan2(a.z, a.y);

/**
 * Get the angle of a vector from the y axis
 * @param {vec3} a Vector a
 * @return {number} The angle of vector a in radians
 */
vec3.rady = a => Math.atan2(a.x, a.y);

/**
 * Get the angle of a vector from the z axis
 * @param {vec3} a Vector a
 * @return {number} The angle of vector a in radians
 */
vec3.radz = a => Math.atan2(a.y, a.z);

/**
 * Copy a vector
 * @param {vec3} a The vector to copy
 * @return {vec3} A copy of vector a
 */
vec3.cpy = a => vec3(a);

/**
 * A function to call on each component of a 3d vector
 * @callback vec3MapCallback
 * @param {number} value The component value
 * @param {'x' | 'y' | 'z'} label The component label (x, y or z)
 * @return {number} The mapped component
 */

/**
 * Call a function on each component of a vector and build a new vector from the results
 * @param {vec3} a Vector a
 * @param {vec3MapCallback} f The function to call on each component of the vector
 * @return {vec3} Vector a mapped through f
 */
vec3.map = (a, f) => ({ x: f(a.x, 'x'), y: f(a.y, 'y'), z: f(a.z, 'z') });

/**
 * Convert a vector into a string
 * @param {vec3} a The vector to convert
 * @param {string} [s=', '] The separator string
 * @return {string} A string representation of the vector
 */
vec3.str = (a, s = ', ') => `${a.x}${s}${a.y}${s}${a.z}`;

/**
 * Swizzle a vector with a string of component labels
 *
 * The string can contain:
 * - `x`, `y` or `z`
 * - `u`, `v` or `w` (aliases for `x`, `y` and `z`, respectively)
 * - `r`, `g` or `b` (aliases for `x`, `y` and `z`, respectively)
 * - `X`, `Y`, `Z`, `U`, `V`, `W`, `R`, `G`, `B` (negated versions of the above)
 * - `0` or `1` (these will be passed through unchanged)
 * - `.` to return the component that would normally be at this position (or 0)
 *
 * Any other characters will default to 0
 * @param {vec3} a The vector to swizzle
 * @param {string} [s='...'] The swizzle string
 * @return {Array<number>} The swizzled components
 * @example <caption>swizzling a vector</caption>
 * let a = vec3(3, -2, 1);
 * vec3.swiz(a, 'x');     // [3]
 * vec3.swiz(a, 'zyx');   // [1, -2, 3]
 * vec3.swiz(a, 'xYZ');   // [3, 2, -1]
 * vec3.swiz(a, 'Zzx');   // [-1, 1, 3]
 * vec3.swiz(a, 'x.x');   // [3, -2, 3]
 * vec3.swiz(a, 'y01zx'); // [-2, 0, 1, 1, 3]
 */
vec3.swiz = (a, s = '...') => {
  const result = [];
  s.split('').forEach((c, i) => {
    switch (c) {
      case 'x': case 'u': case 'r': result.push(a.x); break;
      case 'y': case 'v': case 'g': result.push(a.y); break;
      case 'z': case 'w': case 'b': result.push(a.z); break;
      case 'X': case 'U': case 'R': result.push(-a.x); break;
      case 'Y': case 'V': case 'G': result.push(-a.y); break;
      case 'Z': case 'W': case 'B': result.push(-a.z); break;
      case '0': result.push(0); break;
      case '1': result.push(1); break;
      case '.': result.push([a.x, a.y, a.z][i] ?? 0); break;
      default: result.push(0);
    }
  });
  return result;
};

/**
 * Polar coordinates for a 3d vector
 * @typedef {Object} polarCoordinates3d
 * @property {number} r The magnitude (radius) of the vector
 * @property {number} theta The tilt angle of the vector
 * @property {number} phi The pan angle of the vector
 */

/**
 * Convert a vector into polar coordinates
 * @param {vec3} a The vector to convert
 * @return {polarCoordinates3d} The magnitude, tilt and pan of the vector
 */
vec3.polar = a => {
  let r = vec3.len(a),
    theta = Math.acos(a.y / r),
    phi = Math.atan2(a.z, a.x);
  return { r, theta, phi };
};

/**
 * Convert polar coordinates into a vector
 * @param {number} r The magnitude (radius) of the vector
 * @param {number} theta The tilt of the vector
 * @param {number} phi The pan of the vector
 * @return {vec3} A vector with the given angle and magnitude
 */
vec3.fromPolar = (r, theta, phi) => {
  const sinTheta = Math.sin(theta);
  return vec3(
    r * sinTheta * Math.cos(phi),
    r * Math.cos(theta),
    r * sinTheta * Math.sin(phi)
  );
};

/**
 * A matrix
 * @typedef {Object} mat
 * @property {number} m The number of rows in the matrix
 * @property {number} n The number of columns in the matrix
 * @property {Array<number>} entries The matrix values
 */

/**
 * Create a new matrix
 * @param {number} [m=4] The number of rows
 * @param {number} [n=4] The number of columns
 * @param {Array<number>} [entries=[]] Matrix values in reading order
 * @return {mat} A new matrix
 */
const mat = (m = 4, n = 4, entries = []) => ({
  m, n,
  entries: entries.concat(Array(m * n).fill(0)).slice(0, m * n)
});

/**
 * Get an identity matrix of size n
 * @param {number} n The size of the matrix
 * @return {mat} An identity matrix
 */
mat.identity = n => mat(n, n, Array(n * n).fill(0).map((v, i) => +(Math.floor(i / n) === i % n)));

/**
 * Get an entry from a matrix
 * @param {mat} a Matrix a
 * @param {number} i The row offset
 * @param {number} j The column offset
 * @return {number} The value at position (i, j) in matrix a
 */
mat.get = (a, i, j) => a.entries[(j - 1) + (i - 1) * a.n];

/**
 * Set an entry of a matrix
 * @param {mat} a Matrix a
 * @param {number} i The row offset
 * @param {number} j The column offset
 * @param {number} v The value to set in matrix a
 */
mat.set = (a, i, j, v) => { a.entries[(j - 1) + (i - 1) * a.n] = v; };

/**
 * Get a row from a matrix as an array
 * @param {mat} a Matrix a
 * @param {number} m The row offset
 * @return {Array<number>} Row m from matrix a
 */
mat.row = (a, m) => {
  const s = (m - 1) * a.n;
  return a.entries.slice(s, s + a.n);
};

/**
 * Get a column from a matrix as an array
 * @param {mat} a Matrix a
 * @param {number} n The column offset
 * @return {Array<number>} Column n from matrix a
 */
mat.col = (a, n) => _vec_times(i => mat.get(a, (i + 1), n), a.m);

/**
 * Add matrices
 * @param {mat} a Matrix a
 * @param {mat} b Matrix b
 * @return {mat} a + b
 */
mat.add = (a, b) => a.m === b.m && a.n === b.n && mat.map(a, (v, i) => v + b.entries[i]);

/**
 * Subtract matrices
 * @param {mat} a Matrix a
 * @param {mat} b Matrix b
 * @return {mat} a - b
 */
mat.sub = (a, b) => a.m === b.m && a.n === b.n && mat.map(a, (v, i) => v - b.entries[i]);

/**
 * Multiply matrices
 * @param {mat} a Matrix a
 * @param {mat} b Matrix b
 * @return {mat|false} ab or false if the matrices cannot be multiplied
 */
mat.mul = (a, b) => {
  if (a.n !== b.m) { return false; }
  const result = mat(a.m, b.n);
  for (let i = 1; i <= a.m; i++) {
    for (let j = 1; j <= b.n; j++) {
      mat.set(result, i, j, _vec_dot(mat.row(a, i), mat.col(b, j)));
    }
  }
  return result;
};

/**
 * Multiply a matrix by a vector
 * @param {mat} a Matrix a
 * @param {vec2|vec3|number[]} b Vector b
 * @return {vec2|vec3|number[]|false} ab or false if the matrix and vector cannot be multiplied
 */
mat.mulv = (a, b) => {
  let n, bb, rt;
  if (_vec_is_vec3(b)) {
    bb = vec3.components(b);
    n = 3;
    rt = vec3.fromComponents;
  } else if (_vec_is_vec2(b)) {
    bb = vec2.components(b);
    n = 2;
    rt = vec2.fromComponents;
  } else {
    bb = b;
    n = b.length ?? 0;
    rt = v => v;
  }
  if (a.n !== n) { return false; }
  const result = [];
  for (let i = 1; i <= a.m; i++) {
    result.push(_vec_dot(mat.row(a, i), bb));
  }
  return rt(result);
}

/**
 * Scale a matrix
 * @param {mat} a Matrix a
 * @param {number} b Scalar b
 * @return {mat} a * b
 */
mat.scale = (a, b) => mat.map(a, v => v * b);

/**
 * Transpose a matrix
 * @param {mat} a The matrix to transpose
 * @return {mat} A transposed matrix
 */
mat.trans = a => mat(a.n, a.m, _vec_times(i => mat.col(a, (i + 1)), a.n).flat());

/**
 * Get the minor of a matrix
 * @param {mat} a Matrix a
 * @param {number} i The row offset
 * @param {number} j The column offset
 * @return {mat|false} The (i, j) minor of matrix a or false if the matrix is not square
 */
mat.minor = (a, i, j) => {
  if (a.m !== a.n) { return false; }
  const entries = [];
  for (let ii = 1; ii <= a.m; ii++) {
    if (ii === i) { continue; }
    for (let jj = 1; jj <= a.n; jj++) {
      if (jj === j) { continue; }
      entries.push(mat.get(a, ii, jj));
    }
  }
  return mat(a.m - 1, a.n - 1, entries);
};

/**
 * Get the determinant of a matrix
 * @param {mat} a Matrix a
 * @return {number|false} |a| or false if the matrix is not square
 */
mat.det = a => {
  if (a.m !== a.n) { return false; }
  if (a.m === 1) {
    return a.entries[0];
  }
  if (a.m === 2) {
    return a.entries[0] * a.entries[3] - a.entries[1] * a.entries[2];
  }
  let total = 0, sign = 1;
  for (let j = 1; j <= a.n; j++) {
    total += sign * a.entries[j - 1] * mat.det(mat.minor(a, 1, j));
    sign *= -1;
  }
  return total;
};

/**
 * Normalise a matrix
 * @param {mat} a The matrix to normalise
 * @return {mat|false} ^a or false if the matrix is not square
 */
mat.nor = a => {
  if (a.m !== a.n) { return false; }
  const d = mat.det(a);
  return mat.map(a, i => i * d);
};

/**
 * Get the adjugate of a matrix
 * @param {mat} a The matrix from which to get the adjugate
 * @return {mat} The adjugate of a
 */
mat.adj = a => {
  const minors = mat(a.m, a.n);
  for (let i = 1; i <= a.m; i++) {
    for (let j = 1; j <= a.n; j++) {
      mat.set(minors, i, j, mat.det(mat.minor(a, i, j)));
    }
  }
  const cofactors = mat.map(minors, (v, i) => v * (i % 2 ? -1 : 1));
  return mat.trans(cofactors);
};

/**
 * Get the inverse of a matrix
 * @param {mat} a The matrix to invert
 * @return {mat|false} a^-1 or false if the matrix has no inverse
 */
mat.inv = a => {
  if (a.m !== a.n) { return false; }
  const d = mat.det(a);
  if (d === 0) { return false; }
  return mat.scale(mat.adj(a), 1 / d);
};

/**
 * Check if two matrices are equal
 * @param {mat} a Matrix a
 * @param {mat} b Matrix b
 * @return {boolean} True if matrices a and b are identical, false otherwise
 */
mat.eq = (a, b) => a.m === b.m && a.n === b.n && mat.str(a) === mat.str(b);

/**
 * Copy a matrix
 * @param {mat} a The matrix to copy
 * @return {mat} A copy of matrix a
 */
mat.cpy = a => mat(a.m, a.n, [...a.entries]);

/**
 * A function to call on each entry of a matrix
 * @callback matrixMapCallback
 * @param {number} value The entry value
 * @param {number} index The entry index
 * @param {Array<number>} entries The array of matrix entries
 * @return {number} The mapped entry
 */

/**
 * Call a function on each entry of a matrix and build a new matrix from the results
 * @param {mat} a Matrix a
 * @param {matrixMapCallback} f The function to call on each entry of the matrix
 * @return {mat} Matrix a mapped through f
 */
mat.map = (a, f) => mat(a.m, a.n, a.entries.map(f));

/**
 * Convert a matrix into a string
 * @param {mat} a The matrix to convert
 * @param {string} [ms=', '] The separator string for columns
 * @param {string} [ns='\n'] The separator string for rows
 * @return {string} A string representation of the matrix
 */
mat.str = (a, ms = ', ', ns = '\n') => _vec_chunk(a.entries, a.n).map(r => r.join(ms)).join(ns);

if (true) {
  module.exports = { vec2, vec3, mat };
}


/***/ }),

/***/ "./src/3d/index.ts":
/*!*************************!*\
  !*** ./src/3d/index.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
exports.distance = distance;
exports.angle = angle;
exports.angleBetween = angleBetween;
exports.pointsAreCollinear = pointsAreCollinear;
exports.lineToRay = lineToRay;
exports.rayToLine = rayToLine;
exports.aabb = aabb;
exports.aabbToCuboid = aabbToCuboid;
exports.aabbsOverlap = aabbsOverlap;
exports.pointInAABB = pointInAABB;
exports.encloseAABBs = encloseAABBs;
exports.cuboidIsRotated = cuboidIsRotated;
exports.cuboidVertices = cuboidVertices;
exports.cuboidToPolygons = cuboidToPolygons;
exports.verticesToEdges = verticesToEdges;
exports.polygonIsValid = polygonIsValid;
exports.polygonWindingOrder = polygonWindingOrder;
exports.polygonArea = polygonArea;
exports.polygonCentroid = polygonCentroid;
exports.polygonToPlane = polygonToPlane;
exports.polygonsToMesh = polygonsToMesh;
exports.meshToPolygons = meshToPolygons;
exports.meshToEdges = meshToEdges;
exports.meshCentroid = meshCentroid;
exports.meshIsWatertight = meshIsWatertight;
exports.pointOnRay = pointOnRay;
exports.pointOnLine = pointOnLine;
exports.pointInSphere = pointInSphere;
exports.pointInCuboid = pointInCuboid;
exports.pointOnPolygon = pointOnPolygon;
exports.rayTraverseGrid = rayTraverseGrid;
exports.rayIntersectsRay = rayIntersectsRay;
exports.rayIntersectsLine = rayIntersectsLine;
exports.rayIntersectsSphere = rayIntersectsSphere;
exports.rayIntersectsPlane = rayIntersectsPlane;
exports.rayIntersectsCuboid = rayIntersectsCuboid;
exports.rayIntersectsPolygon = rayIntersectsPolygon;
exports.rayIntersectsMesh = rayIntersectsMesh;
exports.lineIntersectsRay = lineIntersectsRay;
exports.lineIntersectsLine = lineIntersectsLine;
exports.lineIntersectsSphere = lineIntersectsSphere;
exports.lineIntersectsPlane = lineIntersectsPlane;
exports.lineIntersectsCuboid = lineIntersectsCuboid;
exports.lineIntersectsPolygon = lineIntersectsPolygon;
exports.lineIntersectsMesh = lineIntersectsMesh;
exports.sphereIntersectsSphere = sphereIntersectsSphere;
exports.sphereIntersectsPlane = sphereIntersectsPlane;
exports.sphereIntersectsCuboid = sphereIntersectsCuboid;
exports.sphereIntersectsPolygon = sphereIntersectsPolygon;
exports.sphereIntersectsMesh = sphereIntersectsMesh;
exports.planeIntersectsPlane = planeIntersectsPlane;
exports.planeIntersectsMesh = planeIntersectsMesh;
exports.cuboidIntersectsCuboid = cuboidIntersectsCuboid;
exports.cuboidIntersectsPlane = cuboidIntersectsPlane;
exports.cuboidIntersectsPolygon = cuboidIntersectsPolygon;
exports.cuboidIntersectsMesh = cuboidIntersectsMesh;
exports.polygonIntersectsPolygon = polygonIntersectsPolygon;
exports.polygonIntersectsPlane = polygonIntersectsPlane;
exports.polygonIntersectsMesh = polygonIntersectsMesh;
exports.meshIntersectsMesh = meshIntersectsMesh;
exports.meshIntersectsPlane = meshIntersectsPlane;
const utils_1 = __webpack_require__(/*! @basementuniverse/utils */ "./node_modules/@basementuniverse/utils/utils.js");
const vec_1 = __webpack_require__(/*! @basementuniverse/vec */ "./node_modules/@basementuniverse/vec/vec.js");
const utilities_1 = __webpack_require__(/*! ../utilities */ "./src/utilities/index.ts");
const constants = __importStar(__webpack_require__(/*! ../utilities/constants */ "./src/utilities/constants.ts"));
const types_1 = __webpack_require__(/*! ./types */ "./src/3d/types.ts");
__exportStar(__webpack_require__(/*! ./types */ "./src/3d/types.ts"), exports);
/**
 * Contents
 *
 * Utilities
 * @see distance
 * @see angle
 * @see angleBetween
 * @see pointsAreCollinear
 *
 * Line and ray utilities
 * @see lineToRay
 * @see rayToLine
 *
 * AABBs
 * @see aabb
 * @see aabbToCuboid
 * @see aabbsOverlap
 * @see pointInAABB
 * @see encloseAABBs
 *
 * Cuboid utilities
 * @see cuboidIsRotated
 * @see cuboidVertices
 * @see cuboidToPolygons
 *
 * Polygon utilities
 * @see verticesToEdges
 * @see polygonIsValid
 * @see polygonWindingOrder
 * @see polygonArea
 * @see polygonCentroid
 * @see polygonToPlane
 *
 * Mesh utilities
 * @see polygonsToMesh
 * @see meshToPolygons
 * @see meshToEdges
 * @see meshCentroid
 * @see meshIsWatertight
 *
 * Points
 * @see pointOnRay
 * @see pointOnLine
 * @see pointInSphere
 * @see pointInCuboid
 * @see pointOnPolygon
 *
 * Rays
 * @see rayTraverseGrid
 * @see rayIntersectsRay
 * @see rayIntersectsLine
 * @see rayIntersectsSphere
 * @see rayIntersectsPlane
 * @see rayIntersectsCuboid
 * @see rayIntersectsPolygon
 * @see rayIntersectsMesh
 *
 * Lines
 * @see lineIntersectsRay
 * @see lineIntersectsLine
 * @see lineIntersectsSphere
 * @see lineIntersectsPlane
 * @see lineIntersectsCuboid
 * @see lineIntersectsPolygon
 * @see lineIntersectsMesh
 *
 * Spheres
 * @see sphereIntersectsSphere
 * @see sphereIntersectsPlane
 * @see sphereIntersectsCuboid
 * @see sphereIntersectsPolygon
 * @see sphereIntersectsMesh
 *
 * Planes
 * @see planeIntersectsPlane
 * @see planeIntersectsMesh
 *
 * Cuboids
 * @see cuboidIntersectsCuboid
 * @see cuboidIntersectsPlane
 * @see cuboidIntersectsPolygon
 * @see cuboidIntersectsMesh
 *
 * Polygons
 * @see polygonIntersectsPolygon
 * @see polygonIntersectsPlane
 * @see polygonIntersectsMesh
 *
 * Meshes
 * @see meshIntersectsMesh
 * @see meshIntersectsPlane
 */
/**
 * Calculate the distance between two points in 3D space
 */
function distance(a, b) {
    return vec_1.vec3.len(vec_1.vec3.sub(a, b));
}
/**
 * Calculate the Euler angle from point a to point b
 */
function angle(a, b) {
    if ((0, utilities_1.vectorsAlmostEqual)(a, b)) {
        return (0, vec_1.vec3)();
    }
    let thetaX = vec_1.vec3.radx(vec_1.vec3.sub(b, a)) % (2 * Math.PI);
    if (thetaX < 0) {
        thetaX += 2 * Math.PI; // Ensure angle is positive
    }
    let thetaY = vec_1.vec3.rady(vec_1.vec3.sub(b, a)) % (2 * Math.PI);
    if (thetaY < 0) {
        thetaY += 2 * Math.PI; // Ensure angle is positive
    }
    let thetaZ = vec_1.vec3.radz(vec_1.vec3.sub(b, a)) % (2 * Math.PI);
    if (thetaZ < 0) {
        thetaZ += 2 * Math.PI; // Ensure angle is positive
    }
    return (0, vec_1.vec3)(thetaX, thetaY, thetaZ);
}
/**
 * Calculate the angle between two lines or rays
 *
 * Returns 0 if either line is zero-length
 */
function angleBetween(a, b) {
    let aLine = (0, types_1.isRay)(a) ? rayToLine(a, 1) : a;
    let bLine = (0, types_1.isRay)(b) ? rayToLine(b, 1) : b;
    if ((0, utilities_1.vectorAlmostZero)(vec_1.vec3.sub(aLine.start, aLine.end)) ||
        (0, utilities_1.vectorAlmostZero)(vec_1.vec3.sub(bLine.start, bLine.end))) {
        return 0; // Zero-length line
    }
    const dirA = vec_1.vec3.nor(vec_1.vec3.sub(aLine.end, aLine.start));
    const dirB = vec_1.vec3.nor(vec_1.vec3.sub(bLine.end, bLine.start));
    // Clamp dot product to [-1, 1] to avoid NaN due to floating-point errors
    const dot = (0, utils_1.clamp)(vec_1.vec3.dot(dirA, dirB), -1, 1);
    const angle = Math.acos(dot);
    return angle < 0 ? angle + 2 * Math.PI : angle; // Ensure angle is positive
}
/**
 * Check if three points in 3D space are collinear
 */
function pointsAreCollinear(a, b, c) {
    // Create two vectors from the points:
    // v1 = b - a
    // v2 = c - a
    const v1 = vec_1.vec3.sub(b, a);
    const v2 = vec_1.vec3.sub(c, a);
    // Calculate the cross product of the two vectors
    const cross = vec_1.vec3.cross(v1, v2);
    // If the cross product is zero (or very close to zero),
    // the points are collinear
    return vec_1.vec3.len(cross) < constants.EPSILON;
}
/**
 * Convert a line segment to a ray
 */
function lineToRay(line) {
    return {
        origin: line.start,
        direction: vec_1.vec3.nor(vec_1.vec3.sub(line.end, line.start)),
    };
}
/**
 * Convert a ray to a line segment
 */
function rayToLine(ray, length = 1) {
    return {
        start: ray.origin,
        end: vec_1.vec3.add(ray.origin, vec_1.vec3.mul(ray.direction, length)),
    };
}
/**
 * Get the bounding box (AABB) of a geometric object
 */
function aabb(o) {
    if ((0, types_1.isLine)(o)) {
        return {
            position: (0, vec_1.vec3)(Math.min(o.start.x, o.end.y), Math.min(o.start.y, o.end.y), Math.min(o.start.z, o.end.z)),
            size: (0, vec_1.vec3)(Math.abs(o.start.x - o.end.x), Math.abs(o.start.y - o.end.y), Math.abs(o.start.z - o.end.z)),
        };
    }
    if ((0, types_1.isSphere)(o)) {
        return {
            position: o.position,
            size: (0, vec_1.vec3)(o.radius * 2),
        };
    }
    if ((0, types_1.isCuboid)(o)) {
        const vertices = cuboidVertices(o);
        const position = (0, vec_1.vec3)(Math.min(...vertices.map(v => v.x)), Math.min(...vertices.map(v => v.y)), Math.min(...vertices.map(v => v.z)));
        return {
            position,
            size: (0, vec_1.vec3)(Math.max(...vertices.map(v => v.x)) - position.x, Math.max(...vertices.map(v => v.y)) - position.y, Math.max(...vertices.map(v => v.z)) - position.z),
        };
    }
    if ((0, types_1.isMesh)(o) || (0, types_1.isPolygon)(o)) {
        const position = (0, vec_1.vec3)(Math.min(...o.vertices.map(v => v.x)), Math.min(...o.vertices.map(v => v.y)), Math.min(...o.vertices.map(v => v.z)));
        return {
            position,
            size: (0, vec_1.vec3)(Math.max(...o.vertices.map(v => v.x)) - position.x, Math.max(...o.vertices.map(v => v.y)) - position.y, Math.max(...o.vertices.map(v => v.z)) - position.z),
        };
    }
    return null;
}
/**
 * Convert an AABB to a cuboid
 */
function aabbToCuboid(aabb) {
    return {
        position: vec_1.vec3.add(aabb.position, vec_1.vec3.div(aabb.size, 2)),
        size: aabb.size,
        rotation: (0, vec_1.vec3)(0, 0, 0),
    };
}
/**
 * Check if two AABBs overlap and return the overlapping volume if they do
 */
function aabbsOverlap(a, b) {
    const overlapX = (0, utilities_1.overlapInterval)({ min: a.position.x, max: a.position.x + a.size.x }, { min: b.position.x, max: b.position.x + b.size.x });
    const overlapY = (0, utilities_1.overlapInterval)({ min: a.position.y, max: a.position.y + a.size.y }, { min: b.position.y, max: b.position.y + b.size.y });
    const overlapZ = (0, utilities_1.overlapInterval)({ min: a.position.z, max: a.position.z + a.size.z }, { min: b.position.z, max: b.position.z + b.size.z });
    // If the AABBs don't overlap on one or more axes, they don't overlap at all
    if (!overlapX || !overlapY || !overlapZ) {
        return { intersects: false };
    }
    return {
        intersects: true,
        overlap: {
            position: (0, vec_1.vec3)(overlapX.min, overlapY.min, overlapZ.min),
            size: (0, vec_1.vec3)(overlapX.max - overlapX.min, overlapY.max - overlapY.min, overlapZ.max - overlapZ.min),
        },
    };
}
/**
 * Check if a point is inside an AABB
 *
 * This should be a bit faster than pointInRectangle since we don't need to
 * worry about rotation
 */
function pointInAABB(point, aabb) {
    const { position, size } = aabb;
    const min = position;
    const max = vec_1.vec3.add(position, size);
    // Check if the point is inside the AABB
    const intersects = (0, utilities_1.valueInInterval)(point.x, { min: min.x, max: max.x }) &&
        (0, utilities_1.valueInInterval)(point.y, { min: min.y, max: max.y }) &&
        (0, utilities_1.valueInInterval)(point.z, { min: min.z, max: max.z });
    // Find the closest point on the AABB surface to the given point
    let closestPoint;
    if (!intersects) {
        // If the point is outside, clamp to the box
        closestPoint = (0, vec_1.vec3)((0, utils_1.clamp)(point.x, min.x, max.x), (0, utils_1.clamp)(point.y, min.y, max.y), (0, utils_1.clamp)(point.z, min.z, max.z));
    }
    else {
        // If the point is inside, project to the nearest edge
        const distances = [
            { x: min.x, y: point.y, z: point.z, d: Math.abs(point.x - min.x) }, // left
            { x: max.x, y: point.y, z: point.z, d: Math.abs(point.x - max.x) }, // right
            { x: point.x, y: min.y, z: point.z, d: Math.abs(point.y - min.y) }, // bottom
            { x: point.x, y: max.y, z: point.z, d: Math.abs(point.y - max.y) }, // top
            { x: point.x, y: point.y, z: min.z, d: Math.abs(point.z - min.z) }, // front
            { x: point.x, y: point.y, z: max.z, d: Math.abs(point.z - max.z) }, // back
        ];
        const nearest = distances.reduce((a, b) => (a.d < b.d ? a : b));
        closestPoint = (0, vec_1.vec3)(nearest.x, nearest.y, nearest.z);
    }
    // Calculate the distance from the point to the closest point
    const distance = vec_1.vec3.len(vec_1.vec3.sub(point, closestPoint));
    // If the point is inside, distance should be negative
    return {
        intersects,
        closestPoint,
        distance: intersects ? -distance : distance,
    };
}
/**
 * Enclose a set of AABBs in a single AABB
 */
function encloseAABBs(...aabbs) {
    if (aabbs.length === 0) {
        return { position: (0, vec_1.vec3)(), size: (0, vec_1.vec3)() };
    }
    const minX = Math.min(...aabbs.map(({ position }) => position.x));
    const minY = Math.min(...aabbs.map(({ position }) => position.y));
    const minZ = Math.min(...aabbs.map(({ position }) => position.z));
    const maxX = Math.max(...aabbs.map(({ position, size }) => position.x + size.x));
    const maxY = Math.max(...aabbs.map(({ position, size }) => position.y + size.y));
    const maxZ = Math.max(...aabbs.map(({ position, size }) => position.z + size.z));
    return {
        position: (0, vec_1.vec3)(minX, minY, minZ),
        size: (0, vec_1.vec3)(maxX - minX, maxY - minY, maxZ - minZ),
    };
}
/**
 * Check if a cuboid is rotated
 */
function cuboidIsRotated(cuboid) {
    return cuboid.rotation !== undefined && !(0, utilities_1.vectorAlmostZero)(cuboid.rotation);
}
/**
 * Get the vertices of a cuboid
 *
 * Vertices will be returned in the following order:
 * - Upper face (max z, clockwise starting at the top-left)
 *   - Top-left
 *   - Top-right
 *   - Bottom-right
 *   - Bottom-left
 * - Lower face (min z, clockwise starting at the top-left)
 *   - Top-left
 *   - Top-right
 *   - Bottom-right
 *   - Bottom-left
 */
function cuboidVertices(cuboid) {
    const { position, size, rotation = (0, vec_1.vec3)() } = cuboid;
    const halfSize = vec_1.vec3.div(size, 2);
    // Calculate the 8 corners of the cuboid
    let upperTopLeftOffset = vec_1.vec3.fromComponents(vec_1.vec3.swiz(halfSize, 'XYz'));
    let upperTopRightOffset = vec_1.vec3.fromComponents(vec_1.vec3.swiz(halfSize, 'xYz'));
    let upperBottomRightOffset = vec_1.vec3.fromComponents(vec_1.vec3.swiz(halfSize, 'xyz'));
    let upperBottomLeftOffset = vec_1.vec3.fromComponents(vec_1.vec3.swiz(halfSize, 'Xyz'));
    let lowerTopLeftOffset = vec_1.vec3.fromComponents(vec_1.vec3.swiz(halfSize, 'XYZ'));
    let lowerTopRightOffset = vec_1.vec3.fromComponents(vec_1.vec3.swiz(halfSize, 'xYZ'));
    let lowerBottomRightOffset = vec_1.vec3.fromComponents(vec_1.vec3.swiz(halfSize, 'xyZ'));
    let lowerBottomLeftOffset = vec_1.vec3.fromComponents(vec_1.vec3.swiz(halfSize, 'XyZ'));
    // Rotate the offsets if the cuboid is rotated
    if (cuboidIsRotated(cuboid)) {
        upperTopLeftOffset = vec_1.vec3.rota(upperTopLeftOffset, rotation);
        upperTopRightOffset = vec_1.vec3.rota(upperTopRightOffset, rotation);
        upperBottomRightOffset = vec_1.vec3.rota(upperBottomRightOffset, rotation);
        upperBottomLeftOffset = vec_1.vec3.rota(upperBottomLeftOffset, rotation);
        lowerTopLeftOffset = vec_1.vec3.rota(lowerTopLeftOffset, rotation);
        lowerTopRightOffset = vec_1.vec3.rota(lowerTopRightOffset, rotation);
        lowerBottomRightOffset = vec_1.vec3.rota(lowerBottomRightOffset, rotation);
        lowerBottomLeftOffset = vec_1.vec3.rota(lowerBottomLeftOffset, rotation);
    }
    return [
        // Upper face vertices
        vec_1.vec3.add(position, upperTopLeftOffset),
        vec_1.vec3.add(position, upperTopRightOffset),
        vec_1.vec3.add(position, upperBottomRightOffset),
        vec_1.vec3.add(position, upperBottomLeftOffset),
        // Lower face vertices
        vec_1.vec3.add(position, lowerTopLeftOffset),
        vec_1.vec3.add(position, lowerTopRightOffset),
        vec_1.vec3.add(position, lowerBottomRightOffset),
        vec_1.vec3.add(position, lowerBottomLeftOffset),
    ];
}
/**
 * Convert a cuboid to a list of polygons representing its faces
 *
 * Polygons will be returned in the following order:
 * - Upper face (top)
 * - Lower face (bottom)
 * - Front face
 * - Back face
 * - Left face
 * - Right face
 */
function cuboidToPolygons(cuboid) {
    const vertices = cuboidVertices(cuboid);
    if (vertices.length !== 8) {
        throw new Error('Cuboid must have exactly 8 vertices');
    }
    // Create polygons for each face of the cuboid
    return [
        // Upper face
        { vertices: [vertices[0], vertices[1], vertices[2]] },
        { vertices: [vertices[0], vertices[2], vertices[3]] },
        // Lower face
        { vertices: [vertices[4], vertices[5], vertices[6]] },
        { vertices: [vertices[4], vertices[6], vertices[7]] },
        // Front face
        { vertices: [vertices[0], vertices[1], vertices[5]] },
        { vertices: [vertices[0], vertices[5], vertices[4]] },
        // Back face
        { vertices: [vertices[2], vertices[3], vertices[7]] },
        { vertices: [vertices[2], vertices[7], vertices[6]] },
        // Left face
        { vertices: [vertices[0], vertices[3], vertices[7]] },
        { vertices: [vertices[0], vertices[7], vertices[4]] },
        // Right face
        { vertices: [vertices[1], vertices[2], vertices[6]] },
        { vertices: [vertices[1], vertices[6], vertices[5]] },
    ];
}
/**
 * Convert a list of vertices to a list of edges
 */
function verticesToEdges(vertices) {
    const edges = [];
    for (let i = 0; i < vertices.length; i++) {
        const start = vertices[i];
        const end = (0, utils_1.at)(vertices, i + 1);
        edges.push({ start, end });
    }
    return edges;
}
/**
 * Check if a polygon is valid
 *
 * A polygon is valid if it has exactly 3 vertices
 */
function polygonIsValid(polygon) {
    return polygon.vertices.length === 3;
}
/**
 * Determine the winding order of a polygon's vertices
 *
 * Returns 'clockwise' or 'counter-clockwise'
 *
 * By default uses the right-hand rule: if the vertices are ordered
 * counter-clockwise, the normal points towards the viewer
 *
 * Returns null if the polygon is invalid or degenerate
 */
function polygonWindingOrder(polygon, options) {
    if (!polygonIsValid(polygon)) {
        return null;
    }
    const [a, b, c] = polygon.vertices;
    const handedness = (options === null || options === void 0 ? void 0 : options.handedness) || 'right';
    // Calculate vectors from vertex a to b and a to c
    const ab = vec_1.vec3.sub(b, a);
    const ac = vec_1.vec3.sub(c, a);
    // Calculate normal vector using cross product
    const normal = vec_1.vec3.cross(ab, ac);
    // If normal is zero vector (or very close to zero), vertices are collinear
    if ((0, utilities_1.vectorAlmostZero)(normal)) {
        return null;
    }
    // If a reference normal was provided, use it
    if (options === null || options === void 0 ? void 0 : options.normal) {
        const dot = vec_1.vec3.dot(vec_1.vec3.nor(normal), vec_1.vec3.nor(options.normal));
        // Dot product > 0 means normals point in similar direction
        if (Math.abs(dot) < constants.EPSILON) {
            return null; // Normals are perpendicular, can't determine order
        }
        if (handedness === 'right') {
            return dot > 0 ? 'counter-clockwise' : 'clockwise';
        }
        else {
            return dot > 0 ? 'clockwise' : 'counter-clockwise';
        }
    }
    // Without a reference normal, we'll use the z-component of the normal
    // to determine winding order (positive z points towards viewer)
    if (Math.abs(normal.z) < constants.EPSILON) {
        return null; // Normal is perpendicular to view direction
    }
    if (handedness === 'right') {
        return normal.z > 0 ? 'counter-clockwise' : 'clockwise';
    }
    else {
        return normal.z > 0 ? 'clockwise' : 'counter-clockwise';
    }
}
/**
 * Calculate the 2D area of a polygon in 3D space
 *
 * Returns null if the polygon is invalid
 */
function polygonArea(polygon) {
    if (!polygonIsValid(polygon)) {
        return null;
    }
    const [a, b, c] = polygon.vertices;
    // Use the shoelace formula to calculate the area of the triangle
    // https://en.wikipedia.org/wiki/Shoelace_formula
    return (Math.abs(a.x * (b.y - b.x) * a.y +
        b.x * (c.y - c.x) * b.y +
        c.x * (a.y - a.x) * c.y) / 2);
}
/**
 * Calculate the centroid of a polygon
 *
 * Returns null if the polygon is invalid
 */
function polygonCentroid(polygon) {
    if (!polygonIsValid(polygon)) {
        return null;
    }
    return vec_1.vec3.div(vec_1.vec3.add(polygon.vertices[0], vec_1.vec3.add(polygon.vertices[1], polygon.vertices[2])), 3);
}
/**
 * Convert a polygon to a plane
 */
function polygonToPlane(polygon) {
    if (!polygonIsValid(polygon)) {
        return null;
    }
    // Calculate the normal vector
    const [a, b, c] = polygon.vertices;
    const ab = vec_1.vec3.sub(b, a);
    const ac = vec_1.vec3.sub(c, a);
    const normal = vec_1.vec3.nor(vec_1.vec3.cross(ab, ac));
    // Calculate the plane's position as the centroid of the polygon
    const point = polygonCentroid(polygon);
    return {
        point,
        normal,
    };
}
/**
 * Convert a list of polygons to a mesh
 *
 * This optimises the number of vertices and edges by merging common vertices
 */
function polygonsToMesh(polygons) {
    if (polygons.length === 0) {
        return { vertices: [], indices: [] };
    }
    // Create a map to store unique vertices
    const vertexMap = new Map();
    const indices = [];
    // Iterate over each polygon
    polygons.forEach((polygon, polygonIndex) => {
        if (!polygonIsValid(polygon)) {
            throw new Error(`Invalid polygon at index ${polygonIndex}`);
        }
        // Iterate over each vertex in the polygon
        polygon.vertices.forEach(vertex => {
            // Create a unique key for the vertex
            const key = `${vertex.x},${vertex.y},${vertex.z}`;
            if (!vertexMap.has(key)) {
                // If the vertex is not in the map, add it
                vertexMap.set(key, vertex);
            }
            // Get the index of the vertex in the map
            const index = Array.from(vertexMap.keys()).indexOf(key);
            indices.push(index);
        });
    });
    // Convert the vertex map to an array
    const vertices = Array.from(vertexMap.values());
    return {
        vertices,
        indices,
    };
}
/**
 * Convert a mesh to a list of polygons
 */
function meshToPolygons(mesh) {
    if (mesh.indices.length % 3 !== 0) {
        throw new Error('Mesh indices must be a multiple of 3 to form triangles');
    }
    const polygons = [];
    for (let i = 0; i < mesh.indices.length; i += 3) {
        const indices = mesh.indices.slice(i, i + 3);
        if (indices.length !== 3) {
            throw new Error('Mesh indices must form triangles');
        }
        const vertices = indices.map(index => mesh.vertices[index]);
        polygons.push({ vertices });
    }
    return polygons;
}
/**
 * Convert a mesh to a list of edges
 */
function meshToEdges(mesh) {
    if (mesh.indices.length % 2 !== 0) {
        throw new Error('Mesh indices must be a multiple of 2 to form edges');
    }
    const edges = [];
    for (let i = 0; i < mesh.indices.length; i += 2) {
        const startIndex = mesh.indices[i];
        const endIndex = mesh.indices[i + 1];
        if (startIndex >= mesh.vertices.length ||
            endIndex >= mesh.vertices.length) {
            throw new Error('Mesh indices out of bounds');
        }
        edges.push({
            start: mesh.vertices[startIndex],
            end: mesh.vertices[endIndex],
        });
    }
    return edges;
}
/**
 * Calculate the centroid of a mesh
 */
function meshCentroid(mesh) {
    return vec_1.vec3.div(mesh.vertices.reduce((acc, v) => vec_1.vec3.add(acc, v), (0, vec_1.vec3)()), mesh.vertices.length);
}
/**
 * Perform an edge manifold check to tell if a mesh is watertight
 *
 * Every edge in a watertight mesh should be shared by exactly two triangles
 *
 * This isn't perfect, but it should be sufficient for most simple cases
 */
function meshIsWatertight(mesh) {
    // Create a map to store edge counts
    // Key format: "smallerVertexIndex,largerVertexIndex"
    const edgeCounts = new Map();
    // Process each triangle
    for (let i = 0; i < mesh.indices.length; i += 3) {
        const v1 = mesh.indices[i];
        const v2 = mesh.indices[i + 1];
        const v3 = mesh.indices[i + 2];
        // For each edge in the triangle, create a canonical key
        const edges = [
            [Math.min(v1, v2), Math.max(v1, v2)],
            [Math.min(v2, v3), Math.max(v2, v3)],
            [Math.min(v3, v1), Math.max(v3, v1)],
        ];
        // Count each edge
        edges.forEach(([a, b]) => {
            const key = `${a},${b}`;
            edgeCounts.set(key, (edgeCounts.get(key) || 0) + 1);
        });
    }
    // Check if all edges appear exactly twice
    return Array.from(edgeCounts.values()).every(count => count === 2);
}
/**
 * Check if a point is on a ray
 *
 * Also returns the closest point on the ray and the distance to it
 */
function pointOnRay(point, ray) {
    // Vector from ray origin to point
    const toPoint = vec_1.vec3.sub(point, ray.origin);
    // Get normalized ray direction
    const rayDirection = vec_1.vec3.nor(ray.direction);
    // Project toPoint onto the ray direction
    const projection = vec_1.vec3.dot(toPoint, rayDirection);
    // Calculate closest point on ray
    const closestPoint = vec_1.vec3.add(ray.origin, vec_1.vec3.mul(rayDirection, Math.max(0, projection)));
    // Calculate distance from point to closest point
    const distance = vec_1.vec3.len(vec_1.vec3.sub(point, closestPoint));
    return {
        // Point is on ray if distance is zero and projection is non-negative
        intersects: distance < constants.EPSILON && projection >= 0,
        closestPoint,
        distance,
    };
}
/**
 * Check if a point intersects a line segment
 *
 * Also returns the closest point on the line segment and the distance to it
 */
function pointOnLine(point, line) {
    // Get vector from line start to end
    const lineVector = vec_1.vec3.sub(line.end, line.start);
    // Get normalized line direction
    const lineDirection = vec_1.vec3.nor(lineVector);
    // Get vector from line start to point
    const toPoint = vec_1.vec3.sub(point, line.start);
    // Project toPoint onto the line direction
    const projection = vec_1.vec3.dot(toPoint, lineDirection);
    // Get line length
    const lineLength = vec_1.vec3.len(lineVector);
    // Clamp projection to line segment
    const clampedProjection = Math.max(0, Math.min(lineLength, projection));
    // Calculate closest point on line segment
    const closestPoint = vec_1.vec3.add(line.start, vec_1.vec3.mul(lineDirection, clampedProjection));
    // Calculate distance from point to closest point
    const distance = vec_1.vec3.len(vec_1.vec3.sub(point, closestPoint));
    return {
        // Point is on line if distance is effectively zero
        intersects: distance < constants.EPSILON,
        closestPoint,
        distance,
    };
}
/**
 * Check if a point is inside a sphere
 *
 * Also returns the closest point on the sphere edge and the distance to it
 *
 * If the point is inside the sphere, the distance will be negative
 */
function pointInSphere(point, sphere) {
    // Calculate vector from sphere center to point
    const toPoint = vec_1.vec3.sub(point, sphere.position);
    // Calculate distance from point to sphere center
    const distanceToCenter = vec_1.vec3.len(toPoint);
    // Check if point is inside the sphere
    const intersects = distanceToCenter <= sphere.radius;
    // Calculate distance to circle edge
    const distance = intersects
        ? -(sphere.radius - distanceToCenter) // Negative if inside
        : distanceToCenter - sphere.radius; // Positive if outside
    // Calculate closest point on sphere edge
    const closestPoint = vec_1.vec3.add(sphere.position, vec_1.vec3.mul(vec_1.vec3.nor(toPoint), sphere.radius));
    return {
        intersects,
        closestPoint,
        distance,
    };
}
/**
 * Check if a point is inside a cuboid
 */
function pointInCuboid(point, cuboid) {
    const { position, size, rotation = (0, vec_1.vec3)() } = cuboid;
    const halfSize = vec_1.vec3.div(size, 2);
    // Transform point to local space by undoing rotation and translation
    let localPoint = vec_1.vec3.sub(point, position);
    if (cuboidIsRotated(cuboid)) {
        localPoint = vec_1.vec3.rota(localPoint, vec_1.vec3.mul(rotation, -1));
    }
    // Calculate distances to each face in local space
    const dx = Math.max(Math.abs(localPoint.x) - halfSize.x, 0);
    const dy = Math.max(Math.abs(localPoint.y) - halfSize.y, 0);
    const dz = Math.max(Math.abs(localPoint.z) - halfSize.z, 0);
    // Calculate closest point in local space
    const closestLocalPoint = (0, vec_1.vec3)((0, utils_1.clamp)(localPoint.x, -halfSize.x, halfSize.x), (0, utils_1.clamp)(localPoint.y, -halfSize.y, halfSize.y), (0, utils_1.clamp)(localPoint.z, -halfSize.z, halfSize.z));
    // Transform closest point back to world space
    let closestPoint = closestLocalPoint;
    if (cuboidIsRotated(cuboid)) {
        closestPoint = vec_1.vec3.rota(closestPoint, rotation);
    }
    closestPoint = vec_1.vec3.add(closestPoint, position);
    // Calculate if point is inside and the distance
    const intersects = dx === 0 && dy === 0 && dz === 0;
    const distance = intersects
        ? -Math.min(halfSize.x - Math.abs(localPoint.x), halfSize.y - Math.abs(localPoint.y), halfSize.z - Math.abs(localPoint.z))
        : Math.sqrt(dx * dx + dy * dy + dz * dz);
    return {
        intersects,
        closestPoint,
        distance,
    };
}
function pointOnPolygon(point, polygon) {
    // First validate the polygon
    if (!polygonIsValid(polygon)) {
        return null;
    }
    const [v1, v2, v3] = polygon.vertices;
    // Calculate two edges of the triangle
    const edge1 = vec_1.vec3.sub(v2, v1);
    const edge2 = vec_1.vec3.sub(v3, v1);
    // Calculate the normal vector of the plane containing the triangle
    const normal = vec_1.vec3.nor(vec_1.vec3.cross(edge1, edge2));
    // Calculate plane constant d
    const d = -vec_1.vec3.dot(normal, v1);
    // Calculate the signed distance from the point to the plane
    const signedDistance = vec_1.vec3.dot(normal, point) + d;
    // Project the point onto the plane
    const projectedPoint = vec_1.vec3.sub(point, vec_1.vec3.mul(normal, signedDistance));
    // Now we need to check if the projected point is inside the triangle
    // We'll use the barycentric coordinate method
    const area = vec_1.vec3.len(vec_1.vec3.cross(edge1, edge2)) / 2; // Triangle area
    // Calculate barycentric coordinates using sub-triangle areas
    const edge3 = vec_1.vec3.sub(v3, v2);
    const vp1 = vec_1.vec3.sub(projectedPoint, v1);
    const vp2 = vec_1.vec3.sub(projectedPoint, v2);
    const vp3 = vec_1.vec3.sub(projectedPoint, v3);
    const alpha = vec_1.vec3.len(vec_1.vec3.cross(edge3, vp2)) / (2 * area);
    const beta = vec_1.vec3.len(vec_1.vec3.cross(edge2, vp3)) / (2 * area);
    const gamma = vec_1.vec3.len(vec_1.vec3.cross(edge1, vp1)) / (2 * area);
    // Point is inside triangle if all barycentric coordinates are between 0 and 1
    // and their sum is approximately 1
    const sum = alpha + beta + gamma;
    const isInside = alpha >= -constants.EPSILON &&
        beta >= -constants.EPSILON &&
        gamma >= -constants.EPSILON &&
        Math.abs(sum - 1) < constants.EPSILON;
    // If point is inside, the closest point is the projected point
    // If point is outside, find the closest point on the triangle's edges
    let closestPoint;
    let distance;
    if (isInside) {
        closestPoint = projectedPoint;
        distance = Math.abs(signedDistance);
    }
    else {
        // Check distances to each edge
        const p1 = pointOnLine(point, { start: v1, end: v2 });
        const p2 = pointOnLine(point, { start: v2, end: v3 });
        const p3 = pointOnLine(point, { start: v3, end: v1 });
        // Find the minimum distance
        const minDist = Math.min(p1.distance, p2.distance, p3.distance);
        // Use the closest point from the edge with minimum distance
        if (minDist === p1.distance) {
            closestPoint = p1.closestPoint;
        }
        else if (minDist === p2.distance) {
            closestPoint = p2.closestPoint;
        }
        else {
            closestPoint = p3.closestPoint;
        }
        distance = minDist;
    }
    return {
        intersects: distance < constants.EPSILON,
        closestPoint,
        distance,
    };
}
/**
 * Check which grid cells a ray traverses
 *
 * Based on "A Fast Voxel Traversal Algorithm for Ray Tracing" by Amanatides
 * and Woo
 *
 * We can optionally limit the number of cells traversed by the ray, or set
 * maxCells to -1 to continue traversing until the ray exits the grid (or until
 * we hit the hard limit of 10000 cells).
 */
function rayTraverseGrid(ray, cellSize, gridTopLeftFront, gridBottomRightBack, maxCells = -1) {
    if (cellSize <= 0) {
        return { cells: [] }; // Invalid cell size, return empty cells array
    }
    // Set a limit on the number of cells traversed
    const HARD_LIMIT = 10000;
    maxCells = (0, utils_1.clamp)(maxCells === -1 ? HARD_LIMIT : maxCells, 0, HARD_LIMIT);
    if (maxCells <= 0) {
        return { cells: [] }; // No cells to traverse
    }
    // Make sure the grid boundaries are integers
    gridTopLeftFront = vec_1.vec3.map(gridTopLeftFront, Math.floor);
    gridBottomRightBack = vec_1.vec3.map(gridBottomRightBack, Math.ceil);
    // Normalize ray direction and handle zero components
    const rayDir = vec_1.vec3.nor(ray.direction);
    if ((0, utilities_1.vectorAlmostZero)(rayDir)) {
        return { cells: [] };
    }
    const cells = [];
    // Calculate initial cell coordinates
    let currentCell = vec_1.vec3.map(vec_1.vec3.div(vec_1.vec3.sub(ray.origin, gridTopLeftFront), cellSize), Math.floor);
    // Calculate grid size in cells
    const gridSize = vec_1.vec3.sub(gridBottomRightBack, gridTopLeftFront);
    // If starting point is outside grid bounds, find entry point
    if (currentCell.x < 0 ||
        currentCell.x >= gridSize.x ||
        currentCell.y < 0 ||
        currentCell.y >= gridSize.y ||
        currentCell.z < 0 ||
        currentCell.z >= gridSize.z) {
        // Use cuboid intersection to find grid entry point
        const gridCuboid = {
            position: vec_1.vec3.add(gridTopLeftFront, vec_1.vec3.div(vec_1.vec3.sub(gridBottomRightBack, gridTopLeftFront), 2)),
            size: vec_1.vec3.sub(gridBottomRightBack, gridTopLeftFront),
        };
        const intersection = rayIntersectsCuboid(ray, gridCuboid);
        if (!intersection.intersects || !intersection.intersectionPoints) {
            return { cells }; // Ray misses grid entirely
        }
        // Get the first intersection point (closest to ray origin)
        const entryPoint = intersection.intersectionPoints[0];
        currentCell = vec_1.vec3.map(vec_1.vec3.div(vec_1.vec3.sub(entryPoint, gridTopLeftFront), cellSize), Math.floor);
        // Check if entry point is valid
        if (currentCell.x < 0 ||
            currentCell.x >= gridSize.x ||
            currentCell.y < 0 ||
            currentCell.y >= gridSize.y ||
            currentCell.z < 0 ||
            currentCell.z >= gridSize.z) {
            return { cells }; // No valid entry point found
        }
    }
    // Calculate step direction (either 1 or -1) for each axis
    const step = {
        x: Math.sign(rayDir.x),
        y: Math.sign(rayDir.y),
        z: Math.sign(rayDir.z),
    };
    // Calculate tDelta - distance along ray from one grid line to next
    const tDelta = {
        x: rayDir.x !== 0 ? Math.abs(cellSize / rayDir.x) : Infinity,
        y: rayDir.y !== 0 ? Math.abs(cellSize / rayDir.y) : Infinity,
        z: rayDir.z !== 0 ? Math.abs(cellSize / rayDir.z) : Infinity,
    };
    // Calculate initial cell boundary positions
    const initialBoundary = (0, vec_1.vec3)(gridTopLeftFront.x + (currentCell.x + (step.x > 0 ? 1 : 0)) * cellSize, gridTopLeftFront.y + (currentCell.y + (step.y > 0 ? 1 : 0)) * cellSize, gridTopLeftFront.z + (currentCell.z + (step.z > 0 ? 1 : 0)) * cellSize);
    // Calculate initial tMax values
    const tMax = {
        x: rayDir.x !== 0
            ? Math.abs((initialBoundary.x - ray.origin.x) / rayDir.x)
            : Infinity,
        y: rayDir.y !== 0
            ? Math.abs((initialBoundary.y - ray.origin.y) / rayDir.y)
            : Infinity,
        z: rayDir.z !== 0
            ? Math.abs((initialBoundary.z - ray.origin.z) / rayDir.z)
            : Infinity,
    };
    // If we're exactly on a boundary, we need to adjust tMax
    if (Math.abs(ray.origin.x - initialBoundary.x) < constants.EPSILON) {
        tMax.x = tDelta.x;
    }
    if (Math.abs(ray.origin.y - initialBoundary.y) < constants.EPSILON) {
        tMax.y = tDelta.y;
    }
    if (Math.abs(ray.origin.z - initialBoundary.z) < constants.EPSILON) {
        tMax.z = tDelta.z;
    }
    // Add starting cell
    cells.push((0, vec_1.vec3)(currentCell.x, currentCell.y, currentCell.z));
    let cellCount = 1;
    // Main loop
    while (cellCount < maxCells &&
        currentCell.x >= 0 &&
        currentCell.x < gridSize.x &&
        currentCell.y >= 0 &&
        currentCell.y < gridSize.y &&
        currentCell.z >= 0 &&
        currentCell.z < gridSize.z) {
        // Advance to next cell based on shortest tMax
        if (tMax.x < tMax.y && tMax.x < tMax.z) {
            tMax.x += tDelta.x;
            currentCell.x += step.x;
        }
        else if (tMax.y < tMax.z) {
            tMax.y += tDelta.y;
            currentCell.y += step.y;
        }
        else {
            tMax.z += tDelta.z;
            currentCell.z += step.z;
        }
        // Check if we're still in bounds
        if (currentCell.x < 0 ||
            currentCell.x >= gridSize.x ||
            currentCell.y < 0 ||
            currentCell.y >= gridSize.y ||
            currentCell.z < 0 ||
            currentCell.z >= gridSize.z) {
            break;
        }
        // Add current cell
        cells.push((0, vec_1.vec3)(currentCell.x, currentCell.y, currentCell.z));
        cellCount++;
    }
    return { cells };
}
/**
 * Check if two rays intersect
 */
function rayIntersectsRay(rayA, rayB) {
    // Normalize ray directions
    const dirA = vec_1.vec3.nor(rayA.direction);
    const dirB = vec_1.vec3.nor(rayB.direction);
    // If either ray has zero direction, they cannot intersect
    if ((0, utilities_1.vectorAlmostZero)(dirA) || (0, utilities_1.vectorAlmostZero)(dirB)) {
        return {
            intersects: false,
        };
    }
    // Calculate vector between ray origins
    const originDiff = vec_1.vec3.sub(rayB.origin, rayA.origin);
    // Calculate triple products
    const normal = vec_1.vec3.cross(dirA, dirB);
    const normalLengthSq = vec_1.vec3.dot(normal, normal);
    // If normal is zero, rays are parallel
    if (normalLengthSq < constants.EPSILON) {
        // Check if rays are coincident
        const crossOrigins = vec_1.vec3.cross(originDiff, dirA);
        if (vec_1.vec3.len(crossOrigins) < constants.EPSILON) {
            // Rays are coincident - return point on rayA closest to rayB.origin
            const t = vec_1.vec3.dot(originDiff, dirA);
            if (t >= 0) {
                return {
                    intersects: true,
                    intersectionPoint: vec_1.vec3.add(rayA.origin, vec_1.vec3.mul(dirA, t)),
                };
            }
        }
        return { intersects: false };
    }
    // Calculate parameters for closest points
    const c1 = vec_1.vec3.dot(originDiff, vec_1.vec3.cross(dirB, normal)) / normalLengthSq;
    const c2 = vec_1.vec3.dot(originDiff, vec_1.vec3.cross(dirA, normal)) / normalLengthSq;
    // If either parameter is negative, closest points are behind ray origins
    if (c1 < 0 || c2 < 0) {
        return { intersects: false };
    }
    // Calculate closest points on each ray
    const pointA = vec_1.vec3.add(rayA.origin, vec_1.vec3.mul(dirA, c1));
    const pointB = vec_1.vec3.add(rayB.origin, vec_1.vec3.mul(dirB, c2));
    // Check if points are close enough to consider intersection
    const distance = vec_1.vec3.len(vec_1.vec3.sub(pointA, pointB));
    if (distance < constants.EPSILON) {
        // Use midpoint as intersection point
        return {
            intersects: true,
            intersectionPoint: vec_1.vec3.add(pointA, vec_1.vec3.mul(vec_1.vec3.sub(pointB, pointA), 0.5)),
        };
    }
    return { intersects: false };
}
/**
 * Check if a ray intersects a line segment
 */
function rayIntersectsLine(ray, line) {
    // Convert line to a direction vector
    let lineDir = vec_1.vec3.sub(line.end, line.start);
    const lineLength = vec_1.vec3.len(lineDir);
    // If the line has zero length, it cannot intersect
    if (lineLength < constants.EPSILON) {
        return {
            intersects: false,
        };
    }
    // Normalize ray and line directions
    const rayDir = vec_1.vec3.nor(ray.direction);
    lineDir = vec_1.vec3.div(lineDir, lineLength); // Normalize line direction
    // Calculate vector between ray origin and line start
    const startDiff = vec_1.vec3.sub(line.start, ray.origin);
    // Calculate triple products
    const normal = vec_1.vec3.cross(rayDir, lineDir);
    const normalLengthSq = vec_1.vec3.dot(normal, normal);
    // If normal is zero, ray and line are parallel
    if (normalLengthSq < constants.EPSILON) {
        // Check if they are collinear
        const crossOrigins = vec_1.vec3.cross(startDiff, rayDir);
        if (vec_1.vec3.len(crossOrigins) < constants.EPSILON) {
            // They are collinear - find closest point on line to ray origin
            const t = vec_1.vec3.dot(startDiff, lineDir);
            if (t >= 0 && t <= lineLength) {
                return {
                    intersects: true,
                    intersectionPoint: vec_1.vec3.add(line.start, vec_1.vec3.mul(lineDir, t)),
                };
            }
        }
        return { intersects: false };
    }
    // Calculate parameters for closest points
    const c1 = vec_1.vec3.dot(startDiff, vec_1.vec3.cross(lineDir, normal)) / normalLengthSq;
    const c2 = vec_1.vec3.dot(startDiff, vec_1.vec3.cross(rayDir, normal)) / normalLengthSq;
    // Check if intersection occurs on ray and within line segment bounds
    if (c1 >= 0 && c2 >= 0 && c2 <= lineLength) {
        // Calculate closest points
        const pointOnRay = vec_1.vec3.add(ray.origin, vec_1.vec3.mul(rayDir, c1));
        const pointOnLine = vec_1.vec3.add(line.start, vec_1.vec3.mul(lineDir, c2));
        // Check if points are close enough to consider intersection
        const distance = vec_1.vec3.len(vec_1.vec3.sub(pointOnRay, pointOnLine));
        if (distance < constants.EPSILON) {
            // Use midpoint as intersection point
            return {
                intersects: true,
                intersectionPoint: vec_1.vec3.add(pointOnRay, vec_1.vec3.mul(vec_1.vec3.sub(pointOnLine, pointOnRay), 0.5)),
            };
        }
    }
    return { intersects: false };
}
/**
 * Check if a ray intersects a sphere
 */
function rayIntersectsSphere(ray, sphere) {
    // Normalize ray direction
    const rayDir = vec_1.vec3.nor(ray.direction);
    // Calculate vector from ray origin to sphere center
    const toCenter = vec_1.vec3.sub(sphere.position, ray.origin);
    // Calculate quadratic equation coefficients
    // a = dot(dir, dir) (should be 1 since dir is normalized)
    const a = vec_1.vec3.dot(rayDir, rayDir);
    // b = 2 * dot(dir, (origin - center))
    const b = 2 * vec_1.vec3.dot(rayDir, vec_1.vec3.mul(toCenter, -1));
    // c = dot((origin - center), (origin - center)) - radius²
    const c = vec_1.vec3.dot(toCenter, toCenter) - sphere.radius * sphere.radius;
    // Solve quadratic equation using discriminant
    const discriminant = b * b - 4 * a * c;
    // No intersection if discriminant is negative
    if (discriminant < -constants.EPSILON) {
        return { intersects: false };
    }
    // Handle case where ray just touches sphere (discriminant ≈ 0)
    if (Math.abs(discriminant) < constants.EPSILON) {
        const t = -b / (2 * a);
        if (t >= 0) {
            const point = vec_1.vec3.add(ray.origin, vec_1.vec3.mul(rayDir, t));
            return {
                intersects: true,
                intersectionPoints: [point],
            };
        }
        return { intersects: false };
    }
    // Calculate intersection points for discriminant > 0
    const sqrtDiscriminant = Math.sqrt(discriminant);
    const t1 = (-b - sqrtDiscriminant) / (2 * a);
    const t2 = (-b + sqrtDiscriminant) / (2 * a);
    // If both t values are negative, ray points away from sphere
    if (t2 < 0) {
        return { intersects: false };
    }
    // Calculate intersection points for positive t values
    const intersectionPoints = [];
    if (t1 >= 0) {
        intersectionPoints.push(vec_1.vec3.add(ray.origin, vec_1.vec3.mul(rayDir, t1)));
    }
    if (t2 >= 0) {
        intersectionPoints.push(vec_1.vec3.add(ray.origin, vec_1.vec3.mul(rayDir, t2)));
    }
    return {
        intersects: intersectionPoints.length > 0,
        intersectionPoints: intersectionPoints.length > 0 ? intersectionPoints : undefined,
    };
}
/**
 * Check if a ray intersects a plane
 */
function rayIntersectsPlane(ray, plane) {
    // Normalize the ray direction and plane normal
    const rayDir = vec_1.vec3.nor(ray.direction);
    const planeNormal = vec_1.vec3.nor(plane.normal);
    // Calculate denominator (dot product of ray direction and plane normal)
    const denominator = vec_1.vec3.dot(rayDir, planeNormal);
    // If denominator is close to 0, ray is parallel to plane
    if (Math.abs(denominator) < constants.EPSILON) {
        // Check if the ray lies in the plane (origin is on the plane)
        const distanceToPlane = vec_1.vec3.dot(vec_1.vec3.sub(ray.origin, plane.point), planeNormal);
        if (Math.abs(distanceToPlane) < constants.EPSILON) {
            // Ray lies in the plane: infinite intersection points
            return { intersects: true };
        }
        // Ray is parallel and not on the plane
        return { intersects: false };
    }
    // Calculate distance from ray origin to plane
    const t = vec_1.vec3.dot(vec_1.vec3.sub(plane.point, ray.origin), planeNormal) / denominator;
    // If t is negative, intersection is behind ray origin
    if (t < 0) {
        return { intersects: false };
    }
    // Calculate intersection point
    const intersectionPoint = vec_1.vec3.add(ray.origin, vec_1.vec3.mul(rayDir, t));
    return {
        intersects: true,
        intersectionPoint,
    };
}
/**
 * Check if a ray intersects a cuboid
 */
function rayIntersectsCuboid(ray, cuboid) {
    // Normalize ray direction
    const rayDir = vec_1.vec3.nor(ray.direction);
    // Extract cuboid properties with default rotation
    const { position, size, rotation = (0, vec_1.vec3)() } = cuboid;
    // Transform ray to local space if cuboid is rotated
    let localRayOrigin = vec_1.vec3.sub(ray.origin, position);
    let localRayDir = rayDir;
    if (cuboidIsRotated(cuboid)) {
        // Undo rotation by applying inverse rotation to ray
        const inverseRotation = vec_1.vec3.mul(rotation, -1);
        localRayOrigin = vec_1.vec3.rota(localRayOrigin, inverseRotation);
        localRayDir = vec_1.vec3.rota(localRayDir, inverseRotation);
    }
    const halfSize = vec_1.vec3.div(size, 2);
    // Calculate intersection with each pair of parallel planes
    const txMin = vec_1.vec3.div(vec_1.vec3.sub(vec_1.vec3.mul(halfSize, -1), localRayOrigin), localRayDir);
    const txMax = vec_1.vec3.div(vec_1.vec3.sub(halfSize, localRayOrigin), localRayDir);
    // Find the farthest near intersection and the closest far intersection
    const tNear = (0, vec_1.vec3)(Math.min(txMin.x, txMax.x), Math.min(txMin.y, txMax.y), Math.min(txMin.z, txMax.z));
    const tFar = (0, vec_1.vec3)(Math.max(txMin.x, txMax.x), Math.max(txMin.y, txMax.y), Math.max(txMin.z, txMax.z));
    // If the largest tNear is greater than the smallest tFar, there is no
    // intersection
    const tMin = Math.max(tNear.x, tNear.y, tNear.z);
    const tMax = Math.min(tFar.x, tFar.y, tFar.z);
    if (tMin > tMax || tMax < 0) {
        return { intersects: false };
    }
    // Calculate intersection points
    const intersectionPoints = [];
    // Add entry point if it's in front of ray origin
    if (tMin >= 0) {
        let point = vec_1.vec3.add(localRayOrigin, vec_1.vec3.mul(localRayDir, tMin));
        if (cuboidIsRotated(cuboid)) {
            point = vec_1.vec3.rota(point, rotation);
        }
        intersectionPoints.push(vec_1.vec3.add(position, point));
    }
    // Add exit point if different from entry point
    if (tMax > tMin && tMax >= 0) {
        let point = vec_1.vec3.add(localRayOrigin, vec_1.vec3.mul(localRayDir, tMax));
        if (cuboidIsRotated(cuboid)) {
            point = vec_1.vec3.rota(point, rotation);
        }
        intersectionPoints.push(vec_1.vec3.add(position, point));
    }
    return {
        intersects: intersectionPoints.length > 0,
        intersectionPoints: intersectionPoints.length > 0 ? intersectionPoints : undefined,
    };
}
/**
 * Check if a ray intersects a polygon
 */
function rayIntersectsPolygon(ray, polygon) {
    // First validate the polygon
    if (!polygonIsValid(polygon)) {
        return null;
    }
    // Calculate the plane of the polygon
    const [v1, v2, v3] = polygon.vertices;
    const edge1 = vec_1.vec3.sub(v2, v1);
    const edge2 = vec_1.vec3.sub(v3, v1);
    const normal = vec_1.vec3.nor(vec_1.vec3.cross(edge1, edge2));
    // Create a plane from the polygon
    const plane = {
        point: v1,
        normal,
    };
    // Check if the ray intersects the plane
    const intersection = rayIntersectsPlane(ray, plane);
    if (!intersection.intersects || !intersection.intersectionPoint) {
        return { intersects: false };
    }
    // Check if the intersection point is inside the polygon
    const pointCheck = pointOnPolygon(intersection.intersectionPoint, polygon);
    if (!pointCheck || !pointCheck.intersects) {
        return { intersects: false };
    }
    return {
        intersects: true,
        intersectionPoint: intersection.intersectionPoint,
    };
}
/**
 * Check if a ray intersects any of the polygons in a mesh
 */
function rayIntersectsMesh(ray, mesh) {
    const polygons = meshToPolygons(mesh);
    const intersectionPoints = [];
    polygons.forEach(polygon => {
        const intersection = rayIntersectsPolygon(ray, polygon);
        if (intersection && intersection.intersects) {
            intersectionPoints.push(intersection.intersectionPoint);
        }
    });
    return {
        intersects: intersectionPoints.length > 0,
        intersectionPoints: intersectionPoints.length > 0 ? intersectionPoints : undefined,
    };
}
/**
 * Check if a line segment intersects a ray
 */
function lineIntersectsRay(line, ray) {
    return rayIntersectsLine(ray, line);
}
/**
 * Check if two line segments intersect
 */
function lineIntersectsLine(lineA, lineB) {
    // Convert lines to direction vectors
    const dirA = vec_1.vec3.sub(lineA.end, lineA.start);
    const dirB = vec_1.vec3.sub(lineB.end, lineB.start);
    // Get line lengths
    const lengthA = vec_1.vec3.len(dirA);
    const lengthB = vec_1.vec3.len(dirB);
    // If either line has zero length, they cannot intersect
    if (lengthA < constants.EPSILON || lengthB < constants.EPSILON) {
        return { intersects: false };
    }
    // Normalize directions
    const normA = vec_1.vec3.div(dirA, lengthA);
    const normB = vec_1.vec3.div(dirB, lengthB);
    // Calculate vector between line starts
    const startDiff = vec_1.vec3.sub(lineB.start, lineA.start);
    // Calculate cross product of directions
    const normal = vec_1.vec3.cross(normA, normB);
    const normalLengthSq = vec_1.vec3.dot(normal, normal);
    // If normal is zero, lines are parallel
    if (normalLengthSq < constants.EPSILON) {
        // Check if they are collinear
        const crossStarts = vec_1.vec3.cross(startDiff, normA);
        if (vec_1.vec3.len(crossStarts) < constants.EPSILON) {
            // They are collinear - check for overlap
            const t0 = vec_1.vec3.dot(startDiff, normA);
            const t1 = t0 + vec_1.vec3.dot(dirB, normA);
            // Find overlap interval
            const tMin = Math.min(t0, t1);
            const tMax = Math.max(t0, t1);
            // Check if lines overlap
            if (tMin <= lengthA && tMax >= 0) {
                // Calculate intersection point at middle of overlap
                const t = (0, utils_1.clamp)(0, Math.max(0, tMin), lengthA);
                return {
                    intersects: true,
                    intersectionPoint: vec_1.vec3.add(lineA.start, vec_1.vec3.mul(normA, t)),
                };
            }
        }
        return { intersects: false };
    }
    // Calculate parameters for closest points
    const c1 = vec_1.vec3.dot(startDiff, vec_1.vec3.cross(dirB, normal)) / normalLengthSq;
    const c2 = vec_1.vec3.dot(startDiff, vec_1.vec3.cross(dirA, normal)) / normalLengthSq;
    // Check if closest points lie within line segments
    if (c1 >= 0 && c1 <= lengthA && c2 >= 0 && c2 <= lengthB) {
        // Calculate closest points
        const pointOnA = vec_1.vec3.add(lineA.start, vec_1.vec3.mul(normA, c1));
        const pointOnB = vec_1.vec3.add(lineB.start, vec_1.vec3.mul(normB, c2));
        // Check if points are close enough to consider intersection
        const distance = vec_1.vec3.len(vec_1.vec3.sub(pointOnA, pointOnB));
        if (distance < constants.EPSILON) {
            // Use midpoint as intersection point
            return {
                intersects: true,
                intersectionPoint: vec_1.vec3.add(pointOnA, vec_1.vec3.mul(vec_1.vec3.sub(pointOnB, pointOnA), 0.5)),
            };
        }
    }
    return { intersects: false };
}
/**
 * Check if a line segments intersects a sphere
 */
function lineIntersectsSphere(line, sphere) {
    // Calculate line direction and length
    const lineDir = vec_1.vec3.sub(line.end, line.start);
    const lineLength = vec_1.vec3.len(lineDir);
    // If line has zero length, treat as point-sphere intersection
    if (lineLength < constants.EPSILON) {
        const distance = vec_1.vec3.len(vec_1.vec3.sub(line.start, sphere.position));
        if (distance <= sphere.radius) {
            return {
                intersects: true,
                intersectionPoints: [line.start],
            };
        }
        return { intersects: false };
    }
    // Normalize line direction
    const normDir = vec_1.vec3.div(lineDir, lineLength);
    // Calculate vector from line start to sphere center
    const toCenter = vec_1.vec3.sub(sphere.position, line.start);
    // Calculate quadratic equation coefficients
    // a = dot(dir, dir) = 1 since dir is normalized
    const a = vec_1.vec3.dot(normDir, normDir);
    // b = 2 * dot(dir, (start - center))
    const b = 2 * vec_1.vec3.dot(normDir, vec_1.vec3.mul(toCenter, -1));
    // c = dot((start - center), (start - center)) - radius²
    const c = vec_1.vec3.dot(toCenter, toCenter) - sphere.radius * sphere.radius;
    // Solve quadratic equation using discriminant
    const discriminant = b * b - 4 * a * c;
    // No intersection if discriminant is negative
    if (discriminant < -constants.EPSILON) {
        return { intersects: false };
    }
    // Handle case where line just touches sphere (discriminant ≈ 0)
    if (Math.abs(discriminant) < constants.EPSILON) {
        const t = -b / (2 * a);
        if (t >= 0 && t <= lineLength) {
            const point = vec_1.vec3.add(line.start, vec_1.vec3.mul(normDir, t));
            return {
                intersects: true,
                intersectionPoints: [point],
            };
        }
        return { intersects: false };
    }
    // Calculate intersection points for discriminant > 0
    const sqrtDiscriminant = Math.sqrt(discriminant);
    const t1 = (-b - sqrtDiscriminant) / (2 * a);
    const t2 = (-b + sqrtDiscriminant) / (2 * a);
    // Collect intersection points that lie within line segment
    const intersectionPoints = [];
    if (t1 >= 0 && t1 <= lineLength) {
        intersectionPoints.push(vec_1.vec3.add(line.start, vec_1.vec3.mul(normDir, t1)));
    }
    if (t2 >= 0 && t2 <= lineLength) {
        intersectionPoints.push(vec_1.vec3.add(line.start, vec_1.vec3.mul(normDir, t2)));
    }
    return {
        intersects: intersectionPoints.length > 0,
        intersectionPoints: intersectionPoints.length > 0 ? intersectionPoints : undefined,
    };
}
/**
 * Check if a line segments intersects a plane
 */
function lineIntersectsPlane(line, plane) {
    // Convert line to direction vector
    const lineDir = vec_1.vec3.sub(line.end, line.start);
    const lineLength = vec_1.vec3.len(lineDir);
    // If the line has zero length, it cannot intersect
    if (lineLength < constants.EPSILON) {
        return { intersects: false };
    }
    // Normalize line direction
    const normDir = vec_1.vec3.div(lineDir, lineLength);
    // Calculate denominator (dot product of line direction and plane normal)
    const denominator = vec_1.vec3.dot(normDir, plane.normal);
    // If denominator is close to 0, line is parallel to plane
    if (Math.abs(denominator) < constants.EPSILON) {
        // Check if the line start is on the plane
        const distanceToPlane = vec_1.vec3.dot(vec_1.vec3.sub(line.start, plane.point), plane.normal);
        if (Math.abs(distanceToPlane) < constants.EPSILON) {
            // Line lies in the plane: infinite intersection points
            return { intersects: true };
        }
        // Line is parallel and not on the plane
        return { intersects: false };
    }
    // Calculate distance from line start to plane
    const t = vec_1.vec3.dot(vec_1.vec3.sub(plane.point, line.start), plane.normal) / denominator;
    // If t is negative or greater than line length, intersection is outside of
    // the line segment
    if (t < 0 || t > lineLength) {
        return { intersects: false };
    }
    // Calculate intersection point
    const intersectionPoint = vec_1.vec3.add(line.start, vec_1.vec3.mul(normDir, t));
    return {
        intersects: true,
        intersectionPoint,
    };
}
/**
 * Check if a line segment intersects a cuboid
 */
function lineIntersectsCuboid(line, cuboid) {
    // Get line direction and length
    const lineDir = vec_1.vec3.sub(line.end, line.start);
    const lineLength = vec_1.vec3.len(lineDir);
    // If line has zero length, treat as point-cuboid intersection
    if (lineLength < constants.EPSILON) {
        const result = pointInCuboid(line.start, cuboid);
        return {
            intersects: result.intersects,
            intersectionPoints: result.intersects ? [line.start] : undefined,
        };
    }
    // Normalize line direction
    const normDir = vec_1.vec3.div(lineDir, lineLength);
    // Extract cuboid properties with default rotation
    const { position, size, rotation = (0, vec_1.vec3)() } = cuboid;
    // Transform line to local space if cuboid is rotated
    let localLineStart = vec_1.vec3.sub(line.start, position);
    let localLineDir = normDir;
    if (cuboidIsRotated(cuboid)) {
        // Undo rotation by applying inverse rotation
        const inverseRotation = vec_1.vec3.mul(rotation, -1);
        localLineStart = vec_1.vec3.rota(localLineStart, inverseRotation);
        localLineDir = vec_1.vec3.rota(localLineDir, inverseRotation);
    }
    const halfSize = vec_1.vec3.div(size, 2);
    // Calculate intersection with each pair of parallel planes
    const txMin = vec_1.vec3.div(vec_1.vec3.sub(vec_1.vec3.mul(halfSize, -1), localLineStart), localLineDir);
    const txMax = vec_1.vec3.div(vec_1.vec3.sub(halfSize, localLineStart), localLineDir);
    // Find the farthest near intersection and the closest far intersection
    const tNear = (0, vec_1.vec3)(Math.min(txMin.x, txMax.x), Math.min(txMin.y, txMax.y), Math.min(txMin.z, txMax.z));
    const tFar = (0, vec_1.vec3)(Math.max(txMin.x, txMax.x), Math.max(txMin.y, txMax.y), Math.max(txMin.z, txMax.z));
    // Find the latest entry and earliest exit
    const tMin = Math.max(tNear.x, tNear.y, tNear.z);
    const tMax = Math.min(tFar.x, tFar.y, tFar.z);
    // If the entry is after the exit, or the exit is before the start of the
    // line, or the entry is after the end of the line, there is no intersection
    if (tMin > tMax || tMax < 0 || tMin > lineLength) {
        return { intersects: false };
    }
    // Calculate intersection points
    const intersectionPoints = [];
    // Add entry point if it's within line segment
    if (tMin >= 0 && tMin <= lineLength) {
        let point = vec_1.vec3.add(localLineStart, vec_1.vec3.mul(localLineDir, tMin));
        if (cuboidIsRotated(cuboid)) {
            point = vec_1.vec3.rota(point, rotation);
        }
        intersectionPoints.push(vec_1.vec3.add(position, point));
    }
    // Add exit point if it's different from entry point and within line segment
    if (tMax > tMin && tMax >= 0 && tMax <= lineLength) {
        let point = vec_1.vec3.add(localLineStart, vec_1.vec3.mul(localLineDir, tMax));
        if (cuboidIsRotated(cuboid)) {
            point = vec_1.vec3.rota(point, rotation);
        }
        intersectionPoints.push(vec_1.vec3.add(position, point));
    }
    return {
        intersects: intersectionPoints.length > 0,
        intersectionPoints: intersectionPoints.length > 0 ? intersectionPoints : undefined,
    };
}
/**
 * Check if a line segment intersects a polygon
 */
function lineIntersectsPolygon(line, polygon) {
    // First validate the polygon
    if (!polygonIsValid(polygon)) {
        return { intersects: false };
    }
    // Calculate the plane of the polygon
    const [v1, v2, v3] = polygon.vertices;
    const edge1 = vec_1.vec3.sub(v2, v1);
    const edge2 = vec_1.vec3.sub(v3, v1);
    const normal = vec_1.vec3.nor(vec_1.vec3.cross(edge1, edge2));
    // Create a plane from the polygon
    const plane = {
        point: v1,
        normal,
    };
    // Check if the line intersects the plane
    const intersection = lineIntersectsPlane(line, plane);
    if (!intersection.intersects || !intersection.intersectionPoint) {
        return { intersects: false };
    }
    // Check if the intersection point is inside the polygon
    const pointCheck = pointOnPolygon(intersection.intersectionPoint, polygon);
    if (!pointCheck || !pointCheck.intersects) {
        return { intersects: false };
    }
    return {
        intersects: true,
        intersectionPoint: intersection.intersectionPoint,
    };
}
/**
 * Check if a line segment intersects a cuboid
 */
function lineIntersectsMesh(line, mesh) {
    const polygons = meshToPolygons(mesh);
    const intersectionPoints = [];
    polygons.forEach(polygon => {
        const intersection = lineIntersectsPolygon(line, polygon);
        if (intersection && intersection.intersects) {
            intersectionPoints.push(intersection.intersectionPoint);
        }
    });
    return {
        intersects: intersectionPoints.length > 0,
        intersectionPoints: intersectionPoints.length > 0 ? intersectionPoints : undefined,
    };
}
/**
 * Check if two spheres intersect
 */
function sphereIntersectsSphere(sphereA, sphereB) {
    // Calculate vector from center of sphere A to center of sphere B
    const centerToCenter = vec_1.vec3.sub(sphereB.position, sphereA.position);
    // Calculate actual distance between centers
    const distance = vec_1.vec3.len(centerToCenter);
    // Calculate sum of radii
    const radiiSum = sphereA.radius + sphereB.radius;
    // If distance is greater than sum of radii, spheres don't intersect
    if (distance > radiiSum) {
        return { intersects: false };
    }
    // If distance is zero, spheres are concentric
    if (distance < constants.EPSILON) {
        return {
            intersects: true,
            intersectionPoint: sphereA.position,
            penetrationDepth: radiiSum,
            normal: (0, vec_1.vec3)(1, 0, 0), // Arbitrary normal for concentric spheres
            contactPoints: {
                sphereA: vec_1.vec3.add(sphereA.position, (0, vec_1.vec3)(sphereA.radius, 0, 0)),
                sphereB: vec_1.vec3.add(sphereB.position, (0, vec_1.vec3)(sphereB.radius, 0, 0)),
            },
        };
    }
    // Calculate normalized direction from sphere A to sphere B
    const normal = vec_1.vec3.nor(centerToCenter);
    // Calculate penetration depth
    const penetrationDepth = radiiSum - distance;
    // Calculate intersection center point (halfway between surface intersection
    // points)
    const intersectionPoint = vec_1.vec3.add(sphereA.position, vec_1.vec3.mul(normal, sphereA.radius + penetrationDepth / 2));
    // Calculate contact points on each sphere's surface
    const contactPoints = {
        sphereA: vec_1.vec3.add(sphereA.position, vec_1.vec3.mul(normal, sphereA.radius)),
        sphereB: vec_1.vec3.add(sphereB.position, vec_1.vec3.mul(normal, -sphereB.radius)),
    };
    return {
        intersects: true,
        intersectionPoint,
        penetrationDepth,
        normal,
        contactPoints,
    };
}
/**
 * Check if a sphere intersects a plane
 */
function sphereIntersectsPlane(sphere, plane) {
    // Normalize the plane normal
    const normal = vec_1.vec3.nor(plane.normal);
    // Calculate signed distance from sphere center to plane
    const signedDistance = vec_1.vec3.dot(vec_1.vec3.sub(sphere.position, plane.point), normal);
    // If the distance is greater than sphere radius, no intersection
    if (Math.abs(signedDistance) > sphere.radius) {
        return { intersects: false };
    }
    // Calculate penetration depth
    const penetrationDepth = sphere.radius - Math.abs(signedDistance);
    // Calculate intersection point (center of intersection circle)
    // This is the projection of the sphere's center onto the plane
    const intersectionPoint = vec_1.vec3.sub(sphere.position, vec_1.vec3.mul(normal, signedDistance));
    // Calculate radius of intersection circle using Pythagorean theorem
    const intersectionRadius = Math.sqrt(sphere.radius * sphere.radius - signedDistance * signedDistance);
    return {
        intersects: true,
        intersectionPoint,
        penetrationDepth,
        intersectionRadius,
    };
}
/**
 * Check if a sphere intersects a cuboid
 */
function sphereIntersectsCuboid(sphere, cuboid) {
    const { position, size, rotation = (0, vec_1.vec3)() } = cuboid;
    const halfSize = vec_1.vec3.div(size, 2);
    // Transform sphere center to cuboid's local space
    let localSphereCenter = vec_1.vec3.sub(sphere.position, position);
    if (cuboidIsRotated(cuboid)) {
        localSphereCenter = vec_1.vec3.rota(localSphereCenter, vec_1.vec3.mul(rotation, -1));
    }
    // Find the closest point on the cuboid to the sphere center
    const closestLocalPoint = (0, vec_1.vec3)((0, utils_1.clamp)(localSphereCenter.x, -halfSize.x, halfSize.x), (0, utils_1.clamp)(localSphereCenter.y, -halfSize.y, halfSize.y), (0, utils_1.clamp)(localSphereCenter.z, -halfSize.z, halfSize.z));
    // Transform closest point back to world space
    let closestPoint = closestLocalPoint;
    if (cuboidIsRotated(cuboid)) {
        closestPoint = vec_1.vec3.rota(closestPoint, rotation);
    }
    closestPoint = vec_1.vec3.add(closestPoint, position);
    // Calculate vector from closest point to sphere center
    const separationVector = vec_1.vec3.sub(sphere.position, closestPoint);
    const distance = vec_1.vec3.len(separationVector);
    // If distance is greater than sphere radius, no intersection
    if (distance > sphere.radius) {
        return { intersects: false };
    }
    // Handle case where sphere center is exactly on cuboid surface
    if (distance < constants.EPSILON) {
        // Use vector from cuboid center to sphere center as normal
        let normal = vec_1.vec3.nor(vec_1.vec3.sub(sphere.position, position));
        const penetrationDepth = sphere.radius;
        return {
            intersects: true,
            intersectionPoint: sphere.position,
            penetrationDepth,
            normal,
            contactPoint: closestPoint,
        };
    }
    // Calculate normal and penetration depth
    const normal = vec_1.vec3.nor(separationVector);
    const penetrationDepth = sphere.radius - distance;
    // Calculate intersection point at center of intersection volume
    const intersectionPoint = vec_1.vec3.add(closestPoint, vec_1.vec3.mul(normal, penetrationDepth / 2));
    return {
        intersects: true,
        intersectionPoint,
        penetrationDepth,
        normal,
        contactPoint: closestPoint,
    };
}
/**
 * Check if a sphere intersects a polygon
 */
function sphereIntersectsPolygon(sphere, polygon) {
    // First validate the polygon
    if (!polygonIsValid(polygon)) {
        return null;
    }
    const [v1, v2, v3] = polygon.vertices;
    // Calculate polygon plane
    const edge1 = vec_1.vec3.sub(v2, v1);
    const edge2 = vec_1.vec3.sub(v3, v1);
    const normal = vec_1.vec3.nor(vec_1.vec3.cross(edge1, edge2));
    // Create plane from polygon
    const plane = {
        point: v1,
        normal,
    };
    // Check sphere-plane intersection first
    const planeIntersection = sphereIntersectsPlane(sphere, plane);
    if (!planeIntersection.intersects) {
        return { intersects: false };
    }
    // Check each vertex distance from sphere center
    const vertexDistances = polygon.vertices.map(vertex => vec_1.vec3.len(vec_1.vec3.sub(vertex, sphere.position)));
    // If all vertices are inside sphere, polygon is contained
    if (vertexDistances.every(dist => dist <= sphere.radius)) {
        return {
            intersects: true,
            intersectionPoint: planeIntersection.intersectionPoint,
            penetrationDepth: sphere.radius,
        };
    }
    // Create polygon edges
    const edges = [
        { start: v1, end: v2 },
        { start: v2, end: v3 },
        { start: v3, end: v1 },
    ];
    // Check each edge for intersection with sphere
    const polygonIntersectionPoints = [];
    edges.forEach(edge => {
        const lineIntersection = lineIntersectsSphere(edge, sphere);
        if (lineIntersection.intersects && lineIntersection.intersectionPoints) {
            // Only add points that lie on the polygon edges
            lineIntersection.intersectionPoints.forEach(point => {
                const onLine = pointOnLine(point, edge);
                if (onLine.intersects) {
                    polygonIntersectionPoints.push(point);
                }
            });
        }
    });
    // Check if sphere center projects onto polygon
    const projectedCenter = pointOnPolygon(sphere.position, polygon);
    if (projectedCenter && projectedCenter.intersects) {
        const distance = vec_1.vec3.len(vec_1.vec3.sub(sphere.position, projectedCenter.closestPoint));
        if (distance <= sphere.radius) {
            return {
                intersects: true,
                intersectionPoint: projectedCenter.closestPoint,
                penetrationDepth: sphere.radius - distance,
                polygonIntersectionPoints: polygonIntersectionPoints.length > 0
                    ? polygonIntersectionPoints
                    : undefined,
            };
        }
    }
    // If we have intersection points but no center projection,
    // use the midpoint of intersection points as intersection point
    if (polygonIntersectionPoints.length > 0) {
        const midPoint = vec_1.vec3.div(polygonIntersectionPoints.reduce((sum, p) => vec_1.vec3.add(sum, p), (0, vec_1.vec3)()), polygonIntersectionPoints.length);
        return {
            intersects: true,
            intersectionPoint: midPoint,
            penetrationDepth: sphere.radius - vec_1.vec3.len(vec_1.vec3.sub(midPoint, sphere.position)),
            polygonIntersectionPoints: polygonIntersectionPoints,
        };
    }
    // No intersection found
    return { intersects: false };
}
/**
 * Check if a sphere intersects any polygon in a mesh
 */
function sphereIntersectsMesh(sphere, mesh) {
    const polygons = meshToPolygons(mesh);
    let intersects = false;
    const intersectionPoints = [];
    const polygonIntersectionPoints = [];
    polygons.forEach(polygon => {
        const intersection = sphereIntersectsPolygon(sphere, polygon);
        if (intersection && intersection.intersects) {
            intersects = true;
            intersectionPoints.push(intersection.intersectionPoint);
            if (intersection.polygonIntersectionPoints) {
                polygonIntersectionPoints.push(...intersection.polygonIntersectionPoints);
            }
        }
    });
    return {
        intersects,
        intersectionPoints: intersectionPoints.length > 0 ? intersectionPoints : undefined,
        polygonIntersectionPoints: polygonIntersectionPoints.length > 0
            ? polygonIntersectionPoints
            : undefined,
    };
}
/**
 * Check if two planes intersect
 *
 * Based on the algorithm described in "Real-Time Collision Detection" by
 * Christer Ericson
 */
function planeIntersectsPlane(planeA, planeB) {
    // Normalize plane normals
    const normalA = vec_1.vec3.nor(planeA.normal);
    const normalB = vec_1.vec3.nor(planeB.normal);
    // Calculate direction of intersection line using cross product
    const direction = vec_1.vec3.cross(normalA, normalB);
    const directionLengthSq = vec_1.vec3.dot(direction, direction);
    // If direction length is almost zero, planes are parallel
    if (directionLengthSq < constants.EPSILON) {
        // Check if planes are coincident by comparing distance from one plane's point to other plane
        const signedDistance = vec_1.vec3.dot(vec_1.vec3.sub(planeB.point, planeA.point), normalA);
        // If distance is effectively zero, planes are coincident
        if (Math.abs(signedDistance) < constants.EPSILON) {
            return {
                intersects: true, // Coincident planes have infinite intersection
            };
        }
        // Planes are parallel with gap between them
        return {
            intersects: false,
        };
    }
    // Planes intersect along a line
    // Calculate a point on the intersection line using:
    // point = (b₂n₁ - b₁n₂) × (n₁ × n₂) / |n₁ × n₂|²
    // where b₁, b₂ are the plane constants (d in ax + by + cz + d = 0 form)
    // and n₁, n₂ are the plane normals
    const b1 = -vec_1.vec3.dot(normalA, planeA.point);
    const b2 = -vec_1.vec3.dot(normalB, planeB.point);
    const point = vec_1.vec3.div(vec_1.vec3.cross(vec_1.vec3.sub(vec_1.vec3.mul(normalA, b2), vec_1.vec3.mul(normalB, b1)), direction), directionLengthSq);
    return {
        intersects: true,
        intersectionLine: {
            start: point,
            end: vec_1.vec3.add(point, direction),
        },
    };
}
/**
 * Check if a plane intersects one or more polygons in a mesh
 */
function planeIntersectsMesh(plane, mesh) {
    return meshIntersectsPlane(mesh, plane);
}
/**
 * Check if two cuboids intersect using the Separating Axis Theorem
 */
function cuboidIntersectsCuboid(cuboidA, cuboidB) {
    // Extract properties with default rotations
    const { position: posA, size: sizeA, rotation: rotationA = (0, vec_1.vec3)() } = cuboidA;
    const { position: posB, size: sizeB, rotation: rotationB = (0, vec_1.vec3)() } = cuboidB;
    // Calculate half-sizes
    const halfSizeA = vec_1.vec3.div(sizeA, 2);
    const halfSizeB = vec_1.vec3.div(sizeB, 2);
    // Get rotation matrices for both cuboids
    const rotMatA = cuboidIsRotated(cuboidA)
        ? getRotationMatrix(rotationA)
        : null;
    const rotMatB = cuboidIsRotated(cuboidB)
        ? getRotationMatrix(rotationB)
        : null;
    // Get cuboid axes (face normals)
    const axesA = getRotatedAxes(rotMatA);
    const axesB = getRotatedAxes(rotMatB);
    // Vector between cuboid centers
    const centerDiff = vec_1.vec3.sub(posB, posA);
    // Test all 15 potential separating axes:
    // - 3 from cuboid A's face normals
    // - 3 from cuboid B's face normals
    // - 9 from cross products of edges (3x3)
    const axes = [...axesA, ...axesB, ...getCrossProductAxes(axesA, axesB)];
    let minPenetration = Infinity;
    let separationAxis = null;
    // Test each axis
    for (const axis of axes) {
        const axisLength = vec_1.vec3.len(axis);
        if (axisLength < constants.EPSILON)
            continue;
        // Normalize axis
        const normAxis = vec_1.vec3.div(axis, axisLength);
        // Project center-to-center vector onto axis
        const centerProj = vec_1.vec3.dot(centerDiff, normAxis);
        // Project both cuboids onto axis
        const projA = projectCuboid(halfSizeA, rotMatA, normAxis);
        const projB = projectCuboid(halfSizeB, rotMatB, normAxis);
        // Calculate penetration depth along this axis
        const penetration = projA + projB - Math.abs(centerProj);
        // If there's a gap, cuboids are separated
        if (penetration <= 0) {
            return { intersects: false };
        }
        // Track minimum penetration and its axis
        if (penetration < minPenetration) {
            minPenetration = penetration;
            separationAxis = normAxis;
        }
    }
    // If we get here, no separating axis was found - cuboids intersect
    if (!separationAxis) {
        return { intersects: true };
    }
    // Ensure normal points from A to B
    const normal = vec_1.vec3.dot(centerDiff, separationAxis) < 0
        ? vec_1.vec3.mul(separationAxis, -1)
        : separationAxis;
    // Calculate contact points on each cuboid's surface
    const contactA = getContactPoint(cuboidA, normal);
    const contactB = getContactPoint(cuboidB, vec_1.vec3.mul(normal, -1));
    // Calculate intersection point halfway between contacts
    const intersectionPoint = vec_1.vec3.add(contactA, vec_1.vec3.mul(vec_1.vec3.sub(contactB, contactA), 0.5));
    return {
        intersects: true,
        intersectionPoint,
        penetrationDepth: minPenetration,
        normal,
        contactPoints: {
            cuboidA: contactA,
            cuboidB: contactB,
        },
    };
}
/**
 * Helper function to create a rotation matrix from Euler angles
 */
function getRotationMatrix(rotation) {
    const cx = Math.cos(rotation.x);
    const cy = Math.cos(rotation.y);
    const cz = Math.cos(rotation.z);
    const sx = Math.sin(rotation.x);
    const sy = Math.sin(rotation.y);
    const sz = Math.sin(rotation.z);
    return [
        (0, vec_1.vec3)(cy * cz, cy * sz, -sy),
        (0, vec_1.vec3)(sx * sy * cz - cx * sz, sx * sy * sz + cx * cz, sx * cy),
        (0, vec_1.vec3)(cx * sy * cz + sx * sz, cx * sy * sz - sx * cz, cx * cy),
    ];
}
/**
 * Helper function to get rotated axes for a cuboid
 */
function getRotatedAxes(rotationMatrix) {
    if (!rotationMatrix) {
        return [(0, vec_1.vec3)(1, 0, 0), (0, vec_1.vec3)(0, 1, 0), (0, vec_1.vec3)(0, 0, 1)];
    }
    return rotationMatrix;
}
/**
 * Helper function to generate cross product axes
 */
function getCrossProductAxes(axesA, axesB) {
    const crossAxes = [];
    for (const axisA of axesA) {
        for (const axisB of axesB) {
            crossAxes.push(vec_1.vec3.cross(axisA, axisB));
        }
    }
    return crossAxes;
}
/**
 * Helper function to project cuboid onto axis
 */
function projectCuboid(halfSize, rotationMatrix, axis) {
    let projection = 0;
    if (!rotationMatrix) {
        // Unrotated cuboid - just sum up the components
        projection =
            Math.abs(halfSize.x * axis.x) +
                Math.abs(halfSize.y * axis.y) +
                Math.abs(halfSize.z * axis.z);
    }
    else {
        // Rotated cuboid - need to account for rotation
        projection =
            Math.abs(vec_1.vec3.dot(vec_1.vec3.mul(rotationMatrix[0], halfSize.x), axis)) +
                Math.abs(vec_1.vec3.dot(vec_1.vec3.mul(rotationMatrix[1], halfSize.y), axis)) +
                Math.abs(vec_1.vec3.dot(vec_1.vec3.mul(rotationMatrix[2], halfSize.z), axis));
    }
    return projection;
}
/**
 * Helper function to get contact point on cuboid surface
 */
function getContactPoint(cuboid, normal) {
    const vertices = cuboidVertices(cuboid);
    let maxProj = -Infinity;
    let contactPoint = vertices[0];
    // Find vertex with maximum projection along normal
    for (const vertex of vertices) {
        const proj = vec_1.vec3.dot(vertex, normal);
        if (proj > maxProj) {
            maxProj = proj;
            contactPoint = vertex;
        }
    }
    return contactPoint;
}
/**
 * Check if a cuboid intersects a plane
 */
function cuboidIntersectsPlane(cuboid, plane) {
    // Get cuboid faces as triangles
    const polygons = cuboidToPolygons(cuboid);
    const allIntersectionPoints = [];
    // Track vertices on each side of the plane for penetration depth calculation
    const normalizedPlaneNormal = vec_1.vec3.nor(plane.normal);
    let maxPenetration = -Infinity;
    let minPenetration = Infinity;
    // Check each vertex's signed distance to plane
    const vertices = cuboidVertices(cuboid);
    vertices.forEach(vertex => {
        const signedDistance = vec_1.vec3.dot(vec_1.vec3.sub(vertex, plane.point), normalizedPlaneNormal);
        maxPenetration = Math.max(maxPenetration, signedDistance);
        minPenetration = Math.min(minPenetration, signedDistance);
    });
    // Check each polygon for intersection
    for (const polygon of polygons) {
        const intersection = polygonIntersectsPlane(polygon, plane);
        if (intersection === null || intersection === void 0 ? void 0 : intersection.intersects) {
            // If polygon has specific intersection points, add them
            if (intersection.intersectionPoints) {
                intersection.intersectionPoints.forEach(point => {
                    // Check if point is already in list (within epsilon)
                    const isDuplicate = allIntersectionPoints.some(existing => vec_1.vec3.len(vec_1.vec3.sub(existing, point)) < constants.EPSILON);
                    if (!isDuplicate) {
                        allIntersectionPoints.push(point);
                    }
                });
            }
        }
    }
    // Calculate penetration depth
    // If min and max penetrations have different signs, cuboid straddles the
    // plane. Otherwise, penetration is the minimum absolute distance to plane
    let penetrationDepth;
    if (minPenetration * maxPenetration <= 0) {
        // Cuboid straddles plane - penetration is the larger absolute value
        penetrationDepth = Math.max(Math.abs(minPenetration), Math.abs(maxPenetration));
    }
    else if (Math.abs(maxPenetration) < Math.abs(minPenetration)) {
        // All vertices on positive side of plane
        penetrationDepth = Math.abs(maxPenetration);
    }
    else {
        // All vertices on negative side of plane
        penetrationDepth = Math.abs(minPenetration);
    }
    return {
        intersects: allIntersectionPoints.length > 0,
        intersectionPoints: allIntersectionPoints.length > 0 ? allIntersectionPoints : undefined,
        penetrationDepth: penetrationDepth,
    };
}
/**
 * Check if a cuboid intersects a polygon
 */
function cuboidIntersectsPolygon(cuboid, polygon) {
    // First validate the polygon
    if (!polygonIsValid(polygon)) {
        return null;
    }
    // Check if any polygon vertex is inside the cuboid
    const verticesInside = polygon.vertices.map(v => pointInCuboid(v, cuboid));
    if (verticesInside.every(result => result.intersects)) {
        // Polygon is entirely contained within cuboid
        return { intersects: true };
    }
    // Get cuboid vertices and check if any are on the polygon
    const cuboidVerticesArray = cuboidVertices(cuboid);
    const verticesOnPolygon = cuboidVerticesArray.map(v => pointOnPolygon(v, polygon));
    if (verticesOnPolygon.some(result => result === null || result === void 0 ? void 0 : result.intersects)) {
        // At least one cuboid vertex lies on the polygon
        // This likely means the polygon is coincident with a cuboid face
        return { intersects: true };
    }
    // Get cuboid edges
    const cuboidEdges = verticesToEdges(cuboidVerticesArray);
    const intersectionPoints = [];
    // Check each cuboid edge for intersection with the polygon
    for (const edge of cuboidEdges) {
        const intersection = lineIntersectsPolygon(edge, polygon);
        if (intersection &&
            intersection.intersects &&
            intersection.intersectionPoint) {
            // Check if this point is already in our list (within epsilon)
            const isDuplicate = intersectionPoints.some(existing => (0, utilities_1.vectorsAlmostEqual)(existing, intersection.intersectionPoint));
            if (!isDuplicate) {
                intersectionPoints.push(intersection.intersectionPoint);
            }
        }
    }
    // Get polygon edges and check against cuboid faces
    const polygonEdges = verticesToEdges(polygon.vertices);
    const cuboidPolygons = cuboidToPolygons(cuboid);
    // Check each polygon edge against each cuboid face
    for (const edge of polygonEdges) {
        for (const face of cuboidPolygons) {
            const intersection = lineIntersectsPolygon(edge, face);
            if (intersection &&
                intersection.intersects &&
                intersection.intersectionPoint) {
                // Check if this point is already in our list (within epsilon)
                const isDuplicate = intersectionPoints.some(existing => (0, utilities_1.vectorsAlmostEqual)(existing, intersection.intersectionPoint));
                if (!isDuplicate) {
                    intersectionPoints.push(intersection.intersectionPoint);
                }
            }
        }
    }
    return {
        intersects: intersectionPoints.length > 0 ||
            verticesInside.some(result => result.intersects) ||
            verticesOnPolygon.some(result => result === null || result === void 0 ? void 0 : result.intersects),
        intersectionPoints: intersectionPoints.length > 0 ? intersectionPoints : undefined,
    };
}
/**
 * Check if a cuboid intersects any polygon in a mesh
 */
function cuboidIntersectsMesh(cuboid, mesh) {
    const polygons = meshToPolygons(mesh);
    const intersectionPoints = [];
    // Check each polygon in the mesh against the cuboid
    for (const polygon of polygons) {
        const intersection = cuboidIntersectsPolygon(cuboid, polygon);
        if (intersection && intersection.intersects) {
            // If we have specific intersection points, add them
            if (intersection.intersectionPoints) {
                intersection.intersectionPoints.forEach(point => {
                    // Check if point is already in list (within epsilon)
                    const isDuplicate = intersectionPoints.some(existing => (0, utilities_1.vectorsAlmostEqual)(existing, point));
                    if (!isDuplicate) {
                        intersectionPoints.push(point);
                    }
                });
            }
            else {
                // If we don't have intersection points but we know there's an
                // intersection, we can early return since we know they intersect
                // (this happens when a polygon is inside the cuboid or coincident
                // with a face)
                return {
                    intersects: true,
                };
            }
        }
    }
    return {
        intersects: intersectionPoints.length > 0,
        intersectionPoints: intersectionPoints.length > 0 ? intersectionPoints : undefined,
    };
}
/**
 * Check if two polygons intersect
 */
function polygonIntersectsPolygon(polygonA, polygonB) {
    // First validate both polygons
    if (!polygonIsValid(polygonA) || !polygonIsValid(polygonB)) {
        return null;
    }
    // Create planes from both polygons
    const planeA = {
        point: polygonA.vertices[0],
        normal: vec_1.vec3.nor(vec_1.vec3.cross(vec_1.vec3.sub(polygonA.vertices[1], polygonA.vertices[0]), vec_1.vec3.sub(polygonA.vertices[2], polygonA.vertices[0]))),
    };
    const planeB = {
        point: polygonB.vertices[0],
        normal: vec_1.vec3.nor(vec_1.vec3.cross(vec_1.vec3.sub(polygonB.vertices[1], polygonB.vertices[0]), vec_1.vec3.sub(polygonB.vertices[2], polygonB.vertices[0]))),
    };
    // Check if planes intersect
    const planeIntersection = planeIntersectsPlane(planeA, planeB);
    // If planes don't intersect, polygons can't intersect
    if (!planeIntersection.intersects) {
        return { intersects: false };
    }
    // If planes are coincident, we need to check for polygon overlap
    if (!planeIntersection.intersectionLine) {
        // First check if any vertex of polygon A lies inside polygon B
        for (const vertex of polygonA.vertices) {
            const pointCheck = pointOnPolygon(vertex, polygonB);
            if (pointCheck === null || pointCheck === void 0 ? void 0 : pointCheck.intersects) {
                return { intersects: true }; // Coplanar overlap
            }
        }
        // Then check if any vertex of polygon B lies inside polygon A
        for (const vertex of polygonB.vertices) {
            const pointCheck = pointOnPolygon(vertex, polygonA);
            if (pointCheck === null || pointCheck === void 0 ? void 0 : pointCheck.intersects) {
                return { intersects: true }; // Coplanar overlap
            }
        }
        // No overlap found
        return { intersects: false };
    }
    // Get edges from both polygons
    const edgesA = verticesToEdges(polygonA.vertices);
    const edgesB = verticesToEdges(polygonB.vertices);
    const intersectionPoints = [];
    // Check each edge of polygon A against each edge of polygon B
    for (const edgeA of edgesA) {
        for (const edgeB of edgesB) {
            const intersection = lineIntersectsLine(edgeA, edgeB);
            if (intersection.intersects && intersection.intersectionPoint) {
                // Verify the intersection point lies on both edges
                const onEdgeA = pointOnLine(intersection.intersectionPoint, edgeA);
                const onEdgeB = pointOnLine(intersection.intersectionPoint, edgeB);
                if (onEdgeA.intersects && onEdgeB.intersects) {
                    // Check if this point is already in our list (within epsilon)
                    const isDuplicate = intersectionPoints.some(existing => vec_1.vec3.len(vec_1.vec3.sub(existing, intersection.intersectionPoint)) <
                        constants.EPSILON);
                    if (!isDuplicate) {
                        intersectionPoints.push(intersection.intersectionPoint);
                    }
                }
            }
        }
    }
    return {
        intersects: intersectionPoints.length > 0,
        intersectionPoints: intersectionPoints.length > 0 ? intersectionPoints : undefined,
    };
}
/**
 * Check if a polygon intersects a plane
 */
function polygonIntersectsPlane(polygon, plane) {
    // First validate the polygon
    if (!polygonIsValid(polygon)) {
        return null;
    }
    // Convert polygon vertices to edges
    const edges = verticesToEdges(polygon.vertices);
    const intersectionPoints = [];
    let edgeInPlane = false;
    // Check each edge for intersection with the plane
    for (const edge of edges) {
        const intersection = lineIntersectsPlane(edge, plane);
        if (intersection.intersects) {
            if (intersection.intersectionPoint) {
                // Edge intersects plane at a point
                intersectionPoints.push(intersection.intersectionPoint);
            }
            else {
                // Edge lies in the plane
                edgeInPlane = true;
                break; // Early exit as polygon must lie in plane
            }
        }
    }
    // If any edge lies in the plane, the whole polygon must lie in the plane
    // (since we've verified it's a valid triangle)
    if (edgeInPlane) {
        return {
            intersects: true,
        };
    }
    // Remove duplicate intersection points (within epsilon)
    const uniquePoints = intersectionPoints.filter((point, index) => {
        return !intersectionPoints.some((p, i) => i < index && vec_1.vec3.len(vec_1.vec3.sub(p, point)) < constants.EPSILON);
    });
    return {
        intersects: uniquePoints.length > 0,
        intersectionPoints: uniquePoints.length > 0 ? uniquePoints : undefined,
    };
}
/**
 * Check if a polygon intersects any polygon in a mesh
 */
function polygonIntersectsMesh(polygon, mesh) {
    // First validate the polygon
    if (!polygonIsValid(polygon)) {
        return null;
    }
    const meshPolygons = meshToPolygons(mesh);
    const intersectionPoints = [];
    // Check the polygon against each mesh polygon
    for (const meshPolygon of meshPolygons) {
        const intersection = polygonIntersectsPolygon(polygon, meshPolygon);
        if (intersection && intersection.intersects) {
            // If we have intersection points, collect them
            if (intersection.intersectionPoints) {
                intersection.intersectionPoints.forEach(point => {
                    // Check if point is already in list (within epsilon)
                    const isDuplicate = intersectionPoints.some(existing => (0, utilities_1.vectorsAlmostEqual)(existing, point));
                    if (!isDuplicate) {
                        intersectionPoints.push(point);
                    }
                });
            }
            else {
                // If we have an intersection but no points, it means we have
                // coplanar overlapping polygons - we can return early
                return {
                    intersects: true,
                };
            }
        }
    }
    return {
        intersects: intersectionPoints.length > 0,
        intersectionPoints: intersectionPoints.length > 0 ? intersectionPoints : undefined,
    };
}
/**
 * Check if two meshes intersect using their polygons
 */
function meshIntersectsMesh(meshA, meshB) {
    const polygonsA = meshToPolygons(meshA);
    const polygonsB = meshToPolygons(meshB);
    const intersectionPoints = [];
    // Check each polygon in mesh A against each polygon in mesh B
    for (const polygonA of polygonsA) {
        for (const polygonB of polygonsB) {
            const intersection = polygonIntersectsPolygon(polygonA, polygonB);
            if (intersection && intersection.intersects) {
                if (intersection.intersectionPoints) {
                    intersection.intersectionPoints.forEach(point => {
                        // Check if point is already in list (within epsilon)
                        const isDuplicate = intersectionPoints.some(existing => vec_1.vec3.len(vec_1.vec3.sub(existing, point)) < constants.EPSILON);
                        if (!isDuplicate) {
                            intersectionPoints.push(point);
                        }
                    });
                }
            }
        }
    }
    return {
        intersects: intersectionPoints.length > 0,
        intersectionPoints: intersectionPoints.length > 0 ? intersectionPoints : undefined,
    };
}
/**
 * Check if any polygons in a mesh intersect a plane
 */
function meshIntersectsPlane(mesh, plane) {
    // Convert mesh to polygons
    const polygons = meshToPolygons(mesh);
    const allIntersectionPoints = [];
    // Track maximum penetration depth
    let maxPenetration = -Infinity;
    let minPenetration = Infinity;
    // Normalize plane normal for consistent signed distance calculations
    const normalizedPlaneNormal = vec_1.vec3.nor(plane.normal);
    // Check each vertex's signed distance to plane
    mesh.vertices.forEach(vertex => {
        const signedDistance = vec_1.vec3.dot(vec_1.vec3.sub(vertex, plane.point), normalizedPlaneNormal);
        maxPenetration = Math.max(maxPenetration, signedDistance);
        minPenetration = Math.min(minPenetration, signedDistance);
    });
    // Check each polygon for intersection
    let hasIntersection = false;
    for (const polygon of polygons) {
        const intersection = polygonIntersectsPlane(polygon, plane);
        if (intersection === null || intersection === void 0 ? void 0 : intersection.intersects) {
            hasIntersection = true;
            // If polygon has specific intersection points, add them
            if (intersection.intersectionPoints) {
                intersection.intersectionPoints.forEach(point => {
                    // Check if point is already in list (within epsilon)
                    const isDuplicate = allIntersectionPoints.some(existing => vec_1.vec3.len(vec_1.vec3.sub(existing, point)) < constants.EPSILON);
                    if (!isDuplicate) {
                        allIntersectionPoints.push(point);
                    }
                });
            }
        }
    }
    // Calculate penetration depth
    // If min and max penetrations have different signs, mesh straddles the plane
    // Otherwise, penetration is the minimum absolute distance to plane
    let penetrationDepth;
    if (minPenetration * maxPenetration <= 0) {
        // Mesh straddles plane - penetration is the larger absolute value
        penetrationDepth = Math.max(Math.abs(minPenetration), Math.abs(maxPenetration));
    }
    else if (Math.abs(maxPenetration) < Math.abs(minPenetration)) {
        // All vertices on positive side of plane
        penetrationDepth = Math.abs(maxPenetration);
    }
    else {
        // All vertices on negative side of plane
        penetrationDepth = Math.abs(minPenetration);
    }
    return {
        intersects: hasIntersection,
        intersectionPoints: allIntersectionPoints.length > 0 ? allIntersectionPoints : undefined,
        penetrationDepth: penetrationDepth,
    };
}


/***/ }),

/***/ "./src/3d/types.ts":
/*!*************************!*\
  !*** ./src/3d/types.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isPoint = isPoint;
exports.isRay = isRay;
exports.isLine = isLine;
exports.isSphere = isSphere;
exports.isAABB = isAABB;
exports.isCuboid = isCuboid;
exports.isPlane = isPlane;
exports.isPolygon = isPolygon;
exports.isMesh = isMesh;
const types_1 = __webpack_require__(/*! ../utilities/types */ "./src/utilities/types.ts");
/**
 * Type guard to check if a value is a Point
 */
function isPoint(value) {
    return (0, types_1.isVec3)(value);
}
/**
 * Check if a value is a Ray
 */
function isRay(value) {
    return (value &&
        typeof value === 'object' &&
        'origin' in value &&
        isPoint(value.origin) &&
        'direction' in value &&
        (0, types_1.isVec3)(value.direction));
}
/**
 * Check if a value is a Line
 */
function isLine(value) {
    return (value &&
        typeof value === 'object' &&
        'start' in value &&
        isPoint(value.start) &&
        'end' in value &&
        isPoint(value.end));
}
/**
 * Check if a value is a Sphere
 */
function isSphere(value) {
    return (value &&
        typeof value === 'object' &&
        'position' in value &&
        isPoint(value.position) &&
        'radius' in value &&
        typeof value.radius === 'number');
}
/**
 * Check if a value is an AABB
 */
function isAABB(value) {
    return (value &&
        typeof value === 'object' &&
        'position' in value &&
        isPoint(value.position) &&
        'size' in value &&
        (0, types_1.isVec3)(value.size));
}
/**
 * Check if a value is a Cuboid
 */
function isCuboid(value) {
    return (value &&
        typeof value === 'object' &&
        'position' in value &&
        isPoint(value.position) &&
        'size' in value &&
        (0, types_1.isVec3)(value.size) &&
        ('rotation' in value ? (0, types_1.isVec3)(value.rotation) : true));
}
/**
 * Check if a value is a Plane
 */
function isPlane(value) {
    return (value &&
        typeof value === 'object' &&
        'point' in value &&
        isPoint(value.point) &&
        'normal' in value &&
        (0, types_1.isVec3)(value.normal));
}
/**
 * Check if a value is a Polygon
 */
function isPolygon(value) {
    return (value &&
        typeof value === 'object' &&
        'vertices' in value &&
        Array.isArray(value.vertices) &&
        value.vertices.length === 3 &&
        value.vertices.every(isPoint) &&
        !('indices' in value));
}
/**
 * Check if a value is a Mesh
 */
function isMesh(value) {
    return (value &&
        typeof value === 'object' &&
        'vertices' in value &&
        Array.isArray(value.vertices) &&
        value.vertices.every(isPoint) &&
        'indices' in value &&
        Array.isArray(value.indices) &&
        value.indices.every((i) => typeof i === 'number'));
}


/***/ }),

/***/ "./src/utilities/constants.ts":
/*!************************************!*\
  !*** ./src/utilities/constants.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EPSILON = void 0;
exports.EPSILON = 1e-6;


/***/ }),

/***/ "./src/utilities/index.ts":
/*!********************************!*\
  !*** ./src/utilities/index.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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

"use strict";

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/3d/index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});