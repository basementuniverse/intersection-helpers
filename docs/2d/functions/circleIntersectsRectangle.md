[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / circleIntersectsRectangle

# Function: circleIntersectsRectangle()

> **circleIntersectsRectangle**(`circle`, `rectangle`): `object`

Defined in: [2d/index.ts:2161](https://github.com/basementuniverse/intersection-helpers/blob/f22d1cffe16ecb68b4b29b8331edc08e3635d16c/src/2d/index.ts#L2161)

Check if a circle intersects a rectangle

## Parameters

### circle

[`Circle`](../types/type-aliases/Circle.md)

### rectangle

[`Rectangle`](../types/type-aliases/Rectangle.md)

## Returns

### intersectionPoints?

> `optional` **intersectionPoints**: `vec2`[]

The intersection points on the rectangle's edges if the circle intersects
the rectangle

### intersects

> **intersects**: `boolean`

Whether the circle intersects the rectangle

### minimumSeparation?

> `optional` **minimumSeparation**: `vec2`

The minimum separation vector between the circle and rectangle if they
intersect
