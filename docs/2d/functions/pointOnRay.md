[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / pointOnRay

# Function: pointOnRay()

> **pointOnRay**(`point`, `ray`): `object`

Defined in: [2d/index.ts:849](https://github.com/basementuniverse/intersection-helpers/blob/d942e5cf9ee51dc3854d6fbfe1d84a7ecd83c1ca/src/2d/index.ts#L849)

Check if a point is on a ray

## Parameters

### point

`vec2`

### ray

[`Ray`](../types/type-aliases/Ray.md)

## Returns

### closestPoint

> **closestPoint**: `vec2`

The closest point on the ray to the given point

### distance

> **distance**: `number`

The distance from the point to the closest point on the ray

### intersects

> **intersects**: `boolean`

Whether the point is on the ray
