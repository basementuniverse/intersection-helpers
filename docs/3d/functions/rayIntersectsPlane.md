[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / rayIntersectsPlane

# Function: rayIntersectsPlane()

> **rayIntersectsPlane**(`ray`, `plane`): `object`

Defined in: [3d/index.ts:1570](https://github.com/basementuniverse/intersection-helpers/blob/d942e5cf9ee51dc3854d6fbfe1d84a7ecd83c1ca/src/3d/index.ts#L1570)

Check if a ray intersects a plane

## Parameters

### ray

[`Ray`](../types/type-aliases/Ray.md)

### plane

[`Plane`](../types/type-aliases/Plane.md)

## Returns

### intersectionPoint?

> `optional` **intersectionPoint**: `vec3`

The intersection point if the ray intersects the plane

If the ray lies in the plane, this will be undefined since there are
infinite intersection points

### intersects

> **intersects**: `boolean`

Whether the ray intersects the plane
