import { utilities } from '../src';

describe('IntersectionUtilities', () => {
  describe('valueInInterval', () => {
    it('should return true when value is within interval', () => {
      expect(utilities.valueInInterval(5, 0, 10)).toBe(true);
      expect(utilities.valueInInterval(0, 0, 10)).toBe(true);
      expect(utilities.valueInInterval(10, 0, 10)).toBe(true);
    });

    it('should return false when value is outside interval', () => {
      expect(utilities.valueInInterval(-1, 0, 10)).toBe(false);
      expect(utilities.valueInInterval(11, 0, 10)).toBe(false);
    });

    it('should handle decimal values correctly', () => {
      expect(utilities.valueInInterval(1.5, 1, 2)).toBe(true);
      expect(utilities.valueInInterval(0.999, 1, 2)).toBe(false);
    });

    it('should handle negative intervals correctly', () => {
      expect(utilities.valueInInterval(-5, -10, -1)).toBe(true);
      expect(utilities.valueInInterval(0, -10, -1)).toBe(false);
    });
  });

  describe('intervalsOverlap', () => {
    it('should return true when intervals overlap', () => {
      expect(utilities.intervalsOverlap(0, 10, 5, 15)).toBe(true);
      expect(utilities.intervalsOverlap(5, 15, 0, 10)).toBe(true);
      expect(utilities.intervalsOverlap(0, 10, 0, 10)).toBe(true);
    });

    it('should handle when one interval is completely within another', () => {
      expect(utilities.intervalsOverlap(0, 10, 2, 8)).toBe(true);
      expect(utilities.intervalsOverlap(2, 8, 0, 10)).toBe(true);
      expect(utilities.intervalsOverlap(0, 10, 0, 5)).toBe(true);
      expect(utilities.intervalsOverlap(0, 5, 0, 10)).toBe(true);
    });

    it('should return true when intervals touch at endpoints', () => {
      expect(utilities.intervalsOverlap(0, 10, 10, 20)).toBe(true);
      expect(utilities.intervalsOverlap(10, 20, 0, 10)).toBe(true);
    });

    it('should return false when intervals do not overlap', () => {
      expect(utilities.intervalsOverlap(0, 10, 11, 20)).toBe(false);
      expect(utilities.intervalsOverlap(11, 20, 0, 10)).toBe(false);
    });

    it('should handle decimal values correctly', () => {
      expect(utilities.intervalsOverlap(0, 1.5, 1, 2)).toBe(true);
      expect(utilities.intervalsOverlap(0, 0.9, 1, 2)).toBe(false);
    });

    it('should handle negative intervals correctly', () => {
      expect(utilities.intervalsOverlap(-10, -5, -7, -3)).toBe(true);
      expect(utilities.intervalsOverlap(-10, -5, -4, -1)).toBe(false);
    });

    it('should handle zero-length intervals correctly', () => {
      expect(utilities.intervalsOverlap(5, 5, 0, 10)).toBe(true);
      expect(utilities.intervalsOverlap(0, 10, 5, 5)).toBe(true);
      expect(utilities.intervalsOverlap(5, 5, 6, 6)).toBe(false);
    });
  });
});
