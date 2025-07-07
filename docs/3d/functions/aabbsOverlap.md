[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / aabbsOverlap

# Function: aabbsOverlap()

> **aabbsOverlap**(`a`, `b`): `object`

Defined in: [3d/index.ts:285](https://github.com/basementuniverse/intersection-helpers/blob/f22d1cffe16ecb68b4b29b8331edc08e3635d16c/src/3d/index.ts#L285)

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
