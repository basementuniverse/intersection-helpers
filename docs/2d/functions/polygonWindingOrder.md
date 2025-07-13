[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / polygonWindingOrder

# Function: polygonWindingOrder()

> **polygonWindingOrder**(`polygon`, `options?`): `null` \| `"clockwise"` \| `"counter-clockwise"`

Defined in: [2d/index.ts:569](https://github.com/basementuniverse/intersection-helpers/blob/a748c1cf3d5365b189253eb2878888a254b5c3a1/src/2d/index.ts#L569)

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
