[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / circleIntersectsPolygon

# Function: circleIntersectsPolygon()

> **circleIntersectsPolygon**(`circle`, `polygon`, `options?`): `null` \| \{ `intersectionPoints?`: `vec2`[]; `intersects`: `boolean`; `minimumSeparation?`: `vec2`; \}

Defined in: [2d/index.ts:2013](https://github.com/basementuniverse/intersection-helpers/blob/ede9ecb18a1386abf90747a70ee9f16c34ce6207/src/2d/index.ts#L2013)

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
