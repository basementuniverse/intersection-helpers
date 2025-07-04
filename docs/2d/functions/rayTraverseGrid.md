[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / rayTraverseGrid

# Function: rayTraverseGrid()

> **rayTraverseGrid**(`ray`, `cellSize`, `gridTopLeft`, `gridBottomRight`, `maxCells`): `object`

Defined in: [2d/index.ts:972](https://github.com/basementuniverse/intersection-helpers/blob/ede9ecb18a1386abf90747a70ee9f16c34ce6207/src/2d/index.ts#L972)

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

### gridTopLeft

`vec2`

### gridBottomRight

`vec2`

### maxCells

`number` = `-1`

## Returns

`object`

### cells

> **cells**: `vec2`[]
