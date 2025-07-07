[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / aabbsOverlap

# Function: aabbsOverlap()

> **aabbsOverlap**(`a`, `b`): `object`

Defined in: [2d/index.ts:252](https://github.com/basementuniverse/intersection-helpers/blob/f22d1cffe16ecb68b4b29b8331edc08e3635d16c/src/2d/index.ts#L252)

Check if two AABBs overlap and return the overlapping area if so

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

The overlapping area, if the AABBs overlap
