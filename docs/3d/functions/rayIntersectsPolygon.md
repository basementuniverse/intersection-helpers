[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / rayIntersectsPolygon

# Function: rayIntersectsPolygon()

> **rayIntersectsPolygon**(`ray`, `polygon`): `null` \| \{ `intersectionPoint?`: `vec3`; `intersects`: `boolean`; \}

Defined in: [3d/index.ts:1721](https://github.com/basementuniverse/intersection-helpers/blob/3a364a58f0714fe52065b40529091d774e3a1a50/src/3d/index.ts#L1721)

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
