[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / aabbsOverlap

# Function: aabbsOverlap()

> **aabbsOverlap**(`a`, `b`): `object`

Defined in: [3d/index.ts:287](https://github.com/basementuniverse/intersection-helpers/blob/3a364a58f0714fe52065b40529091d774e3a1a50/src/3d/index.ts#L287)

Check if two AABBs overlap and return the overlapping volume if they do

## Parameters

### a

[`AABB`](../types/type-aliases/AABB.md)

### b

[`AABB`](../types/type-aliases/AABB.md)

## Returns

### intersects

> **intersects**: `boolean`

Whether the two AABBs overlap

### overlap?

> `optional` **overlap**: [`AABB`](../types/type-aliases/AABB.md)

The overlapping volume as an AABB
