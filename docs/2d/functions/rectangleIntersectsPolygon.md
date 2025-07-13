[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / rectangleIntersectsPolygon

# Function: rectangleIntersectsPolygon()

> **rectangleIntersectsPolygon**(`rectangle`, `polygon`): `null` \| \{ `intersectionPoints?`: `vec2`[]; `intersects`: `boolean`; \}

Defined in: [2d/index.ts:2771](https://github.com/basementuniverse/intersection-helpers/blob/a748c1cf3d5365b189253eb2878888a254b5c3a1/src/2d/index.ts#L2771)

Check if a rectangle intersects a polygon

Returns null if the polygon is invalid

## Parameters

### rectangle

[`Rectangle`](../types/type-aliases/Rectangle.md)

### polygon

[`Polygon`](../types/type-aliases/Polygon.md)

## Returns

`null`

\{ `intersectionPoints?`: `vec2`[]; `intersects`: `boolean`; \}

### intersectionPoints?

> `optional` **intersectionPoints**: `vec2`[]

The intersection points on the polygon's edges if the rectangle intersects
the polygon

### intersects

> **intersects**: `boolean`

Whether the rectangle intersects the polygon
