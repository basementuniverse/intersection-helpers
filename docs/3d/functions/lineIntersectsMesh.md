[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / lineIntersectsMesh

# Function: lineIntersectsMesh()

> **lineIntersectsMesh**(`line`, `mesh`): `object`

Defined in: [3d/index.ts:2149](https://github.com/basementuniverse/intersection-helpers/blob/f22d1cffe16ecb68b4b29b8331edc08e3635d16c/src/3d/index.ts#L2149)

Check if a line segment intersects a cuboid

## Parameters

### line

[`Line`](../types/type-aliases/Line.md)

### mesh

[`Mesh`](../types/type-aliases/Mesh.md)

## Returns

### intersectionPoints?

> `optional` **intersectionPoints**: `vec3`[]

The intersection points if the line segment intersects any polygon in the
mesh

### intersects

> **intersects**: `boolean`

Whether the line segment intersects any polygon in the mesh
