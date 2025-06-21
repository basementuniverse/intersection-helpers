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

/***/ "./node_modules/poly-decomp/src/index.js":
/*!***********************************************!*\
  !*** ./node_modules/poly-decomp/src/index.js ***!
  \***********************************************/
/***/ ((module) => {

module.exports = {
    decomp: polygonDecomp,
    quickDecomp: polygonQuickDecomp,
    isSimple: polygonIsSimple,
    removeCollinearPoints: polygonRemoveCollinearPoints,
    removeDuplicatePoints: polygonRemoveDuplicatePoints,
    makeCCW: polygonMakeCCW
};

/**
 * Compute the intersection between two lines.
 * @static
 * @method lineInt
 * @param  {Array}  l1          Line vector 1
 * @param  {Array}  l2          Line vector 2
 * @param  {Number} precision   Precision to use when checking if the lines are parallel
 * @return {Array}              The intersection point.
 */
function lineInt(l1,l2,precision){
    precision = precision || 0;
    var i = [0,0]; // point
    var a1, b1, c1, a2, b2, c2, det; // scalars
    a1 = l1[1][1] - l1[0][1];
    b1 = l1[0][0] - l1[1][0];
    c1 = a1 * l1[0][0] + b1 * l1[0][1];
    a2 = l2[1][1] - l2[0][1];
    b2 = l2[0][0] - l2[1][0];
    c2 = a2 * l2[0][0] + b2 * l2[0][1];
    det = a1 * b2 - a2*b1;
    if (!scalar_eq(det, 0, precision)) { // lines are not parallel
        i[0] = (b2 * c1 - b1 * c2) / det;
        i[1] = (a1 * c2 - a2 * c1) / det;
    }
    return i;
}

/**
 * Checks if two line segments intersects.
 * @method segmentsIntersect
 * @param {Array} p1 The start vertex of the first line segment.
 * @param {Array} p2 The end vertex of the first line segment.
 * @param {Array} q1 The start vertex of the second line segment.
 * @param {Array} q2 The end vertex of the second line segment.
 * @return {Boolean} True if the two line segments intersect
 */
function lineSegmentsIntersect(p1, p2, q1, q2){
	var dx = p2[0] - p1[0];
	var dy = p2[1] - p1[1];
	var da = q2[0] - q1[0];
	var db = q2[1] - q1[1];

	// segments are parallel
	if((da*dy - db*dx) === 0){
		return false;
	}

	var s = (dx * (q1[1] - p1[1]) + dy * (p1[0] - q1[0])) / (da * dy - db * dx);
	var t = (da * (p1[1] - q1[1]) + db * (q1[0] - p1[0])) / (db * dx - da * dy);

	return (s>=0 && s<=1 && t>=0 && t<=1);
}

/**
 * Get the area of a triangle spanned by the three given points. Note that the area will be negative if the points are not given in counter-clockwise order.
 * @static
 * @method area
 * @param  {Array} a
 * @param  {Array} b
 * @param  {Array} c
 * @return {Number}
 */
function triangleArea(a,b,c){
    return (((b[0] - a[0])*(c[1] - a[1]))-((c[0] - a[0])*(b[1] - a[1])));
}

function isLeft(a,b,c){
    return triangleArea(a,b,c) > 0;
}

function isLeftOn(a,b,c) {
    return triangleArea(a, b, c) >= 0;
}

function isRight(a,b,c) {
    return triangleArea(a, b, c) < 0;
}

function isRightOn(a,b,c) {
    return triangleArea(a, b, c) <= 0;
}

var tmpPoint1 = [],
    tmpPoint2 = [];

/**
 * Check if three points are collinear
 * @method collinear
 * @param  {Array} a
 * @param  {Array} b
 * @param  {Array} c
 * @param  {Number} [thresholdAngle=0] Threshold angle to use when comparing the vectors. The function will return true if the angle between the resulting vectors is less than this value. Use zero for max precision.
 * @return {Boolean}
 */
function collinear(a,b,c,thresholdAngle) {
    if(!thresholdAngle){
        return triangleArea(a, b, c) === 0;
    } else {
        var ab = tmpPoint1,
            bc = tmpPoint2;

        ab[0] = b[0]-a[0];
        ab[1] = b[1]-a[1];
        bc[0] = c[0]-b[0];
        bc[1] = c[1]-b[1];

        var dot = ab[0]*bc[0] + ab[1]*bc[1],
            magA = Math.sqrt(ab[0]*ab[0] + ab[1]*ab[1]),
            magB = Math.sqrt(bc[0]*bc[0] + bc[1]*bc[1]),
            angle = Math.acos(dot/(magA*magB));
        return angle < thresholdAngle;
    }
}

function sqdist(a,b){
    var dx = b[0] - a[0];
    var dy = b[1] - a[1];
    return dx * dx + dy * dy;
}

/**
 * Get a vertex at position i. It does not matter if i is out of bounds, this function will just cycle.
 * @method at
 * @param  {Number} i
 * @return {Array}
 */
function polygonAt(polygon, i){
    var s = polygon.length;
    return polygon[i < 0 ? i % s + s : i % s];
}

/**
 * Clear the polygon data
 * @method clear
 * @return {Array}
 */
function polygonClear(polygon){
    polygon.length = 0;
}

/**
 * Append points "from" to "to"-1 from an other polygon "poly" onto this one.
 * @method append
 * @param {Polygon} poly The polygon to get points from.
 * @param {Number}  from The vertex index in "poly".
 * @param {Number}  to The end vertex index in "poly". Note that this vertex is NOT included when appending.
 * @return {Array}
 */
function polygonAppend(polygon, poly, from, to){
    for(var i=from; i<to; i++){
        polygon.push(poly[i]);
    }
}

/**
 * Make sure that the polygon vertices are ordered counter-clockwise.
 * @method makeCCW
 */
function polygonMakeCCW(polygon){
    var br = 0,
        v = polygon;

    // find bottom right point
    for (var i = 1; i < polygon.length; ++i) {
        if (v[i][1] < v[br][1] || (v[i][1] === v[br][1] && v[i][0] > v[br][0])) {
            br = i;
        }
    }

    // reverse poly if clockwise
    if (!isLeft(polygonAt(polygon, br - 1), polygonAt(polygon, br), polygonAt(polygon, br + 1))) {
        polygonReverse(polygon);
        return true;
    } else {
        return false;
    }
}

/**
 * Reverse the vertices in the polygon
 * @method reverse
 */
function polygonReverse(polygon){
    var tmp = [];
    var N = polygon.length;
    for(var i=0; i!==N; i++){
        tmp.push(polygon.pop());
    }
    for(var i=0; i!==N; i++){
		polygon[i] = tmp[i];
    }
}

/**
 * Check if a point in the polygon is a reflex point
 * @method isReflex
 * @param  {Number}  i
 * @return {Boolean}
 */
function polygonIsReflex(polygon, i){
    return isRight(polygonAt(polygon, i - 1), polygonAt(polygon, i), polygonAt(polygon, i + 1));
}

var tmpLine1=[],
    tmpLine2=[];

/**
 * Check if two vertices in the polygon can see each other
 * @method canSee
 * @param  {Number} a Vertex index 1
 * @param  {Number} b Vertex index 2
 * @return {Boolean}
 */
function polygonCanSee(polygon, a,b) {
    var p, dist, l1=tmpLine1, l2=tmpLine2;

    if (isLeftOn(polygonAt(polygon, a + 1), polygonAt(polygon, a), polygonAt(polygon, b)) && isRightOn(polygonAt(polygon, a - 1), polygonAt(polygon, a), polygonAt(polygon, b))) {
        return false;
    }
    dist = sqdist(polygonAt(polygon, a), polygonAt(polygon, b));
    for (var i = 0; i !== polygon.length; ++i) { // for each edge
        if ((i + 1) % polygon.length === a || i === a){ // ignore incident edges
            continue;
        }
        if (isLeftOn(polygonAt(polygon, a), polygonAt(polygon, b), polygonAt(polygon, i + 1)) && isRightOn(polygonAt(polygon, a), polygonAt(polygon, b), polygonAt(polygon, i))) { // if diag intersects an edge
            l1[0] = polygonAt(polygon, a);
            l1[1] = polygonAt(polygon, b);
            l2[0] = polygonAt(polygon, i);
            l2[1] = polygonAt(polygon, i + 1);
            p = lineInt(l1,l2);
            if (sqdist(polygonAt(polygon, a), p) < dist) { // if edge is blocking visibility to b
                return false;
            }
        }
    }

    return true;
}

/**
 * Check if two vertices in the polygon can see each other
 * @method canSee2
 * @param  {Number} a Vertex index 1
 * @param  {Number} b Vertex index 2
 * @return {Boolean}
 */
function polygonCanSee2(polygon, a,b) {
    // for each edge
    for (var i = 0; i !== polygon.length; ++i) {
        // ignore incident edges
        if (i === a || i === b || (i + 1) % polygon.length === a || (i + 1) % polygon.length === b){
            continue;
        }
        if( lineSegmentsIntersect(polygonAt(polygon, a), polygonAt(polygon, b), polygonAt(polygon, i), polygonAt(polygon, i+1)) ){
            return false;
        }
    }
    return true;
}

/**
 * Copy the polygon from vertex i to vertex j.
 * @method copy
 * @param  {Number} i
 * @param  {Number} j
 * @param  {Polygon} [targetPoly]   Optional target polygon to save in.
 * @return {Polygon}                The resulting copy.
 */
function polygonCopy(polygon, i,j,targetPoly){
    var p = targetPoly || [];
    polygonClear(p);
    if (i < j) {
        // Insert all vertices from i to j
        for(var k=i; k<=j; k++){
            p.push(polygon[k]);
        }

    } else {

        // Insert vertices 0 to j
        for(var k=0; k<=j; k++){
            p.push(polygon[k]);
        }

        // Insert vertices i to end
        for(var k=i; k<polygon.length; k++){
            p.push(polygon[k]);
        }
    }

    return p;
}

/**
 * Decomposes the polygon into convex pieces. Returns a list of edges [[p1,p2],[p2,p3],...] that cuts the polygon.
 * Note that this algorithm has complexity O(N^4) and will be very slow for polygons with many vertices.
 * @method getCutEdges
 * @return {Array}
 */
function polygonGetCutEdges(polygon) {
    var min=[], tmp1=[], tmp2=[], tmpPoly = [];
    var nDiags = Number.MAX_VALUE;

    for (var i = 0; i < polygon.length; ++i) {
        if (polygonIsReflex(polygon, i)) {
            for (var j = 0; j < polygon.length; ++j) {
                if (polygonCanSee(polygon, i, j)) {
                    tmp1 = polygonGetCutEdges(polygonCopy(polygon, i, j, tmpPoly));
                    tmp2 = polygonGetCutEdges(polygonCopy(polygon, j, i, tmpPoly));

                    for(var k=0; k<tmp2.length; k++){
                        tmp1.push(tmp2[k]);
                    }

                    if (tmp1.length < nDiags) {
                        min = tmp1;
                        nDiags = tmp1.length;
                        min.push([polygonAt(polygon, i), polygonAt(polygon, j)]);
                    }
                }
            }
        }
    }

    return min;
}

/**
 * Decomposes the polygon into one or more convex sub-Polygons.
 * @method decomp
 * @return {Array} An array or Polygon objects.
 */
function polygonDecomp(polygon){
    var edges = polygonGetCutEdges(polygon);
    if(edges.length > 0){
        return polygonSlice(polygon, edges);
    } else {
        return [polygon];
    }
}

/**
 * Slices the polygon given one or more cut edges. If given one, this function will return two polygons (false on failure). If many, an array of polygons.
 * @method slice
 * @param {Array} cutEdges A list of edges, as returned by .getCutEdges()
 * @return {Array}
 */
function polygonSlice(polygon, cutEdges){
    if(cutEdges.length === 0){
		return [polygon];
    }
    if(cutEdges instanceof Array && cutEdges.length && cutEdges[0] instanceof Array && cutEdges[0].length===2 && cutEdges[0][0] instanceof Array){

        var polys = [polygon];

        for(var i=0; i<cutEdges.length; i++){
            var cutEdge = cutEdges[i];
            // Cut all polys
            for(var j=0; j<polys.length; j++){
                var poly = polys[j];
                var result = polygonSlice(poly, cutEdge);
                if(result){
                    // Found poly! Cut and quit
                    polys.splice(j,1);
                    polys.push(result[0],result[1]);
                    break;
                }
            }
        }

        return polys;
    } else {

        // Was given one edge
        var cutEdge = cutEdges;
        var i = polygon.indexOf(cutEdge[0]);
        var j = polygon.indexOf(cutEdge[1]);

        if(i !== -1 && j !== -1){
            return [polygonCopy(polygon, i,j),
                    polygonCopy(polygon, j,i)];
        } else {
            return false;
        }
    }
}

/**
 * Checks that the line segments of this polygon do not intersect each other.
 * @method isSimple
 * @param  {Array} path An array of vertices e.g. [[0,0],[0,1],...]
 * @return {Boolean}
 * @todo Should it check all segments with all others?
 */
function polygonIsSimple(polygon){
    var path = polygon, i;
    // Check
    for(i=0; i<path.length-1; i++){
        for(var j=0; j<i-1; j++){
            if(lineSegmentsIntersect(path[i], path[i+1], path[j], path[j+1] )){
                return false;
            }
        }
    }

    // Check the segment between the last and the first point to all others
    for(i=1; i<path.length-2; i++){
        if(lineSegmentsIntersect(path[0], path[path.length-1], path[i], path[i+1] )){
            return false;
        }
    }

    return true;
}

function getIntersectionPoint(p1, p2, q1, q2, delta){
	delta = delta || 0;
	var a1 = p2[1] - p1[1];
	var b1 = p1[0] - p2[0];
	var c1 = (a1 * p1[0]) + (b1 * p1[1]);
	var a2 = q2[1] - q1[1];
	var b2 = q1[0] - q2[0];
	var c2 = (a2 * q1[0]) + (b2 * q1[1]);
	var det = (a1 * b2) - (a2 * b1);

	if(!scalar_eq(det,0,delta)){
		return [((b2 * c1) - (b1 * c2)) / det, ((a1 * c2) - (a2 * c1)) / det];
	} else {
		return [0,0];
    }
}

/**
 * Quickly decompose the Polygon into convex sub-polygons.
 * @method quickDecomp
 * @param  {Array} result
 * @param  {Array} [reflexVertices]
 * @param  {Array} [steinerPoints]
 * @param  {Number} [delta]
 * @param  {Number} [maxlevel]
 * @param  {Number} [level]
 * @return {Array}
 */
function polygonQuickDecomp(polygon, result,reflexVertices,steinerPoints,delta,maxlevel,level){
    maxlevel = maxlevel || 100;
    level = level || 0;
    delta = delta || 25;
    result = typeof(result)!=="undefined" ? result : [];
    reflexVertices = reflexVertices || [];
    steinerPoints = steinerPoints || [];

    var upperInt=[0,0], lowerInt=[0,0], p=[0,0]; // Points
    var upperDist=0, lowerDist=0, d=0, closestDist=0; // scalars
    var upperIndex=0, lowerIndex=0, closestIndex=0; // Integers
    var lowerPoly=[], upperPoly=[]; // polygons
    var poly = polygon,
        v = polygon;

    if(v.length < 3){
		return result;
    }

    level++;
    if(level > maxlevel){
        console.warn("quickDecomp: max level ("+maxlevel+") reached.");
        return result;
    }

    for (var i = 0; i < polygon.length; ++i) {
        if (polygonIsReflex(poly, i)) {
            reflexVertices.push(poly[i]);
            upperDist = lowerDist = Number.MAX_VALUE;


            for (var j = 0; j < polygon.length; ++j) {
                if (isLeft(polygonAt(poly, i - 1), polygonAt(poly, i), polygonAt(poly, j)) && isRightOn(polygonAt(poly, i - 1), polygonAt(poly, i), polygonAt(poly, j - 1))) { // if line intersects with an edge
                    p = getIntersectionPoint(polygonAt(poly, i - 1), polygonAt(poly, i), polygonAt(poly, j), polygonAt(poly, j - 1)); // find the point of intersection
                    if (isRight(polygonAt(poly, i + 1), polygonAt(poly, i), p)) { // make sure it's inside the poly
                        d = sqdist(poly[i], p);
                        if (d < lowerDist) { // keep only the closest intersection
                            lowerDist = d;
                            lowerInt = p;
                            lowerIndex = j;
                        }
                    }
                }
                if (isLeft(polygonAt(poly, i + 1), polygonAt(poly, i), polygonAt(poly, j + 1)) && isRightOn(polygonAt(poly, i + 1), polygonAt(poly, i), polygonAt(poly, j))) {
                    p = getIntersectionPoint(polygonAt(poly, i + 1), polygonAt(poly, i), polygonAt(poly, j), polygonAt(poly, j + 1));
                    if (isLeft(polygonAt(poly, i - 1), polygonAt(poly, i), p)) {
                        d = sqdist(poly[i], p);
                        if (d < upperDist) {
                            upperDist = d;
                            upperInt = p;
                            upperIndex = j;
                        }
                    }
                }
            }

            // if there are no vertices to connect to, choose a point in the middle
            if (lowerIndex === (upperIndex + 1) % polygon.length) {
                //console.log("Case 1: Vertex("+i+"), lowerIndex("+lowerIndex+"), upperIndex("+upperIndex+"), poly.size("+polygon.length+")");
                p[0] = (lowerInt[0] + upperInt[0]) / 2;
                p[1] = (lowerInt[1] + upperInt[1]) / 2;
                steinerPoints.push(p);

                if (i < upperIndex) {
                    //lowerPoly.insert(lowerPoly.end(), poly.begin() + i, poly.begin() + upperIndex + 1);
                    polygonAppend(lowerPoly, poly, i, upperIndex+1);
                    lowerPoly.push(p);
                    upperPoly.push(p);
                    if (lowerIndex !== 0){
                        //upperPoly.insert(upperPoly.end(), poly.begin() + lowerIndex, poly.end());
                        polygonAppend(upperPoly, poly,lowerIndex,poly.length);
                    }
                    //upperPoly.insert(upperPoly.end(), poly.begin(), poly.begin() + i + 1);
                    polygonAppend(upperPoly, poly,0,i+1);
                } else {
                    if (i !== 0){
                        //lowerPoly.insert(lowerPoly.end(), poly.begin() + i, poly.end());
                        polygonAppend(lowerPoly, poly,i,poly.length);
                    }
                    //lowerPoly.insert(lowerPoly.end(), poly.begin(), poly.begin() + upperIndex + 1);
                    polygonAppend(lowerPoly, poly,0,upperIndex+1);
                    lowerPoly.push(p);
                    upperPoly.push(p);
                    //upperPoly.insert(upperPoly.end(), poly.begin() + lowerIndex, poly.begin() + i + 1);
                    polygonAppend(upperPoly, poly,lowerIndex,i+1);
                }
            } else {
                // connect to the closest point within the triangle
                //console.log("Case 2: Vertex("+i+"), closestIndex("+closestIndex+"), poly.size("+polygon.length+")\n");

                if (lowerIndex > upperIndex) {
                    upperIndex += polygon.length;
                }
                closestDist = Number.MAX_VALUE;

                if(upperIndex < lowerIndex){
                    return result;
                }

                for (var j = lowerIndex; j <= upperIndex; ++j) {
                    if (
                        isLeftOn(polygonAt(poly, i - 1), polygonAt(poly, i), polygonAt(poly, j)) &&
                        isRightOn(polygonAt(poly, i + 1), polygonAt(poly, i), polygonAt(poly, j))
                    ) {
                        d = sqdist(polygonAt(poly, i), polygonAt(poly, j));
                        if (d < closestDist && polygonCanSee2(poly, i, j)) {
                            closestDist = d;
                            closestIndex = j % polygon.length;
                        }
                    }
                }

                if (i < closestIndex) {
                    polygonAppend(lowerPoly, poly,i,closestIndex+1);
                    if (closestIndex !== 0){
                        polygonAppend(upperPoly, poly,closestIndex,v.length);
                    }
                    polygonAppend(upperPoly, poly,0,i+1);
                } else {
                    if (i !== 0){
                        polygonAppend(lowerPoly, poly,i,v.length);
                    }
                    polygonAppend(lowerPoly, poly,0,closestIndex+1);
                    polygonAppend(upperPoly, poly,closestIndex,i+1);
                }
            }

            // solve smallest poly first
            if (lowerPoly.length < upperPoly.length) {
                polygonQuickDecomp(lowerPoly,result,reflexVertices,steinerPoints,delta,maxlevel,level);
                polygonQuickDecomp(upperPoly,result,reflexVertices,steinerPoints,delta,maxlevel,level);
            } else {
                polygonQuickDecomp(upperPoly,result,reflexVertices,steinerPoints,delta,maxlevel,level);
                polygonQuickDecomp(lowerPoly,result,reflexVertices,steinerPoints,delta,maxlevel,level);
            }

            return result;
        }
    }
    result.push(polygon);

    return result;
}

/**
 * Remove collinear points in the polygon.
 * @method removeCollinearPoints
 * @param  {Number} [precision] The threshold angle to use when determining whether two edges are collinear. Use zero for finest precision.
 * @return {Number}           The number of points removed
 */
function polygonRemoveCollinearPoints(polygon, precision){
    var num = 0;
    for(var i=polygon.length-1; polygon.length>3 && i>=0; --i){
        if(collinear(polygonAt(polygon, i-1),polygonAt(polygon, i),polygonAt(polygon, i+1),precision)){
            // Remove the middle point
            polygon.splice(i%polygon.length,1);
            num++;
        }
    }
    return num;
}

/**
 * Remove duplicate points in the polygon.
 * @method removeDuplicatePoints
 * @param  {Number} [precision] The threshold to use when determining whether two points are the same. Use zero for best precision.
 */
function polygonRemoveDuplicatePoints(polygon, precision){
    for(var i=polygon.length-1; i>=1; --i){
        var pi = polygon[i];
        for(var j=i-1; j>=0; --j){
            if(points_eq(pi, polygon[j], precision)){
                polygon.splice(i,1);
                continue;
            }
        }
    }
}

/**
 * Check if two scalars are equal
 * @static
 * @method eq
 * @param  {Number} a
 * @param  {Number} b
 * @param  {Number} [precision]
 * @return {Boolean}
 */
function scalar_eq(a,b,precision){
    precision = precision || 0;
    return Math.abs(a-b) <= precision;
}

/**
 * Check if two points are equal
 * @static
 * @method points_eq
 * @param  {Array} a
 * @param  {Array} b
 * @param  {Number} [precision]
 * @return {Boolean}
 */
function points_eq(a,b,precision){
    return scalar_eq(a[0],b[0],precision) && scalar_eq(a[1],b[1],precision);
}


/***/ }),

