[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / pointInRectangle

# Function: pointInRectangle()

> **pointInRectangle**(`point`, `rectangle`): `object`

Defined in: [2d/index.ts:1010](https://github.com/basementuniverse/intersection-helpers/blob/3a364a58f0714fe52065b40529091d774e3a1a50/src/2d/index.ts#L1010)

Check if a point is inside a rectangle

In cases where the closest point is ambiguous (e.g. corners), the first edge
encountered with a closest point will be returned after evaluating edges in
this order:
top, right, bottom, left (before applying the rectangle's rotation)

## Parameters

### point

`vec2`

### rectangle

[`Rectangle`](../types/type-aliases/Rectangle.md)

## Returns

### closestPoint

> **closestPoint**: `vec2`

The closest point on the rectangle edge to the given point

### distance

> **distance**: `number`

The distance from the point to the closest point on the rectangle edge

If the point is inside the rectangle, this will be negative

### intersects

> **intersects**: `boolean`

Whether the point is inside the rectangle
