import { vec3 } from '@basementuniverse/vec';
import { isVec3 } from '../utilities/types';

/**
 * A point in 3D space
 */
export type Point = vec3;

/**
 * Type guard to check if a value is a Point
 */
export function isPoint(value: any): value is Point {
  return isVec3(value);
}

/**
 * A ray that extends infinitely in one direction
 */
export type Ray = {
  origin: Point;
  direction: vec3;
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
    isVec3(value.direction)
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
 * A sphere defined by its center and radius
 */
export type Sphere = {
  position: Point;
  radius: number;
};

/**
 * Check if a value is a Sphere
 */
export function isSphere(value: any): value is Sphere {
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
 * An axis-aligned bounding box (AABB) defined by the position of its top-left
 * corner and its width, height, and depth
 */
export type AABB = {
  position: Point;
  size: vec3;
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
    isVec3(value.size)
  );
}

/**
 * A cuboid defined by the position of its center, side lengths, and
 * optional rotation
 *
 * Rotation is represented as Euler angles measured in radians and is applied
 * around the center of the rectangle
 */
export type Cuboid = {
  position: Point;
  size: vec3;
  rotation?: vec3;
};

/**
 * Check if a value is a Cuboid
 */
export function isCuboid(value: any): value is Cuboid {
  return (
    value &&
    typeof value === 'object' &&
    'position' in value &&
    isPoint(value.position) &&
    'size' in value &&
    isVec3(value.size) &&
    ('rotation' in value ? isVec3(value.rotation) : true)
  );
}

/**
 * A plane defined by a point on the plane and a normal vector
 */
export type Plane = {
  point: Point;
  normal: vec3;
};

/**
 * Check if a value is a Plane
 */
export function isPlane(value: any): value is Plane {
  return (
    value &&
    typeof value === 'object' &&
    'point' in value &&
    isPoint(value.point) &&
    'normal' in value &&
    isVec3(value.normal)
  );
}

/**
 * A polygon (triangle in 3D space) defined by three vertices
 */
export type Polygon = {
  vertices: [Point, Point, Point];
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
    value.vertices.length === 3 &&
    value.vertices.every(isPoint)
  );
}

/**
 * A mesh defined by its vertices and indices
 *
 * Vertices are points in 3D space, and indices define how these vertices
 * are connected to form triangles
 */
export type Mesh = {
  vertices: Point[];
  indices: number[];
};

/**
 * Check if a value is a Mesh
 */
export function isMesh(value: any): value is Mesh {
  return (
    value &&
    typeof value === 'object' &&
    'vertices' in value &&
    Array.isArray(value.vertices) &&
    value.vertices.every(isPoint) &&
    'indices' in value &&
    Array.isArray(value.indices) &&
    value.indices.every((i: any) => typeof i === 'number')
  );
}
