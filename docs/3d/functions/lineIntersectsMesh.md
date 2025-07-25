[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / lineIntersectsMesh

# Function: lineIntersectsMesh()

> **lineIntersectsMesh**(`line`, `mesh`): `object`

Defined in: [3d/index.ts:2240](https://github.com/basementuniverse/intersection-helpers/blob/a748c1cf3d5365b189253eb2878888a254b5c3a1/src/3d/index.ts#L2240)

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