/***/ "./src/2d/index.ts":
/*!*************************!*\
  !*** ./src/2d/index.ts ***!
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.polygonIntersectsPolygon = exports.rectangleIntersectsPolygon = exports.rectangleIntersectsRectangle = exports.circleIntersectsPolygon = exports.circleIntersectsRectangle = exports.circleIntersectsCircle = exports.lineIntersectsPolygon = exports.lineIntersectsRectangle = exports.lineIntersectsCircle = exports.lineIntersectsLine = exports.lineIntersectsRay = exports.rayIntersectsPolygon = exports.rayIntersectsRectangle = exports.rayIntersectsCircle = exports.rayIntersectsLine = exports.rayIntersectsRay = exports.rayTraverseGrid = exports.pointInPolygon = exports.pointInRectangle = exports.pointInCircle = exports.pointOnLine = exports.pointOnRay = exports.decomposePolygon = exports.optimisePolygon = exports.polygonCentroid = exports.polygonArea = exports.polygonWindingOrder = exports.polygonIsValid = exports.polygonSelfIntersects = exports.polygonIsConvex = exports.rectangleVertices = exports.rectangleIsRotated = exports.rayToLine = exports.lineToRay = exports.pointsAreCollinear = exports.angleBetween = exports.distance = void 0;
const utils_1 = __webpack_require__(/*! @basementuniverse/utils */ "./node_modules/@basementuniverse/utils/utils.js");
const vec_1 = __webpack_require__(/*! @basementuniverse/vec */ "./node_modules/@basementuniverse/vec/vec.js");
const decomp = __importStar(__webpack_require__(/*! poly-decomp */ "./node_modules/poly-decomp/src/index.js"));
const constants = __importStar(__webpack_require__(/*! ../utilities/constants */ "./src/utilities/constants.ts"));
__exportStar(__webpack_require__(/*! ./types */ "./src/2d/types.ts"), exports);
/**
 * Calculate the distance between two points
 */
