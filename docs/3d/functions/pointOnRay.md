[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / pointOnRay

# Function: pointOnRay()

> **pointOnRay**(`point`, `ray`): `object`

Defined in: [3d/index.ts:808](https://github.com/basementuniverse/intersection-helpers/blob/a748c1cf3d5365b189253eb2878888a254b5c3a1/src/3d/index.ts#L808)

Check if a point is on a ray

Also returns the closest point on the ray and the distance to it

## Parameters

### point

`vec3`

### ray

[`Ray`](../types/type-aliases/Ray.md)

## Returns

### closestPoint?

> `optional` **closestPoint**: `vec3`

The closest point on the ray to the given point

### distance

> **distance**: `number`

The distance from the point to the closest point on the ray

### intersects

> **intersects**: `boolean`

Whether the point is on the ray
