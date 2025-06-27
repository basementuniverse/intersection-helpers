[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / circleIntersectsPolygon

# Function: circleIntersectsPolygon()

> **circleIntersectsPolygon**(`circle`, `polygon`, `options?`): `null` \| \{ `intersectionPoints?`: `vec2`[]; `intersects`: `boolean`; `minimumSeparation?`: `vec2`; \}

Defined in: [2d/index.ts:1958](https://github.com/basementuniverse/intersection-helpers/blob/39011b43f2fd5dca5c24f1c152bb983bef87ec23/src/2d/index.ts#L1958)

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

## Returns

`null` \| \{ `intersectionPoints?`: `vec2`[]; `intersects`: `boolean`; `minimumSeparation?`: `vec2`; \}
