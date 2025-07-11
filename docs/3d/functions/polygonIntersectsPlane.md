[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / polygonIntersectsPlane

# Function: polygonIntersectsPlane()

> **polygonIntersectsPlane**(`polygon`, `plane`): `null` \| \{ `intersectionPoints?`: `vec3`[]; `intersects`: `boolean`; \}

Defined in: [3d/index.ts:3399](https://github.com/basementuniverse/intersection-helpers/blob/d942e5cf9ee51dc3854d6fbfe1d84a7ecd83c1ca/src/3d/index.ts#L3399)

Check if a polygon intersects a plane

## Parameters

### polygon

[`Polygon`](../types/type-aliases/Polygon.md)

### plane

[`Plane`](../types/type-aliases/Plane.md)

## Returns

`null`

\{ `intersectionPoints?`: `vec3`[]; `intersects`: `boolean`; \}

### intersectionPoints?

> `optional` **intersectionPoints**: `vec3`[]

The points where the polygon's edges intersect the plane

Will be undefined if:
- The polygon doesn't intersect the plane
- The polygon lies entirely in the plane (infinite intersection points)

### intersects

> **intersects**: `boolean`

Whether the polygon intersects the plane

Will be true if:
- The polygon intersects the plane at one or more points
- The polygon lies entirely in the plane
