import { vec2, vec3 } from '@basementuniverse/vec';

const EPSILON = 1e-6;

/**
 * General-purpose utility functions
 */
export namespace IntersectionUtilities {
  /**
   * Check if a value is within a specified interval
   *
   * @param value The value to check
   * @param min Minimum value of the interval
   * @param max Maximum value of the interval
   * @returns True if the value is within the interval, false otherwise
   */
  export function valueInInterval(
    value: number,
    min: number,
    max: number
  ): boolean {
    return value >= min && value <= max;
  }

  /**
   * Check if two intervals overlap
   *
   * @param a1 Start of the first interval
   * @param a2 End of the first interval
   * @param b1 Start of the second interval
   * @param b2 End of the second interval
   * @returns True if the intervals overlap, false otherwise
   */
  export function intervalsOverlap(
    a1: number,
    a2: number,
    b1: number,
    b2: number
  ): boolean {
    return Math.max(a1, b1) <= Math.min(a2, b2);
  }
}

/**
 * Intersection helpers for 2D space
 */
export namespace IntersectionHelpers2D {
  // ---------------------------------------------------------------------------
  // TYPES
  // ---------------------------------------------------------------------------

  /**
   * A point in 2D space
   */
  export type Point = vec2;

  /**
   * A ray that extends infinitely in one direction in 2D space
   */
  export type Ray = {
    origin: Point;
    direction: vec2;
  };

  /**
   * A line segment defined by two endpoints in 2D space
   */
  export type Line = {
    start: Point;
    end: Point;
  };

  /**
   * A circle defined by its center and radius in 2D space
   */
  export type Circle = {
    center: Point;
    radius: number;
  };

  /**
   * A rectangle defined by the position of its top-left corner, side lengths,
   * and optional rotation in 2D space
   *
   * Rotation is in radians and is applied around the center of the rectangle
   */
  export type Rectangle = {
    position: Point;
    size: vec2;
    rotation?: number;
  };

  /**
   * A polygon defined by its vertices in 2D space
   *
   * Vertices should be ordered either clockwise or counter-clockwise
   */
  export type Polygon = {
    vertices: Point[];
  };

  // ---------------------------------------------------------------------------
  // FUNCTIONS
  // ---------------------------------------------------------------------------

  /**
   * Calculate the distance between two points in 2D space
   *
   * @param a First point
   * @param b Second point
   * @returns Distance between the two points
   */
  export function distance(a: Point, b: Point): number {
    return vec2.len(vec2.sub(a, b));
  }

  /**
   * Calculate the angle between two vectors in 2D space
   *
   * @param a First vector
   * @param b Second vector
   * @returns Angle in radians
   */
  export function angleBetween(a: Point, b: Point): number {
    return vec2.rad(vec2.sub(b, a));
  }

