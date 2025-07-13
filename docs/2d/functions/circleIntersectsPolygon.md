[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / circleIntersectsPolygon

# Function: circleIntersectsPolygon()

> **circleIntersectsPolygon**(`circle`, `polygon`, `options?`): `null` \| \{ `intersectionPoints?`: `vec2`[]; `intersects`: `boolean`; `minimumSeparation?`: `vec2`; \}

Defined in: [2d/index.ts:2419](https://github.com/basementuniverse/intersection-helpers/blob/a748c1cf3d5365b189253eb2878888a254b5c3a1/src/2d/index.ts#L2419)

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
