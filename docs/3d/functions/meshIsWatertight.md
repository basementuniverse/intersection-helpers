[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / meshIsWatertight

# Function: meshIsWatertight()

> **meshIsWatertight**(`mesh`): `boolean`

Defined in: [3d/index.ts:774](https://github.com/basementuniverse/intersection-helpers/blob/3a364a58f0714fe52065b40529091d774e3a1a50/src/3d/index.ts#L774)

Perform an edge manifold check to tell if a mesh is watertight

Every edge in a watertight mesh should be shared by exactly two triangles

This isn't perfect, but it should be sufficient for most simple cases

## Parameters

### mesh

[`Mesh`](../types/type-aliases/Mesh.md)

## Returns

`boolean`
