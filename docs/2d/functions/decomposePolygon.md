[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / decomposePolygon

# Function: decomposePolygon()

> **decomposePolygon**(`polygon`, `options?`): `null` \| [`Polygon`](../types/type-aliases/Polygon.md)[]

Defined in: [2d/index.ts:615](https://github.com/basementuniverse/intersection-helpers/blob/39011b43f2fd5dca5c24f1c152bb983bef87ec23/src/2d/index.ts#L615)

Decompose a polygon into a set of convex polygons using the Bayazit
algorithm

Returns null if the polygon is invalid or cannot be decomposed

## Parameters

### polygon

[`Polygon`](../types/type-aliases/Polygon.md)

### options?

#### keepWindingOrder?

`boolean`

#### mode?

`"fast"` \| `"optimal"`

## Returns

`null` \| [`Polygon`](../types/type-aliases/Polygon.md)[]
