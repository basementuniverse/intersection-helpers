[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / pointInSphere

# Function: pointInSphere()

> **pointInSphere**(`point`, `sphere`): `object`

Defined in: [3d/index.ts:919](https://github.com/basementuniverse/intersection-helpers/blob/a748c1cf3d5365b189253eb2878888a254b5c3a1/src/3d/index.ts#L919)

Check if a point is inside a sphere

Also returns the closest point on the sphere edge and the distance to it

If the point is inside the sphere, the distance will be negative

## Parameters

### point

`vec3`

### sphere

[`Sphere`](../types/type-aliases/Sphere.md)

## Returns

### closestPoint

> **closestPoint**: `vec3`

The closest point on the sphere surface to the given point

### distance

> **distance**: `number`

The distance from the point to the closest point on the sphere

If the point is inside the sphere, this will be negative

### intersects

> **intersects**: `boolean`

Whether the point is in the sphere
