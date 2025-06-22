import { vec2 } from '@basementuniverse/vec';

/**
 * Check if a value is a vec2
 */
function isVec2(value: any): value is vec2 {
  return (
    value &&
    typeof value === 'object' &&
    'x' in value &&
    typeof value.x === 'number' &&
    'y' in value &&
    typeof value.y === 'number'
  );
}

/**
 * A point in 2D space
 */
export type Point = vec2;

/**
 * Type guard to check if a value is a Point
 */
export function isPoint(value: any): value is Point {
  return isVec2(value);
}

/**
 * A ray that extends infinitely in one direction
 */
export type Ray = {
  origin: Point;
  direction: vec2;
};

/**
 * Check if a value is a Ray
 */
export function isRay(value: any): value is Ray {
  return (
    value &&
    typeof value === 'object' &&
    'origin' in value &&
    isPoint(value.origin) &&
    'direction' in value &&
    isVec2(value.direction)
  );
}

/**
 * A line segment defined by two endpoints
 */
export type Line = {
  start: Point;
  end: Point;
};

/**
 * Check if a value is a Line
 */
export function isLine(value: any): value is Line {
  return (
    value &&
    typeof value === 'object' &&
    'start' in value &&
    isPoint(value.start) &&
    'end' in value &&
    isPoint(value.end)
  );
}

/**
 * A circle defined by its center and radius
 */
export type Circle = {
  position: Point;
  radius: number;
};

/**
 * Check if a value is a Circle
 */
export function isCircle(value: any): value is Circle {
  return (
    value &&
    typeof value === 'object' &&
    'position' in value &&
    isPoint(value.position) &&
    'radius' in value &&
    typeof value.radius === 'number'
  );
}

/**
 * A rectangle defined by the position of its center, side lengths, and
 * optional rotation
 *
 * Rotation is in radians and is applied around the center of the rectangle
 */
export type Rectangle = {
  position: Point;
  size: vec2;
  rotation?: number;
};

/**
 * Check if a value is a Rectangle
 */
export function isRectangle(value: any): value is Rectangle {
  return (
    value &&
    typeof value === 'object' &&
    'position' in value &&
    isPoint(value.position) &&
    'size' in value &&
    isVec2(value.size) &&
    ('rotation' in value ? typeof value.rotation === 'number' : true)
  );
}

/**
 * An axis-aligned bounding box (AABB) defined by the position of its top-left
 * corner and its width and height
 */
export type AABB = {
  position: Point;
  size: vec2;
};

/**
 * Check if a value is an AABB
 */
export function isAABB(value: any): value is AABB {
  return (
    value &&
    typeof value === 'object' &&
    'position' in value &&
    isPoint(value.position) &&
    'size' in value &&
    isVec2(value.size)
  );
}

/**
 * A polygon defined by its vertices
 *
 * Vertices can be ordered in clockwise or counter-clockwise winding order
 */
export type Polygon = {
  vertices: Point[];
};

/**
 * Check if a value is a Polygon
 */
export function isPolygon(value: any): value is Polygon {
  return (
    value &&
    typeof value === 'object' &&
    'vertices' in value &&
    Array.isArray(value.vertices) &&
    value.vertices.every(isPoint)
  );
}
