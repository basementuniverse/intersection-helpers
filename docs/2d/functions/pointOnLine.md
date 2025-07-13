[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / pointOnLine

# Function: pointOnLine()

> **pointOnLine**(`point`, `line`): `object`

Defined in: [2d/index.ts:952](https://github.com/basementuniverse/intersection-helpers/blob/a748c1cf3d5365b189253eb2878888a254b5c3a1/src/2d/index.ts#L952)

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

### normal?

> `optional` **normal**: `vec2`

The intersection normal - a unit vector perpendicular to the line,
pointing towards the side that the test point is on

If the point is on the line, this will be undefined
