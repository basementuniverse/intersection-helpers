[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / meshIntersectsMesh

# Function: meshIntersectsMesh()

> **meshIntersectsMesh**(`meshA`, `meshB`): `object`

Defined in: [3d/index.ts:3532](https://github.com/basementuniverse/intersection-helpers/blob/a748c1cf3d5365b189253eb2878888a254b5c3a1/src/3d/index.ts#L3532)

Check if two meshes intersect using their polygons

## Parameters

### meshA

[`Mesh`](../types/type-aliases/Mesh.md)

### meshB

[`Mesh`](../types/type-aliases/Mesh.md)

## Returns

### intersectionPoints?

> `optional` **intersectionPoints**: `vec3`[]

The points where the polygons intersect

### intersects

> **intersects**: `boolean`

Whether any polygons in either mesh intersect with polygons from the other
mesh
