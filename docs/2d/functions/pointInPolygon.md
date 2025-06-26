[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / pointInPolygon

# Function: pointInPolygon()

> **pointInPolygon**(`point`, `polygon`): `null` \| \{ `closestPoint`: `vec2`; `distance`: `number`; `intersects`: `boolean`; \}

Defined in: [2d/index.ts:851](https://github.com/basementuniverse/intersection-helpers/blob/ce8bdda9fbd616d6a406e87a4824e91fffc01d0e/src/2d/index.ts#L851)

Check if a point is inside a polygon

Returns null if the polygon is invalid

Also returns the closest point on the polygon edge and the distance to it

If the point is inside the polygon, the distance will be negative

## Parameters

### point

`vec2`

### polygon

[`Polygon`](../types/type-aliases/Polygon.md)

## Returns

`null` \| \{ `closestPoint`: `vec2`; `distance`: `number`; `intersects`: `boolean`; \}
