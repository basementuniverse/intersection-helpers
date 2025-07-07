[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / pointInCuboid

# Function: pointInCuboid()

> **pointInCuboid**(`point`, `cuboid`): `object`

Defined in: [3d/index.ts:905](https://github.com/basementuniverse/intersection-helpers/blob/f22d1cffe16ecb68b4b29b8331edc08e3635d16c/src/3d/index.ts#L905)

Check if a point is inside a cuboid

## Parameters

### point

`vec3`

### cuboid

[`Cuboid`](../types/type-aliases/Cuboid.md)

## Returns

### closestPoint

> **closestPoint**: `vec3`

The closest point on the cuboid surface to the given point

### distance

> **distance**: `number`

The distance from the point to the closest point on the cuboid

If the point is inside the cuboid, this will be negative

### intersects

> **intersects**: `boolean`

Whether the point is inside the cuboid
