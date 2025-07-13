[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / pointOnPolygon

# Function: pointOnPolygon()

> **pointOnPolygon**(`point`, `polygon`): `null` \| \{ `closestPoint`: `vec3`; `distance`: `number`; `intersects`: `boolean`; \}

Defined in: [3d/index.ts:1036](https://github.com/basementuniverse/intersection-helpers/blob/a748c1cf3d5365b189253eb2878888a254b5c3a1/src/3d/index.ts#L1036)

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
