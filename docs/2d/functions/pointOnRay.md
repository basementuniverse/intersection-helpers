[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / pointOnRay

# Function: pointOnRay()

> **pointOnRay**(`point`, `ray`): `object`

Defined in: [2d/index.ts:877](https://github.com/basementuniverse/intersection-helpers/blob/a748c1cf3d5365b189253eb2878888a254b5c3a1/src/2d/index.ts#L877)

Check if a point is on a ray

## Parameters

### point

`vec2`

### ray

[`Ray`](../types/type-aliases/Ray.md)

## Returns

### closestPoint

> **closestPoint**: `vec2`

The closest point on the ray to the given point

### distance

> **distance**: `number`

The distance from the point to the closest point on the ray

### intersects

> **intersects**: `boolean`

Whether the point is on the ray

### normal?

> `optional` **normal**: `vec2`

The intersection normal - a unit vector perpendicular to the ray,
pointing towards the side that the test point is on

If the point is on the ray, this will be undefined