function distance(a, b) {
    return vec_1.vec2.len(vec_1.vec2.sub(a, b));
}
exports.distance = distance;
/**
 * Calculate the clockwise angle from vector a to vector b
 *
 * The result is in radians and ranges from 0 to 2π (360 degrees)
 * A positive angle indicates clockwise rotation from a to b
 *
 * Returns 0 if either vector is zero-length or if they are equal
 */
function angleBetween(a, b) {
    if (vec_1.vec2.len(a) < constants.EPSILON ||
        vec_1.vec2.len(b) < constants.EPSILON ||
        vec_1.vec2.len(vec_1.vec2.sub(a, b)) < constants.EPSILON) {
        return 0;
    }
    // Normalize vectors
    const normA = vec_1.vec2.nor(a);
    const normB = vec_1.vec2.nor(b);
    // Calculate angle using atan2
    let angle = Math.atan2(normB.y, normB.x) - Math.atan2(normA.y, normA.x);
    // Ensure angle is positive (clockwise) and in range [0, 2π]
    if (angle < 0) {
        angle += 2 * Math.PI;
    }
    return angle;
}
exports.angleBetween = angleBetween;
/**
 * Check if points are collinear
 */
function pointsAreCollinear(a, b, c) {
    // Check if the area of the triangle formed by the points is zero
    const area = 0.5 * Math.abs(a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y));
    return Math.abs(area) < constants.EPSILON;
}
exports.pointsAreCollinear = pointsAreCollinear;
/**
 * Convert a line segment to a ray
 */
function lineToRay(line) {
    return {
        origin: line.start,
        direction: vec_1.vec2.nor(vec_1.vec2.sub(line.end, line.start)),
    };
}
exports.lineToRay = lineToRay;
/**
 * Convert a ray to a line segment
 */
function rayToLine(ray, length = 1) {
    return {
        start: ray.origin,
        end: vec_1.vec2.add(ray.origin, vec_1.vec2.mul(ray.direction, length)),
    };
}
exports.rayToLine = rayToLine;
/**
 * Check if a rectangle is rotated
 */
function rectangleIsRotated(rectangle) {
    // A rectangle is considered rotated if its rotation is not zero
    return (rectangle.rotation !== undefined &&
        Math.abs(rectangle.rotation) > constants.EPSILON);
}
exports.rectangleIsRotated = rectangleIsRotated;
/**
 * Get the vertices of a rectangle
 *
 * Vertices will be returned in clockwise order starting at the top-left:
 * top-left, top-right, bottom-right, bottom-left
 */
function rectangleVertices(rectangle) {
    const { position, size, rotation = 0 } = rectangle;
    const halfSize = vec_1.vec2.div(size, 2);
    // Calculate the four corners of the rectangle
    let topLeftOffset = vec_1.vec2.fromComponents(vec_1.vec2.swiz(halfSize, 'XY'));
    let topRightOffset = vec_1.vec2.fromComponents(vec_1.vec2.swiz(halfSize, 'xY'));
    let bottomRightOffset = vec_1.vec2.fromComponents(vec_1.vec2.swiz(halfSize, 'xy'));
    let bottomLeftOffset = vec_1.vec2.fromComponents(vec_1.vec2.swiz(halfSize, 'Xy'));
    // Rotate the offsets if the rectangle is rotated
    if (rectangleIsRotated(rectangle)) {
        topLeftOffset = vec_1.vec2.rot(topLeftOffset, rotation);
        topRightOffset = vec_1.vec2.rot(topRightOffset, rotation);
        bottomRightOffset = vec_1.vec2.rot(bottomRightOffset, rotation);
        bottomLeftOffset = vec_1.vec2.rot(bottomLeftOffset, rotation);
    }
    return [
        vec_1.vec2.add(position, topLeftOffset),
        vec_1.vec2.add(position, topRightOffset),
        vec_1.vec2.add(position, bottomRightOffset),
        vec_1.vec2.add(position, bottomLeftOffset),
    ];
}
exports.rectangleVertices = rectangleVertices;
/**
 * Check if a polygon is convex
 *
 * Returns null if the polygon is invalid
 */
function polygonIsConvex(polygon) {
    if (!polygonIsValid(polygon)) {
        return null;
    }
    let sign = 0;
    for (let i = 0; i < polygon.vertices.length; i++) {
        const a = polygon.vertices[i];
        const b = (0, utils_1.at)(polygon.vertices, i + 1);
        const c = (0, utils_1.at)(polygon.vertices, i + 2);
        const crossProduct = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
        if (crossProduct !== 0) {
            if (sign === 0) {
                sign = Math.sign(crossProduct);
            }
            else if (Math.sign(crossProduct) !== sign) {
                return false; // Found a change in sign, polygon is not convex
            }
        }
    }
    return true; // All cross products have the same sign, polygon is convex
}
exports.polygonIsConvex = polygonIsConvex;
/**
 * Check if a polygon self-intersects
 */
function polygonSelfIntersects(polygon) {
    if (polygon.vertices.length < 3) {
        return false; // A polygon must have at least 3 vertices
    }
    const n = polygon.vertices.length;
    for (let i = 0; i < n; i++) {
        const a = polygon.vertices[i];
        const b = (0, utils_1.at)(polygon.vertices, i + 1);
        for (let j = i + 2; j < n; j++) {
            const c = polygon.vertices[j];
            const d = (0, utils_1.at)(polygon.vertices, j + 1);
            // Skip adjacent edges
            if (i === 0 && j === n - 1) {
                continue;
            }
            // Check if the segments (a, b) and (c, d) intersect
            const { intersects } = lineIntersectsLine({ start: a, end: b }, { start: c, end: d });
            if (intersects) {
                return true; // Found an intersection, polygon self-intersects
            }
        }
    }
    return false; // No intersections found, polygon does not self-intersect
}
exports.polygonSelfIntersects = polygonSelfIntersects;
/**
 * Check if a polygon is valid
 *
 * A polygon is valid if it has at least 3 vertices and does not
 * self-intersect
 */
function polygonIsValid(polygon) {
    return polygon.vertices.length >= 3 && !polygonSelfIntersects(polygon);
}
exports.polygonIsValid = polygonIsValid;
/**
 * Determine the winding order of a polygon's vertices
 *
 * Returns 'clockwise' or 'counter-clockwise'
 *
 * Returns null if the polygon is invalid
 */
function polygonWindingOrder(polygon) {
    if (!polygonIsValid(polygon)) {
        return null;
    }
    let sum = 0;
    for (let i = 0; i < polygon.vertices.length; i++) {
        const a = polygon.vertices[i];
        const b = (0, utils_1.at)(polygon.vertices, i + 1);
        sum += (b.x - a.x) * (b.y + a.y);
    }
    return sum > 0 ? 'counter-clockwise' : 'clockwise';
}
exports.polygonWindingOrder = polygonWindingOrder;
/**
 * Calculate the area of a polygon
 *
 * Returns null if the polygon is invalid
 */
function polygonArea(polygon) {
    if (!polygonIsValid(polygon)) {
        return null;
    }
    let area = 0;
    for (let i = 0; i < polygon.vertices.length; i++) {
        const a = polygon.vertices[i];
        const b = (0, utils_1.at)(polygon.vertices, i + 1);
        area += vec_1.vec2.cross(a, b);
    }
    return Math.abs(area) / 2;
}
exports.polygonArea = polygonArea;
/**
 * Calculate the centroid of a polygon
 *
 * Returns null if the polygon is invalid or degenerate (i.e. all vertices are
 * collinear)
 */
