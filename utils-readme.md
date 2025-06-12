# utils

A small library of useful functions

## Usage

Node:

```javascript
const utils = require('@basementuniverse/utils');
```

Browser:

```html
<script src="utils.js"></script>
```

Typescript:

```typescript
import * as utils from '@basementuniverse/utils';
```

## Contents

## Functions

<dl>
<dt><a href="#memoize">memoize(f)</a> ⇒ <code>function</code></dt>
<dd><p>Memoize a function</p>
</dd>
<dt><a href="#floatEquals">floatEquals(a, b, [p])</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if two numbers are approximately equal</p>
</dd>
<dt><a href="#clamp">clamp(a, [min], [max])</a> ⇒ <code>number</code></dt>
<dd><p>Clamp a number between min and max</p>
</dd>
<dt><a href="#frac">frac(a)</a> ⇒ <code>number</code></dt>
<dd><p>Get the fractional part of a number</p>
</dd>
<dt><a href="#round">round(n, [d])</a> ⇒ <code>number</code></dt>
<dd><p>Round n to d decimal places</p>
</dd>
<dt><a href="#lerp">lerp(a, b, i)</a> ⇒ <code>number</code></dt>
<dd><p>Do a linear interpolation between a and b</p>
</dd>
<dt><a href="#unlerp">unlerp(a, b, i)</a> ⇒ <code>number</code></dt>
<dd><p>Get the position of i between a and b</p>
</dd>
<dt><a href="#blerp">blerp(c00, c10, c01, c11, ix, iy)</a> ⇒ <code>number</code></dt>
<dd><p>Do a bilinear interpolation</p>
</dd>
<dt><a href="#remap">remap(i, a1, a2, b1, b2)</a> ⇒ <code>number</code></dt>
<dd><p>Re-map a number i from range a1...a2 to b1...b2</p>
</dd>
<dt><a href="#smoothstep">smoothstep(a, b, i)</a> ⇒ <code>number</code></dt>
<dd><p>Do a smooth interpolation between a and b</p>
</dd>
<dt><a href="#radians">radians(degrees)</a> ⇒ <code>number</code></dt>
<dd><p>Get an angle in radians</p>
</dd>
<dt><a href="#degrees">degrees(radians)</a> ⇒ <code>number</code></dt>
<dd><p>Get an angle in degrees</p>
</dd>
<dt><a href="#randomBetween">randomBetween(min, max)</a> ⇒ <code>number</code></dt>
<dd><p>Get a random float in the interval [min, max)</p>
</dd>
<dt><a href="#randomIntBetween">randomIntBetween(min, max)</a> ⇒ <code>number</code></dt>
<dd><p>Get a random integer in the interval [min, max]</p>
</dd>
<dt><a href="#cltRandom">cltRandom([mu], [sigma], [samples])</a> ⇒ <code>number</code></dt>
<dd><p>Get a normally-distributed random number</p>
</dd>
<dt><a href="#cltRandomInt">cltRandomInt(min, max)</a> ⇒ <code>number</code></dt>
<dd><p>Get a normally-distributed random integer in the interval [min, max]</p>
</dd>
<dt><a href="#weightedRandom">weightedRandom(w)</a> ⇒ <code>number</code></dt>
<dd><p>Return a weighted random integer</p>
</dd>
<dt><a href="#lerpArray">lerpArray(a, i, [f])</a> ⇒ <code>number</code></dt>
<dd><p>Return an interpolated value from an array</p>
</dd>
<dt><a href="#dot">dot(a, b)</a> ⇒ <code>number</code></dt>
<dd><p>Get the dot product of two vectors</p>
</dd>
<dt><a href="#factorial">factorial(a)</a> ⇒ <code>number</code></dt>
<dd><p>Get the factorial of a number</p>
</dd>
<dt><a href="#npr">npr(n, r)</a> ⇒ <code>number</code></dt>
<dd><p>Get the number of permutations of r elements from a set of n elements</p>
</dd>
<dt><a href="#ncr">ncr(n, r)</a> ⇒ <code>number</code></dt>
<dd><p>Get the number of combinations of r elements from a set of n elements</p>
</dd>
<dt><a href="#permutations">permutations(a, r)</a> ⇒ <code>Array.&lt;Array.&lt;*&gt;&gt;</code></dt>
<dd><p>Generate all permutations of r elements from an array</p>
</dd>
<dt><a href="#combinations">combinations(a, r)</a> ⇒ <code>Array.&lt;Array.&lt;*&gt;&gt;</code></dt>
<dd><p>Generate all combinations of r elements from an array</p>
</dd>
<dt><a href="#cartesian">cartesian()</a></dt>
<dd><p>Get a cartesian product of arrays</p>
</dd>
<dt><a href="#times">times(f, n)</a> ⇒ <code>Array.&lt;*&gt;</code></dt>
<dd><p>Return a new array with length n by calling function f(i) on each element</p>
</dd>
<dt><a href="#range">range(n)</a> ⇒ <code>Array.&lt;number&gt;</code></dt>
<dd><p>Return an array containing numbers 0-&gt;(n - 1)</p>
</dd>
<dt><a href="#zip">zip(...a)</a> ⇒ <code>Array.&lt;Array.&lt;*&gt;&gt;</code></dt>
<dd><p>Zip multiple arrays together, i.e. ([1, 2, 3], [a, b, c]) =&gt; [[1, a], [2, b], [3, c]]</p>
</dd>
<dt><a href="#at">at(a, i)</a> ⇒ <code>*</code></dt>
<dd><p>Return array[i] with positive and negative wrapping</p>
</dd>
<dt><a href="#peek">peek(a)</a> ⇒ <code>*</code></dt>
<dd><p>Return the last element of an array without removing it</p>
</dd>
<dt><a href="#ind">ind(x, y, w)</a> ⇒ <code>number</code></dt>
<dd><p>Return the index for a given position in an unrolled 2d array</p>
</dd>
<dt><a href="#pos">pos(i, w)</a> ⇒ <code>Array.&lt;number&gt;</code></dt>
<dd><p>Return the position for a given index in an unrolled 2d array</p>
</dd>
<dt><a href="#chunk">chunk(a, n)</a> ⇒ <code>Array.&lt;Array.&lt;*&gt;&gt;</code></dt>
<dd><p>Chop an array into chunks of size n</p>
</dd>
<dt><a href="#shuffle">shuffle(a)</a> ⇒ <code>Array.&lt;*&gt;</code></dt>
<dd><p>Randomly shuffle a shallow copy of an array</p>
</dd>
<dt><a href="#flat">flat(o, concatenator)</a> ⇒ <code>object</code></dt>
<dd><p>Flatten an object</p>
</dd>
<dt><a href="#unflat">unflat(o, concatenator)</a> ⇒ <code>object</code></dt>
<dd><p>Unflatten an object</p>
</dd>
<dt><a href="#split">split(array, predicate)</a> ⇒ <code>Array.&lt;Array.&lt;*&gt;&gt;</code></dt>
<dd><p>Split an array into sub-arrays based on a predicate</p>
</dd>
<dt><a href="#pluck">pluck(o, ...keys)</a> ⇒ <code>object</code></dt>
<dd><p>Pluck keys from an object</p>
</dd>
<dt><a href="#exclude">exclude(o, ...keys)</a> ⇒ <code>object</code></dt>
<dd><p>Exclude keys from an object</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#InterpolationFunction">InterpolationFunction</a> ⇒ <code>number</code></dt>
<dd><p>An interpolation function</p>
</dd>
<dt><a href="#TimesFunction">TimesFunction</a> ⇒ <code>*</code></dt>
<dd><p>A function for generating array values</p>
</dd>
<dt><a href="#SplitPredicate">SplitPredicate</a> ⇒ <code>boolean</code></dt>
<dd><p>A split predicate</p>
</dd>
</dl>

