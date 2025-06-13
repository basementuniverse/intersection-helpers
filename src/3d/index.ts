import { vec3 } from '@basementuniverse/vec';
import { Point } from './types';

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

// pointOnRay
// pointOnLine
// pointInSphere
// pointOnPlane
// pointInTriangle
// pointInBox
// rayIntersectsRay
// rayIntersectsLine
// rayIntersectsSphere
// rayIntersectsTriangle
// rayIntersectsPlane
// rayIntersectsBox
// lineIntersectsRay
// lineIntersectsLine
// lineIntersectsSphere
// lineIntersectsTriangle
// lineIntersectsPlane
// lineIntersectsBox
// sphereIntersectsSphere
// sphereIntersectsTriangle
// sphereIntersectsPlane
// sphereIntersectsBox
// triangleIntersectsTriangle
// triangleOnPlane
// planeIntersectsPlane
// boxIntersectsBox
