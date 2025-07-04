[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [2d](../README.md) / pointInAABB

# Function: pointInAABB()

> **pointInAABB**(`point`, `aabb`): `object`

Defined in: [2d/index.ts:210](https://github.com/basementuniverse/intersection-helpers/blob/ede9ecb18a1386abf90747a70ee9f16c34ce6207/src/2d/index.ts#L210)

Check if a point is inside an AABB

This should be a bit faster than pointInRectangle since we don't need to
worry about rotation

## Parameters

### point

`vec2`

### aabb

[`AABB`](../types/type-aliases/AABB.md)

## Returns

`object`

### closestPoint

> **closestPoint**: `vec2`

### distance

> **distance**: `number`

### intersects

> **intersects**: `boolean`
