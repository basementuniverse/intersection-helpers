[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / rayIntersectsPolygon

# Function: rayIntersectsPolygon()

> **rayIntersectsPolygon**(`ray`, `polygon`): `null` \| \{ `intersectionPoint?`: `vec3`; `intersects`: `boolean`; \}

Defined in: [3d/index.ts:1643](https://github.com/basementuniverse/intersection-helpers/blob/f22d1cffe16ecb68b4b29b8331edc08e3635d16c/src/3d/index.ts#L1643)

Check if a ray intersects a polygon

## Parameters

### ray

[`Ray`](../types/type-aliases/Ray.md)

### polygon

[`Polygon`](../types/type-aliases/Polygon.md)

## Returns

`null`

\{ `intersectionPoint?`: `vec3`; `intersects`: `boolean`; \}

### intersectionPoint?

> `optional` **intersectionPoint**: `vec3`

The intersection point if the ray intersects the polygon

### intersects

> **intersects**: `boolean`

Whether the ray intersects the polygon
