[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / pointInPolygon

# Function: pointInPolygon()

> **pointInPolygon**(`point`, `polygon`): `null` \| \{ `closestPoint`: `vec2`; `distance`: `number`; `intersects`: `boolean`; \}

Defined in: [2d/index.ts:1062](https://github.com/basementuniverse/intersection-helpers/blob/d942e5cf9ee51dc3854d6fbfe1d84a7ecd83c1ca/src/2d/index.ts#L1062)

Check if a point is inside a polygon

Returns null if the polygon is invalid

## Parameters

### point

`vec2`

### polygon

[`Polygon`](../types/type-aliases/Polygon.md)

## Returns

`null`

\{ `closestPoint`: `vec2`; `distance`: `number`; `intersects`: `boolean`; \}

### closestPoint

> **closestPoint**: `vec2`

The closest point on the polygon edge to the given point

### distance

> **distance**: `number`

The distance from the point to the closest point on the polygon edge

If the point is inside the polygon, this will be negative

### intersects

> **intersects**: `boolean`

Whether the point is inside the polygon