function polygonCentroid(polygon) {
    if (!polygonIsValid(polygon)) {
        return null;
    }
    const n = polygon.vertices.length;
    if (polygon.vertices.every((v, i, a) => pointsAreCollinear(v, (0, utils_1.at)(a, i + 1), (0, utils_1.at)(a, i + 2)))) {
        return null; // All vertices are collinear
    }
    let c = (0, vec_1.vec2)();
    for (let i = 0; i < n; i++) {
        const a = polygon.vertices[i];
        c = vec_1.vec2.add(c, a);
    }
    return (0, vec_1.vec2)(c.x / n, c.y / n);
}
exports.polygonCentroid = polygonCentroid;
/**
 * Remove duplicate vertices from a list of vertices
 */
function removeDuplicateVertices(vertices) {
    const result = [];
    const n = vertices.length;
    for (let i = 0; i < n; i++) {
        const current = vertices[i];
        if (!result.some(v => vec_1.vec2.len(vec_1.vec2.sub(current, v)) < constants.EPSILON)) {
            result.push(current);
        }
    }
    return result;
}
/**
 * Remove duplicate adjacent vertices from a list of vertices
 */
function removeDuplicateAdjacentVertices(vertices) {
    const result = [];
    const n = vertices.length;
    for (let i = 0; i < n; i++) {
        const current = vertices[i];
        const next = (0, utils_1.at)(vertices, i + 1);
        if (vec_1.vec2.len(vec_1.vec2.sub(current, next)) >= constants.EPSILON) {
            result.push(current);
        }
    }
    return result;
}
/**
 * Remove collinear vertices from a list of vertices
 */
function removeCollinearVertices(vertices) {
    const result = [];
    const n = vertices.length;
    for (let i = 0; i < n; i++) {
        const a = (0, utils_1.at)(vertices, i - 1);
        const b = vertices[i];
        const c = (0, utils_1.at)(vertices, i + 1);
        // Skip collinear points
        if (pointsAreCollinear(a, b, c)) {
            continue;
        }
        result.push(b);
    }
    return result;
}
/**
 * Optimise a polygon by removing collinear vertices and duplicate adjacent
 * vertices
 */
function optimisePolygon(polygon) {
    // Duplicate adjacent vertices will count the polygon as self-intersecting,
    // so skip that check for now and only check the number of vertices
    if (polygon.vertices.length < 3) {
        return null;
    }
    const optimisedVertices = removeCollinearVertices(removeDuplicateAdjacentVertices(polygon.vertices));
    // If we have less than 3 vertices after optimisation, return null
    if (optimisedVertices.length < 3) {
        return null;
    }
    return { vertices: optimisedVertices };
}
exports.optimisePolygon = optimisePolygon;
/**
 * Decompose a polygon into a set of convex polygons using the Bayazit
 * algorithm
 *
 * Returns null if the polygon is invalid or cannot be decomposed
 */
function decomposePolygon(polygon, options) {
    var _a;
    if (!polygonIsValid(polygon)) {
        return null;
    }
    if (polygonIsConvex(polygon)) {
        return [polygon]; // The polygon is already convex
    }
    const mode = (options === null || options === void 0 ? void 0 : options.mode) || 'fast';
    const keepWindingOrder = (_a = options === null || options === void 0 ? void 0 : options.keepWindingOrder) !== null && _a !== void 0 ? _a : true;
    const originalWindingOrder = polygonWindingOrder(polygon);
    const vertices = polygon.vertices.map(v => [v.x, v.y]);
    if (originalWindingOrder === 'counter-clockwise') {
        vertices.reverse(); // Ensure clockwise winding
    }
    // Decompose the polygon
    let convexPolygons = [];
    switch (mode) {
        case 'fast':
            convexPolygons = decomp.quickDecomp(vertices);
            break;
        case 'optimal':
            convexPolygons = decomp.decomp(vertices);
            break;
    }
    // Convert the result into a list of Polygon objects
    const result = [];
    for (const convex of convexPolygons) {
        result.push({
            vertices: convex.map(v => (0, vec_1.vec2)(v[0], v[1])),
        });
    }
    // Optionally ensure the winding order is preserved
    if (keepWindingOrder) {
        for (const poly of result) {
            if (polygonWindingOrder(poly) !== originalWindingOrder) {
                poly.vertices.reverse();
            }
        }
    }
    return result.length > 0 ? result : null;
}
exports.decomposePolygon = decomposePolygon;
/**
 * Check if a point is on a ray
 *
 * Also returns the closest point on the ray and the distance to it
 */
function pointOnRay(point, ray) {
    // Vector from ray origin to point
    const toPoint = vec_1.vec2.sub(point, ray.origin);
    // Get normalized ray direction
    const rayDirection = vec_1.vec2.nor(ray.direction);
    // Project toPoint onto the ray direction
    const projection = vec_1.vec2.dot(toPoint, rayDirection);
    // Calculate closest point on ray
    const closestPoint = vec_1.vec2.add(ray.origin, vec_1.vec2.mul(rayDirection, Math.max(0, projection)));
    // Calculate distance from point to closest point
    const distance = vec_1.vec2.len(vec_1.vec2.sub(point, closestPoint));
    return {
        // Point is on ray if distance is zero and projection is non-negative
        intersects: distance < constants.EPSILON && projection >= 0,
        closestPoint,
        distance,
    };
}
exports.pointOnRay = pointOnRay;
/**
 * Check if a point intersects a line segment
 *
 * Also returns the closest point on the line segment and the distance to it
 */
function pointOnLine(point, line) {
    // Get vector from line start to end
    const lineVector = vec_1.vec2.sub(line.end, line.start);
    // Get normalized line direction
    const lineDirection = vec_1.vec2.nor(lineVector);
    // Get vector from line start to point
    const toPoint = vec_1.vec2.sub(point, line.start);
    // Project toPoint onto the line direction
    const projection = vec_1.vec2.dot(toPoint, lineDirection);
    // Get line length
    const lineLength = vec_1.vec2.len(lineVector);
    // Clamp projection to line segment
    const clampedProjection = Math.max(0, Math.min(lineLength, projection));
    // Calculate closest point on line segment
    const closestPoint = vec_1.vec2.add(line.start, vec_1.vec2.mul(lineDirection, clampedProjection));
    // Calculate distance from point to closest point
    const distance = vec_1.vec2.len(vec_1.vec2.sub(point, closestPoint));
    return {
        // Point is on line if distance is effectively zero
        intersects: distance < constants.EPSILON,
        closestPoint,
        distance,
    };
}
exports.pointOnLine = pointOnLine;
/**
 * Check if a point is inside a circle
 *
 * Also returns the closest point on the circle edge and the distance to it
 *
 * If the point is inside the circle, the distance will be negative
 */
function pointInCircle(point, circle) {
    // Calculate vector from circle center to point
    const toPoint = vec_1.vec2.sub(point, circle.position);
    // Calculate distance from point to circle center
    const distanceToCenter = vec_1.vec2.len(toPoint);
    // Check if point is inside the circle
    const intersects = distanceToCenter <= circle.radius;
    // Calculate distance to circle edge
    const distance = intersects
        ? -(circle.radius - distanceToCenter) // Negative if inside
        : distanceToCenter - circle.radius; // Positive if outside
    // Calculate closest point on circle edge
    const closestPoint = vec_1.vec2.add(circle.position, vec_1.vec2.mul(vec_1.vec2.nor(toPoint), circle.radius));
    return {
        intersects,
        closestPoint,
        distance,
    };
}
exports.pointInCircle = pointInCircle;
/**
 * Check if a point is inside a rectangle
 *
 * Also returns the closest point on the rectangle edge and the distance to it
 *
 * If the point is inside the rectangle, the distance will be negative
 *
 * In cases where the closest point is ambiguous (e.g. corners), the first edge
 * encountered with a closest point will be returned after evaluating edges in
 * this order:
 * top, right, bottom, left (before applying the rectangle's rotation)
 */
function pointInRectangle(point, rectangle) {
    // Edge case: zero-size rectangle
    if (rectangle.size.x < constants.EPSILON ||
        rectangle.size.y < constants.EPSILON) {
        // If the rectangle has no size, check if the point is at the rectangle's
        // position
        const isAtPosition = vec_1.vec2.eq(point, rectangle.position);
        return {
            intersects: isAtPosition,
            closestPoint: rectangle.position,
            distance: isAtPosition
                ? 0
                : vec_1.vec2.len(vec_1.vec2.sub(point, rectangle.position)),
        };
    }
    // Convert rectangle to polygon
    const vertices = rectangleVertices(rectangle);
    const polygonResult = pointInPolygon(point, { vertices });
    // We should always have a polygonResult, but just in case...
    if (!polygonResult) {
        throw new Error('Invalid rectangle vertices');
    }
    return polygonResult;
}
exports.pointInRectangle = pointInRectangle;
/**
 * Check if a point is inside a polygon
 *
 * Returns null if the polygon is invalid
 *
 * Also returns the closest point on the polygon edge and the distance to it
 *
 * If the point is inside the polygon, the distance will be negative
 */
