[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / rayTraverseGrid

# Function: rayTraverseGrid()

> **rayTraverseGrid**(`ray`, `cellSize`, `gridTopLeft`, `gridBottomRight`, `maxCells`): `object`

Defined in: [2d/index.ts:1141](https://github.com/basementuniverse/intersection-helpers/blob/3a364a58f0714fe52065b40529091d774e3a1a50/src/2d/index.ts#L1141)

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
