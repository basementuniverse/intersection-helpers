import { at } from '@basementuniverse/utils';
import { vec2 } from '@basementuniverse/vec';
import * as decomp from 'poly-decomp';
import * as constants from '../utilities/constants';
import { Circle, Line, Point, Polygon, Ray, Rectangle } from './types';

export * from './types';

/**
 * Calculate the distance between two points in 2D space
 */
export function distance(a: Point, b: Point): number {
  return vec2.len(vec2.sub(a, b));
}

/**
 * Calculate the angle between two vectors in 2D space
 */
export function angleBetween(a: vec2, b: vec2): number {
  if (
    vec2.len(a) < constants.EPSILON ||
    vec2.len(b) < constants.EPSILON ||
    vec2.len(vec2.sub(a, b)) < constants.EPSILON
  ) {
    return 0;
  }
  return Math.acos(vec2.dot(vec2.nor(a), vec2.nor(b)));
}

/**
 * Check if points are collinear in 2D space
 */
export function pointsAreCollinear(a: Point, b: Point, c: Point): boolean {
  // Check if the area of the triangle formed by the points is zero
  const area =
    0.5 * Math.abs(a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y));
  return Math.abs(area) < constants.EPSILON;
}

/**
 * Convert a line segment to a ray in 2D space
 */
export function lineToRay(line: Line): Ray {
  return {
    origin: line.start,
    direction: vec2.nor(vec2.sub(line.end, line.start)),
  };
}

/**
 * Convert a ray to a line segment in 2D space
 */
export function rayToLine(ray: Ray, length: number = 1): Line {
  return {
    start: ray.origin,
    end: vec2.add(ray.origin, vec2.mul(ray.direction, length)),
  };
}

/**
 * Check if a rectangle is rotated in 2D space
 */
export function rectangleIsRotated(rectangle: Rectangle): boolean {
  // A rectangle is considered rotated if its rotation is not zero
  return (
    rectangle.rotation !== undefined &&
    Math.abs(rectangle.rotation) > constants.EPSILON
  );
}

/**
 * Get the vertices of a rectangle in 2D space
 */
export function rectangleVertices(rectangle: Rectangle): Point[] {
  const { position, size, rotation = 0 } = rectangle;
  const halfSize = vec2.div(size, 2);

  // Calculate the four corners of the rectangle
  let topLeftOffset = vec2.fromComponents(vec2.swiz(halfSize, 'XY'));
  let topRightOffset = vec2.fromComponents(vec2.swiz(halfSize, 'xY'));
  let bottomRightOffset = vec2.fromComponents(vec2.swiz(halfSize, 'xy'));
  let bottomLeftOffset = vec2.fromComponents(vec2.swiz(halfSize, 'Xy'));

  // Rotate the offsets if the rectangle is rotated
  if (rectangleIsRotated(rectangle)) {
    topLeftOffset = vec2.rot(topLeftOffset, rotation);
    topRightOffset = vec2.rot(topRightOffset, rotation);
    bottomRightOffset = vec2.rot(bottomRightOffset, rotation);
    bottomLeftOffset = vec2.rot(bottomLeftOffset, rotation);
  }
  return [
    vec2.add(position, topLeftOffset),
    vec2.add(position, topRightOffset),
    vec2.add(position, bottomRightOffset),
    vec2.add(position, bottomLeftOffset),
  ];
}

/**
 * Check if a polygon is convex
 *
 * Returns null if the polygon is invalid (i.e. has less than 3 vertices or
 * self-intersects)
 */
