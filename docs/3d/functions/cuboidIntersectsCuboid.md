[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / cuboidIntersectsCuboid

# Function: cuboidIntersectsCuboid()

> **cuboidIntersectsCuboid**(`cuboidA`, `cuboidB`): `object`

Defined in: [3d/index.ts:2817](https://github.com/basementuniverse/intersection-helpers/blob/3a364a58f0714fe52065b40529091d774e3a1a50/src/3d/index.ts#L2817)

Check if two cuboids intersect using the Separating Axis Theorem

## Parameters

### cuboidA

[`Cuboid`](../types/type-aliases/Cuboid.md)

### cuboidB

[`Cuboid`](../types/type-aliases/Cuboid.md)

## Returns

### contactPoints?

> `optional` **contactPoints**: `object`

The closest points on each cuboid's surface along the separation axis

#### contactPoints.cuboidA

> **cuboidA**: `vec3`

#### contactPoints.cuboidB

> **cuboidB**: `vec3`

### intersectionPoint?

> `optional` **intersectionPoint**: `vec3`

The approximate point at the center of the intersection volume

### intersects

> **intersects**: `boolean`

Whether the cuboids intersect

### normal?

> `optional` **normal**: `vec3`

Direction of minimum separation (unit vector)
Points from cuboid A to cuboid B

### penetrationDepth?

> `optional` **penetrationDepth**: `number`

How deeply the cuboids are intersecting along the minimum separation axis
