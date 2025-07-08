[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / polygonIntersectsPolygon

# Function: polygonIntersectsPolygon()

> **polygonIntersectsPolygon**(`polygonA`, `polygonB`): `null` \| \{ `intersectionPoints?`: `vec3`[]; `intersects`: `boolean`; \}

Defined in: [3d/index.ts:3284](https://github.com/basementuniverse/intersection-helpers/blob/3a364a58f0714fe52065b40529091d774e3a1a50/src/3d/index.ts#L3284)

Check if two polygons intersect

## Parameters

### polygonA

[`Polygon`](../types/type-aliases/Polygon.md)

### polygonB

[`Polygon`](../types/type-aliases/Polygon.md)

## Returns

`null`

\{ `intersectionPoints?`: `vec3`[]; `intersects`: `boolean`; \}

### intersectionPoints?

> `optional` **intersectionPoints**: `vec3`[]

The points where the polygons intersect

Will be undefined if:
- The polygons don't intersect
- The polygons are coplanar and overlapping (infinite intersection points)

### intersects

> **intersects**: `boolean`

Whether the polygons intersect
