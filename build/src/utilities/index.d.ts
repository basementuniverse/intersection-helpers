import { vec2, vec3 } from '@basementuniverse/vec';
import { Interval } from './types';
export * from './types';
/**
 * Check if a vector is almost zero
 */
export declare function vectorAlmostZero(v: vec2): boolean;
export declare function vectorAlmostZero(v: vec3): boolean;
/**
 * Check if two vectors are almost equal
 */
export declare function vectorsAlmostEqual(a: vec2, b: vec2): boolean;
export declare function vectorsAlmostEqual(a: vec3, b: vec3): boolean;
/**
 * Check if a value is within a specified interval
 */
export declare function valueInInterval(value: number, interval: Interval): boolean;
/**
 * Check if two intervals (a1, a2) and (b1, b2) overlap
 */
export declare function intervalsOverlap(a: Interval, b: Interval): boolean;
/**
 * Get the overlapping part of two intervals (a1, a2) and (b1, b2)
 *
 * If the intervals do not overlap, return null
 */
export declare function overlapInterval(a: Interval, b: Interval): Interval | null;
