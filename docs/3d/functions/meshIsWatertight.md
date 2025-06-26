[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / meshIsWatertight

# Function: meshIsWatertight()

> **meshIsWatertight**(`mesh`): `boolean`

Defined in: [3d/index.ts:448](https://github.com/basementuniverse/intersection-helpers/blob/ce8bdda9fbd616d6a406e87a4824e91fffc01d0e/src/3d/index.ts#L448)

Perform an edge manifold check to tell if a mesh is watertight

Every edge in a watertight mesh should be shared by exactly two triangles

This isn't perfect, but it should be sufficient for most simple cases

## Parameters

### mesh

[`Mesh`](../types/type-aliases/Mesh.md)

## Returns

`boolean`
