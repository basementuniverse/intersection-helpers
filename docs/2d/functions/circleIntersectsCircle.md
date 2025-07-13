[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / circleIntersectsCircle

# Function: circleIntersectsCircle()

> **circleIntersectsCircle**(`circleA`, `circleB`): `object`

Defined in: [2d/index.ts:2176](https://github.com/basementuniverse/intersection-helpers/blob/a748c1cf3d5365b189253eb2878888a254b5c3a1/src/2d/index.ts#L2176)

Check if two circles intersect

## Parameters

### circleA

[`Circle`](../types/type-aliases/Circle.md)

### circleB

[`Circle`](../types/type-aliases/Circle.md)

## Returns

### intersectionPoints?

> `optional` **intersectionPoints**: `vec2`[]

The intersection points on each circle's circumference if the circles
intersect

### intersects

> **intersects**: `boolean`

Whether the circles intersect

### minimumSeparation?

> `optional` **minimumSeparation**: `vec2`

The minimum separation vector between the circles if they intersect
