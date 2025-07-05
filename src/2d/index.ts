import { at, clamp } from '@basementuniverse/utils';
import { vec2 } from '@basementuniverse/vec';
import * as decomp from 'poly-decomp';
import {
  overlapInterval,
  valueInInterval,
  vectorAlmostZero,
  vectorsAlmostEqual,
} from '../utilities';
import * as constants from '../utilities/constants';
import { Interval } from '../utilities/types';
import {
  AABB,
  Circle,
  isCircle,
  isLine,
  isPolygon,
  isRay,
  isRectangle,
  Line,
  Point,
  Polygon,
  Ray,
  Rectangle,
} from './types';

export * from './types';

/**
 * Contents
 *
 * Utilities
 * @see distance
 * @see angle
 * @see angleBetween
 * @see pointsAreCollinear
 *
 * Line and ray utilities
 * @see lineToRay
 * @see rayToLine
 *
 * AABBs
 * @see aabb
 * @see aabbToRectangle
 * @see aabbsOverlap
 * @see pointInAABB
 *
 * Rectangle utilities
 * @see rectangleIsRotated
 * @see rectangleVertices
 *
 * Polygon utilities
 * @see verticesToEdges
 * @see findOuterEdges (not exported)
 * @see polygonIsConvex
 * @see polygonSelfIntersects
 * @see polygonIsValid
 * @see polygonWindingOrder
 * @see polygonArea
 * @see polygonCentroid
 * @see polygonConvexHull
 * @see removeDuplicateVertices (not exported)
 * @see removeDuplicateAdjacentVertices (not exported)
 * @see removeCollinearVertices (not exported)
 * @see optimisePolygon
 * @see decomposePolygon
 *
 * Points
 * @see pointOnRay
 * @see pointOnLine
 * @see pointInCircle
 * @see pointInRectangle
 * @see pointInPolygon
 *
 * Rays
 * @see rayTraverseGrid
 * @see rayIntersectsRay
 * @see rayIntersectsLine
 * @see rayIntersectsCircle
 * @see rayIntersectsRectangle
 * @see rayIntersectsValidConvexPolygonEdges (not exported)
 * @see rayIntersectsPolygon
 *
 * Lines
 * @see lineIntersectsRay
 * @see lineIntersectsLine
 * @see lineIntersectsCircle
 * @see lineIntersectsRectangle
 * @see lineIntersectsValidConvexPolygonEdges (not exported)
 * @see lineIntersectsPolygon
 *
 * Circles
 * @see circleIntersectsCircle
 * @see circleIntersectsRectangle
 * @see circleIntersectsValidConvexPolygonEdges (not exported)
 * @see circleIntersectsPolygon
 *
 * Rectangles
 * @see projectVerticesToAxis (not exported)
 * @see rectangleIntersectsRectangle
 * @see rectangleIntersectsPolygon
 *
 * Polygons
 * @see polygonIntersectsPolygon
 */

/**
 * Calculate the distance between two points
 */
export function distance(a: Point, b: Point): number {
  return vec2.len(vec2.sub(a, b));
}

/**
 * Calculate the clockwise angle from point a to point b
 *
 * The result is in radians and ranges from 0 to 2π (360 degrees)
 *
 * Returns 0 if the vectors are equal
 */
export function angle(a: Point, b: Point): number {
  if (vectorsAlmostEqual(a, b)) {
    return 0;
  }
  const theta = vec2.rad(vec2.sub(b, a)) % (2 * Math.PI);
  if (theta < 0) {
    return theta + 2 * Math.PI; // Ensure angle is positive
  }
  return theta;
}

/**
 * Calculate the clockwise angle between two lines or rays
 *
 * Returns 0 if either line is zero-length
 */
export function angleBetween(a: Line | Ray, b: Line | Ray): number {
  let aLine: Line = isRay(a) ? rayToLine(a, 1) : a;
  let bLine: Line = isRay(b) ? rayToLine(b, 1) : b;
  if (
    vectorAlmostZero(vec2.sub(aLine.end, aLine.start)) ||
    vectorAlmostZero(vec2.sub(bLine.end, bLine.start))
  ) {
    return 0; // Zero-length line
  }
  const dirA = vec2.nor(vec2.sub(aLine.end, aLine.start));
  const dirB = vec2.nor(vec2.sub(bLine.end, bLine.start));
  // Clamp dot product to [-1, 1] to avoid NaN due to floating-point errors
  const dot = clamp(vec2.dot(dirA, dirB), -1, 1);
  const cross = vec2.cross(dirA, dirB);
  const angle = Math.atan2(cross, dot);
  return angle < 0 ? angle + 2 * Math.PI : angle; // Ensure angle is positive
}

