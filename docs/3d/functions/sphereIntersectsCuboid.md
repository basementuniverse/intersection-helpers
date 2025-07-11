[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / sphereIntersectsCuboid

# Function: sphereIntersectsCuboid()

> **sphereIntersectsCuboid**(`sphere`, `cuboid`): `object`

Defined in: [3d/index.ts:2430](https://github.com/basementuniverse/intersection-helpers/blob/d942e5cf9ee51dc3854d6fbfe1d84a7ecd83c1ca/src/3d/index.ts#L2430)

Check if a sphere intersects a cuboid

## Parameters

### sphere

[`Sphere`](../types/type-aliases/Sphere.md)

### cuboid

[`Cuboid`](../types/type-aliases/Cuboid.md)

## Returns

### contactPoint?

> `optional` **contactPoint**: `vec3`

Closest point on cuboid surface to sphere center

### intersectionPoint?

> `optional` **intersectionPoint**: `vec3`

The point at the center of the intersection volume

### intersects

> **intersects**: `boolean`

Whether the sphere intersects the cuboid

### normal?

> `optional` **normal**: `vec3`

Direction of minimum separation (unit vector)
Points from cuboid center towards sphere center

### penetrationDepth?

> `optional` **penetrationDepth**: `number`

How deeply the sphere penetrates the cuboid