  /**
   * Check if points are collinear in 2D space
   *
   * @param a First point
   * @param b Second point
   * @param c Third point
   * @returns True if the points are collinear, false otherwise
   */
  export function pointsAreCollinear(a: Point, b: Point, c: Point): boolean {
    // Check if the area of the triangle formed by the points is zero
    const area =
      0.5 * Math.abs(a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y));
    return Math.abs(area) < EPSILON; // Account for floating-point precision
  }

  /**
   * Get the vertices of a rectangle in 2D space
   *
   * @param rectangle The rectangle to get the vertices of
   * @returns An array of points representing the vertices of the rectangle
   */
  export function rectangleVertices(rectangle: Rectangle): Point[] {
    const { position, size, rotation = 0 } = rectangle;
    const halfSize = vec2.div(size, 2);
    const center = vec2.add(position, halfSize);
    let topLeft = vec2.fromComponents(vec2.swiz(halfSize, 'XY'));
    let topRight = vec2.fromComponents(vec2.swiz(halfSize, 'xY'));
    let bottomLeft = vec2.fromComponents(vec2.swiz(halfSize, 'Xy'));
    let bottomRight = vec2.fromComponents(vec2.swiz(halfSize, 'xy'));
    if (rotation !== 0) {
      topLeft = vec2.rot(topLeft, rotation);
      topRight = vec2.rot(topRight, rotation);
      bottomLeft = vec2.rot(bottomLeft, rotation);
      bottomRight = vec2.rot(bottomRight, rotation);
    }
    return [
      vec2.add(center, topLeft),
      vec2.add(center, topRight),
      vec2.add(center, bottomRight),
      vec2.add(center, bottomLeft),
    ];
  }

  /**
   * Check if a polygon is convex
   *
   * @param polygon The polygon to check
   * @returns True if the polygon is convex, false if it's concave, or null if
   * the polygon is invalid
   */
  export function polygonIsConvex(polygon: Polygon): boolean | null {
    if (polygon.vertices.length < 3) {
      return null; // A polygon must have at least 3 vertices
    }
    let sign = 0;
    const n = polygon.vertices.length;
    for (let i = 0; i < n; i++) {
      const a = polygon.vertices[i];
      const b = polygon.vertices[(i + 1) % n];
      const c = polygon.vertices[(i + 2) % n];
      const crossProduct =
        (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
      if (crossProduct !== 0) {
        if (sign === 0) {
          sign = Math.sign(crossProduct);
        } else if (Math.sign(crossProduct) !== sign) {
          return false; // Found a change in sign, polygon is not convex
        }
      }
    }
    return true; // All cross products have the same sign, polygon is convex
  }

  /**
   * Determine the winding order of a polygon's vertices
   *
   * @param polygon The polygon to check
   * @returns The winding order of the polygon, or null if the polygon is
   * invalid
   */
  export function polygonWindingOrder(
    polygon: Polygon
  ): 'clockwise' | 'counter-clockwise' | null {
    if (polygon.vertices.length < 3) {
      return null; // A polygon must have at least 3 vertices
    }
    let sum = 0;
    const n = polygon.vertices.length;
    for (let i = 0; i < n; i++) {
      const a = polygon.vertices[i];
      const b = polygon.vertices[(i + 1) % n];
      sum += (b.x - a.x) * (b.y + a.y);
    }
    return sum > 0 ? 'counter-clockwise' : 'clockwise';
  }

  /**
   * Calculate the area of a polygon in 2D space
   *
   * @param polygon The polygon to calculate the area of
   * @returns The area of the polygon
   */
  export function polygonArea(polygon: Polygon): number {
    if (polygon.vertices.length < 3) {
      return 0; // A polygon must have at least 3 vertices
    }
    let area = 0;
    const n = polygon.vertices.length;
    for (let i = 0; i < n; i++) {
      const a = polygon.vertices[i];
      const b = polygon.vertices[(i + 1) % n];
      area += vec2.cross(a, b);
    }
    return Math.abs(area) / 2;
  }

  /**
   * Decompose a polygon into a set of convex polygons using the Bayazit
   * algorithm
   *
   * @param polygon The polygon to decompose into convex polygons
   * @returns An array of convex polygons, or null if the polygon is invalid
   */
  export function decomposeConcavePolygon(polygon: Polygon): Polygon[] | null {
    if (polygon.vertices.length < 3) {
      return null; // A polygon must have at least 3 vertices
    }
    if (polygonIsConvex(polygon)) {
      return [polygon]; // The polygon is already convex
    }

    // ...
    throw new Error('not implemented yet');
  }

  /**
   * Check if a point intersects a ray in 2D space
   *
   * @param point The point to check
   * @param ray The ray to check against
   * @returns An object containing whether the point intersects the ray, the
   * closest position on the ray to the point, and the distance to that point
   */
  export function pointOnRay(
    point: Point,
    ray: Ray
  ): {
    intersects: boolean;
    closestPoint: Point;
    distance: number;
  } {
    throw new Error('not implemented yet');
  }

  /**
   * Check if a point intersects a line segment in 2D space
   *
   * @param point The point to check
   * @param line The line segment to check against
   * @returns An object containing whether the point intersects the line
   * segment, the closest position on the line segment to the point, and the
   * distance to that point
   */
  export function pointOnLine(
    point: Point,
    line: Line
  ): {
    intersects: boolean;
    intersectionPoint: Point;
    distance: number;
  } {
    throw new Error('not implemented yet');
  }

  /**
   * Check if a point is inside a circle in 2D space
   *
   * @param point The point to check
   * @param circle The circle to check against
   * @returns An object containing whether the point is inside the circle and
   * the shortest distance from the point to the circle's edge
   */
  export function pointInCircle(
    point: Point,
    circle: Circle
  ): {
    intersects: boolean;
    distance: number;
  } {
    throw new Error('not implemented yet');
  }
}

/**
 * Intersection helpers for 3D space
 */
export namespace IntersectionHelpers3D {
  /**
   * Calculate the distance between two points in 3D space
   *
   * @param a First point
   * @param b Second point
   * @returns Distance between the two points
   */
  export function distance(a: vec3, b: vec3): number {
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
}