/**
 * Check if three points in 2D space are collinear
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
 * Get the bounding box (AABB) of a geometric object
 */
export function aabb(o: Line | Rectangle | Circle | Polygon): AABB | null {
  if (isLine(o)) {
    return {
      position: vec2(
        Math.min(o.start.x, o.end.x),
        Math.min(o.start.y, o.end.y)
      ),
      size: vec2(Math.abs(o.end.x - o.start.x), Math.abs(o.end.y - o.start.y)),
    };
  }

  if (isRectangle(o)) {
    const vertices = rectangleVertices(o);
    const position = vec2(
      Math.min(...vertices.map(v => v.x)),
      Math.min(...vertices.map(v => v.y))
    );
    return {
      position,
      size: vec2(
        Math.max(...vertices.map(v => v.x)) - position.x,
        Math.max(...vertices.map(v => v.y)) - position.y
      ),
    };
  }

  if (isCircle(o)) {
    return {
      position: vec2.sub(o.position, vec2(o.radius, o.radius)),
      size: vec2(o.radius * 2),
    };
  }

  if (isPolygon(o)) {
    const position = vec2(
      Math.min(...o.vertices.map(v => v.x)),
      Math.min(...o.vertices.map(v => v.y))
    );
    return {
      position,
      size: vec2(
        Math.max(...o.vertices.map(v => v.x)) - position.x,
        Math.max(...o.vertices.map(v => v.y)) - position.y
      ),
    };
  }

  return null;
}

/**
 * Convert an AABB to a rectangle
 */
export function aabbToRectangle(aabb: AABB): Rectangle {
  return {
    position: vec2.add(aabb.position, vec2.div(aabb.size, 2)),
    size: aabb.size,
    rotation: 0,
  };
}

/**
 * Check if two AABBs overlap and return the overlapping area if so
 */
export function aabbsOverlap(
  a: AABB,
  b: AABB
): {
  intersects: boolean;
  overlap?: AABB;
} {
  const overlapX = overlapInterval(
    { min: a.position.x, max: a.position.x + a.size.x },
    { min: b.position.x, max: b.position.x + b.size.x }
  );
  const overlapY = overlapInterval(
    { min: a.position.y, max: a.position.y + a.size.y },
    { min: b.position.y, max: b.position.y + b.size.y }
  );

  // If the AABBs don't overlap on one or more axes, they don't overlap at all
  if (!overlapX || !overlapY) {
    return { intersects: false };
  }

  return {
    intersects: true,
    overlap: {
      position: vec2(overlapX.min, overlapY.min),
      size: vec2(overlapX.max - overlapX.min, overlapY.max - overlapY.min),
    },
  };
}

/**
 * Check if a point is inside an AABB
 *
 * This should be a bit faster than pointInRectangle since we don't need to
 * worry about rotation
 */
export function pointInAABB(
  point: Point,
  aabb: AABB
): {
  intersects: boolean;
  closestPoint: Point;
  distance: number;
} {
  const { position, size } = aabb;
  const min = position;
  const max = vec2.add(position, size);

  // Check if the point is inside the AABB
  const intersects =
    valueInInterval(point.x, { min: min.x, max: max.x }) &&
    valueInInterval(point.y, { min: min.y, max: max.y });

  // Find the closest point on the AABB perimeter to the given point
  let closestPoint: Point;
  if (!intersects) {
    // If the point is outside, clamp to the box
    closestPoint = vec2(
      clamp(point.x, min.x, max.x),
      clamp(point.y, min.y, max.y)
    );
  } else {
    // If the point is inside, project to the nearest edge
    const distances = [
      { x: min.x, y: point.y, d: Math.abs(point.x - min.x) }, // left
      { x: max.x, y: point.y, d: Math.abs(point.x - max.x) }, // right
      { x: point.x, y: min.y, d: Math.abs(point.y - min.y) }, // top
      { x: point.x, y: max.y, d: Math.abs(point.y - max.y) }, // bottom
    ];
    const nearest = distances.reduce((a, b) => (a.d < b.d ? a : b));
    closestPoint = vec2(nearest.x, nearest.y);
  }

  // Calculate the distance from the point to the closest point
  const distance = vec2.len(vec2.sub(point, closestPoint));

  // If the point is inside, distance should be negative
  return {
    intersects,
    closestPoint,
    distance: intersects ? -distance : distance,
  };
}

