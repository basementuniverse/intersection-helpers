import { at, clamp } from '@basementuniverse/utils';
import { vec2 } from '@basementuniverse/vec';
import * as decomp from 'poly-decomp';
import * as constants from '../utilities/constants';
import { Circle, Line, Point, Polygon, Ray, Rectangle } from './types';

export * from './types';

/**
 * Calculate the distance between two points
 */
export function distance(a: Point, b: Point): number {
  return vec2.len(vec2.sub(a, b));
}

/**
 * Calculate the clockwise angle from vector a to vector b
 *
 * The result is in radians and ranges from 0 to 2π (360 degrees)
 * A positive angle indicates clockwise rotation from a to b
 *
 * Returns 0 if either vector is zero-length or if they are equal
 */
export function angleBetween(a: vec2, b: vec2): number {
  if (
    vec2.len(a) < constants.EPSILON ||
    vec2.len(b) < constants.EPSILON ||
    vec2.len(vec2.sub(a, b)) < constants.EPSILON
  ) {
    return 0;
  }

  // Normalize vectors
  const normA = vec2.nor(a);
  const normB = vec2.nor(b);

  // Calculate angle using atan2
  let angle = Math.atan2(normB.y, normB.x) - Math.atan2(normA.y, normA.x);

  // Ensure angle is positive (clockwise) and in range [0, 2π]
  if (angle < 0) {
    angle += 2 * Math.PI;
  }

  return angle;
}

/**
 * Check if points are collinear
 */
export function pointsAreCollinear(a: Point, b: Point, c: Point): boolean {
  // Check if the area of the triangle formed by the points is zero
  const area =
    0.5 * Math.abs(a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y));
  return Math.abs(area) < constants.EPSILON;
}

/**
 * Convert a line segment to a ray
 */
export function lineToRay(line: Line): Ray {
  return {
    origin: line.start,
    direction: vec2.nor(vec2.sub(line.end, line.start)),
  };
}

/**
 * Convert a ray to a line segment
 */
export function rayToLine(ray: Ray, length: number = 1): Line {
  return {
    start: ray.origin,
    end: vec2.add(ray.origin, vec2.mul(ray.direction, length)),
  };
}

/**
 * Check if a rectangle is rotated
 */
export function rectangleIsRotated(rectangle: Rectangle): boolean {
  // A rectangle is considered rotated if its rotation is not zero
  return (
    rectangle.rotation !== undefined &&
    Math.abs(rectangle.rotation) > constants.EPSILON
  );
}

/**
 * Get the vertices of a rectangle
 *
 * Vertices will be returned in clockwise order starting at the top-left:
 * top-left, top-right, bottom-right, bottom-left
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
 * Returns null if the polygon is invalid
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
 * Returns 'clockwise' or 'counter-clockwise'
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
  return sum > 0 ? 'counter-clockwise' : 'clockwise';
}

/**
 * Calculate the area of a polygon
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
 * Calculate the centroid of a polygon
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
 * Remove duplicate vertices from a list of vertices
 */
