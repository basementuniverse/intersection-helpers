[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / lineIntersectsPolygon

# Function: lineIntersectsPolygon()

> **lineIntersectsPolygon**(`line`, `polygon`): `null` \| \{ `intersectionPoints?`: `vec2`[]; `intersects`: `boolean`; \}

Defined in: [2d/index.ts:2011](https://github.com/basementuniverse/intersection-helpers/blob/3a364a58f0714fe52065b40529091d774e3a1a50/src/2d/index.ts#L2011)

Check if a line segment intersects a polygon

Returns null if the polygon is invalid

## Parameters

### line

[`Line`](../types/type-aliases/Line.md)

### polygon

[`Polygon`](../types/type-aliases/Polygon.md)

## Returns

`null`

\{ `intersectionPoints?`: `vec2`[]; `intersects`: `boolean`; \}

### intersectionPoints?

> `optional` **intersectionPoints**: `vec2`[]

The intersection points if the line segment intersects the polygon

### intersects

> **intersects**: `boolean`

Whether the line segment intersects the polygon
