/**
 * Check if a value is within a specified interval
 */
export function valueInInterval(
  value: number,
  min: number,
  max: number
): boolean {
  return value >= min && value <= max;
}

/**
 * Check if two intervals (a1, a2) and (b1, b2) overlap
 */
export function intervalsOverlap(
  a1: number,
  a2: number,
  b1: number,
  b2: number
): boolean {
  return Math.max(a1, b1) <= Math.min(a2, b2);
}

/**
 * Get the overlapping part of two intervals (a1, a2) and (b1, b2)
 *
 * If the intervals do not overlap, return null
 */
export function overlapInterval(
  a1: number,
  a2: number,
  b1: number,
  b2: number
): [number, number] | null {
  if (!intervalsOverlap(a1, a2, b1, b2)) {
    return null;
  }
  return [Math.max(a1, b1), Math.min(a2, b2)];
}