function removeDuplicateVertices(vertices: Point[]): Point[] {
  const result: Point[] = [];
  const n = vertices.length;
  for (let i = 0; i < n; i++) {
    const current = vertices[i];
    if (!result.some(v => vec2.len(vec2.sub(current, v)) < constants.EPSILON)) {
      result.push(current);
    }
  }
  return result;
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
    if (vec2.len(vec2.sub(current, next)) >= constants.EPSILON) {
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
  if (originalWindingOrder === 'counter-clockwise') {
    vertices.reverse(); // Ensure clockwise winding
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
 * Check if a point is on a ray
 *
 * Also returns the closest point on the ray and the distance to it
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
 * Check if a point intersects a line segment
 *
 * Also returns the closest point on the line segment and the distance to it
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
 * Check if a point is inside a circle
 *
 * Also returns the closest point on the circle edge and the distance to it
 *
 * If the point is inside the circle, the distance will be negative
 */
export function pointInCircle(
  point: Point,
  circle: Circle
): {
  intersects: boolean;
  closestPoint?: Point;
  distance: number;
} {
  // Calculate vector from circle center to point
  const toPoint = vec2.sub(point, circle.position);

  // Calculate distance from point to circle center
  const distanceToCenter = vec2.len(toPoint);

  // Check if point is inside the circle
  const intersects = distanceToCenter <= circle.radius;

  // Calculate distance to circle edge
  const distance = intersects
    ? -(circle.radius - distanceToCenter) // Negative if inside
    : distanceToCenter - circle.radius; // Positive if outside

  // Calculate closest point on circle edge
  const closestPoint = vec2.add(
    circle.position,
    vec2.mul(vec2.nor(toPoint), circle.radius)
  );

  return {
    intersects,
    closestPoint,
    distance,
  };
}

/**
 * Check if a point is inside a rectangle
 *
 * Also returns the closest point on the rectangle edge and the distance to it
 *
 * If the point is inside the rectangle, the distance will be negative
 *
 * In cases where the closest point is ambiguous (e.g. corners), the first edge
 * encountered with a closest point will be returned after evaluating edges in
 * this order:
 * top, right, bottom, left (before applying the rectangle's rotation)
 */
export function pointInRectangle(
  point: Point,
  rectangle: Rectangle
): {
  intersects: boolean;
  closestPoint: Point;
  distance: number;
} {
  // Edge case: zero-size rectangle
  if (
    rectangle.size.x < constants.EPSILON ||
    rectangle.size.y < constants.EPSILON
  ) {
    // If the rectangle has no size, check if the point is at the rectangle's
    // position
    const isAtPosition = vec2.eq(point, rectangle.position);
    return {
      intersects: isAtPosition,
      closestPoint: rectangle.position,
      distance: isAtPosition
        ? 0
        : vec2.len(vec2.sub(point, rectangle.position)),
    };
  }

  // Convert rectangle to polygon
  const vertices = rectangleVertices(rectangle);
  const polygonResult = pointInPolygon(point, { vertices });

  // We should always have a polygonResult, but just in case...
  if (!polygonResult) {
    throw new Error('Invalid rectangle vertices');
  }

  return polygonResult;
}

/**
 * Check if a point is inside a polygon
 *
 * Returns null if the polygon is invalid
 *
 * Also returns the closest point on the polygon edge and the distance to it
 *
 * If the point is inside the polygon, the distance will be negative
 */
export function pointInPolygon(
  point: Point,
  polygon: Polygon
): {
  intersects: boolean;
  closestPoint: Point;
  distance: number;
} | null {
  // First check if the polygon is valid
  if (!polygonIsValid(polygon)) {
    return null;
  }

  // Find if point is inside polygon using ray casting algorithm
  let inside = false;
  const vertices = polygon.vertices;

  // We'll also keep track of the closest edge while we iterate
  let minDistanceSquared = Infinity;
  let closestPoint: Point = point;

  for (let i = 0; i < vertices.length; i++) {
    const j = (i + 1) % vertices.length;
    const vi = vertices[i];
    const vj = vertices[j];

    // Ray casting algorithm
    if (
      vi.y > point.y !== vj.y > point.y &&
      point.x < ((vj.x - vi.x) * (point.y - vi.y)) / (vj.y - vi.y) + vi.x
    ) {
      inside = !inside;
    }

    // Find closest point on this edge
    const edge = { start: vi, end: vj };
    const { closestPoint: edgeClosest, distance: edgeDistance } = pointOnLine(
      point,
      edge
    );
    const distanceSquared = edgeDistance * edgeDistance;

    if (distanceSquared < minDistanceSquared) {
      minDistanceSquared = distanceSquared;
      closestPoint = edgeClosest;
    }
  }

  const distance = Math.sqrt(minDistanceSquared);
  return {
    intersects: inside,
    closestPoint,
    distance: inside ? -distance : distance,
  };
}

/**
 * Check which grid cells a ray traverses
 *
 * Based on "A Fast Voxel Traversal Algorithm for Ray Tracing" by Amanatides
 * and Woo
 *
 * We can optionally limit the number of cells traversed by the ray, or set
 * maxCells to -1 to continue traversing until the ray exits the grid (or until
 * we hit the hard limit of 10000 cells).
 */
export function rayTraverseGrid(
  ray: Ray,
  cellSize: number,
  gridTopLeft: vec2,
  gridBottomRight: vec2,
  maxCells: number = -1
): {
  cells: Point[];
} {
  if (cellSize <= 0) {
    return { cells: [] }; // Invalid cell size, return empty cells array
  }

  // Set a limit on the number of cells traversed
  const HARD_LIMIT = 10000;
  maxCells = clamp(maxCells === -1 ? HARD_LIMIT : maxCells, 0, HARD_LIMIT);
  if (maxCells <= 0) {
    return { cells: [] }; // No cells to traverse
  }

  // Make sure the grid top-left and bottom-right boundaries are integers
  gridTopLeft = vec2.map(gridTopLeft, Math.floor);
  gridBottomRight = vec2.map(gridBottomRight, Math.ceil);

  const cells: Point[] = [];

  // Normalize ray direction and handle zero components
  const rayDir = vec2.nor(ray.direction);
  if (
    Math.abs(rayDir.x) < constants.EPSILON &&
    Math.abs(rayDir.y) < constants.EPSILON
  ) {
    return { cells };
  }

  // Calculate initial cell coordinates
  let currentCell = vec2.map(
    vec2.div(vec2.sub(ray.origin, gridTopLeft), cellSize),
    Math.floor
  );

  // Calculate grid size in cells
  const gridSize = vec2.sub(gridBottomRight, gridTopLeft);

  // If starting point is outside grid bounds, find entry point
  if (
    currentCell.x < 0 ||
    currentCell.x >= gridSize.x ||
    currentCell.y < 0 ||
    currentCell.y >= gridSize.y
  ) {
    // Use rayIntersectsRectangle to find grid entry point
    const gridRect = {
      position: vec2.add(
        gridTopLeft,
        vec2.div(vec2.sub(gridBottomRight, gridTopLeft), 2)
      ),
      size: vec2.sub(gridBottomRight, gridTopLeft),
    };

    const intersection = rayIntersectsRectangle(ray, gridRect);
    if (!intersection.intersects || !intersection.intersectionPoints) {
      return { cells }; // Ray misses grid entirely
    }

    // Get the first intersection point (closest to ray origin)
    const entryPoint = intersection.intersectionPoints[0];
    currentCell = vec2.map(
      vec2.div(vec2.sub(entryPoint, gridTopLeft), cellSize),
      Math.floor
    );

    // Check if entry point is valid (this should never fail but check anyway)
    if (
      currentCell.x < 0 ||
      currentCell.x >= gridSize.x ||
      currentCell.y < 0 ||
      currentCell.y >= gridSize.y
    ) {
      return { cells }; // No valid entry point found
    }
  }

  // Calculate step direction (either 1 or -1) for each axis
  const step = {
    x: Math.sign(rayDir.x),
    y: Math.sign(rayDir.y),
  };

  // Calculate tDelta - distance along ray from one grid line to next
  const tDelta = {
    x: rayDir.x !== 0 ? Math.abs(cellSize / rayDir.x) : Infinity,
    y: rayDir.y !== 0 ? Math.abs(cellSize / rayDir.y) : Infinity,
  };

  // Calculate initial cell boundary positions
  const initialBoundary = vec2(
    gridTopLeft.x + (currentCell.x + (step.x > 0 ? 1 : 0)) * cellSize,
    gridTopLeft.y + (currentCell.y + (step.y > 0 ? 1 : 0)) * cellSize
  );

  // Calculate initial tMax values, handling boundary cases
  const tMax = {
    x:
      rayDir.x !== 0
        ? Math.abs((initialBoundary.x - ray.origin.x) / rayDir.x)
        : Infinity,
    y:
      rayDir.y !== 0
        ? Math.abs((initialBoundary.y - ray.origin.y) / rayDir.y)
        : Infinity,
  };

  // If we're exactly on a boundary, we need to adjust tMax
  if (Math.abs(ray.origin.x - initialBoundary.x) < constants.EPSILON) {
    tMax.x = tDelta.x;
  }
  if (Math.abs(ray.origin.y - initialBoundary.y) < constants.EPSILON) {
    tMax.y = tDelta.y;
  }

  // Add starting cell
  cells.push(vec2(currentCell.x, currentCell.y));
  let cellCount = 1;

  // Main loop
  while (
    cellCount < maxCells &&
    currentCell.x >= 0 &&
    currentCell.x < gridSize.x &&
    currentCell.y >= 0 &&
    currentCell.y < gridSize.y
  ) {
    // Advance to next cell based on shortest tMax
    if (tMax.x < tMax.y) {
      tMax.x += tDelta.x;
      currentCell.x += step.x;
    } else {
      tMax.y += tDelta.y;
      currentCell.y += step.y;
    }

    // Check if we're still in bounds
    if (
      currentCell.x < 0 ||
      currentCell.x >= gridSize.x ||
      currentCell.y < 0 ||
      currentCell.y >= gridSize.y
    ) {
      break;
    }

    // Add current cell
    cells.push(vec2(currentCell.x, currentCell.y));
    cellCount++;
  }

  return { cells };
}

/**
 * Check if two rays intersect
 */
export function rayIntersectsRay(
  rayA: Ray,
  rayB: Ray
): {
  intersects: boolean;
  intersectionPoint?: Point;
} {
  // Normalize the direction vectors
  const dirA = vec2.nor(rayA.direction);
  const dirB = vec2.nor(rayB.direction);

  // If either ray has zero direction, they cannot intersect
  if (vec2.eq(dirA, vec2()) || vec2.eq(dirB, vec2())) {
    return {
      intersects: false,
    };
  }

  // Calculate the cross product determinant
  const det = vec2.cross(dirA, dirB);

  // Get the vector between starting points
  const startDiff = vec2.sub(rayB.origin, rayA.origin);

  // If determinant is close to 0, rays are parallel or collinear
  if (Math.abs(det) < constants.EPSILON) {
    // Check if rays are collinear
    if (Math.abs(vec2.cross(startDiff, dirA)) < constants.EPSILON) {
      // Rays are collinear - check if they overlap
      const t = vec2.dot(startDiff, dirA);

      // For rays pointing in the same direction:
      // If t <= 0: rayA's origin is behind or at rayB's origin
      // If t >= 0: rayB's origin is behind or at rayA's origin
      // dot(dirA, dirB) should be close to 1 for same direction
      if ((t <= 0 || t >= 0) && vec2.dot(dirA, dirB) > 1 - constants.EPSILON) {
        return {
          intersects: true,
          // No single intersection point for overlapping rays
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

  // Check if intersection occurs on both rays (t >= 0 and s >= 0)
  if (t >= 0 && s >= 0) {
    return {
      intersects: true,
      intersectionPoint: vec2.add(rayA.origin, vec2.mul(dirA, t)),
    };
  }

  return {
    intersects: false,
  };
}

/**
 * Check if a ray intersects a line segment
 */
export function rayIntersectsLine(
  ray: Ray,
  line: Line
): {
  intersects: boolean;
  intersectionPoint?: Point;
} {
  // Convert line to a direction vector
  const lineDir = vec2.sub(line.end, line.start);

  // Normalize the ray direction
  const rayDir = vec2.nor(ray.direction);

  // If either the ray or the line has zero direction, they cannot intersect
  if (vec2.eq(lineDir, vec2()) || vec2.eq(rayDir, vec2())) {
    return {
      intersects: false,
    };
  }

  // Calculate the cross product determinant
  const det = vec2.cross(rayDir, lineDir);

  // Get the vector between ray origin and line start
  const startDiff = vec2.sub(line.start, ray.origin);

  // If determinant is close to 0, ray and line are parallel or collinear
  if (Math.abs(det) < constants.EPSILON) {
    // Check if they are collinear
    if (Math.abs(vec2.cross(startDiff, rayDir)) < constants.EPSILON) {
      // They are collinear - project the line endpoints onto the ray
      const t1 = vec2.dot(vec2.sub(line.start, ray.origin), rayDir);
      const t2 = vec2.dot(vec2.sub(line.end, ray.origin), rayDir);

      // Check if any part of the line segment is in front of the ray
      if ((t1 >= 0 || t2 >= 0) && Math.min(t1, t2) <= vec2.len(lineDir)) {
        return {
          intersects: true,
          // No single intersection point for overlapping segments
        };
      }
    }
    return {
      intersects: false,
    };
  }

  // Calculate intersection parameters
  const t = vec2.cross(startDiff, lineDir) / det; // Ray parameter
  const s = vec2.cross(startDiff, rayDir) / det; // Line parameter

  // Check if intersection occurs on the ray (t >= 0) and within the line
  // segment (0 <= s <= 1)
  if (t >= 0 && s >= 0 && s <= 1) {
    return {
      intersects: true,
      intersectionPoint: vec2.add(ray.origin, vec2.mul(rayDir, t)),
    };
  }

  return {
    intersects: false,
  };
}

/**
 * Check if a ray intersects a circle
 */
export function rayIntersectsCircle(
  ray: Ray,
  circle: Circle
): {
  intersects: boolean;
  intersectionPoints?: Point[];
} {
  // 1. Parameterized ray equation: P(t) = origin + t * direction
  const rayDir = vec2.nor(ray.direction);

  // Calculate vector from ray origin to circle center
  const toCenter = vec2.sub(circle.position, ray.origin);

  // 2. Substitute ray equation into circle equation:
  // (origin.x + t*dir.x - circle.x)² + (origin.y + t*dir.y - circle.y)² = r²
  // Expand and collect terms to get quadratic equation: at² + bt + c = 0

  // a = dot(dir, dir) (should be 1 since dir is normalized)
  const a = vec2.dot(rayDir, rayDir);

  // b = 2 * dot(dir, (origin - center))
  const b = 2 * vec2.dot(rayDir, vec2.mul(toCenter, -1));

  // c = dot((origin - center), (origin - center)) - radius²
  const c = vec2.dot(toCenter, toCenter) - circle.radius * circle.radius;

  // 3. Solve quadratic equation using discriminant
  const discriminant = b * b - 4 * a * c;

  // 4. Check if solutions exist (discriminant >= 0)
  if (discriminant < -constants.EPSILON) {
    return { intersects: false };
  }

  // Handle case where ray just touches circle (discriminant ≈ 0)
  if (Math.abs(discriminant) < constants.EPSILON) {
    const t = -b / (2 * a);
    if (t >= 0) {
      const point = vec2.add(ray.origin, vec2.mul(rayDir, t));
      return {
        intersects: true,
        intersectionPoints: [point],
      };
    }
    return { intersects: false };
  }

  // 5. Calculate intersection points for discriminant > 0
  const sqrtDiscriminant = Math.sqrt(discriminant);
  const t1 = (-b - sqrtDiscriminant) / (2 * a);
  const t2 = (-b + sqrtDiscriminant) / (2 * a);

  // If both t values are negative, ray points away from circle
  if (t2 < 0) {
    return { intersects: false };
  }

  // Calculate intersection points for positive t values
  let intersectionPoints: Point[] = [];
  if (t1 >= 0) {
    intersectionPoints.push(vec2.add(ray.origin, vec2.mul(rayDir, t1)));
  }
  if (t2 >= 0) {
    intersectionPoints.push(vec2.add(ray.origin, vec2.mul(rayDir, t2)));
  }
  intersectionPoints = removeDuplicateVertices(intersectionPoints);

  return {
    intersects: intersectionPoints.length > 0,
    intersectionPoints:
      intersectionPoints.length > 0 ? intersectionPoints : undefined,
  };
}

/**
 * Check if a ray intersects a rectangle
 */
export function rayIntersectsRectangle(
  ray: Ray,
  rectangle: Rectangle
): {
  intersects: boolean;
  intersectionPoints?: Point[];
} {
  // Get vertices of the rectangle in clockwise order
  const vertices = rectangleVertices(rectangle);
  let intersectionPoints: Point[] = [];

  // Check each edge of the rectangle for intersection
  for (let i = 0; i < 4; i++) {
    const line = {
      start: vertices[i],
      end: vertices[(i + 1) % 4],
    };

    const intersection = rayIntersectsLine(ray, line);
    if (intersection.intersects && intersection.intersectionPoint) {
      intersectionPoints.push(intersection.intersectionPoint);
    }
  }

  // Remove duplicate intersection points and sort by distance to ray origin
  intersectionPoints = removeDuplicateVertices(intersectionPoints);
  if (intersectionPoints.length > 1) {
    const rayDir = vec2.nor(ray.direction);
    intersectionPoints.sort((a, b) => {
      const distA = vec2.dot(vec2.sub(a, ray.origin), rayDir);
      const distB = vec2.dot(vec2.sub(b, ray.origin), rayDir);
      return distA - distB;
    });
  }

  return {
    intersects: intersectionPoints.length > 0,
    intersectionPoints:
      intersectionPoints.length > 0 ? intersectionPoints : undefined,
  };
}

/**
 * Check if a ray intersects a polygon
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
  // First check if the polygon is valid
  if (!polygonIsValid(polygon)) {
    return null;
  }

  // If polygon is not convex, decompose it into convex polygons
  if (!polygonIsConvex(polygon)) {
    const convexPolygons = decomposePolygon(polygon);
    if (!convexPolygons) {
      return null;
    }

    // Find outer edges from the decomposed polygons
    const outerEdges = findOuterEdges(convexPolygons);
    let intersectionPoints: Point[] = [];

    // Check each outer edge for intersections
    for (const [start, end] of outerEdges) {
      const edge = { start, end };
      const intersection = rayIntersectsLine(ray, edge);
      if (intersection.intersects && intersection.intersectionPoint) {
        intersectionPoints.push(intersection.intersectionPoint);
      }
    }

    // Remove duplicate intersection points and sort by distance to ray origin
    intersectionPoints = removeDuplicateVertices(intersectionPoints);
    if (intersectionPoints.length > 1) {
      const rayDir = vec2.nor(ray.direction);
      intersectionPoints.sort((a, b) => {
        const distA = vec2.dot(vec2.sub(a, ray.origin), rayDir);
        const distB = vec2.dot(vec2.sub(b, ray.origin), rayDir);
        return distA - distB;
      });
    }

    return {
      intersects: intersectionPoints.length > 0,
      intersectionPoints:
        intersectionPoints.length > 0 ? intersectionPoints : undefined,
    };
  }

  // For convex polygons, check each edge
  const vertices = polygon.vertices;
  let intersectionPoints: Point[] = [];

  // Check each edge of the polygon
  for (let i = 0; i < vertices.length; i++) {
    const edge = {
      start: vertices[i],
      end: vertices[(i + 1) % vertices.length],
    };

    const intersection = rayIntersectsLine(ray, edge);
    if (intersection.intersects && intersection.intersectionPoint) {
      intersectionPoints.push(intersection.intersectionPoint);
    }
  }

  // Remove duplicate intersection points and sort by distance to ray origin
  intersectionPoints = removeDuplicateVertices(intersectionPoints);
  if (intersectionPoints.length > 1) {
    const rayDir = vec2.nor(ray.direction);
    intersectionPoints.sort((a, b) => {
      const distA = vec2.dot(vec2.sub(a, ray.origin), rayDir);
      const distB = vec2.dot(vec2.sub(b, ray.origin), rayDir);
      return distA - distB;
    });
  }

  return {
    intersects: intersectionPoints.length > 0,
    intersectionPoints:
      intersectionPoints.length > 0 ? intersectionPoints : undefined,
  };
}

/**
 * Check if a line segment intersects a ray
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
 * Check if two line segments intersect
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

  // If either line has zero direction, they cannot intersect
  if (vec2.eq(dirA, vec2()) || vec2.eq(dirB, vec2())) {
    return {
      intersects: false,
    };
  }

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
 * Check if a line segment intersects a circle
 */
export function lineIntersectsCircle(
  line: Line,
  circle: Circle
): {
  intersects: boolean;
  intersectionPoints?: Point[];
} {
  // 1. Parameterized line equation: P(t) = start + t * (end - start)
  const lineDir = vec2.sub(line.end, line.start);
  const lineLengthSquared = vec2.dot(lineDir, lineDir);

  // If the line segment has zero length, it cannot intersect
  if (lineLengthSquared < constants.EPSILON) {
    return { intersects: false };
  }

  // If both endpoints of the line are inside the circle, then we have an
  // intersection (but no intersection points)
  if (
    pointInCircle(line.start, circle).intersects &&
    pointInCircle(line.end, circle).intersects
  ) {
    return { intersects: true };
  }

  // Calculate vector from circle center to line start
  const toCenter = vec2.sub(circle.position, line.start);

  // 2. Substitute line equation into circle equation:
  // (start.x + t*dir.x - circle.x)² + (start.y + t*dir.y - circle.y)² = r²
  // Expand and collect terms to get quadratic equation: at² + bt + c = 0

  // a = dot(dir, dir)
  const a = lineLengthSquared;

  // b = 2 * dot(dir, (start - center))
  const b = 2 * vec2.dot(lineDir, vec2.mul(toCenter, -1));

  // c = dot((start - center), (start - center)) - radius²
  const c = vec2.dot(toCenter, toCenter) - circle.radius * circle.radius;

  // 3. Solve quadratic equation using discriminant
  const discriminant = b * b - 4 * a * c;

  // If discriminant is negative, no intersection
  if (discriminant < -constants.EPSILON) {
    return { intersects: false };
  }

  // Handle case where line just touches circle (discriminant ≈ 0)
  if (Math.abs(discriminant) < constants.EPSILON) {
    const t = -b / (2 * a);
    if (t >= 0 && t <= 1) {
      const point = vec2.add(line.start, vec2.mul(lineDir, t));
      return {
        intersects: true,
        intersectionPoints: [point],
      };
    }
    return { intersects: false };
  }

  // Calculate intersection points for discriminant > 0
  const sqrtDiscriminant = Math.sqrt(discriminant);
  const t1 = (-b - sqrtDiscriminant) / (2 * a);
  const t2 = (-b + sqrtDiscriminant) / (2 * a);

  let intersectionPoints: Point[] = [];

  // If both t values are outside [0, 1], no intersection
  if (t2 < 0 || t1 > 1) {
    return { intersects: false };
  }

  // Calculate intersection points for valid t values
  if (t1 >= 0 && t1 <= 1) {
    intersectionPoints.push(vec2.add(line.start, vec2.mul(lineDir, t1)));
  }
  if (t2 >= 0 && t2 <= 1) {
    intersectionPoints.push(vec2.add(line.start, vec2.mul(lineDir, t2)));
  }

  // Remove duplicate intersection points and sort by distance to line start
  intersectionPoints = removeDuplicateVertices(intersectionPoints);
  if (intersectionPoints.length > 1) {
    intersectionPoints.sort((a, b) => {
      const distA = vec2.len(vec2.sub(a, line.start));
      const distB = vec2.len(vec2.sub(b, line.start));
      return distA - distB;
    });
  }

  return {
    intersects: intersectionPoints.length > 0,
    intersectionPoints:
      intersectionPoints.length > 0 ? intersectionPoints : undefined,
  };
}

/**
 * Check if a line segment intersects a rectangle
 */
export function lineIntersectsRectangle(
  line: Line,
  rectangle: Rectangle
): {
  intersects: boolean;
  intersectionPoints?: Point[];
} {
  // Edge case: zero-size rectangle
  if (
    rectangle.size.x < constants.EPSILON ||
    rectangle.size.y < constants.EPSILON
  ) {
    return {
      intersects: false,
    };
  }

  // Get vertices of the rectangle in clockwise order
  const vertices = rectangleVertices(rectangle);

  // If both endpoints are inside, line is completely contained
  if (
    pointInRectangle(line.start, rectangle).intersects &&
    pointInRectangle(line.end, rectangle).intersects
  ) {
    return {
      intersects: true,
    };
  }

  let intersectionPoints: Point[] = [];

  // Check each edge of the rectangle for intersection
  for (let i = 0; i < 4; i++) {
    const rectEdge = {
      start: vertices[i],
      end: vertices[(i + 1) % 4],
    };

    const intersection = lineIntersectsLine(line, rectEdge);
    if (intersection.intersects && intersection.intersectionPoint) {
      intersectionPoints.push(intersection.intersectionPoint);
    }
  }

  // Remove duplicate intersection points and sort by distance to line start
  intersectionPoints = removeDuplicateVertices(intersectionPoints);
  if (intersectionPoints.length > 1) {
    const lineDir = vec2.nor(vec2.sub(line.end, line.start));
    intersectionPoints.sort((a, b) => {
      const distA = vec2.dot(vec2.sub(a, line.start), lineDir);
      const distB = vec2.dot(vec2.sub(b, line.start), lineDir);
      return distA - distB;
    });
  }

  return {
    intersects: intersectionPoints.length > 0,
    intersectionPoints:
      intersectionPoints.length > 0 ? intersectionPoints : undefined,
  };
}

/**
 * Check if a line segment intersects a polygon
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
  // First check if the polygon is valid
  if (!polygonIsValid(polygon)) {
    return null;
  }

  // If polygon is not convex, decompose it into convex polygons
  if (!polygonIsConvex(polygon)) {
    const convexPolygons = decomposePolygon(polygon);
    if (!convexPolygons) {
      return null;
    }

    // Special case: line segment is entirely inside polygon
    const midpoint = {
      x: (line.start.x + line.end.x) / 2,
      y: (line.start.y + line.end.y) / 2,
    };
    const pointInside = pointInPolygon(midpoint, polygon);
    const startInside = pointInPolygon(line.start, polygon);
    const endInside = pointInPolygon(line.end, polygon);
    if (
      pointInside?.intersects &&
      startInside?.intersects &&
      endInside?.intersects
    ) {
      return {
        intersects: true,
      };
    }

    // Find outer edges from the decomposed polygons
    const outerEdges = findOuterEdges(convexPolygons);
    let intersectionPoints: Point[] = [];

    // Check each outer edge for intersections
    for (const [start, end] of outerEdges) {
      const edge = { start, end };
      const intersection = lineIntersectsLine(line, edge);
      if (intersection.intersects && intersection.intersectionPoint) {
        intersectionPoints.push(intersection.intersectionPoint);
      }
    }

    // Remove duplicate intersection points and sort by distance to line start
    intersectionPoints = removeDuplicateVertices(intersectionPoints);
    if (intersectionPoints.length > 1) {
      const lineDir = vec2.nor(vec2.sub(line.end, line.start));
      intersectionPoints.sort((a, b) => {
        const distA = vec2.dot(vec2.sub(a, line.start), lineDir);
        const distB = vec2.dot(vec2.sub(b, line.start), lineDir);
        return distA - distB;
      });
    }

    return {
      intersects: intersectionPoints.length > 0,
      intersectionPoints:
        intersectionPoints.length > 0 ? intersectionPoints : undefined,
    };
  }

  // For convex polygons, check each edge
  const vertices = polygon.vertices;
  let intersectionPoints: Point[] = [];

  // Special case: line segment is entirely inside polygon
  const midpoint = {
    x: (line.start.x + line.end.x) / 2,
    y: (line.start.y + line.end.y) / 2,
  };
  const pointInside = pointInPolygon(midpoint, polygon);
  const startInside = pointInPolygon(line.start, polygon);
  const endInside = pointInPolygon(line.end, polygon);
  if (
    pointInside?.intersects &&
    startInside?.intersects &&
    endInside?.intersects
  ) {
    return {
      intersects: true,
    };
  }

  // Check each edge of the polygon
  for (let i = 0; i < vertices.length; i++) {
    const edge = {
      start: vertices[i],
      end: vertices[(i + 1) % vertices.length],
    };

    const intersection = lineIntersectsLine(line, edge);
    if (intersection.intersects && intersection.intersectionPoint) {
      intersectionPoints.push(intersection.intersectionPoint);
    }
  }

  // Remove duplicate intersection points and sort by distance to line start
  intersectionPoints = removeDuplicateVertices(intersectionPoints);
  if (intersectionPoints.length > 1) {
    const lineDir = vec2.nor(vec2.sub(line.end, line.start));
    intersectionPoints.sort((a, b) => {
      const distA = vec2.dot(vec2.sub(a, line.start), lineDir);
      const distB = vec2.dot(vec2.sub(b, line.start), lineDir);
      return distA - distB;
    });
  }

  return {
    intersects: intersectionPoints.length > 0,
    intersectionPoints:
      intersectionPoints.length > 0 ? intersectionPoints : undefined,
  };
}

/**
 * Check if two circles intersect
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
 * Check if a circle intersects a rectangle
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
 * Check if a circle intersects a polygon
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
 * Check if two rectangles intersect
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
 * Check if a rectangle intersects a polygon
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
 * Check if two polygons intersect
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

/**
 * Find outer edges in a list of polygons by counting occurrences
 *
 * We assume that the polygons were the result of decomposing a concave polygon
 * into a set of convex polygons, and as such they are all convex and share
 * one or more edges
 *
 * This means we can identify outer edges because they'll only appear once
 * in the list of edges, while inner edges will appear twice (once for each
 * polygon that shares them)
 */
function findOuterEdges(polygons: Polygon[]): [Point, Point][] {
  // Map to track edge occurrences using a unique key that considers
  // collinearity and shared endpoints
  const edgeCounts = new Map<string, { count: number; edge: [Point, Point] }>();

  // Helper to get a normalized key for an edge that handles collinear segments
  const getEdgeKey = (a: Point, b: Point): string => {
    // Sort points to ensure consistent order
    const [p1, p2] = [a, b].sort((x, y) =>
      x.x === y.x ? x.y - y.y : x.x - y.x
    );
    return `${p1.x},${p1.y}-${p2.x},${p2.y}`;
  };

  // Helper to check if two edges are effectively the same (collinear and
  // sharing endpoint)
  const edgesAreCollinear = (
    edge1: [Point, Point],
    edge2: [Point, Point]
  ): boolean => {
    // Check if any endpoints are the same
    const [a1, b1] = edge1;
    const [a2, b2] = edge2;

    const sharesEndpoint =
      vec2.eq(a1, a2) || vec2.eq(a1, b2) || vec2.eq(b1, a2) || vec2.eq(b1, b2);

    if (!sharesEndpoint) {
      return false;
    }

    // Check if edges are collinear
    return pointsAreCollinear(a1, b1, a2) && pointsAreCollinear(a1, b1, b2);
  };

  // First pass: count edges
  for (const polygon of polygons) {
    const vertices = polygon.vertices;
    for (let i = 0; i < vertices.length; i++) {
      const start = vertices[i];
      const end = vertices[(i + 1) % vertices.length];
      const edge: [Point, Point] = [start, end];
      const key = getEdgeKey(start, end);

      // Check if we already have a collinear edge that shares an endpoint
      let foundCollinear = false;
      for (const data of edgeCounts.values()) {
        if (edgesAreCollinear(edge, data.edge)) {
          data.count++;
          foundCollinear = true;
          break;
        }
      }

      if (!foundCollinear) {
        edgeCounts.set(key, { count: 1, edge });
      }
    }
  }

  // Second pass: collect edges that appear only once
  const outerEdges: [Point, Point][] = [];
  for (const { count, edge } of edgeCounts.values()) {
    if (count === 1) {
      outerEdges.push(edge);
    }
  }

  return outerEdges;
}
