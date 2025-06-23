import { vec2, vec3 } from '@basementuniverse/vec';
import * as constants from './constants';
import { Interval, isVec2, isVec3 } from './types';

/**
 * Check if a vector is almost zero
 */
export function vectorAlmostZero(v: vec2): boolean;
export function vectorAlmostZero(v: vec3): boolean;
export function vectorAlmostZero(v: any): boolean {
  if (isVec3(v)) {
    return (
      Math.abs(v.x) < constants.EPSILON &&
      Math.abs(v.y) < constants.EPSILON &&
      Math.abs(v.z) < constants.EPSILON
    );
  }
  if (isVec2(v)) {
    return (
      Math.abs(v.x) < constants.EPSILON && Math.abs(v.y) < constants.EPSILON
    );
  }
  return false;
}

/**
 * Check if two vectors are almost equal
 */
export function vectorsAlmostEqual(a: vec2, b: vec2): boolean;
export function vectorsAlmostEqual(a: vec3, b: vec3): boolean;
export function vectorsAlmostEqual(a: any, b: any): boolean {
  if (isVec3(a) && isVec3(b)) {
    return (
      Math.abs(a.x - b.x) < constants.EPSILON &&
      Math.abs(a.y - b.y) < constants.EPSILON &&
      Math.abs(a.z - b.z) < constants.EPSILON
    );
  }
  if (isVec2(a) && isVec2(b)) {
    return (
      Math.abs(a.x - b.x) < constants.EPSILON &&
      Math.abs(a.y - b.y) < constants.EPSILON
    );
  }
  return false;
}

/**
 * Check if a value is within a specified interval
 */
export function valueInInterval(value: number, interval: Interval): boolean {
  const { min, minInclusive = true, max, maxInclusive = true } = interval;
  return (
    (minInclusive ? value >= min : value > min) &&
    (maxInclusive ? value <= max : value < max)
  );
}

/**
 * Check if two intervals (a1, a2) and (b1, b2) overlap
 */
export function intervalsOverlap(a: Interval, b: Interval): boolean {
  return Math.max(a.min, b.min) <= Math.min(a.max, b.max);
}

/**
 * Get the overlapping part of two intervals (a1, a2) and (b1, b2)
 *
 * If the intervals do not overlap, return null
 */
export function overlapInterval(a: Interval, b: Interval): Interval | null {
  if (!intervalsOverlap(a, b)) {
    return null;
  }
  return { min: Math.max(a.min, b.min), max: Math.min(a.max, b.max) };
}