export function polygonIsConvex(polygon: Polygon): boolean | null {
  if (!polygonIsValid(polygon)) {
    return null;
  }
  let sign = 0;
  for (let i = 0; i < polygon.vertices.length; i++) {
    const a = polygon.vertices[i];
    const b = at(polygon.vertices, i + 1);
    const c = at(polygon.vertices, i + 2);
    const crossProduct = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
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
 * Check if a polygon self-intersects
 */
export function polygonSelfIntersects(polygon: Polygon): boolean {
  if (polygon.vertices.length < 3) {
    return false; // A polygon must have at least 3 vertices
  }
  const n = polygon.vertices.length;
  for (let i = 0; i < n; i++) {
    const a = polygon.vertices[i];
    const b = at(polygon.vertices, i + 1);
    for (let j = i + 2; j < n; j++) {
      const c = polygon.vertices[j];
      const d = at(polygon.vertices, j + 1);

      // Skip adjacent edges
      if (i === 0 && j === n - 1) {
        continue;
      }

      // Check if the segments (a, b) and (c, d) intersect
      const { intersects } = lineIntersectsLine(
        { start: a, end: b },
        { start: c, end: d }
      );
      if (intersects) {
        return true; // Found an intersection, polygon self-intersects
      }
    }
  }
  return false; // No intersections found, polygon does not self-intersect
}

/**
 * Check if a polygon is valid
 *
 * A polygon is valid if it has at least 3 vertices and does not
 * self-intersect
 */
export function polygonIsValid(polygon: Polygon): boolean {
  return polygon.vertices.length >= 3 && !polygonSelfIntersects(polygon);
}

/**
 * Determine the winding order of a polygon's vertices
 *
 * Returns null if the polygon is invalid
 */
export function polygonWindingOrder(
  polygon: Polygon
): 'clockwise' | 'counter-clockwise' | null {
  if (!polygonIsValid(polygon)) {
    return null;
  }
  let sum = 0;
  for (let i = 0; i < polygon.vertices.length; i++) {
    const a = polygon.vertices[i];
    const b = at(polygon.vertices, i + 1);
    sum += (b.x - a.x) * (b.y + a.y);
  }
  return sum > 0 ? 'clockwise' : 'counter-clockwise';
}

/**
 * Calculate the area of a polygon in 2D space
 *
 * Returns null if the polygon is invalid
 */
export function polygonArea(polygon: Polygon): number | null {
  if (!polygonIsValid(polygon)) {
    return null;
  }
  let area = 0;
  for (let i = 0; i < polygon.vertices.length; i++) {
    const a = polygon.vertices[i];
    const b = at(polygon.vertices, i + 1);
    area += vec2.cross(a, b);
  }
  return Math.abs(area) / 2;
}

/**
 * Calculate the centroid of a polygon in 2D space
 *
 * Returns null if the polygon is invalid or degenerate (i.e. all vertices are
 * collinear)
 */
export function polygonCentroid(polygon: Polygon): Point | null {
  if (!polygonIsValid(polygon)) {
    return null;
  }
  const n = polygon.vertices.length;
  if (
    polygon.vertices.every((v, i, a) =>
      pointsAreCollinear(v, at(a, i + 1), at(a, i + 2))
    )
  ) {
    return null; // All vertices are collinear
  }
  let c = vec2();
  for (let i = 0; i < n; i++) {
    const a = polygon.vertices[i];
    c = vec2.add(c, a);
  }
  return vec2(c.x / n, c.y / n);
}

/**
 * Remove duplicate adjacent vertices from a list of vertices
 */
function removeDuplicateAdjacentVertices(vertices: Point[]): Point[] {
  const result: Point[] = [];
  const n = vertices.length;
  for (let i = 0; i < n; i++) {
    const current = vertices[i];
    const next = at(vertices, i + 1);
    if (!vec2.eq(current, next)) {
      result.push(current);
    }
  }
  return result;
}

/**
 * Remove collinear vertices from a list of vertices
 */
function removeCollinearVertices(vertices: Point[]): Point[] {
  const result: Point[] = [];
  const n = vertices.length;
  for (let i = 0; i < n; i++) {
    const a = at(vertices, i - 1);
    const b = vertices[i];
    const c = at(vertices, i + 1);

    // Skip collinear points
    if (pointsAreCollinear(a, b, c)) {
      continue;
    }

    result.push(b);
  }
  return result;
}

/**
 * Optimise a polygon by removing collinear vertices and duplicate adjacent
 * vertices
 */
export function optimisePolygon(polygon: Polygon): Polygon | null {
  // Duplicate adjacent vertices will count the polygon as self-intersecting,
  // so skip that check for now and only check the number of vertices
  if (polygon.vertices.length < 3) {
    return null;
  }

  const optimisedVertices = removeCollinearVertices(
    removeDuplicateAdjacentVertices(polygon.vertices)
  );

  // If we have less than 3 vertices after optimisation, return null
  if (optimisedVertices.length < 3) {
    return null;
  }

  return { vertices: optimisedVertices };
}

/**
 * Decompose a polygon into a set of convex polygons using the Bayazit
 * algorithm
 *
 * Returns null if the polygon is invalid or cannot be decomposed
 */
export function decomposePolygon(
  polygon: Polygon,
  options?: {
    mode?: 'fast' | 'optimal';
    keepWindingOrder?: boolean;
  }
): Polygon[] | null {
  if (!polygonIsValid(polygon)) {
    return null;
  }
  if (polygonIsConvex(polygon)) {
    return [polygon]; // The polygon is already convex
  }

  const mode = options?.mode || 'fast';
  const keepWindingOrder = options?.keepWindingOrder ?? true;
  const originalWindingOrder = polygonWindingOrder(polygon);
  const vertices = polygon.vertices.map(v => [v.x, v.y]);
  if (originalWindingOrder !== 'counter-clockwise') {
    vertices.reverse(); // Ensure counter-clockwise winding
  }

  // Decompose the polygon
  let convexPolygons: [number, number][][] = [];
  switch (mode) {
    case 'fast':
      convexPolygons = decomp.quickDecomp(vertices);
      break;
    case 'optimal':
      convexPolygons = decomp.decomp(vertices);
      break;
  }

  // Convert the result into a list of Polygon objects
  const result: Polygon[] = [];
  for (const convex of convexPolygons) {
    result.push({
      vertices: convex.map(v => vec2(v[0], v[1])),
    });
  }

  // Optionally ensure the winding order is preserved
  if (keepWindingOrder) {
    for (const poly of result) {
      if (polygonWindingOrder(poly) !== originalWindingOrder) {
        poly.vertices.reverse();
      }
    }
  }
  return result.length > 0 ? result : null;
}

/**
 * Check if a point intersects a ray in 2D space
 */
export function pointOnRay(
  point: Point,
  ray: Ray
): {
  intersects: boolean;
  closestPoint: Point;
  distance: number;
} {
  // Vector from ray origin to point
  const toPoint = vec2.sub(point, ray.origin);

  // Get normalized ray direction
  const rayDirection = vec2.nor(ray.direction);

  // Project toPoint onto the ray direction
  const projection = vec2.dot(toPoint, rayDirection);

  // Calculate closest point on ray
  const closestPoint = vec2.add(
    ray.origin,
    vec2.mul(rayDirection, Math.max(0, projection))
  );

  // Calculate distance from point to closest point
  const distance = vec2.len(vec2.sub(point, closestPoint));

  return {
    // Point is on ray if distance is zero and projection is non-negative
    intersects: distance < constants.EPSILON && projection >= 0,
    closestPoint,
    distance,
  };
}

/**
 * Check if a point intersects a line segment in 2D space
 */
export function pointOnLine(
  point: Point,
  line: Line
): {
  intersects: boolean;
  closestPoint: Point;
  distance: number;
} {
  // Get vector from line start to end
  const lineVector = vec2.sub(line.end, line.start);

  // Get normalized line direction
  const lineDirection = vec2.nor(lineVector);

  // Get vector from line start to point
  const toPoint = vec2.sub(point, line.start);

  // Project toPoint onto the line direction
  const projection = vec2.dot(toPoint, lineDirection);

  // Get line length
  const lineLength = vec2.len(lineVector);

  // Clamp projection to line segment
  const clampedProjection = Math.max(0, Math.min(lineLength, projection));

  // Calculate closest point on line segment
  const closestPoint = vec2.add(
    line.start,
    vec2.mul(lineDirection, clampedProjection)
  );

  // Calculate distance from point to closest point
  const distance = vec2.len(vec2.sub(point, closestPoint));

  return {
    // Point is on line if distance is effectively zero
    intersects: distance < constants.EPSILON,
    closestPoint,
    distance,
  };
}

/**
 * Check if a point is inside a circle in 2D space
 */
export function pointInCircle(
  point: Point,
  circle: Circle
): {
  intersects: boolean;
  distance: number;
} {
  const toPoint = vec2.sub(point, circle.position);
  const distance = vec2.len(toPoint);

  return {
    intersects: distance <= circle.radius,
    distance: distance - circle.radius, // Distance from point to circle edge
  };
}

/**
 * Check if a point is inside a rectangle in 2D space
 */
export function pointInRectangle(
  point: Point,
  rectangle: Rectangle
): {
  intersects: boolean;
} & (
  | {
      distanceX: number;
      distanceY: number;
    }
  | {
      distance: number;
      direction: vec2;
    }
) {
  throw new Error('not implemented yet'); // TODO
}

/**
 * Check if a point is inside a polygon in 2D space
 *
 * Returns null if the polygon is invalid
 */
export function pointInPolygon(
  point: Point,
  polygon: Polygon
): {
  intersects: boolean;
  distance: number;
  direction: vec2;
} | null {
  throw new Error('not implemented yet'); // TODO
}

/**
 * Check if two rays intersect in 2D space
 */
export function rayIntersectsRay(
  rayA: Ray,
  rayB: Ray
): {
  intersects: boolean;
  intersectionPoint?: Point;
} {
  throw new Error('not implemented yet'); // TODO
}

/**
 * Check if a ray intersects a line segment in 2D space
 */
export function rayIntersectsLine(
  ray: Ray,
  line: Line
): {
  intersects: boolean;
  intersectionPoint?: Point;
} {
  throw new Error('not implemented yet'); // TODO
}

/**
 * Check if a ray intersects a circle in 2D space
 */
export function rayIntersectsCircle(
  ray: Ray,
  circle: Circle
): {
  intersects: boolean;
  intersectionPoints?: Point[];
} {
  throw new Error('not implemented yet'); // TODO
}

/**
 * Check if a ray intersects a rectangle in 2D space
 */
export function rayIntersectsRectangle(
  ray: Ray,
  rectangle: Rectangle
): {
  intersects: boolean;
  intersectionPoints?: Point[];
} {
  throw new Error('not implemented yet'); // TODO
}

/**
 * Check if a ray intersects a polygon in 2D space
 *
 * Returns null if the polygon is invalid
 */
export function rayIntersectsPolygon(
  ray: Ray,
  polygon: Polygon
): {
  intersects: boolean;
  intersectionPoints?: Point[];
} | null {
  throw new Error('not implemented yet'); // TODO
}

/**
 * Check if a line segment intersects a ray in 2D space
 */
export function lineIntersectsRay(
  line: Line,
  ray: Ray
): {
  intersects: boolean;
  intersectionPoint?: Point;
} {
  return rayIntersectsLine(ray, line);
}

/**
 * Check if two line segments intersect in 2D space
 */
export function lineIntersectsLine(
  lineA: Line,
  lineB: Line
): {
  intersects: boolean;
  intersectionPoint?: Point;
} {
  // Get the vectors representing the directions of each line
  const dirA = vec2.sub(lineA.end, lineA.start);
  const dirB = vec2.sub(lineB.end, lineB.start);

  // Calculate the cross product determinant
  const det = vec2.cross(dirA, dirB);

  // Get the vector between starting points
  const startDiff = vec2.sub(lineB.start, lineA.start);

  // If determinant is close to 0, lines are parallel or collinear
  if (Math.abs(det) < constants.EPSILON) {
    // Check if lines are collinear
    if (Math.abs(vec2.cross(startDiff, dirA)) < constants.EPSILON) {
      // Lines are collinear - check if they overlap
      const t0 = vec2.dot(startDiff, dirA) / vec2.dot(dirA, dirA);
      const t1 = t0 + vec2.dot(dirB, dirA) / vec2.dot(dirA, dirA);

      // Check if segments overlap
      const interval0 = Math.min(t0, t1);
      const interval1 = Math.max(t0, t1);

      if (interval0 <= 1 && interval1 >= 0) {
        return {
          intersects: true,
          // No single intersection point for overlapping lines
        };
      }
    }
    return {
      intersects: false,
    };
  }

  // Calculate intersection parameters
  const t = vec2.cross(startDiff, dirB) / det;
  const s = vec2.cross(startDiff, dirA) / det;

  // Check if intersection occurs within both line segments
  if (t >= 0 && t <= 1 && s >= 0 && s <= 1) {
    return {
      intersects: true,
      intersectionPoint: vec2.add(lineA.start, vec2.mul(dirA, t)),
    };
  }

  return {
    intersects: false,
  };
}

/**
 * Check if a line segment intersects a circle in 2D space
 */
export function lineIntersectsCircle(
  line: Line,
  circle: Circle
): {
  intersects: boolean;
  intersectionPoints?: Point[];
} {
  throw new Error('not implemented yet'); // TODO
}

/**
 * Check if a line segment intersects a rectangle in 2D space
 */
export function lineIntersectsRectangle(
  line: Line,
  rectangle: Rectangle
): {
  intersects: boolean;
  intersectionPoints?: Point[];
} {
  throw new Error('not implemented yet'); // TODO
}

/**
 * Check if a line segment intersects a polygon in 2D space
 *
 * Returns null if the polygon is invalid
 */
export function lineIntersectsPolygon(
  line: Line,
  polygon: Polygon
): {
  intersects: boolean;
  intersectionPoints?: Point[];
} | null {
  throw new Error('not implemented yet'); // TODO
}

/**
 * Check if two circles intersect in 2D space
 */
export function circleIntersectsCircle(
  circleA: Circle,
  circleB: Circle
): {
  intersects: boolean;
  intersectionPoints?: Point[];
  intersectionAmount?: number;
} {
  throw new Error('not implemented yet'); // TODO
}

/**
 * Check if a circle intersects a rectangle in 2D space
 */
export function circleIntersectsRectangle(
  circle: Circle,
  rectangle: Rectangle
): {
  intersects: boolean;
  intersectionPoints?: Point[];
  intersectionAmount?: number;
} {
  throw new Error('not implemented yet'); // TODO
}

/**
 * Check if a circle intersects a polygon in 2D space
 *
 * Returns null if the polygon is invalid
 */
export function circleIntersectsPolygon(
  circle: Circle,
  polygon: Polygon
): {
  intersects: boolean;
  intersectionPoints?: Point[];
} | null {
  throw new Error('not implemented yet'); // TODO
}

/**
 * Check if two rectangles intersect in 2D space
 */
export function rectangleIntersectsRectangle(
  rectangleA: Rectangle,
  rectangleB: Rectangle
): {
  intersects: boolean;
  intersectionPoints?: Point[];
} & (
  | {
      intersectionRectangle?: Rectangle;
    }
  | {
      intersectionPolygon?: Polygon;
    }
) {
  throw new Error('not implemented yet'); // TODO
}

/**
 * Check if a rectangle intersects a polygon in 2D space
 *
 * Returns null if the polygon is invalid
 */
export function rectangleIntersectsPolygon(
  rectangle: Rectangle,
  polygon: Polygon
): {
  intersects: boolean;
  intersectionPoints?: Point[];
} | null {
  throw new Error('not implemented yet'); // TODO
}

/**
 * Check if two polygons intersect in 2D space
 *
 * Returns null if either polygon is invalid
 */
export function polygonIntersectsPolygon(
  polygonA: Polygon,
  polygonB: Polygon
): {
  intersects: boolean;
  intersectionPoints?: Point[];
} | null {
  throw new Error('not implemented yet'); // TODO
}