/**
 * Check if a rectangle is rotated
 */
export function rectangleIsRotated(rectangle: Rectangle): boolean {
  return (
    rectangle.rotation !== undefined &&
    Math.abs(rectangle.rotation) > constants.EPSILON
  );
}

/**
 * Get the vertices of a rectangle
 *
 * Vertices will be returned in clockwise order starting at the top-left:
 * - Top-left
 * - Top-right
 * - Bottom-right
 * - Bottom-left
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
 * Convert a list of vertices to a list of edges
 */
export function verticesToEdges(vertices: Point[]): Line[] {
  const edges: Line[] = [];
  for (let i = 0; i < vertices.length; i++) {
    const start = vertices[i];
    const end = at(vertices, i + 1);
    edges.push({ start, end });
  }
  return edges;
}

/**
 * Find outer edges in a list of polygons
 *
 * We assume that the polygons were the result of decomposing a concave polygon
 * into a set of convex polygons, and as such they are all convex and share
 * one or more edges
 *
 * This means we can identify outer edges because they'll only appear once
 * in the list of edges, while inner edges will appear twice (once for each
 * polygon that shares them)
 */
function findOuterEdges(polygons: Polygon[]): Line[] {
  const allEdges: Line[] = polygons.flatMap(polygon =>
    verticesToEdges(polygon.vertices)
  );

  // Edges are the duplicates if they overlap but have no intersection point
  // (this implies that they have infinitely many intersection points)
  const edgesOverlap = (a: Line, b: Line): boolean => {
    const result = lineIntersectsLine(a, b);
    if (result.intersects && !result.intersectionPoint) {
      // Edge case: if the edges intersect and have no intersect point, but
      // share only one endpoint, then they aren't considered overlapping
      if (
        (vectorsAlmostEqual(a.end, b.start) &&
          !vectorsAlmostEqual(a.start, b.end)) ||
        (vectorsAlmostEqual(a.start, b.end) &&
          !vectorsAlmostEqual(a.end, b.start))
      ) {
        return false;
      }
      return true;
    }
    return false;
  };

  // Filter out the edges that appear more than once
  const result: Line[] = [];
  for (const edge of allEdges) {
    if (
      !result.some(e => edgesOverlap(e, edge)) &&
      !allEdges.some(e => e !== edge && edgesOverlap(e, edge))
    ) {
      result.push(edge); // This edge is an outer edge
    }
  }
  return result;
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
 * Returns 'clockwise' or 'counter-clockwise' depending on the chosen
 * coordinate system
 *
 * By default we use the 'screen' coordinate system (y increases downwards)
 *
 * Returns null if the polygon is invalid
 */
export function polygonWindingOrder(
  polygon: Polygon,
  options?: {
    /**
     * The coordinate system can be 'cartesian' (where y increases upwards) or
     * 'screen' (where y increases downwards, this is the default)
     */
    coordinateSystem?: 'cartesian' | 'screen';
  }
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
  const coordinateSystem = options?.coordinateSystem || 'screen';
  switch (coordinateSystem) {
    case 'cartesian':
      return sum > 0 ? 'clockwise' : 'counter-clockwise';
    case 'screen':
      return sum > 0 ? 'counter-clockwise' : 'clockwise';
    default:
      return null;
  }
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
  if (
    polygon.vertices.every((v, i, a) =>
      pointsAreCollinear(v, at(a, i + 1), at(a, i + 2))
    )
  ) {
    return null; // All vertices are collinear
  }
  return vec2.div(
    [...polygon.vertices].reduce((a, c) => vec2.add(a, c), vec2()),
    polygon.vertices.length
  );
}

/**
 * Calculate the convex hull of a polygon
 */
export function polygonConvexHull(
  polygon: Polygon,
  options?: {
    keepWindingOrder?: boolean;
  }
): Polygon | null {
  if (!polygonIsValid(polygon)) {
    return null;
  }
  if (polygonIsConvex(polygon)) {
    return polygon; // The polygon is already convex
  }

  const keepWindingOrder = options?.keepWindingOrder ?? true;
  const originalWindingOrder = polygonWindingOrder(polygon);

  // Andrew's monotone chain algorithm for convex hull
  // Sort vertices lexicographically (first by x, then by y)
  const sorted = [...polygon.vertices].sort((a, b) =>
    a.x !== b.x ? a.x - b.x : a.y - b.y
  );

  const lower: Point[] = [];
  for (const p of sorted) {
    while (
      lower.length >= 2 &&
      vec2.cross(
        vec2.sub(lower[lower.length - 1], lower[lower.length - 2]),
        vec2.sub(p, lower[lower.length - 1])
      ) <= 0
    ) {
      lower.pop();
    }
    lower.push(p);
  }

  const upper: Point[] = [];
  for (let i = sorted.length - 1; i >= 0; --i) {
    const p = sorted[i];
    while (
      upper.length >= 2 &&
      vec2.cross(
        vec2.sub(upper[upper.length - 1], upper[upper.length - 2]),
        vec2.sub(p, upper[upper.length - 1])
      ) <= 0
    ) {
      upper.pop();
    }
    upper.push(p);
  }

  // Remove the last point of each half because it's repeated at the start of
  // the other
  lower.pop();
  upper.pop();

  const hull = lower.concat(upper);

  if (hull.length < 3) {
    return null;
  }

  // Optionally ensure the winding order is preserved
  if (
    keepWindingOrder &&
    polygonWindingOrder({ vertices: hull }) !== originalWindingOrder
  ) {
    hull.reverse();
  }

  return {
    vertices: removeDuplicateVertices(hull),
  };
}

/**
 * Remove duplicate vertices from a list of vertices
 */
function removeDuplicateVertices(vertices: Point[]): Point[] {
  const result: Point[] = [];
  const n = vertices.length;
  for (let i = 0; i < n; i++) {
    const current = vertices[i];
    if (!result.some(v => vectorsAlmostEqual(current, v))) {
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
    if (!vectorsAlmostEqual(current, next)) {
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
  closestPoint: Point;
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
  if (vectorAlmostZero(rectangle.size)) {
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

  // We should always have a valid polygon, but just in case...
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

  // Normalize ray direction and handle zero components
  const rayDir = vec2.nor(ray.direction);
  if (vectorAlmostZero(rayDir)) {
    return { cells: [] };
  }

  const cells: Point[] = [];

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
  const edges = verticesToEdges(vertices);
  for (const edge of edges) {
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
 * Check if a ray intersects the edges of a convex polygon
 *
 * We assume the polygon has already been checked for validity and convexity
 */
function rayIntersectsValidConvexPolygonEdges(
  ray: Ray,
  edges: Line[]
): {
  intersects: boolean;
  intersectionPoints?: Point[];
} {
  let intersectionPoints: Point[] = [];

  // Check each outer edge for intersections
  for (const edge of edges) {
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

    // Check the ray against the outer edges of each convex polygons
    return rayIntersectsValidConvexPolygonEdges(
      ray,
      findOuterEdges(convexPolygons)
    );
  }

  // For convex polygons, check each edge
  return rayIntersectsValidConvexPolygonEdges(
    ray,
    verticesToEdges(polygon.vertices)
  );
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
  if (vectorAlmostZero(rectangle.size)) {
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
  const edges = verticesToEdges(vertices);
  for (const edge of edges) {
    const intersection = lineIntersectsLine(line, edge);
    if (intersection.intersects && intersection.intersectionPoint) {
      intersectionPoints.push(intersection.intersectionPoint);
    }
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
 * Check if a line segment intersects the edges of a convex polygon
 *
 * We assume the polygon has already been checked for validity and convexity
 */
function lineIntersectsValidConvexPolygonEdges(
  line: Line,
  polygon: Polygon,
  edges: Line[]
): {
  intersects: boolean;
  intersectionPoints?: Point[];
} {
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

  let intersectionPoints: Point[] = [];

  // Check each outer edge for intersections
  for (const edge of edges) {
    const intersection = lineIntersectsLine(line, edge);
    if (intersection.intersects && intersection.intersectionPoint) {
      intersectionPoints.push(intersection.intersectionPoint);
    }
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

    // Check the line against the outer edges of each convex polygon
    return lineIntersectsValidConvexPolygonEdges(
      line,
      polygon,
      findOuterEdges(convexPolygons)
    );
  }

  // For convex polygons, check each edge
  return lineIntersectsValidConvexPolygonEdges(
    line,
    polygon,
    verticesToEdges(polygon.vertices)
  );
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
  minimumSeparation?: vec2;
} {
  // Calculate the vector from center A to center B
  const centerToCenterVec = vec2.sub(circleB.position, circleA.position);
  const centerToCenter = vec2.len(centerToCenterVec);
  const sumRadii = circleA.radius + circleB.radius;

  // If distance between centers is greater than sum of radii, the circles
  // don't intersect
  if (centerToCenter > sumRadii + constants.EPSILON) {
    return { intersects: false };
  }

  // If circles are identical (same position and radius), they have infinitely
  // many intersection points
  if (
    centerToCenter < constants.EPSILON &&
    Math.abs(circleA.radius - circleB.radius) < constants.EPSILON
  ) {
    return {
      intersects: true,
      minimumSeparation: vec2.mul(vec2.ux(), 2 * circleA.radius),
    };
  }

  // Check if one circle is inside the other (no intersection points but still
  // intersecting)
  const radiusDiff = Math.abs(circleA.radius - circleB.radius);
  if (centerToCenter < radiusDiff - constants.EPSILON) {
    return {
      intersects: true,
      minimumSeparation: vec2.mul(
        vec2.nor(centerToCenterVec),
        circleA.radius - centerToCenter + circleB.radius
      ),
    };
  }

  // Calculate intersection points for standard intersecting case
  // http://mathworld.wolfram.com/Circle-CircleIntersection.html
  const a =
    (circleA.radius * circleA.radius -
      circleB.radius * circleB.radius +
      centerToCenter * centerToCenter) /
    (2 * centerToCenter);
  const h = Math.sqrt(Math.max(0, circleA.radius * circleA.radius - a * a));

  // Calculate the point on the line between centers that is distance 'a' from
  // circle A's center
  const p = vec2.add(
    circleA.position,
    vec2.mul(vec2.nor(centerToCenterVec), a)
  );

  // If circles are tangent (touching at one point)
  if (Math.abs(centerToCenter - sumRadii) < constants.EPSILON) {
    return {
      intersects: true,
      intersectionPoints: [p],
      minimumSeparation: vec2(),
    };
  }

  // Calculate the perpendicular vector to get both intersection points
  const perpVec = vec2.mul(
    vec2({ x: -centerToCenterVec.y, y: centerToCenterVec.x }),
    h / centerToCenter
  );

  const intersectionPoints = [vec2.add(p, perpVec), vec2.sub(p, perpVec)];

  // Calculate the minimum separation vector (negative value indicates overlap)
  const minimumSeparation = vec2.mul(
    vec2.nor(centerToCenterVec),
    sumRadii - centerToCenter
  );

  return {
    intersects: true,
    intersectionPoints,
    minimumSeparation,
  };
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
  minimumSeparation?: vec2;
} {
  // Get rectangle vertices so we can test against rotated rectangles
  const vertices = rectangleVertices(rectangle);
  const edges = verticesToEdges(vertices);

  // Check if circle's center is inside rectangle
  const pointInRectResult = pointInRectangle(circle.position, rectangle);
  const circleCenterInsideRectangle = pointInRectResult.intersects;

  // Check if rectangle's center is inside circle
  const pointInCircleResult = pointInCircle(rectangle.position, circle);
  const rectangleCenterInsideCircle = pointInCircleResult.intersects;

  // Check circle intersection with rectangle edges
  const intersectionPoints: Point[] = [];
  for (const edge of edges) {
    const result = lineIntersectsCircle(edge, circle);
    if (result.intersects && result.intersectionPoints) {
      intersectionPoints.push(...result.intersectionPoints);
    }
  }

  // Calculate the minimum separation vector
  let minimumSeparation: vec2;
  if (Math.abs(pointInRectResult.distance) < constants.EPSILON) {
    minimumSeparation = vec2();
  } else if (pointInRectResult.distance < 0) {
    minimumSeparation = vec2.mul(
      vec2.nor(vec2.sub(pointInRectResult.closestPoint, circle.position)),
      circle.radius + Math.abs(pointInRectResult.distance)
    );
  } else {
    minimumSeparation = vec2.mul(
      vec2.nor(vec2.sub(circle.position, pointInRectResult.closestPoint)),
      circle.radius - pointInRectResult.distance
    );
  }

  // If either shape's center is inside the other and there are no intersection
  // points, it means one of the shapes completely encloses the other
  if (
    (circleCenterInsideRectangle || rectangleCenterInsideCircle) &&
    intersectionPoints.length === 0
  ) {
    return {
      intersects: true,
      minimumSeparation,
    };
  }

  // Remove duplicate intersection points
  const uniquePoints = removeDuplicateVertices(intersectionPoints);
  if (uniquePoints.length > 0) {
    return {
      intersects: true,
      intersectionPoints: uniquePoints,
      minimumSeparation,
    };
  }

  return { intersects: false };
}

/**
 * Check if a circle intersects the edges of a convex polygon
 *
 * We assume the polygon has already been checked for validity and convexity
 */
function circleIntersectsValidConvexPolygonEdges(
  circle: Circle,
  edges: Line[],
  circleCenterInsidePolygon: boolean,
  polygonCenterInsideCircle: boolean
): {
  intersects: boolean;
  intersectionPoints?: Point[];
} {
  let intersectionPoints: Point[] = [];

  // Check each outer edge for intersections with the circle
  for (const edge of edges) {
    const result = lineIntersectsCircle(edge, circle);
    if (result.intersects && result.intersectionPoints) {
      intersectionPoints.push(...result.intersectionPoints);
    }
  }

  // If either shape's center is inside the other and there are no
  // intersection points, one shape completely encloses the other
  if (
    (circleCenterInsidePolygon || polygonCenterInsideCircle) &&
    intersectionPoints.length === 0
  ) {
    return { intersects: true };
  }

  // Remove duplicate intersection points
  intersectionPoints = removeDuplicateVertices(intersectionPoints);

  return {
    intersects: intersectionPoints.length > 0,
    intersectionPoints:
      intersectionPoints.length > 0 ? intersectionPoints : undefined,
  };
}

/**
 * Check if a circle intersects a polygon
 *
 * Returns null if the polygon is invalid
 */
export function circleIntersectsPolygon(
  circle: Circle,
  polygon: Polygon,
  options?: {
    findMinimumSeparation?: boolean;
  }
): {
  intersects: boolean;
  intersectionPoints?: Point[];
  minimumSeparation?: vec2;
} | null {
  // First check if the polygon is valid
  if (!polygonIsValid(polygon)) {
    return null;
  }

  const MAX_ITERATIONS = 10;
  const findMinimumSeparation = options?.findMinimumSeparation ?? false;

  // Check if circle's center is inside polygon
  const pointInPolygonResult = pointInPolygon(circle.position, polygon);
  const circleCenterInsidePolygon = pointInPolygonResult?.intersects ?? false;

  // If polygon is not convex, decompose it into convex polygons
  if (!polygonIsConvex(polygon)) {
    const convexPolygons = decomposePolygon(polygon);
    if (!convexPolygons) {
      return null;
    }

    // For a concave polygon, the centroid might be outside of the polygon, so
    // in order to check if the polygon is entirely inside the circle, we need
    // to check if all sub-polygon centroids are inside the circle
    const polygonCenterInsideCircle = convexPolygons.every(convexPolygon => {
      const centroid = polygonCentroid(convexPolygon);
      if (!centroid) {
        return false; // Invalid centroid
      }
      return pointInCircle(centroid, circle).intersects ?? false;
    });

    // Find outer edges from the decomposed polygons
    const outerEdges = findOuterEdges(convexPolygons);
    const result = circleIntersectsValidConvexPolygonEdges(
      circle,
      outerEdges,
      circleCenterInsidePolygon,
      polygonCenterInsideCircle
    );

    if (result.intersects && findMinimumSeparation) {
      let iteration = 0;
      let previousSeparation: vec2 | null = null;
      let currentSeparation: vec2 = vec2();
      let currentSeparationIntersects = true;
      while (
        // Continue if we still haven't found a separation that doesn't
        // intersect
        currentSeparationIntersects &&
        // Continue if we're still converging (i.e. if we didn't make any
        // progress in the last iteration then we can stop)
        (previousSeparation === null ||
          !vectorsAlmostEqual(previousSeparation, currentSeparation)) &&
        // Continue until we reach the maximum number of iterations
        ++iteration < MAX_ITERATIONS
      ) {
        let minimumSeparations: {
          separation: vec2;
          distance: number;
        }[] = [];
        let circlePosition = vec2.add(circle.position, currentSeparation);

        // Find minimum separation vectors for each convex sub-polygon
        for (const convexPolygon of convexPolygons) {
          const pointInConvexPolygonResult = pointInPolygon(
            circlePosition,
            convexPolygon
          );
          if (!pointInConvexPolygonResult) {
            continue;
          }

          let minimumSeparation: vec2;
          if (
            Math.abs(pointInConvexPolygonResult.distance) < constants.EPSILON
          ) {
            minimumSeparation = vec2();
          } else if (pointInConvexPolygonResult.distance < 0) {
            minimumSeparation = vec2.mul(
              vec2.nor(
                vec2.sub(
                  pointInConvexPolygonResult.closestPoint,
                  circlePosition
                )
              ),
              circle.radius + Math.abs(pointInConvexPolygonResult.distance)
            );
          } else {
            minimumSeparation = vec2.mul(
              vec2.nor(
                vec2.sub(
                  circlePosition,
                  pointInConvexPolygonResult.closestPoint
                )
              ),
              circle.radius - pointInConvexPolygonResult.distance
            );
          }
          minimumSeparations.push({
            separation: minimumSeparation,
            distance: Math.abs(pointInConvexPolygonResult.distance),
          });
        }

        // Sort minimum separations by penetration distance
        minimumSeparations = minimumSeparations.sort(
          (a, b) => a.distance - b.distance
        );

        previousSeparation = vec2.cpy(currentSeparation);
        currentSeparation = vec2.add(
          currentSeparation,
          minimumSeparations[0]?.separation || vec2()
        );

        // Check if the current separation still intersects
        currentSeparationIntersects =
          circleIntersectsPolygon(
            {
              ...circle,
              position: vec2.add(
                circle.position,

                // Add a small buffer to avoid numerical/precision issues
                vec2.mul(currentSeparation, 1.01)
              ),
            },
            polygon,
            {
              ...options,

              // Don't recurse to avoid infinite loops
              findMinimumSeparation: false,
            }
          )?.intersects ?? false;
      }

      return {
        ...result,
        minimumSeparation: currentSeparation,
      };
    }

    return result;
  }

  // Check if polygon's centroid is inside circle
  // For a convex polygon, the centroid is always inside the polygon
  const polygonCenter = polygonCentroid(polygon);
  const pointInCircleResult = pointInCircle(polygonCenter!, circle);
  const polygonCenterInsideCircle = pointInCircleResult.intersects ?? false;

  // For convex polygons, check each edge directly
  const edges = verticesToEdges(polygon.vertices);
  const result = circleIntersectsValidConvexPolygonEdges(
    circle,
    edges,
    circleCenterInsidePolygon,
    polygonCenterInsideCircle
  );

  if (result.intersects && findMinimumSeparation) {
    // Calculate the minimum separation vector
    let minimumSeparation: vec2;
    if (Math.abs(pointInPolygonResult!.distance) < constants.EPSILON) {
      minimumSeparation = vec2();
    } else if (pointInPolygonResult!.distance < 0) {
      minimumSeparation = vec2.mul(
        vec2.nor(vec2.sub(pointInPolygonResult!.closestPoint, circle.position)),
        circle.radius + Math.abs(pointInPolygonResult!.distance)
      );
    } else {
      minimumSeparation = vec2.mul(
        vec2.nor(vec2.sub(circle.position, pointInPolygonResult!.closestPoint)),
        circle.radius - pointInPolygonResult!.distance
      );
    }

    return {
      ...result,
      minimumSeparation,
    };
  }

  return result;
}

/**
 * Project vertices onto an axis and return the min/max values
 */
function projectVerticesToAxis(vertices: Point[], axis: vec2): Interval {
  let min = Infinity;
  let max = -Infinity;

  for (const vertex of vertices) {
    const projection = vec2.dot(vertex, axis);
    min = Math.min(min, projection);
    max = Math.max(max, projection);
  }

  return { min, max };
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
  minimumSeparation?: vec2;
} {
  // Edge case: if either rectangle has zero size, they cannot intersect
  if (vectorAlmostZero(rectangleA.size) || vectorAlmostZero(rectangleB.size)) {
    return { intersects: false };
  }

  // Get vertices of both rectangles
  const verticesA = rectangleVertices(rectangleA);
  const verticesB = rectangleVertices(rectangleB);

  // Get edges of both rectangles
  const edgesA = verticesToEdges(verticesA);
  const edgesB = verticesToEdges(verticesB);

  // Get separating axes by calculating the normals of each edge
  const axes: vec2[] = [];
  for (const edge of [...edgesA, ...edgesB]) {
    const edgeVec = vec2.sub(edge.end, edge.start);
    const normal = vec2.nor(vec2.rotf(edgeVec, -1));

    // Only add unique axes
    if (
      !axes.some(
        axis => Math.abs(vec2.dot(axis, normal)) > 1 - constants.EPSILON
      )
    ) {
      axes.push(normal);
    }
  }

  // Track minimum penetration for separation vector
  let minPenetration = Infinity;
  let minAxis: vec2 = vec2();

  // Test each axis
  for (const axis of axes) {
    // Project both rectangles onto the axis
    const projectionA = projectVerticesToAxis(verticesA, axis);
    const projectionB = projectVerticesToAxis(verticesB, axis);

    // If we find a separating axis, the rectangles don't intersect
    if (
      projectionA.max < projectionB.min ||
      projectionB.max < projectionA.min
    ) {
      return { intersects: false };
    }

    // Calculate penetration depth
    const overlap = Math.min(
      projectionA.max - projectionB.min,
      projectionB.max - projectionA.min
    );

    // Track minimum penetration and its axis
    if (overlap < minPenetration) {
      minPenetration = overlap;
      minAxis = axis;
    }
  }

  // Find intersection points by checking each edge of rectangle A against each
  // edge of rectangle B
  const intersectionPoints: Point[] = [];
  for (const edgeA of edgesA) {
    for (const edgeB of edgesB) {
      const intersection = lineIntersectsLine(edgeA, edgeB);
      if (intersection.intersects && intersection.intersectionPoint) {
        intersectionPoints.push(intersection.intersectionPoint);
      }
    }
  }

  // Remove duplicate intersection points
  const uniquePoints = removeDuplicateVertices(intersectionPoints);

  // Calculate the minimum separation vector
  const centerA = rectangleA.position;
  const centerB = rectangleB.position;
  const centerToCenter = vec2.sub(centerB, centerA);

  // If the dot product is negative, we need to flip the axis
  if (vec2.dot(minAxis, centerToCenter) < 0) {
    minAxis = vec2.mul(minAxis, -1);
  }

  // The minimum separation vector is the axis scaled by the penetration depth
  const minimumSeparation = vec2.mul(minAxis, minPenetration);

  return {
    intersects: true,
    intersectionPoints: uniquePoints.length > 0 ? uniquePoints : undefined,
    minimumSeparation,
  };
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
  // First check if the polygon is valid
  if (!polygonIsValid(polygon)) {
    return null;
  }

  // Edge case: if the rectangle has zero size, there is no intersection
  if (vectorAlmostZero(rectangle.size)) {
    return { intersects: false };
  }

  // Convert rectangle to polygon
  const rectVertices = rectangleVertices(rectangle);
  const rectPolygon: Polygon = {
    vertices: rectVertices,
  };

  // Use polygon intersection algorithm
  return polygonIntersectsPolygon(rectPolygon, polygon);
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
  // First check if both polygons are valid
  if (!polygonIsValid(polygonA) || !polygonIsValid(polygonB)) {
    return null;
  }

  // Decompose polygon A if it's concave
  let convexPolygonsA: Polygon[] = [];
  if (!polygonIsConvex(polygonA)) {
    const decomposedA = decomposePolygon(polygonA);
    if (!decomposedA) {
      return null;
    }
    convexPolygonsA = decomposedA;
  } else {
    convexPolygonsA = [polygonA];
  }

  // Decompose polygon B if it's concave
  let convexPolygonsB: Polygon[] = [];
  if (!polygonIsConvex(polygonB)) {
    const decomposedB = decomposePolygon(polygonB);
    if (!decomposedB) {
      return null;
    }
    convexPolygonsB = decomposedB;
  } else {
    convexPolygonsB = [polygonB];
  }

  // Get the outer edges of the decomposed polygons
  const outerEdgesA = findOuterEdges(convexPolygonsA);
  const outerEdgesB = findOuterEdges(convexPolygonsB);

  // Find intersection points between outer edges only
  const intersectionPoints: Point[] = [];
  for (const edgeA of outerEdgesA) {
    for (const edgeB of outerEdgesB) {
      const intersection = lineIntersectsLine(edgeA, edgeB);
      if (intersection.intersects && intersection.intersectionPoint) {
        intersectionPoints.push(intersection.intersectionPoint);
      }
    }
  }

  // Check if one polygon is contained within the other
  // A polygon is contained within another if the centroids of all its
  // convex sub-polygons are inside the other polygon
  if (intersectionPoints.length === 0) {
    const polygonACentroids = convexPolygonsA
      .map(polygonCentroid)
      .filter(centroid => !!centroid);
    if (
      polygonACentroids.every(
        centroid => pointInPolygon(centroid as vec2, polygonB)?.intersects
      )
    ) {
      return { intersects: true };
    }

    const polygonBCentroids = convexPolygonsB
      .map(polygonCentroid)
      .filter(centroid => !!centroid);
    if (
      polygonBCentroids.every(
        centroid => pointInPolygon(centroid as vec2, polygonA)?.intersects
      )
    ) {
      return { intersects: true };
    }
  }

  // Remove duplicate intersection points
  const uniquePoints = removeDuplicateVertices(intersectionPoints);

  return {
    intersects: uniquePoints.length > 0,
    intersectionPoints: uniquePoints.length > 0 ? uniquePoints : undefined,
  };
}