<a name="memoize"></a>

## memoize(f) ⇒ <code>function</code>
Memoize a function

**Kind**: global function  
**Returns**: <code>function</code> - A memoized version of the function  

| Param | Type | Description |
| --- | --- | --- |
| f | <code>function</code> | The function to memoize |

<a name="floatEquals"></a>

## floatEquals(a, b, [p]) ⇒ <code>boolean</code>
Check if two numbers are approximately equal

**Kind**: global function  
**Returns**: <code>boolean</code> - True if numbers a and b are approximately equal  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| a | <code>number</code> |  | Number a |
| b | <code>number</code> |  | Number b |
| [p] | <code>number</code> | <code>Number.EPSILON</code> | The precision value |

<a name="clamp"></a>

## clamp(a, [min], [max]) ⇒ <code>number</code>
Clamp a number between min and max

**Kind**: global function  
**Returns**: <code>number</code> - A clamped number  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| a | <code>number</code> |  | The number to clamp |
| [min] | <code>number</code> | <code>0</code> | The minimum value |
| [max] | <code>number</code> | <code>1</code> | The maximum value |

<a name="frac"></a>

## frac(a) ⇒ <code>number</code>
Get the fractional part of a number

**Kind**: global function  
**Returns**: <code>number</code> - The fractional part of the number  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>number</code> | The number from which to get the fractional part |

