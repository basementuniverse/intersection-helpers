[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / cuboidVertices

# Function: cuboidVertices()

> **cuboidVertices**(`cuboid`): `vec3`[]

Defined in: [3d/index.ts:236](https://github.com/basementuniverse/intersection-helpers/blob/ce8bdda9fbd616d6a406e87a4824e91fffc01d0e/src/3d/index.ts#L236)

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
