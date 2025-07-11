[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / cuboidIntersectsPolygon

# Function: cuboidIntersectsPolygon()

> **cuboidIntersectsPolygon**(`cuboid`, `polygon`): `null` \| \{ `intersectionPoints?`: `vec3`[]; `intersects`: `boolean`; \}

Defined in: [3d/index.ts:3124](https://github.com/basementuniverse/intersection-helpers/blob/d942e5cf9ee51dc3854d6fbfe1d84a7ecd83c1ca/src/3d/index.ts#L3124)

Check if a cuboid intersects a polygon

## Parameters

### cuboid

[`Cuboid`](../types/type-aliases/Cuboid.md)

### polygon

[`Polygon`](../types/type-aliases/Polygon.md)

## Returns

`null`

\{ `intersectionPoints?`: `vec3`[]; `intersects`: `boolean`; \}

### intersectionPoints?

> `optional` **intersectionPoints**: `vec3`[]

The points where the cuboid's edges intersect the polygon

Will be undefined if:
- The polygon is entirely inside the cuboid
- The polygon is coincident with a cuboid face
- There are no intersections

### intersects

> **intersects**: `boolean`

Whether the cuboid intersects the polygon
