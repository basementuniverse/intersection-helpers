import { intersectionUtilities } from '../src';

describe('IntersectionUtilities', () => {
  describe('valueInInterval', () => {
    it('should return true when value is within interval', () => {
      expect(intersectionUtilities.valueInInterval(5, 0, 10)).toBe(true);
      expect(intersectionUtilities.valueInInterval(0, 0, 10)).toBe(true);
      expect(intersectionUtilities.valueInInterval(10, 0, 10)).toBe(true);
    });

    it('should return false when value is outside interval', () => {
      expect(intersectionUtilities.valueInInterval(-1, 0, 10)).toBe(false);
      expect(intersectionUtilities.valueInInterval(11, 0, 10)).toBe(false);
    });

    it('should handle decimal values correctly', () => {
      expect(intersectionUtilities.valueInInterval(1.5, 1, 2)).toBe(true);
      expect(intersectionUtilities.valueInInterval(0.999, 1, 2)).toBe(false);
    });

    it('should handle negative intervals correctly', () => {
      expect(intersectionUtilities.valueInInterval(-5, -10, -1)).toBe(true);
      expect(intersectionUtilities.valueInInterval(0, -10, -1)).toBe(false);
    });
  });

  describe('intervalsOverlap', () => {
    it('should return true when intervals overlap', () => {
      expect(intersectionUtilities.intervalsOverlap(0, 10, 5, 15)).toBe(true);
      expect(intersectionUtilities.intervalsOverlap(5, 15, 0, 10)).toBe(true);
      expect(intersectionUtilities.intervalsOverlap(0, 10, 0, 10)).toBe(true);
    });

    it('should handle when one interval is completely within another', () => {
      expect(intersectionUtilities.intervalsOverlap(0, 10, 2, 8)).toBe(true);
      expect(intersectionUtilities.intervalsOverlap(2, 8, 0, 10)).toBe(true);
      expect(intersectionUtilities.intervalsOverlap(0, 10, 0, 5)).toBe(true);
      expect(intersectionUtilities.intervalsOverlap(0, 5, 0, 10)).toBe(true);
    });

    it('should return true when intervals touch at endpoints', () => {
      expect(intersectionUtilities.intervalsOverlap(0, 10, 10, 20)).toBe(true);
      expect(intersectionUtilities.intervalsOverlap(10, 20, 0, 10)).toBe(true);
    });

    it('should return false when intervals do not overlap', () => {
      expect(intersectionUtilities.intervalsOverlap(0, 10, 11, 20)).toBe(false);
      expect(intersectionUtilities.intervalsOverlap(11, 20, 0, 10)).toBe(false);
    });

    it('should handle decimal values correctly', () => {
      expect(intersectionUtilities.intervalsOverlap(0, 1.5, 1, 2)).toBe(true);
      expect(intersectionUtilities.intervalsOverlap(0, 0.9, 1, 2)).toBe(false);
    });

    it('should handle negative intervals correctly', () => {
      expect(intersectionUtilities.intervalsOverlap(-10, -5, -7, -3)).toBe(
        true
      );
      expect(intersectionUtilities.intervalsOverlap(-10, -5, -4, -1)).toBe(
        false
      );
    });

    it('should handle zero-length intervals correctly', () => {
      expect(intersectionUtilities.intervalsOverlap(5, 5, 0, 10)).toBe(true);
      expect(intersectionUtilities.intervalsOverlap(0, 10, 5, 5)).toBe(true);
      expect(intersectionUtilities.intervalsOverlap(5, 5, 6, 6)).toBe(false);
    });
  });

  describe('overlap', () => {
    it('should return overlapping part of two intervals', () => {
      expect(intersectionUtilities.overlapInterval(0, 10, 5, 15)).toEqual([
        5, 10,
      ]);
      expect(intersectionUtilities.overlapInterval(5, 15, 0, 10)).toEqual([
        5, 10,
      ]);
      expect(intersectionUtilities.overlapInterval(0, 10, 0, 10)).toEqual([
        0, 10,
      ]);
    });

    it('should return null when intervals do not overlap', () => {
      expect(intersectionUtilities.overlapInterval(0, 10, 11, 20)).toBeNull();
      expect(intersectionUtilities.overlapInterval(11, 20, 0, 10)).toBeNull();
    });

    it('should handle when one interval is completely within another', () => {
      expect(intersectionUtilities.overlapInterval(0, 10, 2, 8)).toEqual([
        2, 8,
      ]);
      expect(intersectionUtilities.overlapInterval(2, 8, 0, 10)).toEqual([
        2, 8,
      ]);
      expect(intersectionUtilities.overlapInterval(0, 10, 0, 5)).toEqual([
        0, 5,
      ]);
      expect(intersectionUtilities.overlapInterval(0, 5, 0, 10)).toEqual([
        0, 5,
      ]);
    });

    it('should handle touching intervals at endpoints', () => {
      expect(intersectionUtilities.overlapInterval(0, 10, 10, 20)).toEqual([
        10, 10,
      ]);
      expect(intersectionUtilities.overlapInterval(10, 20, 0, 10)).toEqual([
        10, 10,
      ]);
    });

    it('should handle decimal values correctly', () => {
      expect(intersectionUtilities.overlapInterval(0.5, 1.5, 1.0, 2.0)).toEqual(
        [1.0, 1.5]
      );
      expect(
        intersectionUtilities.overlapInterval(0.1, 0.9, 1.0, 2.0)
      ).toBeNull();
    });

    it('should handle negative intervals correctly', () => {
      expect(intersectionUtilities.overlapInterval(-10, -5, -7, -3)).toEqual([
        -7, -5,
      ]);
      expect(intersectionUtilities.overlapInterval(-7, -3, -10, -5)).toEqual([
        -7, -5,
      ]);
      expect(intersectionUtilities.overlapInterval(-10, -5, -4, -1)).toBeNull();
      expect(intersectionUtilities.overlapInterval(-4, -1, -10, -5)).toBeNull();
      expect(intersectionUtilities.overlapInterval(-5, -5, -10, -1)).toEqual([
        -5, -5,
      ]);
      expect(intersectionUtilities.overlapInterval(-10, -1, -5, -5)).toEqual([
        -5, -5,
      ]);
    });

    it('should handle zero-length intervals correctly', () => {
      expect(intersectionUtilities.overlapInterval(5, 5, 0, 10)).toEqual([
        5, 5,
      ]);
      expect(intersectionUtilities.overlapInterval(0, 10, 5, 5)).toEqual([
        5, 5,
      ]);
      expect(intersectionUtilities.overlapInterval(5, 5, 6, 6)).toBeNull();
      expect(intersectionUtilities.overlapInterval(6, 6, 5, 5)).toBeNull();
    });

    it('should handle intervals with the same start and end', () => {
      expect(intersectionUtilities.overlapInterval(5, 5, 5, 5)).toEqual([5, 5]);
      expect(intersectionUtilities.overlapInterval(0, 0, 0, 0)).toEqual([0, 0]);
      expect(intersectionUtilities.overlapInterval(1, 1, 2, 2)).toBeNull();
    });
  });
});
