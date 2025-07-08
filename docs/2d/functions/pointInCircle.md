[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / pointInCircle

# Function: pointInCircle()

> **pointInCircle**(`point`, `circle`): `object`

Defined in: [2d/index.ts:954](https://github.com/basementuniverse/intersection-helpers/blob/3a364a58f0714fe52065b40529091d774e3a1a50/src/2d/index.ts#L954)

Check if a point is inside a circle

## Parameters

### point

`vec2`

### circle

[`Circle`](../types/type-aliases/Circle.md)

## Returns

### closestPoint

> **closestPoint**: `vec2`

The closest point on the circle edge to the given point

### distance

> **distance**: `number`

The distance from the point to the closest point on the circle edge

If the point is inside the circle, this will be negative

### intersects

> **intersects**: `boolean`

Whether the point is inside the circle
