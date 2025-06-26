[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / polygonWindingOrder

# Function: polygonWindingOrder()

> **polygonWindingOrder**(`polygon`, `options?`): `null` \| `"clockwise"` \| `"counter-clockwise"`

Defined in: [2d/index.ts:389](https://github.com/basementuniverse/intersection-helpers/blob/ce8bdda9fbd616d6a406e87a4824e91fffc01d0e/src/2d/index.ts#L389)

Determine the winding order of a polygon's vertices

Returns 'clockwise' or 'counter-clockwise' depending on the chosen
coordinate system

The coordinate system can be 'cartesian' (where y increases upwards) or
'screen' (where y increases downwards, this is the default)

Returns null if the polygon is invalid

## Parameters

### polygon

[`Polygon`](../types/type-aliases/Polygon.md)

### options?

#### coordinateSystem?

`"screen"` \| `"cartesian"`

## Returns

`null` \| `"clockwise"` \| `"counter-clockwise"`
