[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / circleIntersectsPolygon

# Function: circleIntersectsPolygon()

> **circleIntersectsPolygon**(`circle`, `polygon`, `options?`): `null` \| \{ `intersectionPoints?`: `vec2`[]; `intersects`: `boolean`; `minimumSeparation?`: `vec2`; \}

Defined in: [2d/index.ts:1957](https://github.com/basementuniverse/intersection-helpers/blob/98a1762f467a7b92d986d7a09e3582c961f718d2/src/2d/index.ts#L1957)

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
