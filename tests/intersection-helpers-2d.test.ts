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

  describe('angleBetween', () => {
    it('should return the angle between two vectors in radians', () => {
      const vecA = { x: 1, y: 0 };
      const vecB = { x: 0, y: 1 };
      const result = intersection2d.angleBetween(vecA, vecB);
      expect(result).toBeCloseTo(Math.PI / 2); // 90 degrees in radians
    });

    it('should return 0 for the same vector', () => {
      const vecA = { x: 1, y: 1 };
      const result = intersection2d.angleBetween(vecA, vecA);
      expect(result).toBe(0);
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
    it('should return "clockwise" for a clockwise polygon', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 2, y: 0 },
          { x: 2, y: 2 },
          { x: 0, y: 2 },
        ],
      };
      const result = intersection2d.polygonWindingOrder(polygon);
      expect(result).toBe('clockwise');
    });

    it('should return "counter-clockwise" for a counterclockwise polygon', () => {
      const polygon = {
        vertices: [
          { x: 0, y: 0 },
          { x: 0, y: 2 },
          { x: 2, y: 2 },
          { x: 2, y: 0 },
        ],
      };
      const result = intersection2d.polygonWindingOrder(polygon);
      expect(result).toBe('counter-clockwise');
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

  // describe('decomposePolygon', () => {
  //   // TODO function not implemented yet
  //   it('temp', () => {
  //     expect(1 + 1).toBe(2);
  //   });
  // });

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
});
