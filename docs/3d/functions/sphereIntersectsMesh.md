[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / sphereIntersectsMesh

# Function: sphereIntersectsMesh()

> **sphereIntersectsMesh**(`sphere`, `mesh`): `object`

Defined in: [3d/index.ts:2656](https://github.com/basementuniverse/intersection-helpers/blob/3a364a58f0714fe52065b40529091d774e3a1a50/src/3d/index.ts#L2656)

Check if a sphere intersects any polygon in a mesh

## Parameters

### sphere

[`Sphere`](../types/type-aliases/Sphere.md)

### mesh

[`Mesh`](../types/type-aliases/Mesh.md)

## Returns

### intersectionPoints?

> `optional` **intersectionPoints**: `vec3`[]

The intersection points if the sphere intersects any polygon in the mesh

### intersects

> **intersects**: `boolean`

Whether the sphere intersects any polygon in the mesh

### polygonIntersectionPoints?

> `optional` **polygonIntersectionPoints**: `vec3`[]

The intersection points on the polygons if any
