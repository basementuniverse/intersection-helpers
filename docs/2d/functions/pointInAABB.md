[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / pointInAABB

# Function: pointInAABB()

> **pointInAABB**(`point`, `aabb`): `object`

Defined in: [2d/index.ts:295](https://github.com/basementuniverse/intersection-helpers/blob/a748c1cf3d5365b189253eb2878888a254b5c3a1/src/2d/index.ts#L295)

Check if a point is inside an AABB

This should be faster than pointInRectangle since we don't need to consider
rotation

## Parameters

### point

`vec2`

### aabb

[`AABB`](../types/type-aliases/AABB.md)

## Returns

### closestPoint

> **closestPoint**: `vec2`

The closest point on the AABB perimeter to the given point

### distance

> **distance**: `number`

The distance from the point to the closest point on the AABB

If the point is inside the AABB, this will be negative

### intersects

> **intersects**: `boolean`

Whether the point is inside the AABB

### normal?

> `optional` **normal**: `vec2`

The intersecting surface normal, if there is an intersection
