[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / pointInAABB

# Function: pointInAABB()

> **pointInAABB**(`point`, `aabb`): `object`

Defined in: [3d/index.ts:338](https://github.com/basementuniverse/intersection-helpers/blob/a748c1cf3d5365b189253eb2878888a254b5c3a1/src/3d/index.ts#L338)

Check if a point is inside an AABB

This should be a bit faster than pointInRectangle since we don't need to
worry about rotation

## Parameters

### point

`vec3`

### aabb

[`AABB`](../types/type-aliases/AABB.md)

## Returns

### closestPoint

> **closestPoint**: `vec3`

The closest point on the AABB surface to the given point

### distance

> **distance**: `number`

The distance from the point to the closest point on the AABB

If the point is inside the AABB, this will be negative

### intersects

> **intersects**: `boolean`

Whether the point is inside the AABB
