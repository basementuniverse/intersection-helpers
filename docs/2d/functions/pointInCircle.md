[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / pointInCircle

# Function: pointInCircle()

> **pointInCircle**(`point`, `circle`): `object`

Defined in: [2d/index.ts:761](https://github.com/basementuniverse/intersection-helpers/blob/ce8bdda9fbd616d6a406e87a4824e91fffc01d0e/src/2d/index.ts#L761)

Check if a point is inside a circle

Also returns the closest point on the circle edge and the distance to it

If the point is inside the circle, the distance will be negative

## Parameters

### point

`vec2`

### circle

[`Circle`](../types/type-aliases/Circle.md)

## Returns

`object`

### closestPoint

> **closestPoint**: `vec2`

### distance

> **distance**: `number`

### intersects

> **intersects**: `boolean`
