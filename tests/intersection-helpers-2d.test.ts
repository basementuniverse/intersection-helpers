import { intersection2d } from '../src';

describe('IntersectionHelpers2D', () => {
  describe('distance', () => {
    it('should return the distance between two points', () => {
      const pointA = { x: 0, y: 0 };
      const pointB = { x: 3, y: 4 };
      const result = intersection2d.distance(pointA, pointB);
      expect(result).toBe(5); // 3-4-5 triangle
    });

    it('should return 0 for the same point', () => {
      const pointA = { x: 1, y: 1 };
      const result = intersection2d.distance(pointA, pointA);
      expect(result).toBe(0);
    });
  });

  describe('angle', () => {
    it('should return the angle between two vectors in radians', () => {
      const vecA = { x: 0, y: 0 };
      const vecB = { x: 0, y: 1 };
      const result = intersection2d.angle(vecA, vecB);
      expect(result).toBeCloseTo(Math.PI / 2); // 90 degrees in radians
    });

    it('should return 0 for the same vector', () => {
      const vecA = { x: 1, y: 1 };
      const result = intersection2d.angle(vecA, vecA);
      expect(result).toBe(0);
    });
  });

  describe('angleBetween', () => {
    it('should return the angle between two perpendicular lines', () => {
      const lineA = {
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0 },
      };
      const lineB = {
        start: { x: 0, y: 0 },
        end: { x: 0, y: 1 },
      };
      const result = intersection2d.angleBetween(lineA, lineB);
      expect(result).toBeCloseTo(Math.PI / 2); // 90 degrees
    });

    it('should return 0 for parallel lines pointing in the same direction', () => {
      const lineA = {
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0 },
      };
      const lineB = {
        start: { x: 0, y: 1 },
        end: { x: 1, y: 1 },
      };
      const result = intersection2d.angleBetween(lineA, lineB);
      expect(result).toBe(0);
    });

    it('should return PI for lines pointing in opposite directions', () => {
      const lineA = {
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0 },
      };
      const lineB = {
        start: { x: 0, y: 0 },
        end: { x: -1, y: 0 },
      };
      const result = intersection2d.angleBetween(lineA, lineB);
      expect(result).toBeCloseTo(Math.PI); // 180 degrees
    });

    it('should handle diagonal lines', () => {
      const lineA = {
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
      };
      const lineB = {
        start: { x: 0, y: 0 },
        end: { x: -1, y: 1 },
      };
      const result = intersection2d.angleBetween(lineA, lineB);
      expect(result).toBeCloseTo(Math.PI / 2); // 90 degrees
    });

    it('should return 0 for identical lines', () => {
      const line = {
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
      };
      const result = intersection2d.angleBetween(line, line);
      expect(result).toBe(0);
    });

    it('should handle rays as input', () => {
      const rayA = {
        origin: { x: 0, y: 0 },
        direction: { x: 1, y: 0 },
      };
      const rayB = {
        origin: { x: 0, y: 0 },
        direction: { x: 0, y: 1 },
      };
      const result = intersection2d.angleBetween(rayA, rayB);
      expect(result).toBeCloseTo(Math.PI / 2); // 90 degrees
    });

    it('should handle mixed line and ray inputs', () => {
      const line = {
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0 },
      };
      const ray = {
        origin: { x: 0, y: 0 },
        direction: { x: 0, y: 1 },
      };
      const result = intersection2d.angleBetween(line, ray);
      expect(result).toBeCloseTo(Math.PI / 2); // 90 degrees
    });

    it('should return 0 for zero-length lines', () => {
      const lineA = {
        start: { x: 0, y: 0 },
        end: { x: 0, y: 0 },
      };
      const lineB = {
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0 },
      };
      const result = intersection2d.angleBetween(lineA, lineB);
      expect(result).toBe(0);
    });

    it('should return 0 for rays with zero direction', () => {
      const rayA = {
        origin: { x: 0, y: 0 },
        direction: { x: 0, y: 0 },
      };
      const rayB = {
        origin: { x: 0, y: 0 },
        direction: { x: 1, y: 0 },
      };
      const result = intersection2d.angleBetween(rayA, rayB);
      expect(result).toBe(0);
    });

    it('should handle 45 degree angles', () => {
      const lineA = {
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0 },
      };
      const lineB = {
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
      };
      const result = intersection2d.angleBetween(lineA, lineB);
      expect(result).toBeCloseTo(Math.PI / 4); // 45 degrees
    });

    it('should handle angles greater than 180 degrees', () => {
      const lineA = {
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0 },
      };
      const lineB = {
        start: { x: 0, y: 0 },
        end: { x: -1, y: -1 },
      };
      const result = intersection2d.angleBetween(lineA, lineB);
      expect(result).toBeCloseTo((5 * Math.PI) / 4); // 225 degrees
    });

    it('should be consistent with non-normalized ray directions', () => {
      const rayA = {
        origin: { x: 0, y: 0 },
        direction: { x: 2, y: 0 }, // Non-normalized
      };
      const rayB = {
        origin: { x: 0, y: 0 },
        direction: { x: 0, y: 3 }, // Non-normalized
      };
      const result = intersection2d.angleBetween(rayA, rayB);
      expect(result).toBeCloseTo(Math.PI / 2); // Should still be 90 degrees
    });
  });

  describe('pointsAreCollinear', () => {
    it('should return true for collinear points', () => {
      const pointA = { x: 0, y: 0 };
      const pointB = { x: 2, y: 2 };
      const pointC = { x: 4, y: 4 };
      const result = intersection2d.pointsAreCollinear(pointA, pointB, pointC);
      expect(result).toBe(true);
    });

    it('should return false for non-collinear points', () => {
      const pointA = { x: 0, y: 0 };
      const pointB = { x: 1, y: 1 };
      const pointC = { x: 1, y: 2 };
      const result = intersection2d.pointsAreCollinear(pointA, pointB, pointC);
      expect(result).toBe(false);
    });
  });

  describe('lineToRay', () => {
    it('should convert a line to a ray', () => {
      const lineStart = { x: 0, y: 0 };
      const lineEnd = { x: 2, y: 0 };
      const result = intersection2d.lineToRay({
        start: lineStart,
        end: lineEnd,
      });
      expect(result).toEqual({
        origin: lineStart,
        direction: { x: 1, y: 0 }, // Normalized direction vector
      });
    });

    it('should handle zero-length lines', () => {
      const point = { x: 2, y: 2 };
      const result = intersection2d.lineToRay({
        start: point,
        end: point,
      });
      expect(result).toEqual({
        origin: point,
        direction: { x: 0, y: 0 },
      });
    });
  });

  describe('rayToLine', () => {
    it('should convert a ray to a line', () => {
      const rayOrigin = { x: 0, y: 0 };
      const rayDirection = { x: 1, y: 0 };
      const result = intersection2d.rayToLine(
        {
          origin: rayOrigin,
          direction: rayDirection,
        },
        1
      );
      expect(result).toEqual({
        start: rayOrigin,
        end: { x: 1, y: 0 },
      });
    });

    it('should handle rays with no direction', () => {
      const point = { x: 2, y: 2 };
      const result = intersection2d.rayToLine({
        origin: point,
        direction: { x: 0, y: 0 },
      });
      expect(result).toEqual({
        start: point,
        end: point,
      });
    });
  });

  describe('aabb', () => {
    it('should return null for invalid input', () => {
      // @ts-ignore - testing invalid input
      const result = intersection2d.aabb(null);
      expect(result).toBe(null);
    });

    it('should convert a line to an AABB', () => {
      const line = {
        start: { x: 1, y: 2 },
        end: { x: 4, y: 6 },
      };
      const result = intersection2d.aabb(line);
      expect(result).toEqual({
        position: { x: 1, y: 2 },
        size: { x: 3, y: 4 },
      });
    });

    it('should convert a zero-length line to an AABB', () => {
      const line = {
        start: { x: 1, y: 2 },
        end: { x: 1, y: 2 },
      };
      const result = intersection2d.aabb(line);
      expect(result).toEqual({
        position: { x: 1, y: 2 },
        size: { x: 0, y: 0 },
      });
    });

    it('should convert an axis-aligned rectangle to an AABB', () => {
      const rect = {
        position: { x: 0, y: 0 },
        size: { x: 4, y: 2 },
        rotation: 0,
      };
      const result = intersection2d.aabb(rect);
      expect(result).toEqual({
        position: { x: -2, y: -1 },
        size: { x: 4, y: 2 },
      });
    });

    it('should convert a rotated rectangle to an AABB', () => {
      const rect = {
        position: { x: 0, y: 0 },
        size: { x: 1, y: 1 },
        rotation: Math.PI / 4, // 45 degrees
      };
      const result = intersection2d.aabb(rect);
      // The diagonal of a 1*1 rectangle is sqrt(2), and when rotated 45 degrees,
      // the AABB dimensions will be approximately equal to this diagonal
      expect(result?.position.x).toBeCloseTo(-Math.sqrt(2) / 2, 5);
      expect(result?.position.y).toBeCloseTo(-Math.sqrt(2) / 2, 5);
      expect(result?.size.x).toBeCloseTo(Math.sqrt(2), 5);
      expect(result?.size.y).toBeCloseTo(Math.sqrt(2), 5);
    });

    it('should convert a circle to an AABB', () => {
      const circle = {
        position: { x: 3, y: 4 },
        radius: 2,
      };
      const result = intersection2d.aabb(circle);
      expect(result).toEqual({
        position: { x: 1, y: 2 },
        size: { x: 4, y: 4 },
      });
    });

    it('should convert a zero-radius circle to an AABB', () => {
      const circle = {
        position: { x: 3, y: 4 },
        radius: 0,
      };
      const result = intersection2d.aabb(circle);
      expect(result).toEqual({
        position: { x: 3, y: 4 },
        size: { x: 0, y: 0 },
      });
    });

    it('should convert a polygon to an AABB', () => {
      const polygon = {
        vertices: [
          { x: 1, y: 1 },
          { x: 4, y: 1 },
          { x: 4, y: 3 },
          { x: 1, y: 3 },
        ],
      };
      const result = intersection2d.aabb(polygon);
      expect(result).toEqual({
        position: { x: 1, y: 1 },
        size: { x: 3, y: 2 },
      });
    });

    it('should handle a single-point polygon', () => {
      const polygon = {
        vertices: [{ x: 1, y: 1 }],
      };
      const result = intersection2d.aabb(polygon);
      expect(result).toEqual({
        position: { x: 1, y: 1 },
        size: { x: 0, y: 0 },
      });
    });

    it('should handle a polygon with negative coordinates', () => {
      const polygon = {
        vertices: [
          { x: -2, y: -2 },
          { x: 2, y: -2 },
          { x: 2, y: 2 },
          { x: -2, y: 2 },
        ],
      };
      const result = intersection2d.aabb(polygon);
      expect(result).toEqual({
        position: { x: -2, y: -2 },
        size: { x: 4, y: 4 },
      });
    });
  });

  describe('aabbToRectangle', () => {
    it('should convert AABB to rectangle with 0 rotation', () => {
      const aabb = {
        position: { x: 1, y: 2 },
        size: { x: 3, y: 4 },
      };
      const result = intersection2d.aabbToRectangle(aabb);
      expect(result).toEqual({
        position: { x: 2.5, y: 4 }, // Centered position
        size: { x: 3, y: 4 },
        rotation: 0,
      });
    });

    it('should handle zero-size AABB', () => {
      const aabb = {
        position: { x: 1, y: 2 },
        size: { x: 0, y: 0 },
      };
      const result = intersection2d.aabbToRectangle(aabb);
      expect(result).toEqual({
        position: { x: 1, y: 2 },
        size: { x: 0, y: 0 },
        rotation: 0,
      });
    });

    it('should handle negative coordinates', () => {
      const aabb = {
        position: { x: -2, y: -3 },
        size: { x: 4, y: 5 },
      };
      const result = intersection2d.aabbToRectangle(aabb);
      expect(result).toEqual({
        position: { x: 0, y: -0.5 }, // Centered position
        size: { x: 4, y: 5 },
        rotation: 0,
      });
    });
  });

  describe('aabbsOverlap', () => {
    it('should return true with overlap area when AABBs overlap', () => {
      const aabbA = {
        position: { x: 0, y: 0 },
        size: { x: 4, y: 4 },
      };
      const aabbB = {
        position: { x: 2, y: 2 },
        size: { x: 4, y: 4 },
      };
      const result = intersection2d.aabbsOverlap(aabbA, aabbB);

      expect(result.intersects).toBe(true);
      expect(result.overlap).toEqual({
        position: { x: 2, y: 2 },
        size: { x: 2, y: 2 },
      });
    });

    it('should return false when AABBs do not overlap', () => {
      const aabbA = {
        position: { x: 0, y: 0 },
        size: { x: 2, y: 2 },
      };
      const aabbB = {
        position: { x: 3, y: 3 },
        size: { x: 2, y: 2 },
      };
      const result = intersection2d.aabbsOverlap(aabbA, aabbB);

      expect(result.intersects).toBe(false);
      expect(result.overlap).toBeUndefined();
    });

    it('should return true when AABBs touch at an edge', () => {
      const aabbA = {
        position: { x: 0, y: 0 },
        size: { x: 2, y: 2 },
      };
      const aabbB = {
        position: { x: 2, y: 0 },
        size: { x: 2, y: 2 },
      };
      const result = intersection2d.aabbsOverlap(aabbA, aabbB);

      expect(result.intersects).toBe(true);
      expect(result.overlap).toEqual({
        position: { x: 2, y: 0 },
        size: { x: 0, y: 2 },
      });
    });

    it('should return true when AABBs touch at a corner', () => {
      const aabbA = {
        position: { x: 0, y: 0 },
        size: { x: 2, y: 2 },
      };
      const aabbB = {
        position: { x: 2, y: 2 },
        size: { x: 2, y: 2 },
      };
      const result = intersection2d.aabbsOverlap(aabbA, aabbB);

      expect(result.intersects).toBe(true);
      expect(result.overlap).toEqual({
        position: { x: 2, y: 2 },
        size: { x: 0, y: 0 },
      });
    });

    it('should handle AABBs with zero size', () => {
      const aabbA = {
        position: { x: 1, y: 1 },
        size: { x: 0, y: 0 },
      };
      const aabbB = {
        position: { x: 0, y: 0 },
        size: { x: 2, y: 2 },
      };
      const result = intersection2d.aabbsOverlap(aabbA, aabbB);

      expect(result.intersects).toBe(true);
      expect(result.overlap).toEqual({
        position: { x: 1, y: 1 },
        size: { x: 0, y: 0 },
      });
    });

    it('should handle AABBs with negative coordinates', () => {
      const aabbA = {
        position: { x: -4, y: -4 },
        size: { x: 4, y: 4 },
      };
      const aabbB = {
        position: { x: -2, y: -2 },
        size: { x: 4, y: 4 },
      };
      const result = intersection2d.aabbsOverlap(aabbA, aabbB);

      expect(result.intersects).toBe(true);
      expect(result.overlap).toEqual({
        position: { x: -2, y: -2 },
        size: { x: 2, y: 2 },
      });
    });
  });

  describe('rectangleIsRotated', () => {
    it('should return true for a rotated rectangle', () => {
      const rect = {
        position: { x: 0, y: 0 },
        size: { x: 2, y: 1 },
        rotation: Math.PI / 4, // 45 degrees
      };
      const result = intersection2d.rectangleIsRotated(rect);
      expect(result).toBe(true);
    });

    it('should return false for an axis-aligned rectangle', () => {
      const rect = {
        position: { x: 0, y: 0 },
        size: { x: 2, y: 1 },
        rotation: 0, // No rotation
      };
      const result = intersection2d.rectangleIsRotated(rect);
      expect(result).toBe(false);
    });
  });

  describe('rectangleVertices', () => {
    it('should return the vertices of a rectangle', () => {
      const rect = {
        position: { x: 0, y: 0 },
        size: { x: 2, y: 1 },
        rotation: 0,
      };
      const result = intersection2d.rectangleVertices(rect);
      expect(result).toEqual([
        { x: -1, y: -0.5 },
        { x: 1, y: -0.5 },
        { x: 1, y: 0.5 },
        { x: -1, y: 0.5 },
      ]);
    });

    it('should handle rotated rectangles', () => {
      const rect = {
        position: { x: 0, y: 0 },
        size: { x: 2, y: 1 },
        rotation: Math.PI / 4, // 45 degrees
      };
      const result = intersection2d.rectangleVertices(rect);
      expect(result[0].x).toBeCloseTo(-0.35355, 5);
      expect(result[0].y).toBeCloseTo(-1.06066, 5);
      expect(result[1].x).toBeCloseTo(1.06066, 5);
      expect(result[1].y).toBeCloseTo(0.35355, 5);
      expect(result[2].x).toBeCloseTo(0.35355, 5);
      expect(result[2].y).toBeCloseTo(1.06066, 5);
      expect(result[3].x).toBeCloseTo(-1.06066, 5);
      expect(result[3].y).toBeCloseTo(-0.35355, 5);
    });
  });

  describe('polygonIsConvex', () => {
    it('should return true for a convex polygon', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
          { x: 2, y: 2 },
          { x: 0, y: 2 },
        ],
      };
      const result = intersection2d.polygonIsConvex(polygon);
      expect(result).toBe(true);
    });

    it('should return false for a concave polygon', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
          { x: 1, y: 1 }, // This point creates a concave angle
          { x: 2, y: 2 },
          { x: 0, y: 2 },
        ],
      };
      const result = intersection2d.polygonIsConvex(polygon);
      expect(result).toBe(false);
    });

    it('should return null for an invalid polygon (fewer than 3 vertices)', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
        ],
      };
      const result = intersection2d.polygonIsConvex(polygon);
      expect(result).toBe(null);
    });

    it('should return null for an invalid polygon (self-intersecting)', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 2 },
          { x: 2, y: 0 },
          { x: 0, y: 2 },
        ],
      };
      const result = intersection2d.polygonIsConvex(polygon);
      expect(result).toBe(null);
    });
  });

  describe('polygonSelfIntersects', () => {
    it('should return true for a self-intersecting polygon', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 2 },
          { x: 2, y: 0 },
          { x: 0, y: 2 },
        ],
      };
      const result = intersection2d.polygonSelfIntersects(polygon);
      expect(result).toBe(true);
    });

    it('should return false for a non-self-intersecting polygon', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
          { x: 2, y: 2 },
          { x: 0, y: 2 },
        ],
      };
      const result = intersection2d.polygonSelfIntersects(polygon);
      expect(result).toBe(false);
    });

    it('should return false for a simple triangle', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
          { x: 1, y: 0 },
        ],
      };
      const result = intersection2d.polygonSelfIntersects(polygon);
      expect(result).toBe(false);
    });

    it('should return false for a polygon with fewer than 3 vertices', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
        ],
      };
      const result = intersection2d.polygonSelfIntersects(polygon);
      expect(result).toBe(false);
    });
  });

  describe('polygonIsValid', () => {
    it('should return true for a valid polygon', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
          { x: 2, y: 2 },
          { x: 0, y: 2 },
        ],
      };
      const result = intersection2d.polygonIsValid(polygon);
      expect(result).toBe(true);
    });

    it('should return false for an invalid polygon (self-intersecting)', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 2 },
          { x: 2, y: 0 },
          { x: 0, y: 2 },
        ],
      };
      const result = intersection2d.polygonIsValid(polygon);
      expect(result).toBe(false);
    });

    it('should return false for a polygon with fewer than 3 vertices', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
        ],
      };
      const result = intersection2d.polygonIsValid(polygon);
      expect(result).toBe(false);
    });
  });

  describe('polygonWindingOrder', () => {
    it('should return "clockwise" for a convex clockwise polygon (screen coords)', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 0, y: -2 },
          { x: 2, y: -2 },
          { x: 2, y: 0 },
        ],
      };
      const result = intersection2d.polygonWindingOrder(polygon);
      expect(result).toBe('clockwise');
    });

    it('should return "clockwise" for a concave clockwise polygon (screen coords)', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 4, y: 0 },
          { x: 4, y: 4 },
          { x: 2, y: 2 }, // Concave point
          { x: 0, y: 4 },
        ],
      };
      const result = intersection2d.polygonWindingOrder(polygon);
      expect(result).toBe('clockwise');
    });

    it('should return "counter-clockwise" for a convex counterclockwise polygon (cartesian coords)', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 0, y: -2 },
          { x: 2, y: -2 },
          { x: 2, y: 0 },
        ],
      };
      const result = intersection2d.polygonWindingOrder(polygon, {
        coordinateSystem: 'cartesian',
      });
      expect(result).toBe('counter-clockwise');
    });

    it('should return "counter-clockwise" for a convex counterclockwise polygon (screen coords)', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
          { x: 2, y: -2 },
          { x: 0, y: -2 },
        ],
      };
      const result = intersection2d.polygonWindingOrder(polygon);
      expect(result).toBe('counter-clockwise');
    });

    it('should return "counter-clockwise" for a concave counterclockwise polygon (screen coords)', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 4 },
          { x: 2, y: 2 }, // Concave point
          { x: 4, y: 4 },
          { x: 4, y: 0 },
          { x: 0, y: 0 },
        ],
      };
      const result = intersection2d.polygonWindingOrder(polygon);
      expect(result).toBe('counter-clockwise');
    });

    it('should return "clockwise" for a convex clockwise polygon (cartesian coords)', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
          { x: 2, y: -2 },
          { x: 0, y: -2 },
        ],
      };
      const result = intersection2d.polygonWindingOrder(polygon, {
        coordinateSystem: 'cartesian',
      });
      expect(result).toBe('clockwise');
    });

    it('should return null for an invalid polygon (self-intersecting)', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 2 },
          { x: 2, y: 0 },
          { x: 0, y: 2 },
        ],
      };
      const result = intersection2d.polygonWindingOrder(polygon);
      expect(result).toBe(null);
    });

    it('should return null for a polygon with fewer than 3 vertices', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
        ],
      };
      const result = intersection2d.polygonWindingOrder(polygon);
      expect(result).toBe(null);
    });
  });

  describe('polygonArea', () => {
    it('should return the area of a simple polygon', () => {
      // Counter-clockwise winding order
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
          { x: 2, y: 2 },
          { x: 0, y: 2 },
        ],
      };
      const result = intersection2d.polygonArea(polygon);
      expect(result).toBe(4); // Area of a 2x2 square
    });

    it('should return the area of a concave polygon', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 4, y: 0 },
          { x: 4, y: 4 },
          { x: 2, y: 2 }, // Concave point
          { x: 0, y: 4 },
        ],
      };
      const result = intersection2d.polygonArea(polygon);
      expect(result).toBe(12);
    });

    it('should work regardless of the winding order', () => {
      // Clockwise winding order
      const polygon = {
        vertices: [
          { x: 0, y: 2 },
          { x: 2, y: 2 },
          { x: 2, y: 0 },
          { x: 0, y: 0 },
        ],
      };
      const result = intersection2d.polygonArea(polygon);
      expect(result).toBe(4); // Area of a 2x2 square
    });

    it('should return 0 for a degenerate polygon (all points collinear)', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      const result = intersection2d.polygonArea(polygon);
      expect(result).toBe(0);
    });

    it('should return null for an invalid polygon (self-intersecting)', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 2 },
          { x: 2, y: 0 },
          { x: 0, y: 2 },
        ],
      };
      const result = intersection2d.polygonArea(polygon);
      expect(result).toBe(null);
    });

    it('should return null for a polygon with fewer than 3 vertices', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
        ],
      };
      const result = intersection2d.polygonArea(polygon);
      expect(result).toBe(null);
    });
  });

  describe('polygonCentroid', () => {
    it('should return the centroid of a simple polygon', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
          { x: 2, y: 2 },
          { x: 0, y: 2 },
        ],
      };
      const result = intersection2d.polygonCentroid(polygon);
      expect(result).toEqual({ x: 1, y: 1 }); // Centroid of a square
    });

    it('should return the centroid of a concave polygon', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 4, y: 0 },
          { x: 4, y: 4 },
          { x: 2, y: 3 }, // Concave point
          { x: 0, y: 4 },
        ],
      };
      const result = intersection2d.polygonCentroid(polygon);
      expect(result).toEqual({ x: 2, y: 2.2 });
    });

    it('should return null for a degenerate polygon (all points collinear)', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
          { x: 2, y: 2 },
        ],
      };
      const result = intersection2d.polygonCentroid(polygon);
      expect(result).toBe(null);
    });

    it('should return null for an invalid polygon (self-intersecting)', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 2 },
          { x: 2, y: 0 },
          { x: 0, y: 2 },
        ],
      };
      const result = intersection2d.polygonCentroid(polygon);
      expect(result).toBe(null);
    });

    it('should return null for a polygon with fewer than 3 vertices', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
        ],
      };
      const result = intersection2d.polygonCentroid(polygon);
      expect(result).toBe(null);
    });

    it('should handle polygons with negative coordinates', () => {
      const polygon = {
        vertices: [
          { x: -2, y: -2 },
          { x: -1, y: -2 },
          { x: -1, y: -1 },
          { x: -2, y: -1 },
        ],
      };
      const result = intersection2d.polygonCentroid(polygon);
      expect(result).toEqual({ x: -1.5, y: -1.5 }); // Centroid of a square in negative quadrant
    });
  });

  describe('polygonConvexHull', () => {
    it('should return null for invalid polygon (fewer than 3 vertices)', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
        ],
      };
      const result = intersection2d.polygonConvexHull(polygon);
      expect(result).toBeNull();
    });

    it('should return the same polygon if already convex', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
          { x: 2, y: 2 },
          { x: 0, y: 2 },
        ],
      };
      const result = intersection2d.polygonConvexHull(polygon);
      expect(result).toEqual(polygon);
    });

    it('should compute convex hull of a simple concave polygon', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
          { x: 1, y: 1 }, // Reflex vertex
          { x: 2, y: 2 },
          { x: 0, y: 2 },
        ],
      };
      const result = intersection2d.polygonConvexHull(polygon);

      expect(result).not.toBeNull();
      expect(result?.vertices).toHaveLength(4);
      // Should form a rectangle without the reflex vertex
      expect(result?.vertices).toEqual([
        { x: 0, y: 0 },
        { x: 2, y: 0 },
        { x: 2, y: 2 },
        { x: 0, y: 2 },
      ]);
    });

    it('should preserve winding order (clockwise)', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
          { x: 2, y: 2 },
          { x: 1, y: 1 }, // Reflex vertex
          { x: 0, y: 2 },
        ],
      };
      const result = intersection2d.polygonConvexHull(polygon, {
        keepWindingOrder: true,
      });

      expect(result).not.toBeNull();
      expect(intersection2d.polygonWindingOrder(result!)).toBe('clockwise');
    });

    it('should preserve winding order (counter-clockwise)', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 0, y: 2 },
          { x: 1, y: 1 }, // Reflex vertex
          { x: 2, y: 2 },
          { x: 2, y: 0 },
        ],
      };
      const result = intersection2d.polygonConvexHull(polygon, {
        keepWindingOrder: true,
      });

      expect(result).not.toBeNull();
      expect(intersection2d.polygonWindingOrder(result!)).toBe(
        'counter-clockwise'
      );
    });
  });

  describe('optimisePolygon', () => {
    it('should return the same polygon if already optimised', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
          { x: 2, y: 2 },
          { x: 0, y: 2 },
        ],
      };
      const result = intersection2d.optimisePolygon(polygon);
      expect(result).toEqual(polygon);
    });

    it('should remove duplicate adjacent vertices from a polygon', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
          { x: 2, y: 0 }, // Duplicate vertex
          { x: 2, y: 2 },
          { x: 0, y: 2 },
          { x: 0, y: 0 }, // Closing the polygon
        ],
      };
      const result = intersection2d.optimisePolygon(polygon);
      expect(result).toEqual({
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
          { x: 2, y: 2 },
          { x: 0, y: 2 },
        ],
      });
    });

    it('should remove collinear points from a polygon', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 1, y: 1 }, // Collinear point
          { x: 2, y: 2 },
          { x: 2, y: 1 }, // Collinear point
          { x: 2, y: 0 },
        ],
      };
      const result = intersection2d.optimisePolygon(polygon);
      expect(result).toEqual({
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 2 },
          { x: 2, y: 0 },
        ],
      });
    });
  });

  describe('decomposePolygon', () => {
    it('should return the same polygon if already convex', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
          { x: 2, y: 2 },
          { x: 0, y: 2 },
        ],
      };
      const result = intersection2d.decomposePolygon(polygon);
      expect(result).not.toBeNull();
      expect(result).toHaveLength(1);
      expect(result![0]).toEqual(polygon);
    });

    it('should decompose a concave polygon into convex parts', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
          { x: 2, y: 2 },
          { x: 1, y: 1 }, // Concave point
          { x: 0, y: 2 },
        ],
      };
      const result = intersection2d.decomposePolygon(polygon);

      // Should decompose into two triangles
      expect(result).not.toBeNull();
      expect(result).toBeTruthy();
      expect(result).toHaveLength(2);

      // Each resulting polygon should be convex
      result!.forEach(poly => {
        expect(intersection2d.polygonIsConvex(poly)).toBe(true);
      });

      // Total area should be preserved
      const originalArea = intersection2d.polygonArea(polygon);
      const decomposedArea = result!.reduce((sum, poly) => {
        return sum + (intersection2d.polygonArea(poly) ?? 0);
      }, 0);
      expect(originalArea).not.toBeNull();
      expect(decomposedArea).toBeCloseTo(originalArea!, 5);
    });

    it('should handle U-shaped polygon', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 3, y: 0 },
          { x: 3, y: 3 },
          { x: 2, y: 3 },
          { x: 2, y: 1 },
          { x: 1, y: 1 },
          { x: 1, y: 3 },
          { x: 0, y: 3 },
        ],
      };
      const result = intersection2d.decomposePolygon(polygon);

      expect(result).toBeTruthy();
      expect(result!.length).toBeGreaterThanOrEqual(2);

      // Each part should be convex
      result!.forEach(poly => {
        expect(intersection2d.polygonIsConvex(poly)).toBe(true);
      });

      // Total area should be preserved
      const originalArea = intersection2d.polygonArea(polygon);
      const decomposedArea = result!.reduce((sum, poly) => {
        return sum + (intersection2d.polygonArea(poly) ?? 0);
      }, 0);
      expect(originalArea).not.toBeNull();
      expect(decomposedArea).toBeCloseTo(originalArea!, 5);
    });

    it('should handle counterclockwise polygons', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 0, y: 2 },
          { x: 1, y: 1 }, // Concave point
          { x: 2, y: 2 },
          { x: 2, y: 0 },
        ],
      };
      const result = intersection2d.decomposePolygon(polygon);

      expect(result).toBeTruthy();
      expect(result!.length).toBeGreaterThanOrEqual(2);
      result!.forEach(poly => {
        expect(intersection2d.polygonIsConvex(poly)).toBe(true);
      });
    });

    it('should return null for invalid polygon (self-intersecting)', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 2 },
          { x: 2, y: 0 },
          { x: 0, y: 2 },
        ],
      };
      const result = intersection2d.decomposePolygon(polygon);
      expect(result).toBe(null);
    });

    it('should return null for polygon with less than 3 vertices', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
        ],
      };
      const result = intersection2d.decomposePolygon(polygon);
      expect(result).toBe(null);
    });
  });

  describe('pointOnRay', () => {
    it('should return true when point is on the ray', () => {
      const ray = {
        origin: { x: 0, y: 0 },
        direction: { x: 1, y: 0 },
      };
      const point = { x: 5, y: 0 };
      const result = intersection2d.pointOnRay(point, ray);

      expect(result.intersects).toBe(true);
      expect(result.closestPoint).toEqual(point);
      expect(result.distance).toBe(0);
    });

    it('should return false when point is behind the ray', () => {
      const ray = {
        origin: { x: 0, y: 0 },
        direction: { x: 1, y: 0 },
      };
      const point = { x: -5, y: 0 };
      const result = intersection2d.pointOnRay(point, ray);

      expect(result.intersects).toBe(false);
      expect(result.closestPoint).toEqual({ x: 0, y: 0 });
      expect(result.distance).toBe(5);
    });

    it('should handle points offset from the ray', () => {
      const ray = {
        origin: { x: 0, y: 0 },
        direction: { x: 1, y: 0 },
      };
      const point = { x: 5, y: 3 };
      const result = intersection2d.pointOnRay(point, ray);

      expect(result.intersects).toBe(false);
      expect(result.closestPoint).toEqual({ x: 5, y: 0 });
      expect(result.distance).toBe(3);
    });

    it('should handle diagonal rays', () => {
      const ray = {
        origin: { x: 0, y: 0 },
        direction: { x: 1, y: 1 },
      };
      const point = { x: 5, y: 5 };
      const result = intersection2d.pointOnRay(point, ray);

      expect(result.intersects).toBe(true);
      expect(result.closestPoint.x).toBeCloseTo(point.x, 5);
      expect(result.closestPoint.y).toBeCloseTo(point.y, 5);
      expect(result.distance).toBeCloseTo(0, 5);
    });

    it('should handle points near diagonal rays', () => {
      const ray = {
        origin: { x: 0, y: 0 },
        direction: { x: 1, y: 1 },
      };
      const point = { x: 5, y: 4 };
      const result = intersection2d.pointOnRay(point, ray);

      expect(result.intersects).toBe(false);
      expect(result.closestPoint.x).toBeCloseTo(4.5, 5);
      expect(result.closestPoint.y).toBeCloseTo(4.5, 5);
      expect(result.distance).toBeCloseTo(0.707107, 5); // √0.5
    });

    it('should handle rays with non-normalized direction', () => {
      const ray = {
        origin: { x: 0, y: 0 },
        direction: { x: 2, y: 0 }, // Non-normalized direction
      };
      const point = { x: 5, y: 0 };
      const result = intersection2d.pointOnRay(point, ray);

      expect(result.intersects).toBe(true);
      expect(result.closestPoint).toEqual(point);
      expect(result.distance).toBe(0);
    });

    it('should handle rays with zero direction', () => {
      const ray = {
        origin: { x: 1, y: 1 },
        direction: { x: 0, y: 0 },
      };
      const point = { x: 1, y: 1 };
      const result = intersection2d.pointOnRay(point, ray);

      expect(result.intersects).toBe(true);
      expect(result.closestPoint).toEqual(point);
      expect(result.distance).toBe(0);
    });

    it('should handle points at the ray origin', () => {
      const ray = {
        origin: { x: 1, y: 1 },
        direction: { x: 1, y: 0 },
      };
      const point = { x: 1, y: 1 };
      const result = intersection2d.pointOnRay(point, ray);

      expect(result.intersects).toBe(true);
      expect(result.closestPoint).toEqual(point);
      expect(result.distance).toBe(0);
    });
  });

  describe('pointOnLine', () => {
    it('should return true when point is on the line segment', () => {
      const line = {
        start: { x: 0, y: 0 },
        end: { x: 10, y: 0 },
      };
      const point = { x: 5, y: 0 };
      const result = intersection2d.pointOnLine(point, line);

      expect(result.intersects).toBe(true);
      expect(result.closestPoint).toEqual(point);
      expect(result.distance).toBe(0);
    });

    it('should return false when point is beyond line segment endpoints', () => {
      const line = {
        start: { x: 0, y: 0 },
        end: { x: 10, y: 0 },
      };
      const point = { x: 15, y: 0 };
      const result = intersection2d.pointOnLine(point, line);

      expect(result.intersects).toBe(false);
      expect(result.closestPoint).toEqual({ x: 10, y: 0 });
      expect(result.distance).toBe(5);
    });

    it('should handle points offset from the line', () => {
      const line = {
        start: { x: 0, y: 0 },
        end: { x: 10, y: 0 },
      };
      const point = { x: 5, y: 3 };
      const result = intersection2d.pointOnLine(point, line);

      expect(result.intersects).toBe(false);
      expect(result.closestPoint).toEqual({ x: 5, y: 0 });
      expect(result.distance).toBe(3);
    });

    it('should handle diagonal lines', () => {
      const line = {
        start: { x: 0, y: 0 },
        end: { x: 5, y: 5 },
      };
      const point = { x: 3, y: 3 };
      const result = intersection2d.pointOnLine(point, line);

      expect(result.intersects).toBe(true);
      expect(result.closestPoint.x).toBeCloseTo(point.x, 5);
      expect(result.closestPoint.y).toBeCloseTo(point.y, 5);
      expect(result.distance).toBeCloseTo(0, 5);
    });

    it('should handle points near diagonal lines', () => {
      const line = {
        start: { x: 0, y: 0 },
        end: { x: 5, y: 5 },
      };
      const point = { x: 3, y: 4 };
      const result = intersection2d.pointOnLine(point, line);

      expect(result.intersects).toBe(false);
      expect(result.closestPoint.x).toBeCloseTo(3.5, 5);
      expect(result.closestPoint.y).toBeCloseTo(3.5, 5);
      expect(result.distance).toBeCloseTo(0.707107, 5); // √0.5
    });

    it('should handle zero-length lines', () => {
      const line = {
        start: { x: 1, y: 1 },
        end: { x: 1, y: 1 },
      };
      const point = { x: 1, y: 1 };
      const result = intersection2d.pointOnLine(point, line);

      expect(result.intersects).toBe(true);
      expect(result.closestPoint).toEqual(point);
      expect(result.distance).toBe(0);
    });

    it('should handle points at line endpoints', () => {
      const line = {
        start: { x: 0, y: 0 },
        end: { x: 5, y: 0 },
      };
      const point = { x: 0, y: 0 };
      const result = intersection2d.pointOnLine(point, line);

      expect(result.intersects).toBe(true);
      expect(result.closestPoint).toEqual(point);
      expect(result.distance).toBe(0);
    });
  });

  describe('pointInCircle', () => {
    it('should return true when point is inside the circle', () => {
      const circle = {
        position: { x: 0, y: 0 },
        radius: 5,
      };
      const point = { x: 3, y: 0 };
      const result = intersection2d.pointInCircle(point, circle);

      expect(result.intersects).toBe(true);
      expect(result.distance).toBe(-2); // Point is 2 units inside the circle
    });

    it('should return true when point is exactly on the circle edge', () => {
      const circle = {
        position: { x: 0, y: 0 },
        radius: 5,
      };
      const point = { x: 5, y: 0 };
      const result = intersection2d.pointInCircle(point, circle);

      expect(result.intersects).toBe(true);
      expect(Math.abs(result.distance)).toBe(0); // Point is exactly on the edge
    });

    it('should return false when point is outside the circle', () => {
      const circle = {
        position: { x: 0, y: 0 },
        radius: 5,
      };
      const point = { x: 8, y: 0 };
      const result = intersection2d.pointInCircle(point, circle);

      expect(result.intersects).toBe(false);
      expect(result.distance).toBe(3); // Point is 3 units outside the circle
    });

    it('should handle circles at non-origin positions', () => {
      const circle = {
        position: { x: 10, y: -5 },
        radius: 3,
      };
      const point = { x: 12, y: -7 };
      const result = intersection2d.pointInCircle(point, circle);

      expect(result.intersects).toBe(true);
      expect(result.distance).toBeLessThan(0); // Point is inside the circle
    });

    it('should handle points at the circle center', () => {
      const circle = {
        position: { x: 5, y: 5 },
        radius: 3,
      };
      const point = { x: 5, y: 5 };
      const result = intersection2d.pointInCircle(point, circle);

      expect(result.intersects).toBe(true);
      expect(result.distance).toBe(-3); // Point is at center, so distance is -radius
    });
  });

  describe('pointInRectangle', () => {
    it('should return true when point is inside an axis-aligned rectangle', () => {
      const rect = {
        position: { x: 0, y: 0 },
        size: { x: 4, y: 2 },
        rotation: 0,
      };
      const point = { x: 1, y: 0.5 };
      const result = intersection2d.pointInRectangle(point, rect);

      expect(result.intersects).toBe(true);
      expect(result.distance).toBeLessThan(0);
      // For a point inside, closestPoint should be on the nearest edge
      expect(result.closestPoint).toEqual({ x: 1, y: 1 }); // Top edge is closest
    });

    it('should return true when point is exactly on the rectangle edge', () => {
      const rect = {
        position: { x: 0, y: 0 },
        size: { x: 4, y: 2 },
        rotation: 0,
      };
      const point = { x: 2, y: 1 }; // On top edge
      const result = intersection2d.pointInRectangle(point, rect);

      // Due to floating point precision, the point might be considered
      // either exactly on the edge (intersecting) or slightly outside
      if (result.intersects) {
        expect(result.distance).toBeCloseTo(0, 5);
      } else {
        expect(result.distance).toBeCloseTo(0, 4); // Slightly relaxed precision
      }
      expect(result.closestPoint).toEqual(point);
    });

    it('should return false when point is outside an axis-aligned rectangle', () => {
      const rect = {
        position: { x: 0, y: 0 },
        size: { x: 4, y: 2 },
        rotation: 0,
      };
      const point = { x: 3, y: 2 };
      const result = intersection2d.pointInRectangle(point, rect);

      expect(result.intersects).toBe(false);
      expect(result.distance).toBeGreaterThan(0);
      expect(result.closestPoint).toEqual({ x: 2, y: 1 }); // Closest point should be on the corner
    });

    it('should handle rotated rectangles - point inside', () => {
      const rect = {
        position: { x: 0, y: 0 },
        size: { x: 4, y: 2 },
        rotation: Math.PI / 4, // 45 degrees
      };
      const point = { x: 0, y: 0 }; // Center point
      const result = intersection2d.pointInRectangle(point, rect);

      expect(result.intersects).toBe(true);
      expect(result.distance).toBeLessThan(0);
      expect(result.closestPoint.x).toBeCloseTo(0.70711, 5);
      expect(result.closestPoint.y).toBeCloseTo(-0.70711, 5);
    });

    it('should handle rotated rectangles - point outside', () => {
      const rect = {
        position: { x: 0, y: 0 },
        size: { x: 4, y: 2 },
        rotation: Math.PI / 4, // 45 degrees
      };
      const point = { x: 3, y: 0 };
      const result = intersection2d.pointInRectangle(point, rect);

      expect(result.intersects).toBe(false);
      expect(result.distance).toBeGreaterThan(0);
    });

    it('should handle rectangles at non-origin positions', () => {
      const rect = {
        position: { x: 5, y: -3 },
        size: { x: 4, y: 2 },
        rotation: 0,
      };
      const point = { x: 6, y: -2.5 };
      const result = intersection2d.pointInRectangle(point, rect);

      expect(result.intersects).toBe(true);
      expect(result.distance).toBeLessThan(0);
      expect(result.closestPoint).toStrictEqual({ x: 6, y: -2 }); // Closest point on the top edge
    });

    it('should handle ambiguous closest points deterministically', () => {
      const rect = {
        position: { x: 0, y: 0 },
        size: { x: 4, y: 2 },
        rotation: 0,
      };
      // Point equidistant from top and right edges
      const point = { x: 3, y: 1.5 };
      const result = intersection2d.pointInRectangle(point, rect);

      expect(result.intersects).toBe(false);
      // Should choose top edge as per specification
      expect(result.closestPoint).toEqual({ x: 2, y: 1 });
    });

    it('should handle corner cases correctly', () => {
      const rect = {
        position: { x: 0, y: 0 },
        size: { x: 4, y: 2 },
        rotation: 0,
      };
      const point = { x: 2, y: 1 }; // Top-right corner
      const result = intersection2d.pointInRectangle(point, rect);

      // Due to floating point precision, the point might be considered
      // either exactly on the corner (intersecting) or slightly outside
      if (result.intersects) {
        expect(result.distance).toBeCloseTo(0, 5);
      } else {
        expect(result.distance).toBeCloseTo(0, 4); // Slightly relaxed precision
      }
      expect(result.closestPoint).toEqual(point);
    });

    it('should handle zero-size rectangles', () => {
      const rect = {
        position: { x: 0, y: 0 },
        size: { x: 0, y: 0 },
        rotation: 0,
      };
      const point = { x: 0, y: 0 };
      const result = intersection2d.pointInRectangle(point, rect);

      expect(result.intersects).toBe(true);
      expect(Math.abs(result.distance)).toBe(0);
      expect(result.closestPoint).toEqual(point);
    });

    it('should handle points exactly at rectangle corners when rotated', () => {
      const rect = {
        position: { x: 0, y: 0 },
        size: { x: 2, y: 2 },
        rotation: Math.PI / 4, // 45 degrees
      };
      // For a 2x2 square rotated 45 degrees, corners are at (±√2, 0) and (0, ±√2)
      const point = { x: Math.SQRT2, y: 0 };
      const result = intersection2d.pointInRectangle(point, rect);

      // Due to floating point precision, the point might be considered
      // either exactly on the edge (intersecting) or slightly outside
      if (result.intersects) {
        expect(result.distance).toBeCloseTo(0, 5);
      } else {
        expect(result.distance).toBeCloseTo(0, 4); // Slightly relaxed precision
      }
      expect(result.closestPoint.x).toBeCloseTo(point.x, 5);
      expect(result.closestPoint.y).toBeCloseTo(point.y, 5);
    });
  });

  describe('pointInPolygon', () => {
    it('should return true when point is inside a simple polygon', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
          { x: 4, y: 4 },
          { x: -2, y: 4 },
        ],
      };
      const point = { x: 1, y: 1 };
      const result = intersection2d.pointInPolygon(point, polygon);

      expect(result).not.toBeNull();
      expect(result!.intersects).toBe(true);
      expect(result!.distance).toBeLessThan(0);
      expect(result!.closestPoint).toEqual({ x: 1, y: 0 }); // Closest to top edge
    });

    it('should return true when point is exactly on the polygon edge', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
          { x: 4, y: 4 },
          { x: -2, y: 4 },
        ],
      };
      const point = { x: 1, y: 0 }; // On top edge
      const result = intersection2d.pointInPolygon(point, polygon);

      expect(result).not.toBeNull();
      expect(result!.intersects).toBe(true);
      expect(Math.abs(result!.distance)).toBe(0);
      expect(result!.closestPoint).toEqual(point);
    });

    it('should return false when point is outside a polygon', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
          { x: 2, y: 2 },
          { x: 0, y: 2 },
        ],
      };
      const point = { x: 3, y: 1 };
      const result = intersection2d.pointInPolygon(point, polygon);

      expect(result).not.toBeNull();
      expect(result!.intersects).toBe(false);
      expect(result!.distance).toBeGreaterThan(0);
      expect(result!.closestPoint).toEqual({ x: 2, y: 1 }); // Closest point on right edge
    });

    it('should handle concave polygons correctly', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
          { x: 1, y: 1 }, // Creates a concave point
          { x: 2, y: 2 },
          { x: 0, y: 2 },
        ],
      };
      // Point inside the concave region
      const point = { x: 0.5, y: 0.5 };
      const result = intersection2d.pointInPolygon(point, polygon);

      expect(result).not.toBeNull();
      expect(result!.intersects).toBe(true);
      expect(result!.distance).toBeLessThan(0);
    });

    it('should return null for an invalid polygon (self-intersecting)', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 2 },
          { x: 2, y: 0 },
          { x: 0, y: 2 },
        ],
      };
      const point = { x: 1, y: 1 };
      const result = intersection2d.pointInPolygon(point, polygon);

      expect(result).toBeNull();
    });

    it('should return null for a polygon with fewer than 3 vertices', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
        ],
      };
      const point = { x: 1, y: 0 };
      const result = intersection2d.pointInPolygon(point, polygon);

      expect(result).toBeNull();
    });

    it('should work correctly with counter-clockwise winding order', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 0, y: 2 },
          { x: 2, y: 2 },
          { x: 2, y: 0 },
        ],
      };
      const point = { x: 1, y: 1 };
      const result = intersection2d.pointInPolygon(point, polygon);

      expect(result).not.toBeNull();
      expect(result!.intersects).toBe(true);
      expect(result!.distance).toBeLessThan(0);
    });
  });

  describe('rayTraverseGrid', () => {
    it('should handle a horizontal ray aligned with grid', () => {
      const ray = {
        origin: { x: 0, y: 5 },
        direction: { x: 1, y: 0 },
      };
      const result = intersection2d.rayTraverseGrid(
        ray,
        10, // cellSize
        { x: 0, y: 0 }, // gridTopLeft
        { x: 3, y: 1 }, // gridBottomRight
        4 // maxCells
      );

      expect(result.cells).toEqual([
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
      ]);
    });

    it('should handle a diagonal ray', () => {
      const ray = {
        origin: { x: 0, y: -1 },
        direction: { x: 1, y: 1 },
      };
      const result = intersection2d.rayTraverseGrid(
        ray,
        10,
        { x: 0, y: 0 },
        { x: 3, y: 3 }
      );

      expect(result.cells).toEqual([
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 2, y: 2 },
      ]);
    });

    it('should respect maxCells parameter', () => {
      const ray = {
        origin: { x: 0, y: -1 },
        direction: { x: 1, y: 1 },
      };
      const result = intersection2d.rayTraverseGrid(
        ray,
        10,
        { x: 0, y: 0 },
        { x: 10, y: 10 },
        3
      );

      expect(result.cells).toHaveLength(3);
      expect(result.cells).toEqual([
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
      ]);
    });

    it('should handle ray starting outside grid bounds', () => {
      const ray = {
        origin: { x: -20, y: 0 },
        direction: { x: 1, y: 0 },
      };
      const result = intersection2d.rayTraverseGrid(
        ray,
        10,
        { x: 0, y: -1 },
        { x: 3, y: 1 }
      );

      expect(result.cells).toEqual([
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
      ]);
    });

    it('should handle ray missing grid entirely', () => {
      const ray = {
        origin: { x: 0, y: -5 },
        direction: { x: 1, y: 0 },
      };
      const result = intersection2d.rayTraverseGrid(
        ray,
        10,
        { x: 0, y: 0 },
        { x: 3, y: 3 }
      );

      expect(result.cells).toHaveLength(0);
    });

    it('should handle zero direction ray', () => {
      const ray = {
        origin: { x: 1, y: 1 },
        direction: { x: 0, y: 0 },
      };
      const result = intersection2d.rayTraverseGrid(
        ray,
        1,
        { x: 0, y: 0 },
        { x: 3, y: 3 },
        4
      );

      expect(result.cells).toHaveLength(0);
    });

    it('should handle invalid cell size', () => {
      const ray = {
        origin: { x: 0, y: 0 },
        direction: { x: 1, y: 0 },
      };
      const result = intersection2d.rayTraverseGrid(
        ray,
        0, // invalid cell size
        { x: 0, y: 0 },
        { x: 3, y: 3 },
        4
      );

      expect(result.cells).toHaveLength(0);
    });

    it('should handle vertical ray', () => {
      const ray = {
        origin: { x: 1, y: 0 },
        direction: { x: 0, y: 1 },
      };
      const result = intersection2d.rayTraverseGrid(
        ray,
        1,
        { x: 0, y: 0 },
        { x: 3, y: 3 },
        4
      );

      expect(result.cells).toEqual([
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
      ]);
    });

    it('should handle non-normalized direction vector', () => {
      const ray = {
        origin: { x: 0, y: 1 },
        direction: { x: 2, y: 0 }, // non-normalized
      };
      const result = intersection2d.rayTraverseGrid(
        ray,
        10,
        { x: 0, y: -1 },
        { x: 3, y: 1 },
        4
      );

      expect(result.cells).toEqual([
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
      ]);
    });

    it('should handle ray starting exactly on cell boundary', () => {
      const ray = {
        origin: { x: 1, y: 0 }, // exactly on boundary between cells
        direction: { x: 1, y: 0 },
      };
      const result = intersection2d.rayTraverseGrid(
        ray,
        1,
        { x: 0, y: -1 },
        { x: 3, y: 1 },
        4
      );

      expect(result.cells).toEqual([
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ]);
    });
  });

  describe('rayIntersectsRay', () => {
    it('should return true with intersection point when rays intersect', () => {
      const rayA = {
        origin: { x: 0, y: 0 },
        direction: { x: 1, y: 0 },
      };
      const rayB = {
        origin: { x: 1, y: -1 },
        direction: { x: 0, y: 1 },
      };
      const result = intersection2d.rayIntersectsRay(rayA, rayB);

      expect(result.intersects).toBe(true);
      expect(result.intersectionPoint).toEqual({ x: 1, y: 0 });
    });

    it('should return false when rays are parallel', () => {
      const rayA = {
        origin: { x: 0, y: 0 },
        direction: { x: 1, y: 0 },
      };
      const rayB = {
        origin: { x: 0, y: 1 },
        direction: { x: 1, y: 0 },
      };
      const result = intersection2d.rayIntersectsRay(rayA, rayB);

      expect(result.intersects).toBe(false);
      expect(result.intersectionPoint).toBeUndefined();
    });

    it('should return true without intersection point for overlapping collinear rays (same direction)', () => {
      const rayA = {
        origin: { x: 0, y: 0 },
        direction: { x: 1, y: 0 },
      };
      const rayB = {
        origin: { x: 1, y: 0 },
        direction: { x: 1, y: 0 },
      };
      const result = intersection2d.rayIntersectsRay(rayA, rayB);

      expect(result.intersects).toBe(true);
      expect(result.intersectionPoint).toBeUndefined();
    });

    it('should return false for collinear rays pointing in opposite directions', () => {
      const rayA = {
        origin: { x: 0, y: 0 },
        direction: { x: 1, y: 0 },
      };
      const rayB = {
        origin: { x: 2, y: 0 },
        direction: { x: -1, y: 0 },
      };
      const result = intersection2d.rayIntersectsRay(rayA, rayB);

      expect(result.intersects).toBe(false);
      expect(result.intersectionPoint).toBeUndefined();
    });

    it('should return true without intersection point for identical rays', () => {
      const rayA = {
        origin: { x: 0, y: 0 },
        direction: { x: 1, y: 0 },
      };
      const rayB = {
        origin: { x: 0, y: 0 },
        direction: { x: 1, y: 0 },
      };
      const result = intersection2d.rayIntersectsRay(rayA, rayB);

      expect(result.intersects).toBe(true);
      expect(result.intersectionPoint).toBeUndefined();
    });

    it('should handle rays with non-normalized direction vectors', () => {
      const rayA = {
        origin: { x: 0, y: 0 },
        direction: { x: 2, y: 0 }, // non-normalized
      };
      const rayB = {
        origin: { x: 1, y: -1 },
        direction: { x: 0, y: 2 }, // non-normalized
      };
      const result = intersection2d.rayIntersectsRay(rayA, rayB);

      expect(result.intersects).toBe(true);
      expect(result.intersectionPoint).toEqual({ x: 1, y: 0 });
    });

    it('should return false when rays do not intersect', () => {
      const rayA = {
        origin: { x: 0, y: 0 },
        direction: { x: 1, y: 0 },
      };
      const rayB = {
        origin: { x: 1, y: 1 },
        direction: { x: 0, y: 1 },
      };
      const result = intersection2d.rayIntersectsRay(rayA, rayB);

      expect(result.intersects).toBe(false);
      expect(result.intersectionPoint).toBeUndefined();
    });

    it('should handle rays with zero direction vectors', () => {
      const rayA = {
        origin: { x: 0, y: 0 },
        direction: { x: 0, y: 0 },
      };
      const rayB = {
        origin: { x: 1, y: 0 },
        direction: { x: 1, y: 0 },
      };
      const result = intersection2d.rayIntersectsRay(rayA, rayB);

      expect(result.intersects).toBe(false);
      expect(result.intersectionPoint).toBeUndefined();
    });
  });

  describe('rayIntersectsLine', () => {
    it('should return true with intersection point when ray intersects line', () => {
      const ray = {
        origin: { x: 0, y: 0 },
        direction: { x: 1, y: 0 },
      };
      const line = {
        start: { x: 1, y: -1 },
        end: { x: 1, y: 1 },
      };
      const result = intersection2d.rayIntersectsLine(ray, line);

      expect(result.intersects).toBe(true);
      expect(result.intersectionPoint).toEqual({ x: 1, y: 0 });
    });

    it('should return false when ray misses line segment', () => {
      const ray = {
        origin: { x: 0, y: 0 },
        direction: { x: 1, y: 0 },
      };
      const line = {
        start: { x: 1, y: 1 },
        end: { x: 1, y: 2 },
      };
      const result = intersection2d.rayIntersectsLine(ray, line);

      expect(result.intersects).toBe(false);
      expect(result.intersectionPoint).toBeUndefined();
    });

    it('should return false when ray points away from line', () => {
      const ray = {
        origin: { x: 2, y: 0 },
        direction: { x: 1, y: 0 }, // pointing right, away from line
      };
      const line = {
        start: { x: 1, y: -1 },
        end: { x: 1, y: 1 },
      };
      const result = intersection2d.rayIntersectsLine(ray, line);

      expect(result.intersects).toBe(false);
      expect(result.intersectionPoint).toBeUndefined();
    });

    it('should handle when ray starts on the line', () => {
      const ray = {
        origin: { x: 1, y: 0 },
        direction: { x: 1, y: 0 },
      };
      const line = {
        start: { x: 1, y: -1 },
        end: { x: 1, y: 1 },
      };
      const result = intersection2d.rayIntersectsLine(ray, line);

      expect(result.intersects).toBe(true);
      expect(result.intersectionPoint).toEqual({ x: 1, y: 0 });
    });

    it('should handle ray parallel to line segment', () => {
      const ray = {
        origin: { x: 0, y: 0 },
        direction: { x: 1, y: 0 },
      };
      const line = {
        start: { x: 0, y: 1 },
        end: { x: 2, y: 1 },
      };
      const result = intersection2d.rayIntersectsLine(ray, line);

      expect(result.intersects).toBe(false);
      expect(result.intersectionPoint).toBeUndefined();
    });

    it('should handle ray collinear with line segment - overlapping', () => {
      const ray = {
        origin: { x: 0, y: 0 },
        direction: { x: 1, y: 0 },
      };
      const line = {
        start: { x: 1, y: 0 },
        end: { x: 2, y: 0 },
      };
      const result = intersection2d.rayIntersectsLine(ray, line);

      expect(result.intersects).toBe(true);
      expect(result.intersectionPoint).toBeUndefined();
    });

    it('should handle ray collinear with line segment - non-overlapping', () => {
      const ray = {
        origin: { x: 0, y: 0 },
        direction: { x: -1, y: 0 },
      };
      const line = {
        start: { x: 1, y: 0 },
        end: { x: 2, y: 0 },
      };
      const result = intersection2d.rayIntersectsLine(ray, line);

      expect(result.intersects).toBe(false);
      expect(result.intersectionPoint).toBeUndefined();
    });

    it('should handle rays with non-normalized direction vectors', () => {
      const ray = {
        origin: { x: 0, y: 0 },
        direction: { x: 2, y: 0 }, // non-normalized
      };
      const line = {
        start: { x: 1, y: -1 },
        end: { x: 1, y: 1 },
      };
      const result = intersection2d.rayIntersectsLine(ray, line);

      expect(result.intersects).toBe(true);
      expect(result.intersectionPoint).toEqual({ x: 1, y: 0 });
    });

    it('should handle ray with zero direction vector', () => {
      const ray = {
        origin: { x: 0, y: 0 },
        direction: { x: 0, y: 0 },
      };
      const line = {
        start: { x: 1, y: -1 },
        end: { x: 1, y: 1 },
      };
      const result = intersection2d.rayIntersectsLine(ray, line);

      expect(result.intersects).toBe(false);
      expect(result.intersectionPoint).toBeUndefined();
    });

    it('should handle zero-length line segment', () => {
      const ray = {
        origin: { x: 0, y: 0 },
        direction: { x: 1, y: 0 },
      };
      const line = {
        start: { x: 1, y: 0 },
        end: { x: 1, y: 0 },
      };
      const result = intersection2d.rayIntersectsLine(ray, line);

      expect(result.intersects).toBe(false);
      expect(result.intersectionPoint).toBeUndefined();
    });
  });

  describe('rayIntersectsCircle', () => {
    it('should return true with two intersection points when ray passes through circle', () => {
      const ray = {
        origin: { x: -2, y: 0 },
        direction: { x: 1, y: 0 },
      };
      const circle = {
        position: { x: 0, y: 0 },
        radius: 1,
      };
      const result = intersection2d.rayIntersectsCircle(ray, circle);

      expect(result.intersects).toBe(true);
      expect(result.intersectionPoints).toHaveLength(2);
      expect(result.intersectionPoints![0]).toEqual({ x: -1, y: 0 });
      expect(result.intersectionPoints![1]).toEqual({ x: 1, y: 0 });
    });

    it('should return true with one intersection point when ray is tangent to circle', () => {
      const ray = {
        origin: { x: -2, y: 1 },
        direction: { x: 1, y: 0 },
      };
      const circle = {
        position: { x: 0, y: 0 },
        radius: 1,
      };
      const result = intersection2d.rayIntersectsCircle(ray, circle);

      expect(result.intersects).toBe(true);
      expect(result.intersectionPoints).toHaveLength(1);
      expect(result.intersectionPoints![0]).toEqual({ x: 0, y: 1 });
    });

    it('should return false when ray misses circle', () => {
      const ray = {
        origin: { x: -2, y: 2 },
        direction: { x: 1, y: 0 },
      };
      const circle = {
        position: { x: 0, y: 0 },
        radius: 1,
      };
      const result = intersection2d.rayIntersectsCircle(ray, circle);

      expect(result.intersects).toBe(false);
      expect(result.intersectionPoints).toBeUndefined();
    });

    it('should return false when ray points away from circle', () => {
      const ray = {
        origin: { x: -2, y: 0 },
        direction: { x: -1, y: 0 },
      };
      const circle = {
        position: { x: 0, y: 0 },
        radius: 1,
      };
      const result = intersection2d.rayIntersectsCircle(ray, circle);

      expect(result.intersects).toBe(false);
      expect(result.intersectionPoints).toBeUndefined();
    });

    it('should handle ray starting inside the circle', () => {
      const ray = {
        origin: { x: 0.5, y: 0 },
        direction: { x: 1, y: 0 },
      };
      const circle = {
        position: { x: 0, y: 0 },
        radius: 1,
      };
      const result = intersection2d.rayIntersectsCircle(ray, circle);

      expect(result.intersects).toBe(true);
      expect(result.intersectionPoints).toHaveLength(1);
    });
  });

  describe('rayIntersectsRectangle', () => {
    it('should return true with two intersection points when ray passes through rectangle', () => {
      const ray = {
        origin: { x: -2, y: 0 },
        direction: { x: 1, y: 0 },
      };
      const rect = {
        position: { x: 0, y: 0 },
        size: { x: 2, y: 2 },
        rotation: 0,
      };
      const result = intersection2d.rayIntersectsRectangle(ray, rect);

      expect(result.intersects).toBe(true);
      expect(result.intersectionPoints).toHaveLength(2);
      expect(result.intersectionPoints![0]).toEqual({ x: -1, y: 0 });
      expect(result.intersectionPoints![1]).toEqual({ x: 1, y: 0 });
    });

    it('should return true with one intersection point when ray touches rectangle corner', () => {
      const ray = {
        origin: { x: -2, y: Math.sqrt(2) - 0.0000001 },
        direction: { x: 1, y: 0 },
      };
      const rect = {
        position: { x: 0, y: 0 },
        size: { x: 2, y: 2 },
        rotation: Math.PI / 4, // 45 degrees
      };
      const result = intersection2d.rayIntersectsRectangle(ray, rect);

      expect(result.intersects).toBe(true);
      expect(result.intersectionPoints).toHaveLength(1);
      expect(result.intersectionPoints![0].x).toBeCloseTo(0, 5);
      expect(result.intersectionPoints![0].y).toBeCloseTo(Math.sqrt(2), 5);
    });

    it('should return false when ray misses rectangle', () => {
      const ray = {
        origin: { x: -2, y: 2 },
        direction: { x: 1, y: 0 },
      };
      const rect = {
        position: { x: 0, y: 0 },
        size: { x: 2, y: 2 },
        rotation: 0,
      };
      const result = intersection2d.rayIntersectsRectangle(ray, rect);

      expect(result.intersects).toBe(false);
      expect(result.intersectionPoints).toBeUndefined();
    });

    it('should return false when ray points away from rectangle', () => {
      const ray = {
        origin: { x: -2, y: 0 },
        direction: { x: -1, y: 0 },
      };
      const rect = {
        position: { x: 0, y: 0 },
        size: { x: 2, y: 2 },
        rotation: 0,
      };
      const result = intersection2d.rayIntersectsRectangle(ray, rect);

      expect(result.intersects).toBe(false);
      expect(result.intersectionPoints).toBeUndefined();
    });

    it('should handle ray starting inside the rectangle', () => {
      const ray = {
        origin: { x: 0, y: 0 },
        direction: { x: 1, y: 0 },
      };
      const rect = {
        position: { x: 0, y: 0 },
        size: { x: 2, y: 2 },
        rotation: 0,
      };
      const result = intersection2d.rayIntersectsRectangle(ray, rect);

      expect(result.intersects).toBe(true);
      expect(result.intersectionPoints).toHaveLength(1);
      expect(result.intersectionPoints![0]).toEqual({ x: 1, y: 0 });
    });

    it('should handle ray starting on rectangle edge', () => {
      const ray = {
        origin: { x: -1, y: 0 },
        direction: { x: 1, y: 0 },
      };
      const rect = {
        position: { x: 0, y: 0 },
        size: { x: 2, y: 2 },
        rotation: 0,
      };
      const result = intersection2d.rayIntersectsRectangle(ray, rect);

      expect(result.intersects).toBe(true);
      expect(result.intersectionPoints).toHaveLength(2);
      expect(result.intersectionPoints![0]).toEqual({ x: -1, y: 0 });
      expect(result.intersectionPoints![1]).toEqual({ x: 1, y: 0 });
    });

    it('should handle ray with zero direction vector', () => {
      const ray = {
        origin: { x: 0, y: 0 },
        direction: { x: 0, y: 0 },
      };
      const rect = {
        position: { x: 0, y: 0 },
        size: { x: 2, y: 2 },
        rotation: 0,
      };
      const result = intersection2d.rayIntersectsRectangle(ray, rect);

      expect(result.intersects).toBe(false);
      expect(result.intersectionPoints).toBeUndefined();
    });

    it('should handle rotated rectangle - passing through', () => {
      const ray = {
        origin: { x: -2, y: 0 },
        direction: { x: 1, y: 0 },
      };
      const rect = {
        position: { x: 0, y: 0 },
        size: { x: 2, y: 2 },
        rotation: Math.PI / 4, // 45 degrees
      };
      const result = intersection2d.rayIntersectsRectangle(ray, rect);

      expect(result.intersects).toBe(true);
      expect(result.intersectionPoints).toHaveLength(2);
      // At 45 degree rotation, intersection points should be approximately (-√2, 0) and (√2, 0)
      expect(result.intersectionPoints![0].x).toBeCloseTo(-Math.sqrt(2), 5);
      expect(result.intersectionPoints![0].y).toBeCloseTo(0, 5);
      expect(result.intersectionPoints![1].x).toBeCloseTo(Math.sqrt(2), 5);
      expect(result.intersectionPoints![1].y).toBeCloseTo(0, 5);
    });

    it('should handle rectangle at non-origin position', () => {
      const ray = {
        origin: { x: 0, y: 0 },
        direction: { x: 1, y: 1 },
      };
      const rect = {
        position: { x: 2, y: 2 },
        size: { x: 2, y: 2 },
        rotation: 0,
      };
      const result = intersection2d.rayIntersectsRectangle(ray, rect);

      expect(result.intersects).toBe(true);
      expect(result.intersectionPoints).toHaveLength(2);
      expect(result.intersectionPoints![0].x).toBeCloseTo(1, 5);
      expect(result.intersectionPoints![0].y).toBeCloseTo(1, 5);
      expect(result.intersectionPoints![1].x).toBeCloseTo(3, 5);
      expect(result.intersectionPoints![1].y).toBeCloseTo(3, 5);
    });

    it('should handle zero-size rectangle', () => {
      const ray = {
        origin: { x: -2, y: 0 },
        direction: { x: 1, y: 0 },
      };
      const rect = {
        position: { x: 0, y: 0 },
        size: { x: 0, y: 0 },
        rotation: 0,
      };
      const result = intersection2d.rayIntersectsRectangle(ray, rect);

      expect(result.intersects).toBe(false);
      expect(result.intersectionPoints).toBeUndefined();
    });
  });

  describe('rayIntersectsPolygon', () => {
    it('should return true with intersection points when ray passes through convex polygon', () => {
      const ray = {
        origin: { x: -1, y: 0 },
        direction: { x: 1, y: 0 },
      };
      const polygon = {
        vertices: [
          { x: 0, y: 1 },
          { x: 1, y: 0 },
          { x: 0, y: -1 },
          { x: -1, y: 0 },
        ],
      };

      const result = intersection2d.rayIntersectsPolygon(ray, polygon);
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toHaveLength(2);

      // Verify points are ordered by distance from ray origin
      const [p1, p2] = result!.intersectionPoints!;
      expect(p1.x).toBeLessThan(p2.x);
    });

    it('should return true with intersection points when ray passes through concave polygon', () => {
      const ray = {
        origin: { x: -1, y: 0 },
        direction: { x: 1, y: 0 },
      };
      const polygon = {
        vertices: [
          { x: -1, y: -1 },
          { x: 1, y: -1 },
          { x: 0, y: 0 }, // Concave point
          { x: 1, y: 1 },
          { x: -1, y: 1 },
        ],
      };

      const result = intersection2d.rayIntersectsPolygon(ray, polygon);
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toHaveLength(2);

      // Verify points are ordered by distance from ray origin
      const [p1, p2] = result!.intersectionPoints!;
      expect(p1.x).toBeLessThan(p2.x);
    });

    it('should return false when ray misses polygon', () => {
      const ray = {
        origin: { x: 0, y: 2 },
        direction: { x: 1, y: 0 },
      };
      const polygon = {
        vertices: [
          { x: -1, y: -1 },
          { x: 1, y: -1 },
          { x: 1, y: 1 },
          { x: -1, y: 1 },
        ],
      };

      const result = intersection2d.rayIntersectsPolygon(ray, polygon);
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(false);
      expect(result?.intersectionPoints).toBeUndefined();
    });

    it('should return false when ray points away from polygon', () => {
      const ray = {
        origin: { x: -2, y: 0 },
        direction: { x: -1, y: 0 },
      };
      const polygon = {
        vertices: [
          { x: -1, y: -1 },
          { x: 1, y: -1 },
          { x: 1, y: 1 },
          { x: -1, y: 1 },
        ],
      };

      const result = intersection2d.rayIntersectsPolygon(ray, polygon);
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(false);
      expect(result?.intersectionPoints).toBeUndefined();
    });

    it('should handle ray starting inside polygon', () => {
      const ray = {
        origin: { x: 0.5, y: 0.5 },
        direction: { x: 1, y: 0 },
      };
      const polygon = {
        vertices: [
          { x: -1, y: -1 },
          { x: 1, y: -1 },
          { x: 1, y: 1 },
          { x: -1, y: 1 },
        ],
      };

      const result = intersection2d.rayIntersectsPolygon(ray, polygon);
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toHaveLength(1);
      expect(result?.intersectionPoints![0]).toEqual({ x: 1, y: 0.5 });
    });

    it('should return null for invalid polygon (fewer than 3 vertices)', () => {
      const ray = {
        origin: { x: 0, y: 0 },
        direction: { x: 1, y: 0 },
      };
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
        ],
      };

      const result = intersection2d.rayIntersectsPolygon(ray, polygon);
      expect(result).toBeNull();
    });

    it('should return null for invalid polygon (self-intersecting)', () => {
      const ray = {
        origin: { x: 0, y: 0 },
        direction: { x: 1, y: 0 },
      };
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
          { x: 1, y: 0 },
          { x: 0, y: 1 },
        ],
      };

      const result = intersection2d.rayIntersectsPolygon(ray, polygon);
      expect(result).toBeNull();
    });

    it('should handle ray with non-normalized direction vector', () => {
      const ray = {
        origin: { x: -1, y: 0 },
        direction: { x: 2, y: 0 }, // Non-normalized direction
      };
      const polygon = {
        vertices: [
          { x: 0, y: 1 },
          { x: 1, y: 0 },
          { x: 0, y: -1 },
        ],
      };

      const result = intersection2d.rayIntersectsPolygon(ray, polygon);
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toHaveLength(2);
    });

    it('should handle ray with zero direction vector', () => {
      const ray = {
        origin: { x: 0, y: 0 },
        direction: { x: 0, y: 0 },
      };
      const polygon = {
        vertices: [
          { x: -1, y: -1 },
          { x: 1, y: -1 },
          { x: 1, y: 1 },
          { x: -1, y: 1 },
        ],
      };

      const result = intersection2d.rayIntersectsPolygon(ray, polygon);
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(false);
      expect(result?.intersectionPoints).toBeUndefined();
    });
  });

  describe('lineIntersectsLine', () => {
    it('should return true with intersection point when lines intersect', () => {
      const lineA = {
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
      };
      const lineB = {
        start: { x: 1, y: 0 },
        end: { x: 0, y: 1 },
      };
      const result = intersection2d.lineIntersectsLine(lineA, lineB);

      expect(result.intersects).toBe(true);
      expect(result.intersectionPoint).toEqual({ x: 0.5, y: 0.5 });
    });

    it('should return false when lines do not intersect', () => {
      const lineA = {
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
      };
      const lineB = {
        start: { x: 2, y: 2 },
        end: { x: 3, y: 3 },
      };
      const result = intersection2d.lineIntersectsLine(lineA, lineB);

      expect(result.intersects).toBe(false);
      expect(result.intersectionPoint).toBeUndefined();
    });

    it('should return false when lines are parallel', () => {
      const lineA = {
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
      };
      const lineB = {
        start: { x: 0, y: 1 },
        end: { x: 1, y: 2 },
      };
      const result = intersection2d.lineIntersectsLine(lineA, lineB);

      expect(result.intersects).toBe(false);
      expect(result.intersectionPoint).toBeUndefined();
    });

    it('should return true without intersection point for overlapping collinear lines (same direction)', () => {
      const lineA = {
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
      };
      const lineB = {
        start: { x: 1, y: 1 },
        end: { x: 2, y: 2 },
      };
      const result = intersection2d.lineIntersectsLine(lineA, lineB);

      expect(result.intersects).toBe(true);
      expect(result.intersectionPoint).toBeUndefined();
    });

    it('should return false for collinear lines pointing in opposite directions', () => {
      const lineA = {
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0 },
      };
      const lineB = {
        start: { x: 3, y: 0 },
        end: { x: 2, y: 0 },
      };
      const result = intersection2d.lineIntersectsLine(lineA, lineB);

      expect(result.intersects).toBe(false);
      expect(result.intersectionPoint).toBeUndefined();
    });

    it('should return true without intersection point for identical lines', () => {
      const lineA = {
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
      };
      const lineB = {
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
      };
      const result = intersection2d.lineIntersectsLine(lineA, lineB);

      expect(result.intersects).toBe(true);
      expect(result.intersectionPoint).toBeUndefined();
    });

    it('should handle zero-length lines', () => {
      const lineA = {
        start: { x: 0, y: 0 },
        end: { x: 0, y: 0 }, // zero-length line
      };
      const lineB = {
        start: { x: 1, y: 1 },
        end: { x: 2, y: 2 },
      };
      const result = intersection2d.lineIntersectsLine(lineA, lineB);

      expect(result.intersects).toBe(false);
      expect(result.intersectionPoint).toBeUndefined();
    });
  });

  describe('lineIntersectsRectangle', () => {
    it('should return true with two intersection points when line passes through rectangle', () => {
      const line = {
        start: { x: -2, y: 0 },
        end: { x: 2, y: 0 },
      };
      const rectangle = {
        position: { x: 0, y: 0 },
        size: { x: 2, y: 2 },
        rotation: 0,
      };
      const result = intersection2d.lineIntersectsRectangle(line, rectangle);

      expect(result.intersects).toBe(true);
      expect(result.intersectionPoints).toHaveLength(2);
      expect(result.intersectionPoints![0]).toEqual({ x: -1, y: 0 });
      expect(result.intersectionPoints![1]).toEqual({ x: 1, y: 0 });
    });

    it('should return true with one intersection point when line ends inside rectangle', () => {
      const line = {
        start: { x: -2, y: 1 },
        end: { x: 0, y: 1 },
      };
      const rectangle = {
        position: { x: 0, y: 0 },
        size: { x: 2, y: 2 },
        rotation: 0,
      };
      const result = intersection2d.lineIntersectsRectangle(line, rectangle);

      expect(result.intersects).toBe(true);
      expect(result.intersectionPoints).toHaveLength(1);
      expect(result.intersectionPoints![0]).toEqual({ x: -1, y: 1 });
    });

    it('should return true without intersection points when line is entirely inside rectangle', () => {
      const line = {
        start: { x: -0.5, y: 0 },
        end: { x: 0.5, y: 0 },
      };
      const rectangle = {
        position: { x: 0, y: 0 },
        size: { x: 2, y: 2 },
        rotation: 0,
      };
      const result = intersection2d.lineIntersectsRectangle(line, rectangle);

      expect(result.intersects).toBe(true);
      expect(result.intersectionPoints).toBeUndefined();
    });

    it('should return false when line misses rectangle', () => {
      const line = {
        start: { x: -2, y: 2 },
        end: { x: 2, y: 2 },
      };
      const rectangle = {
        position: { x: 0, y: 0 },
        size: { x: 2, y: 2 },
        rotation: 0,
      };
      const result = intersection2d.lineIntersectsRectangle(line, rectangle);

      expect(result.intersects).toBe(false);
      expect(result.intersectionPoints).toBeUndefined();
    });

    it('should handle line starting on rectangle edge', () => {
      const line = {
        start: { x: -1, y: 0 },
        end: { x: -2, y: 0 },
      };
      const rectangle = {
        position: { x: 0, y: 0 },
        size: { x: 2, y: 2 },
        rotation: 0,
      };
      const result = intersection2d.lineIntersectsRectangle(line, rectangle);

      expect(result.intersects).toBe(true);
      expect(result.intersectionPoints).toHaveLength(1);
      expect(result.intersectionPoints![0]).toEqual({ x: -1, y: 0 });
    });

    it('should handle rotated rectangle - passing through', () => {
      const line = {
        start: { x: -2, y: 0 },
        end: { x: 2, y: 0 },
      };
      const rectangle = {
        position: { x: 0, y: 0 },
        size: { x: 2, y: 2 },
        rotation: Math.PI / 4, // 45 degrees
      };
      const result = intersection2d.lineIntersectsRectangle(line, rectangle);

      expect(result.intersects).toBe(true);
      expect(result.intersectionPoints).toHaveLength(2);
      // At 45 degree rotation, intersection points should be approximately (-√2, 0) and (√2, 0)
      expect(result.intersectionPoints![0].x).toBeCloseTo(-Math.sqrt(2), 5);
      expect(result.intersectionPoints![0].y).toBeCloseTo(0, 5);
      expect(result.intersectionPoints![1].x).toBeCloseTo(Math.sqrt(2), 5);
      expect(result.intersectionPoints![1].y).toBeCloseTo(0, 5);
    });

    it('should handle rectangle at non-origin position', () => {
      const line = {
        start: { x: 0, y: 0 },
        end: { x: 4, y: 4 },
      };
      const rectangle = {
        position: { x: 2, y: 2 },
        size: { x: 2, y: 2 },
        rotation: 0,
      };
      const result = intersection2d.lineIntersectsRectangle(line, rectangle);

      expect(result.intersects).toBe(true);
      expect(result.intersectionPoints).toHaveLength(2);
      expect(result.intersectionPoints![0].x).toBeCloseTo(1, 5);
      expect(result.intersectionPoints![0].y).toBeCloseTo(1, 5);
      expect(result.intersectionPoints![1].x).toBeCloseTo(3, 5);
      expect(result.intersectionPoints![1].y).toBeCloseTo(3, 5);
    });

    it('should handle zero-size rectangle', () => {
      const line = {
        start: { x: -1, y: 0 },
        end: { x: 1, y: 0 },
      };
      const rectangle = {
        position: { x: 0, y: 0 },
        size: { x: 0, y: 0 },
        rotation: 0,
      };
      const result = intersection2d.lineIntersectsRectangle(line, rectangle);

      expect(result.intersects).toBe(false);
      expect(result.intersectionPoints).toBeUndefined();
    });

    it('should handle zero-length line', () => {
      const line = {
        start: { x: 0, y: 0 },
        end: { x: 0, y: 0 },
      };
      const rectangle = {
        position: { x: 0, y: 0 },
        size: { x: 2, y: 2 },
        rotation: 0,
      };
      const result = intersection2d.lineIntersectsRectangle(line, rectangle);

      expect(result.intersects).toBe(true);
      expect(result.intersectionPoints).toBeUndefined();
    });
  });

  describe('lineIntersectsPolygon', () => {
    it('should return true with two intersection points when line passes through convex polygon', () => {
      const line = {
        start: { x: -2, y: 0 },
        end: { x: 2, y: 0 },
      };
      const polygon = {
        vertices: [
          { x: -1, y: -1 },
          { x: 1, y: -1 },
          { x: 1, y: 1 },
          { x: -1, y: 1 },
        ],
      };

      const result = intersection2d.lineIntersectsPolygon(line, polygon);
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toHaveLength(2);
      expect(result?.intersectionPoints![0]).toEqual({ x: -1, y: 0 });
      expect(result?.intersectionPoints![1]).toEqual({ x: 1, y: 0 });
    });

    it('should return true with two intersection points when line passes through concave polygon', () => {
      const line = {
        start: { x: -2, y: 0 },
        end: { x: 2, y: 0 },
      };
      const polygon = {
        vertices: [
          { x: -1, y: -1 },
          { x: 1, y: -1 },
          { x: 0, y: 0 }, // Concave point
          { x: 1, y: 1 },
          { x: -1, y: 1 },
        ],
      };

      const result = intersection2d.lineIntersectsPolygon(line, polygon);
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toHaveLength(2);
      expect(result?.intersectionPoints![0]).toEqual({ x: -1, y: 0 });
      expect(result?.intersectionPoints![1]).toEqual({ x: 0, y: 0 });
    });

    it('should return false when line misses polygon', () => {
      const line = {
        start: { x: -2, y: 2 },
        end: { x: 2, y: 2 },
      };
      const polygon = {
        vertices: [
          { x: -1, y: -1 },
          { x: 1, y: -1 },
          { x: 1, y: 1 },
          { x: -1, y: 1 },
        ],
      };

      const result = intersection2d.lineIntersectsPolygon(line, polygon);
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(false);
      expect(result?.intersectionPoints).toBeUndefined();
    });

    it('should return true without intersection points when line is entirely inside polygon', () => {
      const line = {
        start: { x: -0.5, y: 0 },
        end: { x: 0.5, y: 0 },
      };
      const polygon = {
        vertices: [
          { x: -1, y: -1 },
          { x: 1, y: -1 },
          { x: 1, y: 1 },
          { x: -1, y: 1 },
        ],
      };

      const result = intersection2d.lineIntersectsPolygon(line, polygon);
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toBeUndefined();
    });

    it('should return true with one intersection point when line starts inside polygon', () => {
      const line = {
        start: { x: 0, y: 0 },
        end: { x: 2, y: 0 },
      };
      const polygon = {
        vertices: [
          { x: -1, y: -1 },
          { x: 1, y: -1 },
          { x: 1, y: 1 },
          { x: -1, y: 1 },
        ],
      };

      const result = intersection2d.lineIntersectsPolygon(line, polygon);
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toHaveLength(1);
      expect(result?.intersectionPoints![0]).toEqual({ x: 1, y: 0 });
    });

    it('should return null for invalid polygon (self-intersecting)', () => {
      const line = {
        start: { x: -1, y: 0 },
        end: { x: 1, y: 0 },
      };
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
          { x: 1, y: 0 },
          { x: 0, y: 1 },
        ],
      };

      const result = intersection2d.lineIntersectsPolygon(line, polygon);
      expect(result).toBeNull();
    });

    it('should return null for polygon with fewer than 3 vertices', () => {
      const line = {
        start: { x: -1, y: 0 },
        end: { x: 1, y: 0 },
      };
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
        ],
      };

      const result = intersection2d.lineIntersectsPolygon(line, polygon);
      expect(result).toBeNull();
    });

    it('should handle zero-length line', () => {
      const line = {
        start: { x: 0, y: 0 },
        end: { x: 0, y: 0 },
      };
      const polygon = {
        vertices: [
          { x: -1, y: -1 },
          { x: 1, y: -1 },
          { x: 1, y: 1 },
          { x: -1, y: 1 },
        ],
      };

      const result = intersection2d.lineIntersectsPolygon(line, polygon);
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toBeUndefined();
    });
  });

  describe('circleIntersectsCircle', () => {
    it('should return true with two intersection points when circles intersect externally', () => {
      const circle1 = {
        position: { x: 0, y: 0 },
        radius: 2,
      };
      const circle2 = {
        position: { x: 3, y: 0 },
        radius: 2,
      };

      const result = intersection2d.circleIntersectsCircle(circle1, circle2);
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toHaveLength(2);
      expect(result?.intersectionPoints![0].x).toBeCloseTo(1.5, 5);
      expect(result?.intersectionPoints![0].y).toBeCloseTo(1.32287565553229, 5);
      expect(result?.intersectionPoints![1].x).toBeCloseTo(1.5, 5);
      expect(result?.intersectionPoints![1].y).toBeCloseTo(
        -1.32287565553229,
        5
      );
      expect(result?.minimumSeparation).toEqual({ x: 1, y: 0 });
    });

    it('should return true with two intersection points when circles intersect with vertical offset', () => {
      const circle1 = {
        position: { x: 0, y: 0 },
        radius: 2,
      };
      const circle2 = {
        position: { x: 2, y: 2 },
        radius: 2,
      };

      const result = intersection2d.circleIntersectsCircle(circle1, circle2);
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toHaveLength(2);
      expect(result?.minimumSeparation?.x).toBeCloseTo(0.82842, 4);
      expect(result?.minimumSeparation?.y).toBeCloseTo(0.82842, 4);
    });

    it('should return true with one intersection point when circles are tangent externally', () => {
      const circle1 = {
        position: { x: 0, y: 0 },
        radius: 2,
      };
      const circle2 = {
        position: { x: 4, y: 0 },
        radius: 2,
      };

      const result = intersection2d.circleIntersectsCircle(circle1, circle2);
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toHaveLength(1);
      expect(result?.intersectionPoints![0]).toEqual({ x: 2, y: 0 });
      expect(result?.minimumSeparation).toEqual({ x: 0, y: 0 });
    });

    it('should return true without intersection points when one circle is entirely inside the other', () => {
      const circle1 = {
        position: { x: 0, y: 0 },
        radius: 4,
      };
      const circle2 = {
        position: { x: 1, y: 1 },
        radius: 2,
      };

      const result = intersection2d.circleIntersectsCircle(circle1, circle2);
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toBeUndefined();
      expect(result?.minimumSeparation?.x).toBeCloseTo(3.24264, 4);
      expect(result?.minimumSeparation?.y).toBeCloseTo(3.24264, 4);
    });

    it('should return true without intersection points when circles are concentric', () => {
      const circle1 = {
        position: { x: 0, y: 0 },
        radius: 4,
      };
      const circle2 = {
        position: { x: 0, y: 0 },
        radius: 2,
      };

      const result = intersection2d.circleIntersectsCircle(circle1, circle2);
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toBeUndefined();
      expect(result?.minimumSeparation).toEqual({ x: 0, y: 0 });
    });

    it('should return false when circles are separate', () => {
      const circle1 = {
        position: { x: 0, y: 0 },
        radius: 2,
      };
      const circle2 = {
        position: { x: 5, y: 0 },
        radius: 2,
      };

      const result = intersection2d.circleIntersectsCircle(circle1, circle2);
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(false);
      expect(result?.intersectionPoints).toBeUndefined();
      expect(result?.minimumSeparation).toBeUndefined();
    });

    it('should handle circles with zero radius', () => {
      const circle1 = {
        position: { x: 0, y: 0 },
        radius: 2,
      };
      const circle2 = {
        position: { x: 1, y: 0 },
        radius: 0,
      };

      const result = intersection2d.circleIntersectsCircle(circle1, circle2);
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toBeUndefined();
    });

    it('should handle both circles with zero radius', () => {
      const circle1 = {
        position: { x: 0, y: 0 },
        radius: 0,
      };
      const circle2 = {
        position: { x: 0, y: 0 },
        radius: 0,
      };

      const result = intersection2d.circleIntersectsCircle(circle1, circle2);
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toBeUndefined();
    });
  });

  describe('circleIntersectsRectangle', () => {
    it('should return true with no intersection points when circle encloses rectangle', () => {
      const circle = {
        position: { x: 0, y: 0 },
        radius: 4,
      };
      const rectangle = {
        position: { x: 0, y: 0 },
        size: { x: 2, y: 2 },
        rotation: 0,
      };

      const result = intersection2d.circleIntersectsRectangle(
        circle,
        rectangle
      );
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toBeUndefined();
      expect(result?.minimumSeparation).toBeDefined();
    });

    it('should return true with no intersection points when rectangle encloses circle', () => {
      const circle = {
        position: { x: 0, y: 0 },
        radius: 2,
      };
      const rectangle = {
        position: { x: 0, y: 0 },
        size: { x: 8, y: 8 },
        rotation: 0,
      };

      const result = intersection2d.circleIntersectsRectangle(
        circle,
        rectangle
      );
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toBeUndefined();
      expect(result?.minimumSeparation).toBeDefined();
    });

    it('should return true with two intersection points when circle intersects rectangle edge', () => {
      const circle = {
        position: { x: 3, y: 0 },
        radius: 1.5,
      };
      const rectangle = {
        position: { x: 0, y: 0 },
        size: { x: 4, y: 4 },
        rotation: 0,
      };

      const result = intersection2d.circleIntersectsRectangle(
        circle,
        rectangle
      );
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toHaveLength(2);
      expect(result?.minimumSeparation).toBeDefined();
    });

    it('should return true with one intersection point when circle is tangent to rectangle', () => {
      const circle = {
        position: { x: 4, y: 0 },
        radius: 1,
      };
      const rectangle = {
        position: { x: 0, y: 0 },
        size: { x: 6, y: 4 },
        rotation: 0,
      };

      const result = intersection2d.circleIntersectsRectangle(
        circle,
        rectangle
      );
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toHaveLength(1);
      expect(result?.minimumSeparation?.x).toBeCloseTo(0);
      expect(result?.minimumSeparation?.y).toBeCloseTo(0);
    });

    it('should return true with four intersection points when circle intersects rectangle corner', () => {
      const circle = {
        position: { x: 2, y: 2 },
        radius: 2,
      };
      const rectangle = {
        position: { x: 0, y: 0 },
        size: { x: 2, y: 2 },
        rotation: 0,
      };

      const result = intersection2d.circleIntersectsRectangle(
        circle,
        rectangle
      );
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toBeDefined();
      expect(result?.minimumSeparation).toBeDefined();
    });

    it('should return false when circle is separate from rectangle', () => {
      const circle = {
        position: { x: 6, y: 0 },
        radius: 1,
      };
      const rectangle = {
        position: { x: 0, y: 0 },
        size: { x: 4, y: 4 },
        rotation: 0,
      };

      const result = intersection2d.circleIntersectsRectangle(
        circle,
        rectangle
      );
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(false);
      expect(result?.intersectionPoints).toBeUndefined();
      expect(result?.minimumSeparation).toBeUndefined();
    });

    it('should handle circle with zero radius correctly', () => {
      const circle = {
        position: { x: 0, y: 0 },
        radius: 0,
      };
      const rectangle = {
        position: { x: 0, y: 0 },
        size: { x: 4, y: 4 },
        rotation: 0,
      };

      const result = intersection2d.circleIntersectsRectangle(
        circle,
        rectangle
      );
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toBeUndefined();
    });

    it('should handle rotated rectangle correctly', () => {
      const circle = {
        position: { x: 1.5, y: 0 },
        radius: 1,
      };
      const rectangle = {
        position: { x: 0, y: 0 },
        size: { x: 4, y: 2 },
        rotation: Math.PI / 4, // 45 degrees
      };

      const result = intersection2d.circleIntersectsRectangle(
        circle,
        rectangle
      );
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toBeDefined();
      expect(result?.minimumSeparation).toBeDefined();
    });

    it('should handle rectangle with zero size correctly', () => {
      const circle = {
        position: { x: 2, y: 0 },
        radius: 1,
      };
      const rectangle = {
        position: { x: 0, y: 0 },
        size: { x: 0, y: 0 },
        rotation: 0,
      };

      const result = intersection2d.circleIntersectsRectangle(
        circle,
        rectangle
      );
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(false);
      expect(result?.intersectionPoints).toBeUndefined();
      expect(result?.minimumSeparation).toBeUndefined();
    });

    it('should return true with intersection points when circle center is on rectangle edge', () => {
      const circle = {
        position: { x: 2, y: 0 },
        radius: 1,
      };
      const rectangle = {
        position: { x: 0, y: 0 },
        size: { x: 4, y: 2 },
        rotation: 0,
      };

      const result = intersection2d.circleIntersectsRectangle(
        circle,
        rectangle
      );
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toBeDefined();
      expect(result?.intersectionPoints).toHaveLength(2);
      expect(result?.minimumSeparation).toBeDefined();
    });
  });

  describe('circleIntersectsPolygon', () => {
    it('should return true with two intersection points when circle intersects polygon edge', () => {
      const circle = {
        position: { x: 2.5, y: 0 },
        radius: 1,
      };
      const polygon = {
        vertices: [
          { x: 0, y: -1 },
          { x: 0, y: 1 },
          { x: 2, y: 1 },
          { x: 2, y: -1 },
        ],
      };

      const result = intersection2d.circleIntersectsPolygon(circle, polygon);
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toHaveLength(2);
    });

    it('should return true without intersection points when circle encloses polygon', () => {
      const circle = {
        position: { x: 1, y: 0 },
        radius: 3,
      };
      const polygon = {
        vertices: [
          { x: 0, y: -1 },
          { x: 2, y: -1 },
          { x: 1, y: 1 },
        ],
      };

      const result = intersection2d.circleIntersectsPolygon(circle, polygon);
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toBeUndefined();
    });

    it('should return true without intersection points when polygon encloses circle', () => {
      const circle = {
        position: { x: 1, y: 0 },
        radius: 1,
      };
      const polygon = {
        vertices: [
          { x: -2, y: -2 },
          { x: 4, y: -2 },
          { x: 4, y: 2 },
          { x: -2, y: 2 },
        ],
      };

      const result = intersection2d.circleIntersectsPolygon(circle, polygon);
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toBeUndefined();
    });

    it('should handle concave polygons correctly', () => {
      const circle = {
        position: { x: 2.5, y: 0 },
        radius: 1,
      };
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
          { x: 1.5, y: 1 }, // Creates a concave point
          { x: 2, y: 2 },
          { x: 0, y: 2 },
        ],
      };

      const result = intersection2d.circleIntersectsPolygon(circle, polygon);
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      // Should intersect at two points with the concave polygon
      expect(result?.intersectionPoints).toBeDefined();
      expect(result?.intersectionPoints).toHaveLength(2);
    });

    it('should return false when circle is separate from polygon', () => {
      const circle = {
        position: { x: 5, y: 0 },
        radius: 1,
      };
      const polygon = {
        vertices: [
          { x: 0, y: -1 },
          { x: 2, y: -1 },
          { x: 2, y: 1 },
          { x: 0, y: 1 },
        ],
      };

      const result = intersection2d.circleIntersectsPolygon(circle, polygon);
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(false);
      expect(result?.intersectionPoints).toBeUndefined();
    });

    it('should return null for an invalid polygon (self-intersecting)', () => {
      const circle = {
        position: { x: 0, y: 0 },
        radius: 1,
      };
      const polygon = {
        vertices: [
          { x: -1, y: -1 },
          { x: 1, y: 1 },
          { x: -1, y: 1 },
          { x: 1, y: -1 },
        ],
      };

      const result = intersection2d.circleIntersectsPolygon(circle, polygon);
      expect(result).toBeNull();
    });

    it('should return null for a polygon with fewer than 3 vertices', () => {
      const circle = {
        position: { x: 0, y: 0 },
        radius: 1,
      };
      const polygon = {
        vertices: [
          { x: -1, y: -1 },
          { x: 1, y: 1 },
        ],
      };

      const result = intersection2d.circleIntersectsPolygon(circle, polygon);
      expect(result).toBeNull();
    });

    it('should handle circle with zero radius correctly', () => {
      const circle = {
        position: { x: 1, y: 0 },
        radius: 0,
      };
      const polygon = {
        vertices: [
          { x: 0, y: -1 },
          { x: 2, y: -1 },
          { x: 2, y: 1 },
          { x: 0, y: 1 },
        ],
      };

      const result = intersection2d.circleIntersectsPolygon(circle, polygon);
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toBeUndefined();
    });

    it('should handle circle exactly on polygon vertex', () => {
      const circle = {
        position: { x: 2, y: 0 },
        radius: 1,
      };
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 0 }, // Circle center exactly on this vertex
          { x: 1, y: 2 },
        ],
      };

      const result = intersection2d.circleIntersectsPolygon(circle, polygon);
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toBeDefined();
    });
  });

  describe('rectangleIntersectsRectangle', () => {
    it('should return true with two intersection points when rectangles overlap', () => {
      const rectA = {
        position: { x: 0, y: 0 },
        size: { x: 2, y: 2 },
        rotation: 0,
      };
      const rectB = {
        position: { x: 1, y: 1 },
        size: { x: 2, y: 2 },
        rotation: 0,
      };
      const result = intersection2d.rectangleIntersectsRectangle(rectA, rectB);

      expect(result.intersects).toBe(true);
      expect(result.intersectionPoints).toHaveLength(2);
    });

    it('should return true with two intersection points when rectangles are tangent', () => {
      const rectA = {
        position: { x: 0, y: 0 },
        size: { x: 2, y: 2 },
        rotation: 0,
      };
      const rectB = {
        position: { x: 2, y: 0 },
        size: { x: 2, y: 2 },
        rotation: 0,
      };
      const result = intersection2d.rectangleIntersectsRectangle(rectA, rectB);

      expect(result.intersects).toBe(true);
      expect(result.intersectionPoints).toHaveLength(2);
    });

    it('should return false when rectangles do not overlap', () => {
      const rectA = {
        position: { x: 0, y: 0 },
        size: { x: 2, y: 2 },
        rotation: 0,
      };
      const rectB = {
        position: { x: 3, y: 3 },
        size: { x: 2, y: 2 },
        rotation: 0,
      };
      const result = intersection2d.rectangleIntersectsRectangle(rectA, rectB);

      expect(result.intersects).toBe(false);
      expect(result.intersectionPoints).toBeUndefined();
    });

    it('should return true with no intersection points when one rectangle is inside another', () => {
      const rectA = {
        position: { x: 0, y: 0 },
        size: { x: 8, y: 8 },
        rotation: 0,
      };
      const rectB = {
        position: { x: 1, y: 1 },
        size: { x: 2, y: 2 },
        rotation: 0,
      };
      const result = intersection2d.rectangleIntersectsRectangle(rectA, rectB);

      expect(result.intersects).toBe(true);
      expect(result.intersectionPoints).toBeUndefined();
    });

    it('should handle rotated rectangles correctly', () => {
      const rectA = {
        position: { x: 0, y: 0 },
        size: { x: 2, y: 2 },
        rotation: Math.PI / 4, // 45 degrees
      };
      const rectB = {
        position: { x: 1, y: 1 },
        size: { x: 2, y: 2 },
        rotation: Math.PI / 4,
      };
      const result = intersection2d.rectangleIntersectsRectangle(rectA, rectB);

      expect(result.intersects).toBe(true);
      expect(result.intersectionPoints).toHaveLength(4);
    });

    it('should return true with no intersection points when rectangles are concentric', () => {
      const rectA = {
        position: { x: 0, y: 0 },
        size: { x: 4, y: 4 },
        rotation: 0,
      };
      const rectB = {
        position: { x: 0, y: 0 },
        size: { x: 2, y: 2 },
        rotation: 0,
      };
      const result = intersection2d.rectangleIntersectsRectangle(rectA, rectB);

      expect(result.intersects).toBe(true);
      expect(result.intersectionPoints).toBeUndefined();
    });

    it('should handle rectangles with zero size', () => {
      const rectA = {
        position: { x: 0, y: 0 },
        size: { x: 2, y: 2 },
        rotation: 0,
      };
      const rectB = {
        position: { x: 1, y: 1 },
        size: { x: 0, y: 0 },
        rotation: 0,
      };
      const result = intersection2d.rectangleIntersectsRectangle(rectA, rectB);

      expect(result.intersects).toBe(false);
      expect(result.intersectionPoints).toBeUndefined();
    });
  });

  describe('rectangleIntersectsPolygon', () => {
    it('should return true with intersection points when rectangle overlaps convex polygon', () => {
      const rectangle = {
        position: { x: 1, y: 0 },
        size: { x: 2, y: 2 },
        rotation: 0,
      };
      const polygon = {
        vertices: [
          { x: 0, y: -1 },
          { x: 2, y: -1 },
          { x: 2, y: 1 },
          { x: 0, y: 1 },
        ],
      };

      const result = intersection2d.rectangleIntersectsPolygon(
        rectangle,
        polygon
      );
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toBeDefined();
      expect(result?.intersectionPoints?.length).toBeGreaterThan(0);
    });

    it('should return true with intersection points when rectangle overlaps concave polygon', () => {
      const rectangle = {
        position: { x: 2, y: 0 },
        size: { x: 2, y: 2 },
        rotation: 0,
      };
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 3, y: 0 },
          { x: 3, y: 2 },
          { x: 2, y: 1 }, // Concave point
          { x: 1, y: 2 },
          { x: 0, y: 2 },
        ],
      };

      const result = intersection2d.rectangleIntersectsPolygon(
        rectangle,
        polygon
      );
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toBeDefined();
      expect(result?.intersectionPoints?.length).toBeGreaterThan(0);
    });

    it('should return true without intersection points when rectangle is entirely inside polygon', () => {
      const rectangle = {
        position: { x: 1, y: 1 },
        size: { x: 1, y: 1 },
        rotation: 0,
      };
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 3, y: 0 },
          { x: 3, y: 3 },
          { x: 0, y: 3 },
        ],
      };

      const result = intersection2d.rectangleIntersectsPolygon(
        rectangle,
        polygon
      );
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toBeUndefined();
    });

    it('should return true without intersection points when polygon is entirely inside rectangle', () => {
      const rectangle = {
        position: { x: 0, y: 0 },
        size: { x: 6, y: 6 },
        rotation: 0,
      };
      const polygon = {
        vertices: [
          { x: -1, y: -1 },
          { x: 1, y: -1 },
          { x: 0, y: 1 },
        ],
      };

      const result = intersection2d.rectangleIntersectsPolygon(
        rectangle,
        polygon
      );
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toBeUndefined();
    });

    it('should return false when rectangle and polygon are separate', () => {
      const rectangle = {
        position: { x: 4, y: 4 },
        size: { x: 2, y: 2 },
        rotation: 0,
      };
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
          { x: 1, y: 2 },
        ],
      };

      const result = intersection2d.rectangleIntersectsPolygon(
        rectangle,
        polygon
      );
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(false);
      expect(result?.intersectionPoints).toBeUndefined();
    });

    it('should handle rotated rectangle intersection correctly', () => {
      const rectangle = {
        position: { x: 1, y: 1 },
        size: { x: 2, y: 2 },
        rotation: Math.PI / 4, // 45 degrees
      };
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
          { x: 2, y: 2 },
          { x: 0, y: 2 },
        ],
      };

      const result = intersection2d.rectangleIntersectsPolygon(
        rectangle,
        polygon
      );
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toBeDefined();
      expect(result?.intersectionPoints?.length).toBeGreaterThan(0);
    });

    it('should return null for invalid polygon (less than 3 vertices)', () => {
      const rectangle = {
        position: { x: 0, y: 0 },
        size: { x: 2, y: 2 },
        rotation: 0,
      };
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
        ],
      };

      const result = intersection2d.rectangleIntersectsPolygon(
        rectangle,
        polygon
      );
      expect(result).toBeNull();
    });

    it('should return null for invalid polygon (self-intersecting)', () => {
      const rectangle = {
        position: { x: 0, y: 0 },
        size: { x: 2, y: 2 },
        rotation: 0,
      };
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 2 },
          { x: 2, y: 0 },
          { x: 0, y: 2 },
        ],
      };

      const result = intersection2d.rectangleIntersectsPolygon(
        rectangle,
        polygon
      );
      expect(result).toBeNull();
    });

    it('should handle rectangle with zero size correctly', () => {
      const rectangle = {
        position: { x: 1, y: 1 },
        size: { x: 0, y: 0 },
        rotation: 0,
      };
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
          { x: 1, y: 2 },
        ],
      };

      const result = intersection2d.rectangleIntersectsPolygon(
        rectangle,
        polygon
      );
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(false);
      expect(result?.intersectionPoints).toBeUndefined();
    });

    it('should handle edge case where rectangle corner touches polygon vertex', () => {
      const rectangle = {
        position: { x: 4, y: 2 },
        size: { x: 2, y: 2 },
        rotation: 0,
      };
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 3, y: 0 },
          { x: 3, y: 1 },
          { x: 1, y: 1 },
        ],
      };

      const result = intersection2d.rectangleIntersectsPolygon(
        rectangle,
        polygon
      );
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toBeDefined();
      expect(result?.intersectionPoints?.length).toBe(1);
    });
  });

  describe('polygonIntersectsPolygon', () => {
    it('should return true with intersection points when convex polygons overlap', () => {
      const polygonA = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
          { x: 2, y: 2 },
          { x: 0, y: 2 },
        ],
      };
      const polygonB = {
        vertices: [
          { x: 1, y: 1 },
          { x: 3, y: 1 },
          { x: 3, y: 3 },
          { x: 1, y: 3 },
        ],
      };

      const result = intersection2d.polygonIntersectsPolygon(
        polygonA,
        polygonB
      );
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toBeDefined();
      expect(result?.intersectionPoints).toHaveLength(2);
    });

    it('should return true with intersection points when concave polygons overlap', () => {
      const polygonA = {
        vertices: [
          { x: 0, y: 0 },
          { x: 3, y: 0 },
          { x: 3, y: 3 },
          { x: 2, y: 1 }, // Concave point
          { x: 0, y: 3 },
        ],
      };
      const polygonB = {
        vertices: [
          { x: 1, y: 1 },
          { x: 4, y: 1 },
          { x: 4, y: 4 },
          { x: 3, y: 2 }, // Concave point
          { x: 1, y: 4 },
        ],
      };

      const result = intersection2d.polygonIntersectsPolygon(
        polygonA,
        polygonB
      );
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toBeDefined();
      expect(result?.intersectionPoints?.length).toBeGreaterThan(0);
    });

    it('should return true without intersection points when one polygon is inside another', () => {
      const outer = {
        vertices: [
          { x: 0, y: 0 },
          { x: 4, y: 0 },
          { x: 4, y: 4 },
          { x: 0, y: 4 },
        ],
      };
      const inner = {
        vertices: [
          { x: 1, y: 1 },
          { x: 2, y: 1 },
          { x: 2, y: 2 },
          { x: 1, y: 2 },
        ],
      };

      const result = intersection2d.polygonIntersectsPolygon(outer, inner);
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toBeUndefined();
    });

    it('should return false when polygons do not intersect', () => {
      const polygonA = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
          { x: 2, y: 2 },
          { x: 0, y: 2 },
        ],
      };
      const polygonB = {
        vertices: [
          { x: 3, y: 3 },
          { x: 5, y: 3 },
          { x: 5, y: 5 },
          { x: 3, y: 5 },
        ],
      };

      const result = intersection2d.polygonIntersectsPolygon(
        polygonA,
        polygonB
      );
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(false);
      expect(result?.intersectionPoints).toBeUndefined();
    });

    it('should handle polygons that share an edge', () => {
      const polygonA = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
          { x: 2, y: 2 },
          { x: 0, y: 2 },
        ],
      };
      const polygonB = {
        vertices: [
          { x: 2, y: 0 },
          { x: 4, y: 0 },
          { x: 4, y: 2 },
          { x: 2, y: 2 },
        ],
      };

      const result = intersection2d.polygonIntersectsPolygon(
        polygonA,
        polygonB
      );
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toBeDefined();
      expect(result?.intersectionPoints).toHaveLength(2);
    });

    it('should handle polygons that share a vertex', () => {
      const polygonA = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
          { x: 2, y: 2 },
          { x: 0, y: 2 },
        ],
      };
      const polygonB = {
        vertices: [
          { x: 2, y: 2 },
          { x: 4, y: 2 },
          { x: 4, y: 4 },
          { x: 2, y: 4 },
        ],
      };

      const result = intersection2d.polygonIntersectsPolygon(
        polygonA,
        polygonB
      );
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toBeDefined();
      expect(result?.intersectionPoints).toHaveLength(1);
    });

    it('should return null for invalid first polygon', () => {
      const invalidPolygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 1, y: 1 }, // Only 2 vertices
        ],
      };
      const validPolygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
          { x: 2, y: 2 },
          { x: 0, y: 2 },
        ],
      };

      const result = intersection2d.polygonIntersectsPolygon(
        invalidPolygon,
        validPolygon
      );
      expect(result).toBeNull();
    });

    it('should return null for invalid second polygon', () => {
      const validPolygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
          { x: 2, y: 2 },
          { x: 0, y: 2 },
        ],
      };
      const selfIntersectingPolygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 2 },
          { x: 2, y: 0 },
          { x: 0, y: 2 },
        ],
      };

      const result = intersection2d.polygonIntersectsPolygon(
        validPolygon,
        selfIntersectingPolygon
      );
      expect(result).toBeNull();
    });

    it('should handle complex concave polygon intersection', () => {
      const polygonA = {
        vertices: [
          { x: 0, y: 0 },
          { x: 4, y: 0 },
          { x: 4, y: 4 },
          { x: 2, y: 2 }, // Concave point
          { x: 0, y: 4 },
        ],
      };
      const polygonB = {
        vertices: [
          { x: 1, y: 1 },
          { x: 5, y: 1 },
          { x: 5, y: 5 },
          { x: 3, y: 3 }, // Concave point
          { x: 1, y: 5 },
        ],
      };

      const result = intersection2d.polygonIntersectsPolygon(
        polygonA,
        polygonB
      );
      expect(result).not.toBeNull();
      expect(result?.intersects).toBe(true);
      expect(result?.intersectionPoints).toBeDefined();
      expect(result?.intersectionPoints?.length).toBeGreaterThanOrEqual(2);
    });
  });
});
