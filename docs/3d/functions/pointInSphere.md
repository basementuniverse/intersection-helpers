[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / pointInSphere

# Function: pointInSphere()

> **pointInSphere**(`point`, `sphere`): `object`

Defined in: [3d/index.ts:568](https://github.com/basementuniverse/intersection-helpers/blob/ede9ecb18a1386abf90747a70ee9f16c34ce6207/src/3d/index.ts#L568)

Check if a point is inside a sphere

Also returns the closest point on the sphere edge and the distance to it

If the point is inside the sphere, the distance will be negative

## Parameters

### point

`vec3`

### sphere

[`Sphere`](../types/type-aliases/Sphere.md)

## Returns

`object`

### closestPoint

> **closestPoint**: `vec3`

### distance

> **distance**: `number`

### intersects

> **intersects**: `boolean`
