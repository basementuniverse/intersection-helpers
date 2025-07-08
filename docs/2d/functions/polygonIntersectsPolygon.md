[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / polygonIntersectsPolygon

# Function: polygonIntersectsPolygon()

> **polygonIntersectsPolygon**(`polygonA`, `polygonB`): `null` \| \{ `intersectionPoints?`: `vec2`[]; `intersects`: `boolean`; \}

Defined in: [2d/index.ts:2691](https://github.com/basementuniverse/intersection-helpers/blob/3a364a58f0714fe52065b40529091d774e3a1a50/src/2d/index.ts#L2691)

Check if two polygons intersect

Returns null if either polygon is invalid

## Parameters

### polygonA

[`Polygon`](../types/type-aliases/Polygon.md)

### polygonB

[`Polygon`](../types/type-aliases/Polygon.md)

## Returns

`null`

\{ `intersectionPoints?`: `vec2`[]; `intersects`: `boolean`; \}

### intersectionPoints?

> `optional` **intersectionPoints**: `vec2`[]

The intersection points on the edges of the polygons if they intersect

### intersects

> **intersects**: `boolean`

Whether the polygons intersect
