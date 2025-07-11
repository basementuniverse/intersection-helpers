[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / rayTraverseGrid

# Function: rayTraverseGrid()

> **rayTraverseGrid**(`ray`, `cellSize`, `gridTopLeftFront`, `gridBottomRightBack`, `maxCells`): `object`

Defined in: [3d/index.ts:1145](https://github.com/basementuniverse/intersection-helpers/blob/d942e5cf9ee51dc3854d6fbfe1d84a7ecd83c1ca/src/3d/index.ts#L1145)

Check which grid cells a ray traverses

Based on "A Fast Voxel Traversal Algorithm for Ray Tracing" by Amanatides
and Woo

We can optionally limit the number of cells traversed by the ray, or set
maxCells to -1 to continue traversing until the ray exits the grid (or until
we hit the hard limit of 10000 cells).

## Parameters

### ray

[`Ray`](../types/type-aliases/Ray.md)

### cellSize

`number`

### gridTopLeftFront

`vec3`

### gridBottomRightBack

`vec3`

### maxCells

`number` = `-1`

## Returns

`object`

### cells

> **cells**: `vec3`[]
