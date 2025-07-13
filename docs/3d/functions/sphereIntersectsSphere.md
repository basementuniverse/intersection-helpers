[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / sphereIntersectsSphere

# Function: sphereIntersectsSphere()

> **sphereIntersectsSphere**(`sphereA`, `sphereB`): `object`

Defined in: [3d/index.ts:2275](https://github.com/basementuniverse/intersection-helpers/blob/a748c1cf3d5365b189253eb2878888a254b5c3a1/src/3d/index.ts#L2275)

Check if two spheres intersect

## Parameters

### sphereA

[`Sphere`](../types/type-aliases/Sphere.md)

### sphereB

[`Sphere`](../types/type-aliases/Sphere.md)

## Returns

### contactPoints?

> `optional` **contactPoints**: `object`

The closest points on each sphere's surface along the intersection axis

#### contactPoints.sphereA

> **sphereA**: `vec3`

#### contactPoints.sphereB

> **sphereB**: `vec3`

### intersectionPoint?

> `optional` **intersectionPoint**: `vec3`

The point at the center of the intersection volume

### intersects

> **intersects**: `boolean`

Whether the spheres intersect

### normal?

> `optional` **normal**: `vec3`

Unit vector pointing from sphere A to sphere B

### penetrationDepth?

> `optional` **penetrationDepth**: `number`

How deeply the spheres are intersecting
