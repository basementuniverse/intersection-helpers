[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / circleIntersectsCircle

# Function: circleIntersectsCircle()

> **circleIntersectsCircle**(`circleA`, `circleB`): `object`

Defined in: [2d/index.ts:2056](https://github.com/basementuniverse/intersection-helpers/blob/d942e5cf9ee51dc3854d6fbfe1d84a7ecd83c1ca/src/2d/index.ts#L2056)

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