<a name="round"></a>

## round(n, [d]) ⇒ <code>number</code>
Round n to d decimal places

**Kind**: global function  
**Returns**: <code>number</code> - A rounded number  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| n | <code>number</code> |  | The number to round |
| [d] | <code>number</code> | <code>0</code> | The number of decimal places to round to |

<a name="lerp"></a>

## lerp(a, b, i) ⇒ <code>number</code>
Do a linear interpolation between a and b

**Kind**: global function  
**Returns**: <code>number</code> - An interpolated value in the interval [a, b]  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>number</code> | The minimum number |
| b | <code>number</code> | The maximum number |
| i | <code>number</code> | The interpolation value, should be in the interval [0, 1] |

<a name="unlerp"></a>

## unlerp(a, b, i) ⇒ <code>number</code>
Get the position of i between a and b

**Kind**: global function  
**Returns**: <code>number</code> - The position of i between a and b  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>number</code> | The minimum number |
| b | <code>number</code> | The maximum number |
| i | <code>number</code> | The interpolated value in the interval [a, b] |

<a name="blerp"></a>

## blerp(c00, c10, c01, c11, ix, iy) ⇒ <code>number</code>
Do a bilinear interpolation

**Kind**: global function  
**Returns**: <code>number</code> - A bilinear interpolated value  

| Param | Type | Description |
| --- | --- | --- |
| c00 | <code>number</code> | Top-left value |
| c10 | <code>number</code> | Top-right value |
| c01 | <code>number</code> | Bottom-left value |
| c11 | <code>number</code> | Bottom-right value |
| ix | <code>number</code> | Interpolation value along x |
| iy | <code>number</code> | Interpolation value along y |

<a name="remap"></a>

## remap(i, a1, a2, b1, b2) ⇒ <code>number</code>
Re-map a number i from range a1...a2 to b1...b2

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| i | <code>number</code> | The number to re-map |
| a1 | <code>number</code> |  |
| a2 | <code>number</code> |  |
| b1 | <code>number</code> |  |
| b2 | <code>number</code> |  |

<a name="smoothstep"></a>

## smoothstep(a, b, i) ⇒ <code>number</code>
Do a smooth interpolation between a and b

**Kind**: global function  
**Returns**: <code>number</code> - An interpolated value in the interval [a, b]  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>number</code> | The minimum number |
| b | <code>number</code> | The maximum number |
| i | <code>number</code> | The interpolation value |

<a name="radians"></a>

## radians(degrees) ⇒ <code>number</code>
Get an angle in radians

