[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / pointOnLine

# Function: pointOnLine()

> **pointOnLine**(`point`, `line`): `object`

Defined in: [3d/index.ts:858](https://github.com/basementuniverse/intersection-helpers/blob/a748c1cf3d5365b189253eb2878888a254b5c3a1/src/3d/index.ts#L858)

Check if a point intersects a line segment

Also returns the closest point on the line segment and the distance to it

## Parameters

### point

`vec3`

### line

[`Line`](../types/type-aliases/Line.md)

## Returns

### closestPoint

> **closestPoint**: `vec3`

The closest point on the line segment to the given point

### distance

> **distance**: `number`

The distance from the point to the closest point on the line segment

### intersects

> **intersects**: `boolean`

Whether the point is on the line segment
