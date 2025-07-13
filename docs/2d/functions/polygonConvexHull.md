[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / polygonConvexHull

# Function: polygonConvexHull()

> **polygonConvexHull**(`polygon`, `options?`): `null` \| [`Polygon`](../types/type-aliases/Polygon.md)

Defined in: [2d/index.ts:643](https://github.com/basementuniverse/intersection-helpers/blob/a748c1cf3d5365b189253eb2878888a254b5c3a1/src/2d/index.ts#L643)

Calculate the convex hull of a polygon

## Parameters

### polygon

[`Polygon`](../types/type-aliases/Polygon.md)

### options?

#### keepWindingOrder?

`boolean`

Whether or not the convex hull should keep the same winding order as the
original polygon. Default value is true

If this is false, the convex hull will always be returned in
counter-clockwise winding order

## Returns

`null` \| [`Polygon`](../types/type-aliases/Polygon.md)
