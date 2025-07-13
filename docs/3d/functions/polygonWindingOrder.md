[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / polygonWindingOrder

# Function: polygonWindingOrder()

> **polygonWindingOrder**(`polygon`, `options?`): `null` \| `"clockwise"` \| `"counter-clockwise"`

Defined in: [3d/index.ts:536](https://github.com/basementuniverse/intersection-helpers/blob/a748c1cf3d5365b189253eb2878888a254b5c3a1/src/3d/index.ts#L536)

Determine the winding order of a polygon's vertices

Returns 'clockwise' or 'counter-clockwise'

By default uses the right-hand rule: if the vertices are ordered
counter-clockwise, the normal points towards the viewer

Returns null if the polygon is invalid or degenerate

## Parameters

### polygon

[`Polygon`](../types/type-aliases/Polygon.md)

### options?

#### handedness?

`"left"` \| `"right"`

Which hand rule to use for determining winding order
- 'right' (default): Counter-clockwise vertices create a normal pointing
  towards viewer
- 'left': Clockwise vertices create a normal pointing towards viewer

#### normal?

`vec3`

Optional normal vector to use as reference

If provided, winding order will be determined relative to this vector

## Returns

`null` \| `"clockwise"` \| `"counter-clockwise"`
