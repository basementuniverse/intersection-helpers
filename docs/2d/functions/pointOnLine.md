[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / pointOnLine

# Function: pointOnLine()

> **pointOnLine**(`point`, `line`): `object`

Defined in: [2d/index.ts:897](https://github.com/basementuniverse/intersection-helpers/blob/3a364a58f0714fe52065b40529091d774e3a1a50/src/2d/index.ts#L897)

Check if a point intersects a line segment

## Parameters

### point

`vec2`

### line

[`Line`](../types/type-aliases/Line.md)

## Returns

### closestPoint

> **closestPoint**: `vec2`

The closest point on the line segment to the given point

### distance

> **distance**: `number`

The distance from the point to the closest point on the line segment

### intersects

> **intersects**: `boolean`

Whether the point intersects the line segment
