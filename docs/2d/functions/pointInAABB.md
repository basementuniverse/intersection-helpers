[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / pointInAABB

# Function: pointInAABB()

> **pointInAABB**(`point`, `aabb`): `object`

Defined in: [2d/index.ts:295](https://github.com/basementuniverse/intersection-helpers/blob/d942e5cf9ee51dc3854d6fbfe1d84a7ecd83c1ca/src/2d/index.ts#L295)

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
