[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / pointOnRay

# Function: pointOnRay()

> **pointOnRay**(`point`, `ray`): `object`

Defined in: [2d/index.ts:849](https://github.com/basementuniverse/intersection-helpers/blob/3a364a58f0714fe52065b40529091d774e3a1a50/src/2d/index.ts#L849)

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
