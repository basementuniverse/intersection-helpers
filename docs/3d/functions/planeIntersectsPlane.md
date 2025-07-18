[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / planeIntersectsPlane

# Function: planeIntersectsPlane()

> **planeIntersectsPlane**(`planeA`, `planeB`): `object`

Defined in: [3d/index.ts:2710](https://github.com/basementuniverse/intersection-helpers/blob/a748c1cf3d5365b189253eb2878888a254b5c3a1/src/3d/index.ts#L2710)

Check if two planes intersect

Based on the algorithm described in "Real-Time Collision Detection" by
Christer Ericson

## Parameters

### planeA

[`Plane`](../types/type-aliases/Plane.md)

### planeB

[`Plane`](../types/type-aliases/Plane.md)

## Returns

### intersectionLine?

> `optional` **intersectionLine**: [`Line`](../types/type-aliases/Line.md)

The line where the planes intersect

Will be undefined if:
- The planes don't intersect (parallel with gap)
- The planes are coincident (infinite intersection)

### intersects

> **intersects**: `boolean`

Whether the planes intersect

Will be false only if the planes are parallel with a gap between them