function pointInPolygon(point, polygon) {
    // First check if the polygon is valid
    if (!polygonIsValid(polygon)) {
        return null;
    }
    // Find if point is inside polygon using ray casting algorithm
    let inside = false;
    const vertices = polygon.vertices;
    // We'll also keep track of the closest edge while we iterate
    let minDistanceSquared = Infinity;
    let closestPoint = point;
    for (let i = 0; i < vertices.length; i++) {
        const j = (i + 1) % vertices.length;
        const vi = vertices[i];
        const vj = vertices[j];
        // Ray casting algorithm
        if (vi.y > point.y !== vj.y > point.y &&
            point.x < ((vj.x - vi.x) * (point.y - vi.y)) / (vj.y - vi.y) + vi.x) {
            inside = !inside;
        }
        // Find closest point on this edge
        const edge = { start: vi, end: vj };
        const { closestPoint: edgeClosest, distance: edgeDistance } = pointOnLine(point, edge);
        const distanceSquared = edgeDistance * edgeDistance;
        if (distanceSquared < minDistanceSquared) {
            minDistanceSquared = distanceSquared;
            closestPoint = edgeClosest;
        }
    }
    const distance = Math.sqrt(minDistanceSquared);
    return {
        intersects: inside,
        closestPoint,
        distance: inside ? -distance : distance,
    };
}
exports.pointInPolygon = pointInPolygon;
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
function rayTraverseGrid(ray, cellSize, gridTopLeft, gridBottomRight, maxCells = -1) {
    if (cellSize <= 0) {
        return { cells: [] }; // Invalid cell size, return empty cells array
    }
    // Set a limit on the number of cells traversed
    const HARD_LIMIT = 10000;
    maxCells = (0, utils_1.clamp)(maxCells === -1 ? HARD_LIMIT : maxCells, 0, HARD_LIMIT);
    if (maxCells <= 0) {
        return { cells: [] }; // No cells to traverse
    }
    // Make sure the grid top-left and bottom-right boundaries are integers
    gridTopLeft = vec_1.vec2.map(gridTopLeft, Math.floor);
    gridBottomRight = vec_1.vec2.map(gridBottomRight, Math.ceil);
    const cells = [];
    // Normalize ray direction and handle zero components
    const rayDir = vec_1.vec2.nor(ray.direction);
    if (Math.abs(rayDir.x) < constants.EPSILON &&
        Math.abs(rayDir.y) < constants.EPSILON) {
        return { cells };
    }
    // Calculate initial cell coordinates
    let currentCell = vec_1.vec2.map(vec_1.vec2.div(vec_1.vec2.sub(ray.origin, gridTopLeft), cellSize), Math.floor);
    // Calculate grid size in cells
    const gridSize = vec_1.vec2.sub(gridBottomRight, gridTopLeft);
    // If starting point is outside grid bounds, find entry point
    if (currentCell.x < 0 ||
        currentCell.x >= gridSize.x ||
        currentCell.y < 0 ||
        currentCell.y >= gridSize.y) {
        // Use rayIntersectsRectangle to find grid entry point
        const gridRect = {
            position: vec_1.vec2.add(gridTopLeft, vec_1.vec2.div(vec_1.vec2.sub(gridBottomRight, gridTopLeft), 2)),
            size: vec_1.vec2.sub(gridBottomRight, gridTopLeft),
        };
        const intersection = rayIntersectsRectangle(ray, gridRect);
        if (!intersection.intersects || !intersection.intersectionPoints) {
            return { cells }; // Ray misses grid entirely
        }
        // Get the first intersection point (closest to ray origin)
        const entryPoint = intersection.intersectionPoints[0];
        currentCell = vec_1.vec2.map(vec_1.vec2.div(vec_1.vec2.sub(entryPoint, gridTopLeft), cellSize), Math.floor);
        // Check if entry point is valid (this should never fail but check anyway)
        if (currentCell.x < 0 ||
            currentCell.x >= gridSize.x ||
            currentCell.y < 0 ||
            currentCell.y >= gridSize.y) {
            return { cells }; // No valid entry point found
        }
    }
    // Calculate step direction (either 1 or -1) for each axis
    const step = {
        x: Math.sign(rayDir.x),
        y: Math.sign(rayDir.y),
    };
    // Calculate tDelta - distance along ray from one grid line to next
    const tDelta = {
        x: rayDir.x !== 0 ? Math.abs(cellSize / rayDir.x) : Infinity,
        y: rayDir.y !== 0 ? Math.abs(cellSize / rayDir.y) : Infinity,
    };
    // Calculate initial cell boundary positions
    const initialBoundary = (0, vec_1.vec2)(gridTopLeft.x + (currentCell.x + (step.x > 0 ? 1 : 0)) * cellSize, gridTopLeft.y + (currentCell.y + (step.y > 0 ? 1 : 0)) * cellSize);
    // Calculate initial tMax values, handling boundary cases
    const tMax = {
        x: rayDir.x !== 0
            ? Math.abs((initialBoundary.x - ray.origin.x) / rayDir.x)
            : Infinity,
        y: rayDir.y !== 0
            ? Math.abs((initialBoundary.y - ray.origin.y) / rayDir.y)
            : Infinity,
    };
    // If we're exactly on a boundary, we need to adjust tMax
    if (Math.abs(ray.origin.x - initialBoundary.x) < constants.EPSILON) {
        tMax.x = tDelta.x;
    }
    if (Math.abs(ray.origin.y - initialBoundary.y) < constants.EPSILON) {
        tMax.y = tDelta.y;
    }
    // Add starting cell
    cells.push((0, vec_1.vec2)(currentCell.x, currentCell.y));
    let cellCount = 1;
    // Main loop
    while (cellCount < maxCells &&
        currentCell.x >= 0 &&
        currentCell.x < gridSize.x &&
        currentCell.y >= 0 &&
        currentCell.y < gridSize.y) {
        // Advance to next cell based on shortest tMax
        if (tMax.x < tMax.y) {
            tMax.x += tDelta.x;
            currentCell.x += step.x;
        }
        else {
            tMax.y += tDelta.y;
            currentCell.y += step.y;
        }
        // Check if we're still in bounds
        if (currentCell.x < 0 ||
            currentCell.x >= gridSize.x ||
            currentCell.y < 0 ||
            currentCell.y >= gridSize.y) {
            break;
        }
        // Add current cell
        cells.push((0, vec_1.vec2)(currentCell.x, currentCell.y));
        cellCount++;
    }
    return { cells };
}
exports.rayTraverseGrid = rayTraverseGrid;
/**
 * Check if two rays intersect
 */
function rayIntersectsRay(rayA, rayB) {
    // Normalize the direction vectors
    const dirA = vec_1.vec2.nor(rayA.direction);
    const dirB = vec_1.vec2.nor(rayB.direction);
    // If either ray has zero direction, they cannot intersect
    if (vec_1.vec2.eq(dirA, (0, vec_1.vec2)()) || vec_1.vec2.eq(dirB, (0, vec_1.vec2)())) {
        return {
            intersects: false,
        };
    }
    // Calculate the cross product determinant
    const det = vec_1.vec2.cross(dirA, dirB);
    // Get the vector between starting points
    const startDiff = vec_1.vec2.sub(rayB.origin, rayA.origin);
    // If determinant is close to 0, rays are parallel or collinear
    if (Math.abs(det) < constants.EPSILON) {
        // Check if rays are collinear
        if (Math.abs(vec_1.vec2.cross(startDiff, dirA)) < constants.EPSILON) {
            // Rays are collinear - check if they overlap
            const t = vec_1.vec2.dot(startDiff, dirA);
            // For rays pointing in the same direction:
            // If t <= 0: rayA's origin is behind or at rayB's origin
            // If t >= 0: rayB's origin is behind or at rayA's origin
            // dot(dirA, dirB) should be close to 1 for same direction
            if ((t <= 0 || t >= 0) && vec_1.vec2.dot(dirA, dirB) > 1 - constants.EPSILON) {
                return {
                    intersects: true,
                    // No single intersection point for overlapping rays
                };
            }
        }
        return {
            intersects: false,
        };
    }
    // Calculate intersection parameters
    const t = vec_1.vec2.cross(startDiff, dirB) / det;
    const s = vec_1.vec2.cross(startDiff, dirA) / det;
    // Check if intersection occurs on both rays (t >= 0 and s >= 0)
    if (t >= 0 && s >= 0) {
        return {
            intersects: true,
            intersectionPoint: vec_1.vec2.add(rayA.origin, vec_1.vec2.mul(dirA, t)),
        };
    }
    return {
        intersects: false,
    };
}
exports.rayIntersectsRay = rayIntersectsRay;
/**
 * Check if a ray intersects a line segment
 */
function rayIntersectsLine(ray, line) {
    // Convert line to a direction vector
    const lineDir = vec_1.vec2.sub(line.end, line.start);
    // Normalize the ray direction
    const rayDir = vec_1.vec2.nor(ray.direction);
    // If either the ray or the line has zero direction, they cannot intersect
    if (vec_1.vec2.eq(lineDir, (0, vec_1.vec2)()) || vec_1.vec2.eq(rayDir, (0, vec_1.vec2)())) {
        return {
            intersects: false,
        };
    }
    // Calculate the cross product determinant
    const det = vec_1.vec2.cross(rayDir, lineDir);
    // Get the vector between ray origin and line start
    const startDiff = vec_1.vec2.sub(line.start, ray.origin);
    // If determinant is close to 0, ray and line are parallel or collinear
    if (Math.abs(det) < constants.EPSILON) {
        // Check if they are collinear
        if (Math.abs(vec_1.vec2.cross(startDiff, rayDir)) < constants.EPSILON) {
            // They are collinear - project the line endpoints onto the ray
            const t1 = vec_1.vec2.dot(vec_1.vec2.sub(line.start, ray.origin), rayDir);
            const t2 = vec_1.vec2.dot(vec_1.vec2.sub(line.end, ray.origin), rayDir);
            // Check if any part of the line segment is in front of the ray
            if ((t1 >= 0 || t2 >= 0) && Math.min(t1, t2) <= vec_1.vec2.len(lineDir)) {
                return {
                    intersects: true,
                    // No single intersection point for overlapping segments
                };
            }
        }
        return {
            intersects: false,
        };
    }
    // Calculate intersection parameters
    const t = vec_1.vec2.cross(startDiff, lineDir) / det; // Ray parameter
    const s = vec_1.vec2.cross(startDiff, rayDir) / det; // Line parameter
    // Check if intersection occurs on the ray (t >= 0) and within the line
    // segment (0 <= s <= 1)
    if (t >= 0 && s >= 0 && s <= 1) {
        return {
            intersects: true,
            intersectionPoint: vec_1.vec2.add(ray.origin, vec_1.vec2.mul(rayDir, t)),
        };
    }
    return {
        intersects: false,
    };
}
exports.rayIntersectsLine = rayIntersectsLine;
/**
 * Check if a ray intersects a circle
 */
