[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / polygonIntersectsMesh

# Function: polygonIntersectsMesh()

> **polygonIntersectsMesh**(`polygon`, `mesh`): `null` \| \{ `intersectionPoints?`: `vec3`[]; `intersects`: `boolean`; \}

Defined in: [3d/index.ts:3471](https://github.com/basementuniverse/intersection-helpers/blob/3a364a58f0714fe52065b40529091d774e3a1a50/src/3d/index.ts#L3471)

Check if a polygon intersects any polygon in a mesh

## Parameters

### polygon

[`Polygon`](../types/type-aliases/Polygon.md)

### mesh

[`Mesh`](../types/type-aliases/Mesh.md)

## Returns

`null`

\{ `intersectionPoints?`: `vec3`[]; `intersects`: `boolean`; \}

### intersectionPoints?

> `optional` **intersectionPoints**: `vec3`[]

The points where the polygon intersects the mesh's polygons

Will be undefined if:
- There are no intersections
- The polygons are coplanar and overlapping

### intersects

> **intersects**: `boolean`

Whether the polygon intersects any polygon in the mesh
