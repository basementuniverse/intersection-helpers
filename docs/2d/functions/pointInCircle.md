[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / pointInCircle

# Function: pointInCircle()

> **pointInCircle**(`point`, `circle`): `object`

Defined in: [2d/index.ts:760](https://github.com/basementuniverse/intersection-helpers/blob/98a1762f467a7b92d986d7a09e3582c961f718d2/src/2d/index.ts#L760)

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
