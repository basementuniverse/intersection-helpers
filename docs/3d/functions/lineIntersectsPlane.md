[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / lineIntersectsPlane

# Function: lineIntersectsPlane()

> **lineIntersectsPlane**(`line`, `plane`): `object`

Defined in: [3d/index.ts:2014](https://github.com/basementuniverse/intersection-helpers/blob/a748c1cf3d5365b189253eb2878888a254b5c3a1/src/3d/index.ts#L2014)

Check if a line segments intersects a plane

## Parameters

### line

[`Line`](../types/type-aliases/Line.md)

### plane

[`Plane`](../types/type-aliases/Plane.md)

## Returns

### intersectionPoint?

> `optional` **intersectionPoint**: `vec3`

The intersection point if the line segment intersects the plane

If the line segment lies in the plane, this will be undefined since there
are infinite intersection points

### intersects

> **intersects**: `boolean`

Whether the line segment intersects the plane
