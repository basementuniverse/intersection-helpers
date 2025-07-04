[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / meshIsWatertight

# Function: meshIsWatertight()

> **meshIsWatertight**(`mesh`): `boolean`

Defined in: [3d/index.ts:445](https://github.com/basementuniverse/intersection-helpers/blob/ede9ecb18a1386abf90747a70ee9f16c34ce6207/src/3d/index.ts#L445)

Perform an edge manifold check to tell if a mesh is watertight

Every edge in a watertight mesh should be shared by exactly two triangles

This isn't perfect, but it should be sufficient for most simple cases

## Parameters

### mesh

[`Mesh`](../types/type-aliases/Mesh.md)

## Returns

`boolean`
