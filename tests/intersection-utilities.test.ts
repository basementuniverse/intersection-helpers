import { intersectionUtilities } from '../src';

describe('IntersectionUtilities', () => {
  describe('valueInInterval', () => {
    it('should return true when value is within interval', () => {
      expect(
        intersectionUtilities.valueInInterval(5, { min: 0, max: 10 })
      ).toBe(true);
      expect(
        intersectionUtilities.valueInInterval(0, { min: 0, max: 10 })
      ).toBe(true);
      expect(
        intersectionUtilities.valueInInterval(10, { min: 0, max: 10 })
      ).toBe(true);
    });

    it('should return false when value is outside interval', () => {
      expect(
        intersectionUtilities.valueInInterval(-1, { min: 0, max: 10 })
      ).toBe(false);
      expect(
        intersectionUtilities.valueInInterval(11, { min: 0, max: 10 })
      ).toBe(false);
    });

    it('should handle decimal values correctly', () => {
      expect(
        intersectionUtilities.valueInInterval(1.5, { min: 1, max: 2 })
      ).toBe(true);
      expect(
        intersectionUtilities.valueInInterval(0.999, { min: 1, max: 2 })
      ).toBe(false);
    });

    it('should handle negative intervals correctly', () => {
      expect(
        intersectionUtilities.valueInInterval(-5, { min: -10, max: -1 })
      ).toBe(true);
      expect(
        intersectionUtilities.valueInInterval(0, { min: -10, max: -1 })
      ).toBe(false);
    });
  });

  describe('intervalsOverlap', () => {
    it('should return true when intervals overlap', () => {
      expect(
        intersectionUtilities.intervalsOverlap(
          { min: 0, max: 10 },
          { min: 5, max: 15 }
        )
      ).toBe(true);
      expect(
        intersectionUtilities.intervalsOverlap(
          { min: 5, max: 15 },
          { min: 0, max: 10 }
        )
      ).toBe(true);
      expect(
        intersectionUtilities.intervalsOverlap(
          { min: 0, max: 10 },
          { min: 0, max: 10 }
        )
      ).toBe(true);
    });

    it('should handle when one interval is completely within another', () => {
      expect(
        intersectionUtilities.intervalsOverlap(
          { min: 0, max: 10 },
          { min: 2, max: 8 }
        )
      ).toBe(true);
      expect(
        intersectionUtilities.intervalsOverlap(
          { min: 2, max: 8 },
          { min: 0, max: 10 }
        )
      ).toBe(true);
      expect(
        intersectionUtilities.intervalsOverlap(
          { min: 0, max: 10 },
          { min: 0, max: 5 }
        )
      ).toBe(true);
      expect(
        intersectionUtilities.intervalsOverlap(
          { min: 0, max: 5 },
          { min: 0, max: 10 }
        )
      ).toBe(true);
    });

    it('should return true when intervals touch at endpoints', () => {
      expect(
        intersectionUtilities.intervalsOverlap(
          { min: 0, max: 10 },
          { min: 10, max: 20 }
        )
      ).toBe(true);
      expect(
        intersectionUtilities.intervalsOverlap(
          { min: 10, max: 20 },
          { min: 0, max: 10 }
        )
      ).toBe(true);
    });

    it('should return false when intervals do not overlap', () => {
      expect(
        intersectionUtilities.intervalsOverlap(
          { min: 0, max: 10 },
          { min: 11, max: 20 }
        )
      ).toBe(false);
      expect(
        intersectionUtilities.intervalsOverlap(
          { min: 11, max: 20 },
          { min: 0, max: 10 }
        )
      ).toBe(false);
    });

    it('should handle decimal values correctly', () => {
      expect(
        intersectionUtilities.intervalsOverlap(
          { min: 0, max: 1.5 },
          { min: 1, max: 2 }
        )
      ).toBe(true);
      expect(
        intersectionUtilities.intervalsOverlap(
          { min: 0, max: 0.9 },
          { min: 1, max: 2 }
        )
      ).toBe(false);
    });

    it('should handle negative intervals correctly', () => {
      expect(
        intersectionUtilities.intervalsOverlap(
          { min: -10, max: -5 },
          { min: -7, max: -3 }
        )
      ).toBe(true);
      expect(
        intersectionUtilities.intervalsOverlap(
          { min: -10, max: -5 },
          { min: -4, max: -1 }
        )
      ).toBe(false);
    });

    it('should handle zero-length intervals correctly', () => {
      expect(
        intersectionUtilities.intervalsOverlap(
          { min: 5, max: 5 },
          { min: 0, max: 10 }
        )
      ).toBe(true);
      expect(
        intersectionUtilities.intervalsOverlap(
          { min: 0, max: 10 },
          { min: 5, max: 5 }
        )
      ).toBe(true);
      expect(
        intersectionUtilities.intervalsOverlap(
          { min: 5, max: 5 },
          { min: 6, max: 6 }
        )
      ).toBe(false);
    });
  });

  describe('overlap', () => {
    it('should return overlapping part of two intervals', () => {
      expect(
        intersectionUtilities.overlapInterval(
          { min: 0, max: 10 },
          { min: 5, max: 15 }
        )
      ).toEqual({ min: 5, max: 10 });
      expect(
        intersectionUtilities.overlapInterval(
          { min: 5, max: 15 },
          { min: 0, max: 10 }
        )
      ).toEqual({ min: 5, max: 10 });
      expect(
        intersectionUtilities.overlapInterval(
          { min: 0, max: 10 },
          { min: 0, max: 10 }
        )
      ).toEqual({ min: 0, max: 10 });
    });

    it('should return null when intervals do not overlap', () => {
      expect(
        intersectionUtilities.overlapInterval(
          { min: 0, max: 10 },
          { min: 11, max: 20 }
        )
      ).toBeNull();
      expect(
        intersectionUtilities.overlapInterval(
          { min: 11, max: 20 },
          { min: 0, max: 10 }
        )
      ).toBeNull();
    });

    it('should handle when one interval is completely within another', () => {
      expect(
        intersectionUtilities.overlapInterval(
          { min: 0, max: 10 },
          { min: 2, max: 8 }
        )
      ).toEqual({ min: 2, max: 8 });
      expect(
        intersectionUtilities.overlapInterval(
          { min: 2, max: 8 },
          { min: 0, max: 10 }
        )
      ).toEqual({ min: 2, max: 8 });
      expect(
        intersectionUtilities.overlapInterval(
          { min: 0, max: 10 },
          { min: 0, max: 5 }
        )
      ).toEqual({ min: 0, max: 5 });
      expect(
        intersectionUtilities.overlapInterval(
          { min: 0, max: 5 },
          { min: 0, max: 10 }
        )
      ).toEqual({ min: 0, max: 5 });
    });

    it('should handle touching intervals at endpoints', () => {
      expect(
        intersectionUtilities.overlapInterval(
          { min: 0, max: 10 },
          { min: 10, max: 20 }
        )
      ).toEqual({ min: 10, max: 10 });
      expect(
        intersectionUtilities.overlapInterval(
          { min: 10, max: 20 },
          { min: 0, max: 10 }
        )
      ).toEqual({ min: 10, max: 10 });
    });

    it('should handle decimal values correctly', () => {
      expect(
        intersectionUtilities.overlapInterval(
          { min: 0.5, max: 1.5 },
          { min: 1.0, max: 2.0 }
        )
      ).toEqual({ min: 1.0, max: 1.5 });
      expect(
        intersectionUtilities.overlapInterval(
          { min: 0.1, max: 0.9 },
          { min: 1.0, max: 2.0 }
        )
      ).toBeNull();
    });

    it('should handle negative intervals correctly', () => {
      expect(
        intersectionUtilities.overlapInterval(
          { min: -10, max: -5 },
          { min: -7, max: -3 }
        )
      ).toEqual({ min: -7, max: -5 });
      expect(
        intersectionUtilities.overlapInterval(
          { min: -7, max: -3 },
          { min: -10, max: -5 }
        )
      ).toEqual({ min: -7, max: -5 });
      expect(
        intersectionUtilities.overlapInterval(
          { min: -10, max: -5 },
          { min: -4, max: -1 }
        )
      ).toBeNull();
      expect(
        intersectionUtilities.overlapInterval(
          { min: -4, max: -1 },
          { min: -10, max: -5 }
        )
      ).toBeNull();
      expect(
        intersectionUtilities.overlapInterval(
          { min: -5, max: -5 },
          { min: -10, max: -1 }
        )
      ).toEqual({ min: -5, max: -5 });
      expect(
        intersectionUtilities.overlapInterval(
          { min: -10, max: -1 },
          { min: -5, max: -5 }
        )
      ).toEqual({ min: -5, max: -5 });
    });

    it('should handle zero-length intervals correctly', () => {
      expect(
        intersectionUtilities.overlapInterval(
          { min: 5, max: 5 },
          { min: 0, max: 10 }
        )
      ).toEqual({ min: 5, max: 5 });
      expect(
        intersectionUtilities.overlapInterval(
          { min: 0, max: 10 },
          { min: 5, max: 5 }
        )
      ).toEqual({ min: 5, max: 5 });
      expect(
        intersectionUtilities.overlapInterval(
          { min: 5, max: 5 },
          { min: 6, max: 6 }
        )
      ).toBeNull();
      expect(
        intersectionUtilities.overlapInterval(
          { min: 6, max: 6 },
          { min: 5, max: 5 }
        )
      ).toBeNull();
    });

    it('should handle intervals with the same start and end', () => {
      expect(
        intersectionUtilities.overlapInterval(
          { min: 5, max: 5 },
          { min: 5, max: 5 }
        )
      ).toEqual({ min: 5, max: 5 });
      expect(
        intersectionUtilities.overlapInterval(
          { min: 0, max: 0 },
          { min: 0, max: 0 }
        )
      ).toEqual({ min: 0, max: 0 });
      expect(
        intersectionUtilities.overlapInterval(
          { min: 1, max: 1 },
          { min: 2, max: 2 }
        )
      ).toBeNull();
    });
  });
});
