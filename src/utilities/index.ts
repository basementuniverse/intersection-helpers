import { Interval } from './types';

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