**Kind**: global function  
**Returns**: <code>number</code> - The angle in radians  

| Param | Type | Description |
| --- | --- | --- |
| degrees | <code>number</code> | The angle in degrees |

<a name="degrees"></a>

## degrees(radians) ⇒ <code>number</code>
Get an angle in degrees

**Kind**: global function  
**Returns**: <code>number</code> - The angle in degrees  

| Param | Type | Description |
| --- | --- | --- |
| radians | <code>number</code> | The angle in radians |

<a name="randomBetween"></a>

## randomBetween(min, max) ⇒ <code>number</code>
Get a random float in the interval [min, max)

**Kind**: global function  
**Returns**: <code>number</code> - A random float in the interval [min, max)  

| Param | Type | Description |
| --- | --- | --- |
| min | <code>number</code> | Inclusive min |
| max | <code>number</code> | Exclusive max |

<a name="randomIntBetween"></a>

## randomIntBetween(min, max) ⇒ <code>number</code>
Get a random integer in the interval [min, max]

**Kind**: global function  
**Returns**: <code>number</code> - A random integer in the interval [min, max]  

| Param | Type | Description |
| --- | --- | --- |
| min | <code>number</code> | Inclusive min |
| max | <code>number</code> | Inclusive max |

<a name="cltRandom"></a>

## cltRandom([mu], [sigma], [samples]) ⇒ <code>number</code>
Get a normally-distributed random number

**Kind**: global function  
**Returns**: <code>number</code> - A normally-distributed random number  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [mu] | <code>number</code> | <code>0.5</code> | The mean value |
| [sigma] | <code>number</code> | <code>0.5</code> | The standard deviation |
| [samples] | <code>number</code> | <code>2</code> | The number of samples |

<a name="cltRandomInt"></a>

## cltRandomInt(min, max) ⇒ <code>number</code>
Get a normally-distributed random integer in the interval [min, max]

**Kind**: global function  
**Returns**: <code>number</code> - A normally-distributed random integer  

| Param | Type | Description |
| --- | --- | --- |
| min | <code>number</code> | Inclusive min |
| max | <code>number</code> | Inclusive max |

<a name="weightedRandom"></a>

## weightedRandom(w) ⇒ <code>number</code>
Return a weighted random integer

**Kind**: global function  
**Returns**: <code>number</code> - An index from w  

| Param | Type | Description |
| --- | --- | --- |
| w | <code>Array.&lt;number&gt;</code> | An array of weights |

<a name="lerpArray"></a>

## lerpArray(a, i, [f]) ⇒ <code>number</code>
Return an interpolated value from an array

