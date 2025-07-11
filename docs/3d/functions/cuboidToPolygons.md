[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / cuboidToPolygons

# Function: cuboidToPolygons()

> **cuboidToPolygons**(`cuboid`): [`Polygon`](../types/type-aliases/Polygon.md)[]

Defined in: [3d/index.ts:475](https://github.com/basementuniverse/intersection-helpers/blob/d942e5cf9ee51dc3854d6fbfe1d84a7ecd83c1ca/src/3d/index.ts#L475)

Convert a cuboid to a list of polygons representing its faces

Polygons will be returned in the following order:
- Upper face (top)
- Lower face (bottom)
- Front face
- Back face
- Left face
- Right face

## Parameters

### cuboid

[`Cuboid`](../types/type-aliases/Cuboid.md)

## Returns

[`Polygon`](../types/type-aliases/Polygon.md)[]
