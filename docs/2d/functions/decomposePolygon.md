[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / decomposePolygon

# Function: decomposePolygon()

> **decomposePolygon**(`polygon`, `options?`): `null` \| [`Polygon`](../types/type-aliases/Polygon.md)[]

Defined in: [2d/index.ts:806](https://github.com/basementuniverse/intersection-helpers/blob/a748c1cf3d5365b189253eb2878888a254b5c3a1/src/2d/index.ts#L806)

Decompose a polygon into a set of convex polygons using the Bayazit
algorithm

Returns null if the polygon is invalid or cannot be decomposed

## Parameters

### polygon

[`Polygon`](../types/type-aliases/Polygon.md)

### options?

#### keepWindingOrder?

`boolean`

Whether or not the convex polygons should keep the same winding
order as the original polygon. Default value is true

If this is false, the convex polygons will be returned in whichever
winding order the decomposition algorithm produces (generally this is
clockwise, but it's not guaranteed; it could return a mixture of
clockwise and counter-clockwise winding orders)

#### mode?

`"fast"` \| `"optimal"`

The mode of decomposition: 'fast' uses a quick decomposition
algorithm that may not always produce the optimal result, while 'optimal'
uses a more complex algorithm that guarantees the best result
but is slower. Default is 'fast'

## Returns

`null` \| [`Polygon`](../types/type-aliases/Polygon.md)[]
