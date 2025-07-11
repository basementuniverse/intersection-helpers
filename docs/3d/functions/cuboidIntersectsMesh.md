[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / cuboidIntersectsMesh

# Function: cuboidIntersectsMesh()

> **cuboidIntersectsMesh**(`cuboid`, `mesh`): `object`

Defined in: [3d/index.ts:3225](https://github.com/basementuniverse/intersection-helpers/blob/d942e5cf9ee51dc3854d6fbfe1d84a7ecd83c1ca/src/3d/index.ts#L3225)

Check if a cuboid intersects any polygon in a mesh

## Parameters

### cuboid

[`Cuboid`](../types/type-aliases/Cuboid.md)

### mesh

[`Mesh`](../types/type-aliases/Mesh.md)

## Returns

### intersectionPoints?

> `optional` **intersectionPoints**: `vec3`[]

The points where the cuboid intersects the mesh's polygons

Will be undefined if:
- There are no intersections
- A polygon is entirely inside the cuboid
- A polygon is coincident with a cuboid face

### intersects

> **intersects**: `boolean`

Whether the cuboid intersects any polygon in the mesh
