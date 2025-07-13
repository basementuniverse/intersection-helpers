[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / pointInCircle

# Function: pointInCircle()

> **pointInCircle**(`point`, `circle`): `object`

Defined in: [2d/index.ts:1034](https://github.com/basementuniverse/intersection-helpers/blob/a748c1cf3d5365b189253eb2878888a254b5c3a1/src/2d/index.ts#L1034)

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

### normal?

> `optional` **normal**: `vec2`

The intersection normal, if there is an intersection

This will be normal to the tangent line at the closest point on the
circle edge
