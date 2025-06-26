# Intersection Helpers

> This project is a work in progress! The 2D namespace is mostly complete, but the 3D namespace is still under development.

A collection of helper functions for detecting intersections between various geometric shapes in 2D and 3D.

This library is not intended to be a full collision detection system - if you need that, I'd highly recommend [detect-collisions](https://www.npmjs.com/package/detect-collisions). If you just need to check for intersections between shapes, this library is for you.

Uses [poly-decomp](https://www.npmjs.com/package/poly-decomp) for 2D polygon decomposition.

Uses [vec](https://www.npmjs.com/package/@basementuniverse/vec) for `vec2`, `vec3`, and `mat` types.

Uses [utils](https://www.npmjs.com/package/@basementuniverse/utils) for various utility functions.

## How to install

```bash
npm install @basementuniverse/intersection-helpers
```

## How to use

### Node

```js
import * as intersections from '@basementuniverse/intersection-helpers';

const {
  distance,
} = intersections.default.intersection2d;

const pointA = { x: 1, y: 2 };
const pointB = { x: 4, y: 2 };
console.log(distance(pointA, pointB));
```

### Node (TypeScript)

```ts
import * as intersections from '@basementuniverse/intersection-helpers';

const {
  distance,
} = intersections.intersection2d;

const pointA = { x: 1, y: 2 };
const pointB = { x: 4, y: 2 };
console.log(distance(pointA, pointB));
```

### Browser

```html
<script src="node_modules/@basementuniverse/intersection-helpers/build/index.js"></script>
<script>

const pointA = { x: 1, y: 2 };
const pointB = { x: 4, y: 2 };
console.log(intersection2d.distance(pointA, pointB));

</script>
```

## Documentation

Documentation can be found [here](docs/README.md).

## Examples

Examples can be found [here](/examples/index.html).

## Notes

In the 2D namespace, this library uses the "screen" coordinate system where positive Y is pointing downwards. In places where this makes a difference (specifically in the `polygonWindingOrder` function), we can optionally specify whether to use the "screen" (Y+ is down) or "cartesian" (Y+ is up) coordinate system.

In places where the `polygonWindingOrder` function is called as part of another function, we assume the default "screen" coordinate system.
