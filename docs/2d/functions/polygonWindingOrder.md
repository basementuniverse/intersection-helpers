[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / polygonWindingOrder

# Function: polygonWindingOrder()

> **polygonWindingOrder**(`polygon`, `options?`): `null` \| `"clockwise"` \| `"counter-clockwise"`

Defined in: [2d/index.ts:541](https://github.com/basementuniverse/intersection-helpers/blob/d942e5cf9ee51dc3854d6fbfe1d84a7ecd83c1ca/src/2d/index.ts#L541)

Determine the winding order of a polygon's vertices

Returns 'clockwise' or 'counter-clockwise' depending on the chosen
coordinate system

By default we use the 'screen' coordinate system (y increases downwards)

Returns null if the polygon is invalid

## Parameters

### polygon

[`Polygon`](../types/type-aliases/Polygon.md)

### options?

#### coordinateSystem?

`"screen"` \| `"cartesian"`

The coordinate system can be 'cartesian' (where y increases upwards) or
'screen' (where y increases downwards, this is the default)

## Returns

`null` \| `"clockwise"` \| `"counter-clockwise"`