function rayIntersectsCircle(ray, circle) {
    // 1. Parameterized ray equation: P(t) = origin + t * direction
    const rayDir = vec_1.vec2.nor(ray.direction);
    // Calculate vector from ray origin to circle center
    const toCenter = vec_1.vec2.sub(circle.position, ray.origin);
    // 2. Substitute ray equation into circle equation:
    // (origin.x + t*dir.x - circle.x)² + (origin.y + t*dir.y - circle.y)² = r²
    // Expand and collect terms to get quadratic equation: at² + bt + c = 0
    // a = dot(dir, dir) (should be 1 since dir is normalized)
    const a = vec_1.vec2.dot(rayDir, rayDir);
    // b = 2 * dot(dir, (origin - center))
    const b = 2 * vec_1.vec2.dot(rayDir, vec_1.vec2.mul(toCenter, -1));
    // c = dot((origin - center), (origin - center)) - radius²
    const c = vec_1.vec2.dot(toCenter, toCenter) - circle.radius * circle.radius;
    // 3. Solve quadratic equation using discriminant
    const discriminant = b * b - 4 * a * c;
    // 4. Check if solutions exist (discriminant >= 0)
    if (discriminant < -constants.EPSILON) {
        return { intersects: false };
    }
    // Handle case where ray just touches circle (discriminant ≈ 0)
    if (Math.abs(discriminant) < constants.EPSILON) {
        const t = -b / (2 * a);
        if (t >= 0) {
            const point = vec_1.vec2.add(ray.origin, vec_1.vec2.mul(rayDir, t));
            return {
                intersects: true,
                intersectionPoints: [point],
            };
        }
        return { intersects: false };
    }
    // 5. Calculate intersection points for discriminant > 0
    const sqrtDiscriminant = Math.sqrt(discriminant);
    const t1 = (-b - sqrtDiscriminant) / (2 * a);
    const t2 = (-b + sqrtDiscriminant) / (2 * a);
    // If both t values are negative, ray points away from circle
    if (t2 < 0) {
        return { intersects: false };
    }
    // Calculate intersection points for positive t values
    let intersectionPoints = [];
    if (t1 >= 0) {
        intersectionPoints.push(vec_1.vec2.add(ray.origin, vec_1.vec2.mul(rayDir, t1)));
    }
    if (t2 >= 0) {
        intersectionPoints.push(vec_1.vec2.add(ray.origin, vec_1.vec2.mul(rayDir, t2)));
    }
    intersectionPoints = removeDuplicateVertices(intersectionPoints);
    return {
        intersects: intersectionPoints.length > 0,
        intersectionPoints: intersectionPoints.length > 0 ? intersectionPoints : undefined,
    };
}
exports.rayIntersectsCircle = rayIntersectsCircle;
/**
 * Check if a ray intersects a rectangle
 */
function rayIntersectsRectangle(ray, rectangle) {
    // Get vertices of the rectangle in clockwise order
    const vertices = rectangleVertices(rectangle);
    let intersectionPoints = [];
    // Check each edge of the rectangle for intersection
    for (let i = 0; i < 4; i++) {
        const line = {
            start: vertices[i],
            end: vertices[(i + 1) % 4],
        };
        const intersection = rayIntersectsLine(ray, line);
        if (intersection.intersects && intersection.intersectionPoint) {
            intersectionPoints.push(intersection.intersectionPoint);
        }
    }
    // Remove duplicate intersection points and sort by distance to ray origin
    intersectionPoints = removeDuplicateVertices(intersectionPoints);
    if (intersectionPoints.length > 1) {
        const rayDir = vec_1.vec2.nor(ray.direction);
        intersectionPoints.sort((a, b) => {
            const distA = vec_1.vec2.dot(vec_1.vec2.sub(a, ray.origin), rayDir);
            const distB = vec_1.vec2.dot(vec_1.vec2.sub(b, ray.origin), rayDir);
            return distA - distB;
        });
    }
    return {
        intersects: intersectionPoints.length > 0,
        intersectionPoints: intersectionPoints.length > 0 ? intersectionPoints : undefined,
    };
}
exports.rayIntersectsRectangle = rayIntersectsRectangle;
/**
 * Check if a ray intersects a polygon
 *
 * Returns null if the polygon is invalid
 */
function rayIntersectsPolygon(ray, polygon) {
    // First check if the polygon is valid
    if (!polygonIsValid(polygon)) {
        return null;
    }
    // If polygon is not convex, decompose it into convex polygons
    if (!polygonIsConvex(polygon)) {
        const convexPolygons = decomposePolygon(polygon);
        if (!convexPolygons) {
            return null;
        }
        // Find outer edges from the decomposed polygons
        const outerEdges = findOuterEdges(convexPolygons);
        let intersectionPoints = [];
        // Check each outer edge for intersections
        for (const [start, end] of outerEdges) {
            const edge = { start, end };
            const intersection = rayIntersectsLine(ray, edge);
            if (intersection.intersects && intersection.intersectionPoint) {
                intersectionPoints.push(intersection.intersectionPoint);
            }
        }
        // Remove duplicate intersection points and sort by distance to ray origin
        intersectionPoints = removeDuplicateVertices(intersectionPoints);
        if (intersectionPoints.length > 1) {
            const rayDir = vec_1.vec2.nor(ray.direction);
            intersectionPoints.sort((a, b) => {
                const distA = vec_1.vec2.dot(vec_1.vec2.sub(a, ray.origin), rayDir);
                const distB = vec_1.vec2.dot(vec_1.vec2.sub(b, ray.origin), rayDir);
                return distA - distB;
            });
        }
        return {
            intersects: intersectionPoints.length > 0,
            intersectionPoints: intersectionPoints.length > 0 ? intersectionPoints : undefined,
        };
    }
    // For convex polygons, check each edge
    const vertices = polygon.vertices;
    let intersectionPoints = [];
    // Check each edge of the polygon
    for (let i = 0; i < vertices.length; i++) {
        const edge = {
            start: vertices[i],
            end: vertices[(i + 1) % vertices.length],
        };
        const intersection = rayIntersectsLine(ray, edge);
        if (intersection.intersects && intersection.intersectionPoint) {
            intersectionPoints.push(intersection.intersectionPoint);
        }
    }
    // Remove duplicate intersection points and sort by distance to ray origin
    intersectionPoints = removeDuplicateVertices(intersectionPoints);
    if (intersectionPoints.length > 1) {
        const rayDir = vec_1.vec2.nor(ray.direction);
        intersectionPoints.sort((a, b) => {
            const distA = vec_1.vec2.dot(vec_1.vec2.sub(a, ray.origin), rayDir);
            const distB = vec_1.vec2.dot(vec_1.vec2.sub(b, ray.origin), rayDir);
            return distA - distB;
        });
    }
    return {
        intersects: intersectionPoints.length > 0,
        intersectionPoints: intersectionPoints.length > 0 ? intersectionPoints : undefined,
    };
}
exports.rayIntersectsPolygon = rayIntersectsPolygon;
/**
 * Check if a line segment intersects a ray
 */
function lineIntersectsRay(line, ray) {
    return rayIntersectsLine(ray, line);
}
exports.lineIntersectsRay = lineIntersectsRay;
/**
 * Check if two line segments intersect
 */
function lineIntersectsLine(lineA, lineB) {
    // Get the vectors representing the directions of each line
    const dirA = vec_1.vec2.sub(lineA.end, lineA.start);
    const dirB = vec_1.vec2.sub(lineB.end, lineB.start);
    // If either line has zero direction, they cannot intersect
    if (vec_1.vec2.eq(dirA, (0, vec_1.vec2)()) || vec_1.vec2.eq(dirB, (0, vec_1.vec2)())) {
        return {
            intersects: false,
        };
    }
    // Calculate the cross product determinant
    const det = vec_1.vec2.cross(dirA, dirB);
    // Get the vector between starting points
    const startDiff = vec_1.vec2.sub(lineB.start, lineA.start);
    // If determinant is close to 0, lines are parallel or collinear
    if (Math.abs(det) < constants.EPSILON) {
        // Check if lines are collinear
        if (Math.abs(vec_1.vec2.cross(startDiff, dirA)) < constants.EPSILON) {
            // Lines are collinear - check if they overlap
            const t0 = vec_1.vec2.dot(startDiff, dirA) / vec_1.vec2.dot(dirA, dirA);
            const t1 = t0 + vec_1.vec2.dot(dirB, dirA) / vec_1.vec2.dot(dirA, dirA);
            // Check if segments overlap
            const interval0 = Math.min(t0, t1);
            const interval1 = Math.max(t0, t1);
            if (interval0 <= 1 && interval1 >= 0) {
                return {
                    intersects: true,
                    // No single intersection point for overlapping lines
                };
            }
        }
        return {
            intersects: false,
        };
    }
    // Calculate intersection parameters
    const t = vec_1.vec2.cross(startDiff, dirB) / det;
    const s = vec_1.vec2.cross(startDiff, dirA) / det;
    // Check if intersection occurs within both line segments
    if (t >= 0 && t <= 1 && s >= 0 && s <= 1) {
        return {
            intersects: true,
            intersectionPoint: vec_1.vec2.add(lineA.start, vec_1.vec2.mul(dirA, t)),
        };
    }
    return {
        intersects: false,
    };
}
exports.lineIntersectsLine = lineIntersectsLine;
/**
 * Check if a line segment intersects a circle
 */