**Kind**: global function  
**Returns**: <code>number</code> - An interpolated value in the interval [min(a), max(a)]  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| a | <code>Array.&lt;number&gt;</code> |  | An array of values interpolate |
| i | <code>number</code> |  | A number in the interval [0, 1] |
| [f] | [<code>InterpolationFunction</code>](#InterpolationFunction) | <code>Math.lerp</code> | The interpolation function to use |

<a name="dot"></a>

## dot(a, b) ⇒ <code>number</code>
Get the dot product of two vectors

**Kind**: global function  
**Returns**: <code>number</code> - a ∙ b  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>Array.&lt;number&gt;</code> | Vector a |
| b | <code>Array.&lt;number&gt;</code> | Vector b |

<a name="factorial"></a>

## factorial(a) ⇒ <code>number</code>
Get the factorial of a number

**Kind**: global function  
**Returns**: <code>number</code> - a!  

| Param | Type |
| --- | --- |
| a | <code>number</code> | 

<a name="npr"></a>

## npr(n, r) ⇒ <code>number</code>
Get the number of permutations of r elements from a set of n elements

**Kind**: global function  
**Returns**: <code>number</code> - nPr  

| Param | Type |
| --- | --- |
| n | <code>number</code> | 
| r | <code>number</code> | 

<a name="ncr"></a>

## ncr(n, r) ⇒ <code>number</code>
Get the number of combinations of r elements from a set of n elements

**Kind**: global function  
**Returns**: <code>number</code> - nCr  

| Param | Type |
| --- | --- |
| n | <code>number</code> | 
| r | <code>number</code> | 

<a name="permutations"></a>

## permutations(a, r) ⇒ <code>Array.&lt;Array.&lt;\*&gt;&gt;</code>
Generate all permutations of r elements from an array

**Kind**: global function  
**Returns**: <code>Array.&lt;Array.&lt;\*&gt;&gt;</code> - An array of permutation arrays  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>Array.&lt;\*&gt;</code> |  |
| r | <code>number</code> | The number of elements to choose in each permutation |

**Example**  
```js
permutations([1, 2, 3], 2);
```

Output:
```json
[
  [1, 2],
  [1, 3],
  [2, 1],
  [2, 3],
  [3, 1],
  [3, 2]
]
```
<a name="combinations"></a>

## combinations(a, r) ⇒ <code>Array.&lt;Array.&lt;\*&gt;&gt;</code>
Generate all combinations of r elements from an array

**Kind**: global function  
**Returns**: <code>Array.&lt;Array.&lt;\*&gt;&gt;</code> - An array of combination arrays  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>Array.&lt;\*&gt;</code> |  |
| r | <code>number</code> | The number of elements to choose in each combination |

**Example**  
```js
combinations([1, 2, 3], 2);
```

Output:
```json
[
  [1, 2],
  [1, 3],
  [2, 3]
]
```
<a name="cartesian"></a>

## cartesian()
Get a cartesian product of arrays

**Kind**: global function  
**Example**  
```js
cartesian([1, 2, 3], ['a', 'b']);
```

Output:
```json
[
  [1, "a"],
  [1, "b"],
  [2, "a"],
  [2, "b"],
  [3, "a"],
  [3, "b"]
]
```
<a name="times"></a>

## times(f, n) ⇒ <code>Array.&lt;\*&gt;</code>
Return a new array with length n by calling function f(i) on each element

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| f | [<code>TimesFunction</code>](#TimesFunction) |  |
| n | <code>number</code> | The size of the array |

<a name="range"></a>

## range(n) ⇒ <code>Array.&lt;number&gt;</code>
Return an array containing numbers 0->(n - 1)

**Kind**: global function  
**Returns**: <code>Array.&lt;number&gt;</code> - An array of integers 0->(n - 1)  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>number</code> | The size of the array |

<a name="zip"></a>

## zip(...a) ⇒ <code>Array.&lt;Array.&lt;\*&gt;&gt;</code>
Zip multiple arrays together, i.e. ([1, 2, 3], [a, b, c]) => [[1, a], [2, b], [3, c]]

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| ...a | <code>Array.&lt;\*&gt;</code> | The arrays to zip |

<a name="at"></a>

## at(a, i) ⇒ <code>\*</code>
Return array[i] with positive and negative wrapping

**Kind**: global function  
**Returns**: <code>\*</code> - An element from the array  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>Array.&lt;\*&gt;</code> | The array to access |
| i | <code>number</code> | The positively/negatively wrapped array index |

<a name="peek"></a>

## peek(a) ⇒ <code>\*</code>
Return the last element of an array without removing it

**Kind**: global function  
**Returns**: <code>\*</code> - The last element from the array  

| Param | Type |
| --- | --- |
| a | <code>Array.&lt;\*&gt;</code> | 

<a name="ind"></a>

## ind(x, y, w) ⇒ <code>number</code>
Return the index for a given position in an unrolled 2d array

**Kind**: global function  
**Returns**: <code>number</code> - The index in the unrolled array  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x position |
| y | <code>number</code> | The y position |
| w | <code>number</code> | The width of the 2d array |

<a name="pos"></a>

## pos(i, w) ⇒ <code>Array.&lt;number&gt;</code>
Return the position for a given index in an unrolled 2d array

**Kind**: global function  
**Returns**: <code>Array.&lt;number&gt;</code> - The position as a 2-tuple  

| Param | Type | Description |
| --- | --- | --- |
| i | <code>number</code> | The index |
| w | <code>number</code> | The width of the 2d array |

<a name="chunk"></a>

## chunk(a, n) ⇒ <code>Array.&lt;Array.&lt;\*&gt;&gt;</code>
Chop an array into chunks of size n

**Kind**: global function  
**Returns**: <code>Array.&lt;Array.&lt;\*&gt;&gt;</code> - An array of array chunks  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>Array.&lt;\*&gt;</code> |  |
| n | <code>number</code> | The chunk size |

<a name="shuffle"></a>

## shuffle(a) ⇒ <code>Array.&lt;\*&gt;</code>
Randomly shuffle a shallow copy of an array

**Kind**: global function  
**Returns**: <code>Array.&lt;\*&gt;</code> - The shuffled array  

| Param | Type |
| --- | --- |
| a | <code>Array.&lt;\*&gt;</code> | 

<a name="flat"></a>

## flat(o, concatenator) ⇒ <code>object</code>
Flatten an object

**Kind**: global function  
**Returns**: <code>object</code> - A flattened object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| o | <code>object</code> |  |  |
| concatenator | <code>string</code> | <code>&quot;.&quot;</code> | The string to use for concatenating keys |

<a name="unflat"></a>

## unflat(o, concatenator) ⇒ <code>object</code>
Unflatten an object

**Kind**: global function  
**Returns**: <code>object</code> - An un-flattened object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| o | <code>object</code> |  |  |
| concatenator | <code>string</code> | <code>&quot;.&quot;</code> | The string to check for in concatenated keys |

<a name="split"></a>

## split(array, predicate) ⇒ <code>Array.&lt;Array.&lt;\*&gt;&gt;</code>
Split an array into sub-arrays based on a predicate

**Kind**: global function  
**Returns**: <code>Array.&lt;Array.&lt;\*&gt;&gt;</code> - An array of arrays  

| Param | Type |
| --- | --- |
| array | <code>Array.&lt;\*&gt;</code> | 
| predicate | [<code>SplitPredicate</code>](#SplitPredicate) | 

<a name="pluck"></a>

## pluck(o, ...keys) ⇒ <code>object</code>
Pluck keys from an object

**Kind**: global function  
**Returns**: <code>object</code> - An object containing the plucked keys  

| Param | Type | Description |
| --- | --- | --- |
| o | <code>object</code> |  |
| ...keys | <code>string</code> | The keys to pluck from the object |

<a name="exclude"></a>

## exclude(o, ...keys) ⇒ <code>object</code>
Exclude keys from an object

**Kind**: global function  
**Returns**: <code>object</code> - An object containing all keys except excluded keys  

| Param | Type | Description |
| --- | --- | --- |
| o | <code>object</code> |  |
| ...keys | <code>string</code> | The keys to exclude from the object |

<a name="InterpolationFunction"></a>

## InterpolationFunction ⇒ <code>number</code>
An interpolation function

**Kind**: global typedef  
**Returns**: <code>number</code> - The interpolated value in the interval [a, b]  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>number</code> | The minimum number |
| b | <code>number</code> | The maximum number |
| i | <code>number</code> | The interpolation value, should be in the interval [0, 1] |

<a name="TimesFunction"></a>

## TimesFunction ⇒ <code>\*</code>
A function for generating array values

**Kind**: global typedef  
**Returns**: <code>\*</code> - The array value  

| Param | Type | Description |
| --- | --- | --- |
| i | <code>number</code> | The array index |

<a name="SplitPredicate"></a>

## SplitPredicate ⇒ <code>boolean</code>
A split predicate

**Kind**: global typedef  
**Returns**: <code>boolean</code> - True if the array should split at this index  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | The current value |

