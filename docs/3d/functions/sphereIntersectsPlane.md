[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / sphereIntersectsPlane

# Function: sphereIntersectsPlane()

> **sphereIntersectsPlane**(`sphere`, `plane`): `object`

Defined in: [3d/index.ts:2366](https://github.com/basementuniverse/intersection-helpers/blob/3a364a58f0714fe52065b40529091d774e3a1a50/src/3d/index.ts#L2366)

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
