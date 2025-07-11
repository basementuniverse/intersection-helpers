[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / polygonConvexHull

# Function: polygonConvexHull()

> **polygonConvexHull**(`polygon`, `options?`): `null` \| [`Polygon`](../types/type-aliases/Polygon.md)

Defined in: [2d/index.ts:615](https://github.com/basementuniverse/intersection-helpers/blob/d942e5cf9ee51dc3854d6fbfe1d84a7ecd83c1ca/src/2d/index.ts#L615)

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
