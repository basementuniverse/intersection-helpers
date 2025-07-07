[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / cuboidVertices

# Function: cuboidVertices()

> **cuboidVertices**(`cuboid`): `vec3`[]

Defined in: [3d/index.ts:423](https://github.com/basementuniverse/intersection-helpers/blob/f22d1cffe16ecb68b4b29b8331edc08e3635d16c/src/3d/index.ts#L423)

Get the vertices of a cuboid

Vertices will be returned in the following order:
- Upper face (max z, clockwise starting at the top-left)
  - Top-left
  - Top-right
  - Bottom-right
  - Bottom-left
- Lower face (min z, clockwise starting at the top-left)
  - Top-left
  - Top-right
  - Bottom-right
  - Bottom-left

## Parameters

### cuboid

[`Cuboid`](../types/type-aliases/Cuboid.md)

## Returns

`vec3`[]
