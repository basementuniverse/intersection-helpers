import { vec3 } from '@basementuniverse/vec';
import { vectorAlmostZero } from '../utilities';
import {
  AABB,
  Cuboid,
  isCuboid,
  isLine,
  isSphere,
  Line,
  Mesh,
  Point,
  Polygon,
  Ray,
  Sphere,
} from './types';

export * from './types';

/**
 * Calculate the distance between two points in 3D space
 *
 * @param a First point
 * @param b Second point
 * @returns Distance between the two points
 */
export function distance(a: Point, b: Point): number {
  return vec3.len(vec3.sub(a, b));
}

/**
 * Calculate the angle between two vectors in 3D space
 *
 * @param a First vector
 * @param b Second vector
 * @returns Angle in radians
 */
export function angleBetween(a: vec3, b: vec3): number {
  return Math.acos(vec3.dot(a, b) / (vec3.len(a) * vec3.len(b)));
}

/**
 * Convert a line segment to a ray
 */
export function lineToRay(line: Line): Ray {
  return {
    origin: line.start,
    direction: vec3.nor(vec3.sub(line.end, line.start)),
  };
}

/**
 * Convert a ray to a line segment
 */
export function rayToLine(ray: Ray, length: number = 1): Line {
  return {
    start: ray.origin,
    end: vec3.add(ray.origin, vec3.mul(ray.direction, length)),
  };
}

export function aabb(o: Line | Sphere | Cuboid | Polygon | Mesh): AABB | null {
  if (isLine(o)) {
    return {
      position: vec3(
        Math.min(o.start.x, o.end.y),
        Math.min(o.start.y, o.end.y),
        Math.min(o.start.z, o.end.z)
      ),
      size: vec3(
        Math.abs(o.start.x - o.end.x),
        Math.abs(o.start.y - o.end.y),
        Math.abs(o.start.z - o.end.z)
      ),
    };
  }

  if (isSphere(o)) {
    return {
      position: o.position,
      size: vec3(o.radius * 2),
    };
  }

  if (isCuboid(o)) {
    // TODO
  }

  // TODO

  return null;
}

/**
 * Convert an AABB to a cuboid
 */
export function aabbToCuboid(aabb: AABB): Cuboid {
  return {
    position: vec3.add(aabb.position, vec3.div(aabb.size, 2)),
    size: aabb.size,
    rotation: vec3(0, 0, 0),
  };
}

/**
 * Check if two AABBs overlap and return the overlapping area if they do
 */
export function aabbsOverlap(
  a: AABB,
  b: AABB
): {
  intersects: boolean;
  overlap?: AABB;
} {
  throw new Error('Not implemented yet'); // TODO
}

/**
 * Check if a cuboid is rotated
 */
export function cuboidIsRotated(cuboid: Cuboid): boolean {
  return cuboid.rotation !== undefined && !vectorAlmostZero(cuboid.rotation);
}
