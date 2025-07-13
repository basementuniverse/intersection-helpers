[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / meshIntersectsPlane

# Function: meshIntersectsPlane()

> **meshIntersectsPlane**(`mesh`, `plane`): `object`

Defined in: [3d/index.ts:3582](https://github.com/basementuniverse/intersection-helpers/blob/a748c1cf3d5365b189253eb2878888a254b5c3a1/src/3d/index.ts#L3582)

Check if any polygons in a mesh intersect a plane

## Parameters

### mesh

[`Mesh`](../types/type-aliases/Mesh.md)

### plane

[`Plane`](../types/type-aliases/Plane.md)

## Returns

### intersectionPoints?

> `optional` **intersectionPoints**: `vec3`[]

The points where the mesh's edges intersect the plane

Will be undefined if:
- The mesh doesn't intersect the plane
- The mesh lies entirely in the plane

### intersects

> **intersects**: `boolean`

Whether any polygon in the mesh intersects the plane

### penetrationDepth?

> `optional` **penetrationDepth**: `number`

How deeply the mesh penetrates the plane in the direction opposite to
the plane's normal
