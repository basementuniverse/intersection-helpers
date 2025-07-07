[**@basementuniverse/intersection-helpers**](../../README.md)

***

[@basementuniverse/intersection-helpers](../../README.md) / [3d](../README.md) / lineIntersectsPolygon

# Function: lineIntersectsPolygon()

> **lineIntersectsPolygon**(`line`, `polygon`): `object`

Defined in: [3d/index.ts:2097](https://github.com/basementuniverse/intersection-helpers/blob/f22d1cffe16ecb68b4b29b8331edc08e3635d16c/src/3d/index.ts#L2097)

Check if a line segment intersects a polygon

## Parameters

### line

[`Line`](../types/type-aliases/Line.md)

### polygon

[`Polygon`](../types/type-aliases/Polygon.md)

## Returns

### intersectionPoint?

> `optional` **intersectionPoint**: `vec3`

The intersection point if the line segment intersects the polygon

### intersects

> **intersects**: `boolean`

Whether the line segment intersects the polygon
