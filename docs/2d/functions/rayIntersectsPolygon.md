[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / rayIntersectsPolygon

# Function: rayIntersectsPolygon()

> **rayIntersectsPolygon**(`ray`, `polygon`): `null` \| \{ `intersectionPoints?`: `vec2`[]; `intersects`: `boolean`; \}

Defined in: [2d/index.ts:1631](https://github.com/basementuniverse/intersection-helpers/blob/d942e5cf9ee51dc3854d6fbfe1d84a7ecd83c1ca/src/2d/index.ts#L1631)

Check if a ray intersects a polygon

Returns null if the polygon is invalid

## Parameters

### ray

[`Ray`](../types/type-aliases/Ray.md)

### polygon

[`Polygon`](../types/type-aliases/Polygon.md)

## Returns

`null`

\{ `intersectionPoints?`: `vec2`[]; `intersects`: `boolean`; \}

### intersectionPoints?

> `optional` **intersectionPoints**: `vec2`[]

The intersection points if the ray intersects the polygon

### intersects

> **intersects**: `boolean`

Whether the ray intersects the polygon
