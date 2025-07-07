[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / rectangleIntersectsRectangle

# Function: rectangleIntersectsRectangle()

> **rectangleIntersectsRectangle**(`rectangleA`, `rectangleB`): `object`

Defined in: [2d/index.ts:2532](https://github.com/basementuniverse/intersection-helpers/blob/f22d1cffe16ecb68b4b29b8331edc08e3635d16c/src/2d/index.ts#L2532)

Check if two rectangles intersect

## Parameters

### rectangleA

[`Rectangle`](../types/type-aliases/Rectangle.md)

### rectangleB

[`Rectangle`](../types/type-aliases/Rectangle.md)

## Returns

### intersectionPoints?

> `optional` **intersectionPoints**: `vec2`[]

The intersection points on the edges of the rectangles if they intersect

### intersects

> **intersects**: `boolean`

Whether the rectangles intersect

### minimumSeparation?

> `optional` **minimumSeparation**: `vec2`

The minimum separation vector between the rectangles if they intersect
