[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / polygonWindingOrder

# Function: polygonWindingOrder()

> **polygonWindingOrder**(`polygon`, `options?`): `null` \| `"clockwise"` \| `"counter-clockwise"`

Defined in: [2d/index.ts:388](https://github.com/basementuniverse/intersection-helpers/blob/98a1762f467a7b92d986d7a09e3582c961f718d2/src/2d/index.ts#L388)

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