function lineIntersectsCircle(line, circle) {
    // 1. Parameterized line equation: P(t) = start + t * (end - start)
    const lineDir = vec_1.vec2.sub(line.end, line.start);
    const lineLengthSquared = vec_1.vec2.dot(lineDir, lineDir);
    // If the line segment has zero length, it cannot intersect
    if (lineLengthSquared < constants.EPSILON) {
        return { intersects: false };
    }
    // If both endpoints of the line are inside the circle, then we have an
    // intersection (but no intersection points)
    if (pointInCircle(line.start, circle).intersects &&
        pointInCircle(line.end, circle).intersects) {
        return { intersects: true };
    }
    // Calculate vector from circle center to line start
    const toCenter = vec_1.vec2.sub(circle.position, line.start);
    // 2. Substitute line equation into circle equation:
    // (start.x + t*dir.x - circle.x)² + (start.y + t*dir.y - circle.y)² = r²
    // Expand and collect terms to get quadratic equation: at² + bt + c = 0
    // a = dot(dir, dir)
    const a = lineLengthSquared;
    // b = 2 * dot(dir, (start - center))
    const b = 2 * vec_1.vec2.dot(lineDir, vec_1.vec2.mul(toCenter, -1));
    // c = dot((start - center), (start - center)) - radius²
    const c = vec_1.vec2.dot(toCenter, toCenter) - circle.radius * circle.radius;
    // 3. Solve quadratic equation using discriminant
    const discriminant = b * b - 4 * a * c;
    // If discriminant is negative, no intersection
    if (discriminant < -constants.EPSILON) {
        return { intersects: false };
    }
    // Handle case where line just touches circle (discriminant ≈ 0)
    if (Math.abs(discriminant) < constants.EPSILON) {
        const t = -b / (2 * a);
        if (t >= 0 && t <= 1) {
            const point = vec_1.vec2.add(line.start, vec_1.vec2.mul(lineDir, t));
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
    let intersectionPoints = [];
    // If both t values are outside [0, 1], no intersection
    if (t2 < 0 || t1 > 1) {
        return { intersects: false };
    }
    // Calculate intersection points for valid t values
    if (t1 >= 0 && t1 <= 1) {
        intersectionPoints.push(vec_1.vec2.add(line.start, vec_1.vec2.mul(lineDir, t1)));
    }
    if (t2 >= 0 && t2 <= 1) {
        intersectionPoints.push(vec_1.vec2.add(line.start, vec_1.vec2.mul(lineDir, t2)));
    }
    // Remove duplicate intersection points and sort by distance to line start
    intersectionPoints = removeDuplicateVertices(intersectionPoints);
    if (intersectionPoints.length > 1) {
        intersectionPoints.sort((a, b) => {
            const distA = vec_1.vec2.len(vec_1.vec2.sub(a, line.start));
            const distB = vec_1.vec2.len(vec_1.vec2.sub(b, line.start));
            return distA - distB;
        });
    }
    return {
        intersects: intersectionPoints.length > 0,
        intersectionPoints: intersectionPoints.length > 0 ? intersectionPoints : undefined,
    };
}
exports.lineIntersectsCircle = lineIntersectsCircle;
/**
 * Check if a line segment intersects a rectangle
 */
function lineIntersectsRectangle(line, rectangle) {
    // Edge case: zero-size rectangle
    if (rectangle.size.x < constants.EPSILON ||
        rectangle.size.y < constants.EPSILON) {
        return {
            intersects: false,
        };
    }
    // Get vertices of the rectangle in clockwise order
    const vertices = rectangleVertices(rectangle);
    // If both endpoints are inside, line is completely contained
    if (pointInRectangle(line.start, rectangle).intersects &&
        pointInRectangle(line.end, rectangle).intersects) {
        return {
            intersects: true,
        };
    }
    let intersectionPoints = [];
    // Check each edge of the rectangle for intersection
    for (let i = 0; i < 4; i++) {
        const rectEdge = {
            start: vertices[i],
            end: vertices[(i + 1) % 4],
        };
        const intersection = lineIntersectsLine(line, rectEdge);
        if (intersection.intersects && intersection.intersectionPoint) {
            intersectionPoints.push(intersection.intersectionPoint);
        }
    }
    // Remove duplicate intersection points and sort by distance to line start
    intersectionPoints = removeDuplicateVertices(intersectionPoints);
    if (intersectionPoints.length > 1) {
        const lineDir = vec_1.vec2.nor(vec_1.vec2.sub(line.end, line.start));
        intersectionPoints.sort((a, b) => {
            const distA = vec_1.vec2.dot(vec_1.vec2.sub(a, line.start), lineDir);
            const distB = vec_1.vec2.dot(vec_1.vec2.sub(b, line.start), lineDir);
            return distA - distB;
        });
    }
    return {
        intersects: intersectionPoints.length > 0,
        intersectionPoints: intersectionPoints.length > 0 ? intersectionPoints : undefined,
    };
}
exports.lineIntersectsRectangle = lineIntersectsRectangle;
/**
 * Check if a line segment intersects a polygon
 *
 * Returns null if the polygon is invalid
 */
function lineIntersectsPolygon(line, polygon) {
    // First check if the polygon is valid
    if (!polygonIsValid(polygon)) {
        return null;
    }
    // If polygon is not convex, decompose it into convex polygons
    if (!polygonIsConvex(polygon)) {
        const convexPolygons = decomposePolygon(polygon);
        if (!convexPolygons) {
            return null;
        }
        // Special case: line segment is entirely inside polygon
        const midpoint = {
            x: (line.start.x + line.end.x) / 2,
            y: (line.start.y + line.end.y) / 2,
        };
        const pointInside = pointInPolygon(midpoint, polygon);
        const startInside = pointInPolygon(line.start, polygon);
        const endInside = pointInPolygon(line.end, polygon);
        if ((pointInside === null || pointInside === void 0 ? void 0 : pointInside.intersects) &&
            (startInside === null || startInside === void 0 ? void 0 : startInside.intersects) &&
            (endInside === null || endInside === void 0 ? void 0 : endInside.intersects)) {
            return {
                intersects: true,
            };
        }
        // Find outer edges from the decomposed polygons
        const outerEdges = findOuterEdges(convexPolygons);
        let intersectionPoints = [];
        // Check each outer edge for intersections
        for (const [start, end] of outerEdges) {
            const edge = { start, end };
            const intersection = lineIntersectsLine(line, edge);
            if (intersection.intersects && intersection.intersectionPoint) {
                intersectionPoints.push(intersection.intersectionPoint);
            }
        }
        // Remove duplicate intersection points and sort by distance to line start
        intersectionPoints = removeDuplicateVertices(intersectionPoints);
        if (intersectionPoints.length > 1) {
            const lineDir = vec_1.vec2.nor(vec_1.vec2.sub(line.end, line.start));
            intersectionPoints.sort((a, b) => {
                const distA = vec_1.vec2.dot(vec_1.vec2.sub(a, line.start), lineDir);
                const distB = vec_1.vec2.dot(vec_1.vec2.sub(b, line.start), lineDir);
                return distA - distB;
            });
        }
        return {
            intersects: intersectionPoints.length > 0,
            intersectionPoints: intersectionPoints.length > 0 ? intersectionPoints : undefined,
        };
    }
    // For convex polygons, check each edge
    const vertices = polygon.vertices;
    let intersectionPoints = [];
    // Special case: line segment is entirely inside polygon
    const midpoint = {
        x: (line.start.x + line.end.x) / 2,
        y: (line.start.y + line.end.y) / 2,
    };
    const pointInside = pointInPolygon(midpoint, polygon);
    const startInside = pointInPolygon(line.start, polygon);
    const endInside = pointInPolygon(line.end, polygon);
    if ((pointInside === null || pointInside === void 0 ? void 0 : pointInside.intersects) &&
        (startInside === null || startInside === void 0 ? void 0 : startInside.intersects) &&
        (endInside === null || endInside === void 0 ? void 0 : endInside.intersects)) {
        return {
            intersects: true,
        };
    }
    // Check each edge of the polygon
    for (let i = 0; i < vertices.length; i++) {
        const edge = {
            start: vertices[i],
            end: vertices[(i + 1) % vertices.length],
        };
        const intersection = lineIntersectsLine(line, edge);
        if (intersection.intersects && intersection.intersectionPoint) {
            intersectionPoints.push(intersection.intersectionPoint);
        }
    }
    // Remove duplicate intersection points and sort by distance to line start
    intersectionPoints = removeDuplicateVertices(intersectionPoints);
    if (intersectionPoints.length > 1) {
        const lineDir = vec_1.vec2.nor(vec_1.vec2.sub(line.end, line.start));
        intersectionPoints.sort((a, b) => {
            const distA = vec_1.vec2.dot(vec_1.vec2.sub(a, line.start), lineDir);
            const distB = vec_1.vec2.dot(vec_1.vec2.sub(b, line.start), lineDir);
            return distA - distB;
        });
    }
    return {
        intersects: intersectionPoints.length > 0,
        intersectionPoints: intersectionPoints.length > 0 ? intersectionPoints : undefined,
    };
}
exports.lineIntersectsPolygon = lineIntersectsPolygon;
/**
 * Check if two circles intersect
 */
function circleIntersectsCircle(circleA, circleB) {
    // Calculate the vector from center A to center B
    const centerToCenterVec = vec_1.vec2.sub(circleB.position, circleA.position);
    const centerToCenter = vec_1.vec2.len(centerToCenterVec);
    const sumRadii = circleA.radius + circleB.radius;
    // If distance between centers is greater than sum of radii, the circles
    // don't intersect
    if (centerToCenter > sumRadii + constants.EPSILON) {
        return { intersects: false };
    }
    // If circles are identical (same position and radius), they have infinitely
    // many intersection points
    if (centerToCenter < constants.EPSILON &&
        Math.abs(circleA.radius - circleB.radius) < constants.EPSILON) {
        return {
            intersects: true,
            minimumSeparation: vec_1.vec2.mul(vec_1.vec2.ux(), 2 * circleA.radius),
        };
    }
    // Check if one circle is inside the other (no intersection points but still
    // intersecting)
    const radiusDiff = Math.abs(circleA.radius - circleB.radius);
    if (centerToCenter < radiusDiff - constants.EPSILON) {
        return {
            intersects: true,
            minimumSeparation: vec_1.vec2.mul(vec_1.vec2.nor(centerToCenterVec), circleA.radius - centerToCenter + circleB.radius),
        };
    }
    // Calculate intersection points for standard intersecting case
    // http://mathworld.wolfram.com/Circle-CircleIntersection.html
    const a = (circleA.radius * circleA.radius -
        circleB.radius * circleB.radius +
        centerToCenter * centerToCenter) /
        (2 * centerToCenter);
    const h = Math.sqrt(Math.max(0, circleA.radius * circleA.radius - a * a));
    // Calculate the point on the line between centers that is distance 'a' from
    // circle A's center
    const p = vec_1.vec2.add(circleA.position, vec_1.vec2.mul(vec_1.vec2.nor(centerToCenterVec), a));
    // If circles are tangent (touching at one point)
    if (Math.abs(centerToCenter - sumRadii) < constants.EPSILON) {
        return {
            intersects: true,
            intersectionPoints: [p],
            minimumSeparation: (0, vec_1.vec2)(),
        };
    }
    // Calculate the perpendicular vector to get both intersection points
    const perpVec = vec_1.vec2.mul((0, vec_1.vec2)({ x: -centerToCenterVec.y, y: centerToCenterVec.x }), h / centerToCenter);
    const intersectionPoints = [vec_1.vec2.add(p, perpVec), vec_1.vec2.sub(p, perpVec)];
    // Calculate the minimum separation vector (negative value indicates overlap)
    const minimumSeparation = vec_1.vec2.mul(vec_1.vec2.nor(centerToCenterVec), sumRadii - centerToCenter);
    return {
        intersects: true,
        intersectionPoints,
        minimumSeparation,
    };
}
exports.circleIntersectsCircle = circleIntersectsCircle;
/**
 * Check if a circle intersects a rectangle
 */
function circleIntersectsRectangle(circle, rectangle) {
    // Get rectangle vertices so we can test against rotated rectangles
    const vertices = rectangleVertices(rectangle);
    const edges = [
        { start: vertices[0], end: vertices[1] },
        { start: vertices[1], end: vertices[2] },
        { start: vertices[2], end: vertices[3] },
        { start: vertices[3], end: vertices[0] }, // left
    ];
    // Check if circle's center is inside rectangle
    const pointInRectResult = pointInRectangle(circle.position, rectangle);
    const circleCenterInsideRectangle = pointInRectResult.intersects;
    // Check if rectangle's center is inside circle
    const pointInCircleResult = pointInCircle(rectangle.position, circle);
    const rectangleCenterInsideCircle = pointInCircleResult.intersects;
    // Check circle intersection with rectangle edges
    const intersectionPoints = [];
    for (const edge of edges) {
        const result = lineIntersectsCircle(edge, circle);
        if (result.intersects && result.intersectionPoints) {
            intersectionPoints.push(...result.intersectionPoints);
        }
    }
    // Calculate the minimum separation vector
    let minimumSeparation;
    if (Math.abs(pointInRectResult.distance) < constants.EPSILON) {
        minimumSeparation = (0, vec_1.vec2)();
    }
    else if (pointInRectResult.distance < 0) {
        minimumSeparation = vec_1.vec2.mul(vec_1.vec2.nor(vec_1.vec2.sub(pointInRectResult.closestPoint, circle.position)), circle.radius + Math.abs(pointInRectResult.distance));
    }
    else {
        minimumSeparation = vec_1.vec2.mul(vec_1.vec2.nor(vec_1.vec2.sub(circle.position, pointInRectResult.closestPoint)), circle.radius - pointInRectResult.distance);
    }
    // If either shape's center is inside the other and there are no intersection
    // points, it means one of the shapes completely encloses the other
    if ((circleCenterInsideRectangle || rectangleCenterInsideCircle) &&
        intersectionPoints.length === 0) {
        return {
            intersects: true,
            minimumSeparation,
        };
    }
    // Remove duplicate intersection points
    const uniquePoints = removeDuplicateVertices(intersectionPoints);
    if (uniquePoints.length > 0) {
        return {
            intersects: true,
            intersectionPoints: uniquePoints,
            minimumSeparation,
        };
    }
    return { intersects: false };
}
exports.circleIntersectsRectangle = circleIntersectsRectangle;
/**
 * Check if a circle intersects a polygon
 *
 * Returns null if the polygon is invalid
 */
function circleIntersectsPolygon(circle, polygon) {
    var _a;
    // First check if the polygon is valid
    if (!polygonIsValid(polygon)) {
        return null;
    }
    // Check if circle's center is inside polygon
    const pointInPolygonResult = pointInPolygon(circle.position, polygon);
    const circleCenterInsidePolygon = (_a = pointInPolygonResult === null || pointInPolygonResult === void 0 ? void 0 : pointInPolygonResult.intersects) !== null && _a !== void 0 ? _a : false;
    // Check if polygon's centroid is inside circle
    const polygonCenter = polygonCentroid(polygon);
    const polygonCenterInsideCircle = polygonCenter
        ? pointInCircle(polygonCenter, circle).intersects
        : false;
    // If polygon is not convex, decompose it into convex polygons
    if (!polygonIsConvex(polygon)) {
        const convexPolygons = decomposePolygon(polygon);
        if (!convexPolygons) {
            return null;
        }
        // Find outer edges from the decomposed polygons
        const outerEdges = findOuterEdges(convexPolygons);
        const intersectionPoints = [];
        // Check each outer edge for intersections with the circle
        for (const [start, end] of outerEdges) {
            const edge = { start, end };
            const result = lineIntersectsCircle(edge, circle);
            if (result.intersects && result.intersectionPoints) {
                intersectionPoints.push(...result.intersectionPoints);
            }
        }
        // If either shape's center is inside the other and there are no
        // intersection points, one shape completely encloses the other
        if ((circleCenterInsidePolygon || polygonCenterInsideCircle) &&
            intersectionPoints.length === 0) {
            return { intersects: true };
        }
        // Remove duplicate intersection points
        const uniquePoints = removeDuplicateVertices(intersectionPoints);
        return {
            intersects: uniquePoints.length > 0,
            intersectionPoints: uniquePoints.length > 0 ? uniquePoints : undefined,
        };
    }
    // For convex polygons, check each edge directly
    const vertices = polygon.vertices;
    const intersectionPoints = [];
    // Check each edge of the polygon for intersection with the circle
    for (let i = 0; i < vertices.length; i++) {
        const edge = {
            start: vertices[i],
            end: vertices[(i + 1) % vertices.length],
        };
        const result = lineIntersectsCircle(edge, circle);
        if (result.intersects && result.intersectionPoints) {
            intersectionPoints.push(...result.intersectionPoints);
        }
    }
    // If either shape's center is inside the other and there are no
    // intersection points, one shape completely encloses the other
    if ((circleCenterInsidePolygon || polygonCenterInsideCircle) &&
        intersectionPoints.length === 0) {
        return { intersects: true };
    }
    // Remove duplicate intersection points
    const uniquePoints = removeDuplicateVertices(intersectionPoints);
    return {
        intersects: uniquePoints.length > 0,
        intersectionPoints: uniquePoints.length > 0 ? uniquePoints : undefined,
    };
}
exports.circleIntersectsPolygon = circleIntersectsPolygon;
/**
 * Check if two rectangles intersect
 */
function rectangleIntersectsRectangle(rectangleA, rectangleB) {
    throw new Error('not implemented yet'); // TODO
}
exports.rectangleIntersectsRectangle = rectangleIntersectsRectangle;
/**
 * Check if a rectangle intersects a polygon
 *
 * Returns null if the polygon is invalid
 */
function rectangleIntersectsPolygon(rectangle, polygon) {
    throw new Error('not implemented yet'); // TODO
}
exports.rectangleIntersectsPolygon = rectangleIntersectsPolygon;
/**
 * Check if two polygons intersect
 *
 * Returns null if either polygon is invalid
 */
function polygonIntersectsPolygon(polygonA, polygonB) {
    throw new Error('not implemented yet'); // TODO
}
exports.polygonIntersectsPolygon = polygonIntersectsPolygon;
/**
 * Find outer edges in a list of polygons by counting occurrences
 *
 * We assume that the polygons were the result of decomposing a concave polygon
 * into a set of convex polygons, and as such they are all convex and share
 * one or more edges
 *
 * This means we can identify outer edges because they'll only appear once
 * in the list of edges, while inner edges will appear twice (once for each
 * polygon that shares them)
 */
function findOuterEdges(polygons) {
    // Map to track edge occurrences using a unique key that considers
    // collinearity and shared endpoints
    const edgeCounts = new Map();
    // Helper to get a normalized key for an edge that handles collinear segments
    const getEdgeKey = (a, b) => {
        // Sort points to ensure consistent order
        const [p1, p2] = [a, b].sort((x, y) => x.x === y.x ? x.y - y.y : x.x - y.x);
        return `${p1.x},${p1.y}-${p2.x},${p2.y}`;
    };
    // Helper to check if two edges are effectively the same (collinear and
    // sharing endpoint)
    const edgesAreCollinear = (edge1, edge2) => {
        // Check if any endpoints are the same
        const [a1, b1] = edge1;
        const [a2, b2] = edge2;
        const sharesEndpoint = vec_1.vec2.eq(a1, a2) || vec_1.vec2.eq(a1, b2) || vec_1.vec2.eq(b1, a2) || vec_1.vec2.eq(b1, b2);
        if (!sharesEndpoint) {
            return false;
        }
        // Check if edges are collinear
        return pointsAreCollinear(a1, b1, a2) && pointsAreCollinear(a1, b1, b2);
    };
    // First pass: count edges
    for (const polygon of polygons) {
        const vertices = polygon.vertices;
        for (let i = 0; i < vertices.length; i++) {
            const start = vertices[i];
            const end = vertices[(i + 1) % vertices.length];
            const edge = [start, end];
            const key = getEdgeKey(start, end);
            // Check if we already have a collinear edge that shares an endpoint
            let foundCollinear = false;
            for (const data of edgeCounts.values()) {
                if (edgesAreCollinear(edge, data.edge)) {
                    data.count++;
                    foundCollinear = true;
                    break;
                }
            }
            if (!foundCollinear) {
                edgeCounts.set(key, { count: 1, edge });
            }
        }
    }
    // Second pass: collect edges that appear only once
    const outerEdges = [];
    for (const { count, edge } of edgeCounts.values()) {
        if (count === 1) {
            outerEdges.push(edge);
        }
    }
    return outerEdges;
}


/***/ }),

