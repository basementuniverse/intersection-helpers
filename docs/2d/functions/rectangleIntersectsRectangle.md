[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / rectangleIntersectsRectangle

# Function: rectangleIntersectsRectangle()

> **rectangleIntersectsRectangle**(`rectangleA`, `rectangleB`): `object`

Defined in: [2d/index.ts:2532](https://github.com/basementuniverse/intersection-helpers/blob/3a364a58f0714fe52065b40529091d774e3a1a50/src/2d/index.ts#L2532)

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
