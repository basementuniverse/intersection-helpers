[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / polygonIntersectsMesh

# Function: polygonIntersectsMesh()

> **polygonIntersectsMesh**(`polygon`, `mesh`): `null` \| \{ `intersectionPoints?`: `vec3`[]; `intersects`: `boolean`; \}

Defined in: [3d/index.ts:3471](https://github.com/basementuniverse/intersection-helpers/blob/a748c1cf3d5365b189253eb2878888a254b5c3a1/src/3d/index.ts#L3471)

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
