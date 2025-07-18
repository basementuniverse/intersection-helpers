[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / sphereIntersectsPolygon

# Function: sphereIntersectsPolygon()

> **sphereIntersectsPolygon**(`sphere`, `polygon`): `null` \| \{ `intersectionPoint?`: `vec3`; `intersects`: `boolean`; `penetrationDepth?`: `number`; `polygonIntersectionPoints?`: `vec3`[]; \}

Defined in: [3d/index.ts:2529](https://github.com/basementuniverse/intersection-helpers/blob/a748c1cf3d5365b189253eb2878888a254b5c3a1/src/3d/index.ts#L2529)

Check if a sphere intersects a polygon

## Parameters

### sphere

[`Sphere`](../types/type-aliases/Sphere.md)

### polygon

[`Polygon`](../types/type-aliases/Polygon.md)

## Returns

`null`

\{ `intersectionPoint?`: `vec3`; `intersects`: `boolean`; `penetrationDepth?`: `number`; `polygonIntersectionPoints?`: `vec3`[]; \}

### intersectionPoint?

> `optional` **intersectionPoint**: `vec3`

The point at the center of the intersection volume

### intersects

> **intersects**: `boolean`

Whether the sphere intersects the polygon

### penetrationDepth?

> `optional` **penetrationDepth**: `number`

How deeply the sphere is intersecting

### polygonIntersectionPoints?

> `optional` **polygonIntersectionPoints**: `vec3`[]

Points where the sphere surface intersects the polygon edges, if any
