[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / pointInRectangle

# Function: pointInRectangle()

> **pointInRectangle**(`point`, `rectangle`): `object`

Defined in: [2d/index.ts:808](https://github.com/basementuniverse/intersection-helpers/blob/39011b43f2fd5dca5c24f1c152bb983bef87ec23/src/2d/index.ts#L808)

Check if a point is inside a rectangle

Also returns the closest point on the rectangle edge and the distance to it

If the point is inside the rectangle, the distance will be negative

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

`object`

### closestPoint

> **closestPoint**: `vec2`

### distance

> **distance**: `number`

### intersects

> **intersects**: `boolean`
