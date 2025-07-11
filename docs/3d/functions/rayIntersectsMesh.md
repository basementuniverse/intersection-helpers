[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / rayIntersectsMesh

# Function: rayIntersectsMesh()

> **rayIntersectsMesh**(`ray`, `mesh`): `object`

Defined in: [3d/index.ts:1773](https://github.com/basementuniverse/intersection-helpers/blob/d942e5cf9ee51dc3854d6fbfe1d84a7ecd83c1ca/src/3d/index.ts#L1773)

Check if a ray intersects any of the polygons in a mesh

## Parameters

### ray

[`Ray`](../types/type-aliases/Ray.md)

### mesh

[`Mesh`](../types/type-aliases/Mesh.md)

## Returns

### intersectionPoints?

> `optional` **intersectionPoints**: `vec3`[]

The intersection points if the ray intersects any polygon in the mesh

### intersects

> **intersects**: `boolean`

Whether the ray intersects any polygon in the mesh
