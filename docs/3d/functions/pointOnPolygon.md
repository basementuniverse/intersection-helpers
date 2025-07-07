[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / pointOnPolygon

# Function: pointOnPolygon()

> **pointOnPolygon**(`point`, `polygon`): `null` \| \{ `closestPoint`: `vec3`; `distance`: `number`; `intersects`: `boolean`; \}

Defined in: [3d/index.ts:971](https://github.com/basementuniverse/intersection-helpers/blob/f22d1cffe16ecb68b4b29b8331edc08e3635d16c/src/3d/index.ts#L971)

## Parameters

### point

`vec3`

### polygon

[`Polygon`](../types/type-aliases/Polygon.md)

## Returns

`null`

\{ `closestPoint`: `vec3`; `distance`: `number`; `intersects`: `boolean`; \}

### closestPoint

> **closestPoint**: `vec3`

The closest point on the polygon to the given point

### distance

> **distance**: `number`

The distance from the point to the closest point on the polygon

### intersects

> **intersects**: `boolean`

Whether the point intersects the polygon
