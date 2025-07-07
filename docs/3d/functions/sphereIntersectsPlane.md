[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / sphereIntersectsPlane

# Function: sphereIntersectsPlane()

> **sphereIntersectsPlane**(`sphere`, `plane`): `object`

Defined in: [3d/index.ts:2275](https://github.com/basementuniverse/intersection-helpers/blob/f22d1cffe16ecb68b4b29b8331edc08e3635d16c/src/3d/index.ts#L2275)

Check if a sphere intersects a plane

## Parameters

### sphere

[`Sphere`](../types/type-aliases/Sphere.md)

### plane

[`Plane`](../types/type-aliases/Plane.md)

## Returns

### intersectionPoint?

> `optional` **intersectionPoint**: `vec3`

The point at the center of the intersection volume

### intersectionRadius?

> `optional` **intersectionRadius**: `number`

The radius of the intersection volume

### intersects

> **intersects**: `boolean`

Whether the sphere intersects the plane

### penetrationDepth?

> `optional` **penetrationDepth**: `number`

How deeply the spheres are intersecting
