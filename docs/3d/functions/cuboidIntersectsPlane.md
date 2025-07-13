[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / cuboidIntersectsPlane

# Function: cuboidIntersectsPlane()

> **cuboidIntersectsPlane**(`cuboid`, `plane`): `object`

Defined in: [3d/index.ts:3036](https://github.com/basementuniverse/intersection-helpers/blob/a748c1cf3d5365b189253eb2878888a254b5c3a1/src/3d/index.ts#L3036)

Check if a cuboid intersects a plane

## Parameters

### cuboid

[`Cuboid`](../types/type-aliases/Cuboid.md)

### plane

[`Plane`](../types/type-aliases/Plane.md)

## Returns

### intersectionPoints?

> `optional` **intersectionPoints**: `vec3`[]

The points where the cuboid's edges intersect the plane

### intersects

> **intersects**: `boolean`

Whether the cuboid intersects the plane

### penetrationDepth?

> `optional` **penetrationDepth**: `number`

How deeply the cuboid penetrates the plane in the direction opposite to
the plane's normal
