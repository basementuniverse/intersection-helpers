[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / pointInPolygon

# Function: pointInPolygon()

> **pointInPolygon**(`point`, `polygon`): `null` \| \{ `closestPoint`: `vec2`; `distance`: `number`; `intersects`: `boolean`; `normal?`: `vec2`; \}

Defined in: [2d/index.ts:1165](https://github.com/basementuniverse/intersection-helpers/blob/a748c1cf3d5365b189253eb2878888a254b5c3a1/src/2d/index.ts#L1165)

Check if a point is inside a polygon

Returns null if the polygon is invalid

## Parameters

### point

`vec2`

### polygon

[`Polygon`](../types/type-aliases/Polygon.md)

## Returns

`null`

\{ `closestPoint`: `vec2`; `distance`: `number`; `intersects`: `boolean`; `normal?`: `vec2`; \}

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

### normal?

> `optional` **normal**: `vec2`

The intersection normal, if there is an intersection

This will be a normal to the surface on which the closest point lies