/***/ "./src/2d/types.ts":
/*!*************************!*\
  !*** ./src/2d/types.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.angleBetween = exports.distance = void 0;
const vec_1 = __webpack_require__(/*! @basementuniverse/vec */ "./node_modules/@basementuniverse/vec/vec.js");
__exportStar(__webpack_require__(/*! ./types */ "./src/3d/types.ts"), exports);
/**
 * Calculate the distance between two points in 3D space
 *
 * @param a First point
 * @param b Second point
 * @returns Distance between the two points
 */
function distance(a, b) {
    return vec_1.vec3.len(vec_1.vec3.sub(a, b));
}
exports.distance = distance;
/**
 * Calculate the angle between two vectors in 3D space
 *
 * @param a First vector
 * @param b Second vector
 * @returns Angle in radians
 */
function angleBetween(a, b) {
    return Math.acos(vec_1.vec3.dot(a, b) / (vec_1.vec3.len(a) * vec_1.vec3.len(b)));
}
exports.angleBetween = angleBetween;
// pointOnRay
// pointOnLine
// pointInSphere
// pointOnPlane
// pointInTriangle
// pointInBox
// rayTraverseGrid
// rayIntersectsRay
// rayIntersectsLine
// rayIntersectsSphere
// rayIntersectsTriangle
// rayIntersectsPlane
// rayIntersectsBox
// lineIntersectsRay
// lineIntersectsLine
// lineIntersectsSphere
// lineIntersectsTriangle
// lineIntersectsPlane
// lineIntersectsBox
// sphereIntersectsSphere
// sphereIntersectsTriangle
// sphereIntersectsPlane
// sphereIntersectsBox
// triangleIntersectsTriangle
// triangleOnPlane
// planeIntersectsPlane
// boxIntersectsBox


/***/ }),

/***/ "./src/3d/types.ts":
/*!*************************!*\
  !*** ./src/3d/types.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.intersectionUtilities = exports.intersection3d = exports.intersection2d = void 0;
exports.intersection2d = __importStar(__webpack_require__(/*! ./2d */ "./src/2d/index.ts"));
exports.intersection3d = __importStar(__webpack_require__(/*! ./3d */ "./src/3d/index.ts"));
exports.intersectionUtilities = __importStar(__webpack_require__(/*! ./utilities */ "./src/utilities/index.ts"));


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
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.overlapInterval = exports.intervalsOverlap = exports.valueInInterval = void 0;
/**
 * Check if a value is within a specified interval
 */
function valueInInterval(value, min, max) {
    return value >= min && value <= max;
}
exports.valueInInterval = valueInInterval;
/**
 * Check if two intervals (a1, a2) and (b1, b2) overlap
 */
function intervalsOverlap(a1, a2, b1, b2) {
    return Math.max(a1, b1) <= Math.min(a2, b2);
}
exports.intervalsOverlap = intervalsOverlap;
/**
 * Get the overlapping part of two intervals (a1, a2) and (b1, b2)
 *
 * If the intervals do not overlap, return null
 */
function overlapInterval(a1, a2, b1, b2) {
    if (!intervalsOverlap(a1, a2, b1, b2)) {
        return null;
    }
    return [Math.max(a1, b1), Math.min(a2, b2)];
}
exports.overlapInterval = overlapInterval;


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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});