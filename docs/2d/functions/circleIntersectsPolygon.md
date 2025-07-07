[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / circleIntersectsPolygon

# Function: circleIntersectsPolygon()

> **circleIntersectsPolygon**(`circle`, `polygon`, `options?`): `null` \| \{ `intersectionPoints?`: `vec2`[]; `intersects`: `boolean`; `minimumSeparation?`: `vec2`; \}

Defined in: [2d/index.ts:2299](https://github.com/basementuniverse/intersection-helpers/blob/f22d1cffe16ecb68b4b29b8331edc08e3635d16c/src/2d/index.ts#L2299)

Check if a circle intersects a polygon

Returns null if the polygon is invalid

## Parameters

### circle

[`Circle`](../types/type-aliases/Circle.md)

### polygon

[`Polygon`](../types/type-aliases/Polygon.md)

### options?

#### findMinimumSeparation?

`boolean`

Whether to find the minimum separation vector between the circle and
polygon if they intersect. Default is false

## Returns

`null`

\{ `intersectionPoints?`: `vec2`[]; `intersects`: `boolean`; `minimumSeparation?`: `vec2`; \}

### intersectionPoints?

> `optional` **intersectionPoints**: `vec2`[]

The intersection points on the polygon's edges if the circle intersects
the polygon

### intersects

> **intersects**: `boolean`

Whether the circle intersects the polygon

### minimumSeparation?

> `optional` **minimumSeparation**: `vec2`

The minimum separation vector between the circle and polygon if they
intersect and `findMinimumSeparation` is true
