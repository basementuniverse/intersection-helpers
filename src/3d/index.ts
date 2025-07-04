import { at, clamp } from '@basementuniverse/utils';
import { vec3 } from '@basementuniverse/vec';
import {
  overlapInterval,
  valueInInterval,
  vectorAlmostZero,
  vectorsAlmostEqual,
} from '../utilities';
import * as constants from '../utilities/constants';
import {
  AABB,
  Cuboid,
  isCuboid,
  isLine,
  isMesh,
  isPolygon,
  isRay,
  isSphere,
  Line,
  Mesh,
  Plane,
  Point,
  Polygon,
  Ray,
  Sphere,
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
 * @see aabbToCuboid
 * @see aabbsOverlap
 * @see pointInAABB
 *
 * Cuboid utilities
 * @see cuboidIsRotated
 * @see cuboidVertices
 *
 * Polygon utilities
 * @see verticesToEdges
 * @see polygonIsValid
 * @see polygonWindingOrder
 * @see polygonArea
 * @see polygonCentroid
 *
 * Mesh utilities
 * @see polygonsToMesh
 * @see meshToPolygons
 * @see meshToEdges
 * @see meshCentroid
 * @see meshIsWatertight
 *
 * Points
 * @see pointOnRay
 * @see pointOnLine
 * @see pointInSphere
 * @see pointInCuboid
 * @see pointOnPolygon
 *
 * Rays
 * @see rayTraverseGrid
 * @see rayIntersectsRay // TODO
 * @see rayIntersectsLine // TODO
 * @see rayIntersectsSphere
 * @see rayIntersectsPlane
 * @see rayIntersectsCuboid
 * @see rayIntersectsPolygon // TODO
 *
 * Lines
 * @see lineIntersectsRay // TODO
 * @see lineIntersectsLine // TODO
 * @see lineIntersectsSphere // TODO
 * @see lineIntersectsPlane // TODO
 * @see lineIntersectsCuboid // TODO
 * @see lineIntersectsPolygon // TODO
 *
 * Spheres
 * @see sphereIntersectsSphere // TODO
 * @see sphereIntersectsPlane // TODO
 * @see sphereIntersectsCuboid // TODO
 * @see sphereIntersectsPolygon // TODO
 *
 * Planes
 * @see planeIntersectsPlane // TODO
 *
 * Cuboids
 * @see cuboidIntersectsCuboid // TODO
 * @see cuboidIntersectsPlane // TODO
 * @see cuboidIntersectsPolygon // TODO
 *
 * Polygons
 * @see polygonIntersectsPolygon // TODO
 * @see polygonIntersectsPlane // TODO
 * @see polygonIntersectsMesh // TODO
 *
 * Meshes
 * @see meshIntersectsMesh // TODO
 * @see meshIntersectsPlane // TODO
 */

/**
 * Calculate the distance between two points in 3D space
 */
export function distance(a: Point, b: Point): number {
  return vec3.len(vec3.sub(a, b));
}

/**
 * Calculate the Euler angle from point a to point b
 */
export function angle(a: Point, b: Point): vec3 {
  if (vectorsAlmostEqual(a, b)) {
    return vec3();
  }
  let thetaX = vec3.radx(vec3.sub(b, a)) % (2 * Math.PI);
  if (thetaX < 0) {
    thetaX += 2 * Math.PI; // Ensure angle is positive
  }
  let thetaY = vec3.rady(vec3.sub(b, a)) % (2 * Math.PI);
  if (thetaY < 0) {
    thetaY += 2 * Math.PI; // Ensure angle is positive
  }
  let thetaZ = vec3.radz(vec3.sub(b, a)) % (2 * Math.PI);
  if (thetaZ < 0) {
    thetaZ += 2 * Math.PI; // Ensure angle is positive
  }
  return vec3(thetaX, thetaY, thetaZ);
}

/**
 * Calculate the angle between two lines or rays
 *
 * Returns 0 if either line is zero-length
 */
export function angleBetween(a: Line | Ray, b: Line | Ray): number {
  let aLine: Line = isRay(a) ? rayToLine(a, 1) : a;
  let bLine: Line = isRay(b) ? rayToLine(b, 1) : b;
  if (
    vectorAlmostZero(vec3.sub(aLine.start, aLine.end)) ||
    vectorAlmostZero(vec3.sub(bLine.start, bLine.end))
  ) {
    return 0; // Zero-length line
  }
  const dirA = vec3.nor(vec3.sub(aLine.end, aLine.start));
  const dirB = vec3.nor(vec3.sub(bLine.end, bLine.start));
  // Clamp dot product to [-1, 1] to avoid NaN due to floating-point errors
  const dot = clamp(vec3.dot(dirA, dirB), -1, 1);
  const angle = Math.acos(dot);
  return angle < 0 ? angle + 2 * Math.PI : angle; // Ensure angle is positive
}

/**
 * Check if three points in 3D space are collinear
 */
export function pointsAreCollinear(a: Point, b: Point, c: Point): boolean {
  // Create two vectors from the points:
  // v1 = b - a
  // v2 = c - a
  const v1 = vec3.sub(b, a);
  const v2 = vec3.sub(c, a);

  // Calculate the cross product of the two vectors
  const cross = vec3.cross(v1, v2);

  // If the cross product is zero (or very close to zero),
  // the points are collinear
  return vec3.len(cross) < constants.EPSILON;
}

/**
 * Convert a line segment to a ray
 */
export function lineToRay(line: Line): Ray {
  return {
    origin: line.start,
    direction: vec3.nor(vec3.sub(line.end, line.start)),
  };
}

/**
 * Convert a ray to a line segment
 */
export function rayToLine(ray: Ray, length: number = 1): Line {
  return {
    start: ray.origin,
    end: vec3.add(ray.origin, vec3.mul(ray.direction, length)),
  };
}

/**
 * Get the bounding box (AABB) of a geometric object
 */
export function aabb(o: Line | Sphere | Cuboid | Polygon | Mesh): AABB | null {
  if (isLine(o)) {
    return {
      position: vec3(
        Math.min(o.start.x, o.end.y),
        Math.min(o.start.y, o.end.y),
        Math.min(o.start.z, o.end.z)
      ),
      size: vec3(
        Math.abs(o.start.x - o.end.x),
        Math.abs(o.start.y - o.end.y),
        Math.abs(o.start.z - o.end.z)
      ),
    };
  }

  if (isSphere(o)) {
    return {
      position: o.position,
      size: vec3(o.radius * 2),
    };
  }

  if (isCuboid(o)) {
    const vertices = cuboidVertices(o);
    const position = vec3(
      Math.min(...vertices.map(v => v.x)),
      Math.min(...vertices.map(v => v.y)),
      Math.min(...vertices.map(v => v.z))
    );
    return {
      position,
      size: vec3(
        Math.max(...vertices.map(v => v.x)) - position.x,
        Math.max(...vertices.map(v => v.y)) - position.y,
        Math.max(...vertices.map(v => v.z)) - position.z
      ),
    };
  }

  if (isMesh(o) || isPolygon(o)) {
    const position = vec3(
      Math.min(...o.vertices.map(v => v.x)),
      Math.min(...o.vertices.map(v => v.y)),
      Math.min(...o.vertices.map(v => v.z))
    );
    return {
      position,
      size: vec3(
        Math.max(...o.vertices.map(v => v.x)) - position.x,
        Math.max(...o.vertices.map(v => v.y)) - position.y,
        Math.max(...o.vertices.map(v => v.z)) - position.z
      ),
    };
  }

  return null;
}

/**
 * Convert an AABB to a cuboid
 */
export function aabbToCuboid(aabb: AABB): Cuboid {
  return {
    position: vec3.add(aabb.position, vec3.div(aabb.size, 2)),
    size: aabb.size,
    rotation: vec3(0, 0, 0),
  };
}

/**
 * Check if two AABBs overlap and return the overlapping area if they do
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
  const overlapZ = overlapInterval(
    { min: a.position.z, max: a.position.z + a.size.z },
    { min: b.position.z, max: b.position.z + b.size.z }
  );

  // If the AABBs don't overlap on one or more axes, they don't overlap at all
  if (!overlapX || !overlapY || !overlapZ) {
    return { intersects: false };
  }

  return {
    intersects: true,
    overlap: {
      position: vec3(overlapX.min, overlapY.min, overlapZ.min),
      size: vec3(
        overlapX.max - overlapX.min,
        overlapY.max - overlapY.min,
        overlapZ.max - overlapZ.min
      ),
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
  const max = vec3.add(position, size);

  // Check if the point is inside the AABB
  const intersects =
    valueInInterval(point.x, { min: min.x, max: max.x }) &&
    valueInInterval(point.y, { min: min.y, max: max.y }) &&
    valueInInterval(point.z, { min: min.z, max: max.z });

  // Find the closest point on the AABB surface to the given point
  let closestPoint: Point;
  if (!intersects) {
    // If the point is outside, clamp to the box
    closestPoint = vec3(
      clamp(point.x, min.x, max.x),
      clamp(point.y, min.y, max.y),
      clamp(point.z, min.z, max.z)
    );
  } else {
    // If the point is inside, project to the nearest edge
    const distances = [
      { x: min.x, y: point.y, z: point.z, d: Math.abs(point.x - min.x) }, // left
      { x: max.x, y: point.y, z: point.z, d: Math.abs(point.x - max.x) }, // right
      { x: point.x, y: min.y, z: point.z, d: Math.abs(point.y - min.y) }, // bottom
      { x: point.x, y: max.y, z: point.z, d: Math.abs(point.y - max.y) }, // top
      { x: point.x, y: point.y, z: min.z, d: Math.abs(point.z - min.z) }, // front
      { x: point.x, y: point.y, z: max.z, d: Math.abs(point.z - max.z) }, // back
    ];
    const nearest = distances.reduce((a, b) => (a.d < b.d ? a : b));
    closestPoint = vec3(nearest.x, nearest.y, nearest.z);
  }

  // Calculate the distance from the point to the closest point
  const distance = vec3.len(vec3.sub(point, closestPoint));

  // If the point is inside, distance should be negative
  return {
    intersects,
    closestPoint,
    distance: intersects ? -distance : distance,
  };
}

/**
 * Check if a cuboid is rotated
 */
export function cuboidIsRotated(cuboid: Cuboid): boolean {
  return cuboid.rotation !== undefined && !vectorAlmostZero(cuboid.rotation);
}

/**
 * Get the vertices of a cuboid
 *
 * Vertices will be returned in the following order:
 * - Upper face (max z, clockwise starting at the top-left)
 *   - Top-left
 *   - Top-right
 *   - Bottom-right
 *   - Bottom-left
 * - Lower face (min z, clockwise starting at the top-left)
 *   - Top-left
 *   - Top-right
 *   - Bottom-right
 *   - Bottom-left
 */
export function cuboidVertices(cuboid: Cuboid): Point[] {
  const { position, size, rotation = vec3() } = cuboid;
  const halfSize = vec3.div(size, 2);

  // Calculate the 8 corners of the cuboid
  let upperTopLeftOffset = vec3.fromComponents(vec3.swiz(halfSize, 'XYz'));
  let upperTopRightOffset = vec3.fromComponents(vec3.swiz(halfSize, 'xYz'));
  let upperBottomRightOffset = vec3.fromComponents(vec3.swiz(halfSize, 'xyz'));
  let upperBottomLeftOffset = vec3.fromComponents(vec3.swiz(halfSize, 'Xyz'));
  let lowerTopLeftOffset = vec3.fromComponents(vec3.swiz(halfSize, 'XYZ'));
  let lowerTopRightOffset = vec3.fromComponents(vec3.swiz(halfSize, 'xYZ'));
  let lowerBottomRightOffset = vec3.fromComponents(vec3.swiz(halfSize, 'xyZ'));
  let lowerBottomLeftOffset = vec3.fromComponents(vec3.swiz(halfSize, 'XyZ'));

  // Rotate the offsets if the cuboid is rotated
  if (cuboidIsRotated(cuboid)) {
    upperTopLeftOffset = vec3.rota(upperTopLeftOffset, rotation);
    upperTopRightOffset = vec3.rota(upperTopRightOffset, rotation);
    upperBottomRightOffset = vec3.rota(upperBottomRightOffset, rotation);
    upperBottomLeftOffset = vec3.rota(upperBottomLeftOffset, rotation);
    lowerTopLeftOffset = vec3.rota(lowerTopLeftOffset, rotation);
    lowerTopRightOffset = vec3.rota(lowerTopRightOffset, rotation);
    lowerBottomRightOffset = vec3.rota(lowerBottomRightOffset, rotation);
    lowerBottomLeftOffset = vec3.rota(lowerBottomLeftOffset, rotation);
  }
  return [
    // Upper face vertices
    vec3.add(position, upperTopLeftOffset),
    vec3.add(position, upperTopRightOffset),
    vec3.add(position, upperBottomRightOffset),
    vec3.add(position, upperBottomLeftOffset),
    // Lower face vertices
    vec3.add(position, lowerTopLeftOffset),
    vec3.add(position, lowerTopRightOffset),
    vec3.add(position, lowerBottomRightOffset),
    vec3.add(position, lowerBottomLeftOffset),
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
 * Check if a polygon is valid
 *
 * A polygon is valid if it has exactly 3 vertices
 */
export function polygonIsValid(polygon: Polygon): boolean {
  return polygon.vertices.length === 3;
}

/**
 * Determine the winding order of a polygon's vertices
 *
 * Returns 'clockwise' or 'counter-clockwise'
 *
 * By default uses the right-hand rule: if the vertices are ordered
 * counter-clockwise, the normal points towards the viewer
 *
 * Returns null if the polygon is invalid or degenerate
 */
export function polygonWindingOrder(
  polygon: Polygon,
  options?: {
    /**
     * Which hand rule to use for determining winding order
     * - 'right' (default): Counter-clockwise vertices create a normal pointing
     *   towards viewer
     * - 'left': Clockwise vertices create a normal pointing towards viewer
     */
    handedness?: 'right' | 'left';
    /**
     * Optional normal vector to use as reference
     * If provided, winding order will be determined relative to this vector
     */
    normal?: Point;
  }
): 'clockwise' | 'counter-clockwise' | null {
  if (!polygonIsValid(polygon)) {
    return null;
  }

  const [a, b, c] = polygon.vertices;
  const handedness = options?.handedness || 'right';

  // Calculate vectors from vertex a to b and a to c
  const ab = vec3.sub(b, a);
  const ac = vec3.sub(c, a);

  // Calculate normal vector using cross product
  const normal = vec3.cross(ab, ac);

  // If normal is zero vector (or very close to zero), vertices are collinear
  if (vectorAlmostZero(normal)) {
    return null;
  }

  // If a reference normal was provided, use it
  if (options?.normal) {
    const dot = vec3.dot(vec3.nor(normal), vec3.nor(options.normal));

    // Dot product > 0 means normals point in similar direction
    if (Math.abs(dot) < constants.EPSILON) {
      return null; // Normals are perpendicular, can't determine order
    }

    if (handedness === 'right') {
      return dot > 0 ? 'counter-clockwise' : 'clockwise';
    } else {
      return dot > 0 ? 'clockwise' : 'counter-clockwise';
    }
  }

  // Without a reference normal, we'll use the z-component of the normal
  // to determine winding order (positive z points towards viewer)
  if (Math.abs(normal.z) < constants.EPSILON) {
    return null; // Normal is perpendicular to view direction
  }

  if (handedness === 'right') {
    return normal.z > 0 ? 'counter-clockwise' : 'clockwise';
  } else {
    return normal.z > 0 ? 'clockwise' : 'counter-clockwise';
  }
}

/**
 * Calculate the 2D area of a polygon in 3D space
 *
 * Returns null if the polygon is invalid
 */
export function polygonArea(polygon: Polygon): number | null {
  if (!polygonIsValid(polygon)) {
    return null;
  }
  const [a, b, c] = polygon.vertices;

  // Use the shoelace formula to calculate the area of the triangle
  // https://en.wikipedia.org/wiki/Shoelace_formula
  return (
    Math.abs(
      a.x * (b.y - b.x) * a.y +
        b.x * (c.y - c.x) * b.y +
        c.x * (a.y - a.x) * c.y
    ) / 2
  );
}

/**
 * Calculate the centroid of a polygon
 *
 * Returns null if the polygon is invalid
 */
export function polygonCentroid(polygon: Polygon): Point | null {
  if (!polygonIsValid(polygon)) {
    return null;
  }
  return vec3.div(
    vec3.add(
      polygon.vertices[0],
      vec3.add(polygon.vertices[1], polygon.vertices[2])
    ),
    3
  );
}

/**
 * Convert a list of polygons to a mesh
 *
 * This optimises the number of vertices and edges by merging common vertices
 */
export function polygonsToMesh(polygons: Polygon[]): Mesh {
  if (polygons.length === 0) {
    return { vertices: [], indices: [] };
  }

  // Create a map to store unique vertices
  const vertexMap: Map<string, Point> = new Map();
  const indices: number[] = [];

  // Iterate over each polygon
  polygons.forEach((polygon, polygonIndex) => {
    if (!polygonIsValid(polygon)) {
      throw new Error(`Invalid polygon at index ${polygonIndex}`);
    }

    // Iterate over each vertex in the polygon
    polygon.vertices.forEach(vertex => {
      // Create a unique key for the vertex
      const key = `${vertex.x},${vertex.y},${vertex.z}`;
      if (!vertexMap.has(key)) {
        // If the vertex is not in the map, add it
        vertexMap.set(key, vertex);
      }
      // Get the index of the vertex in the map
      const index = Array.from(vertexMap.keys()).indexOf(key);
      indices.push(index);
    });
  });

  // Convert the vertex map to an array
  const vertices: Point[] = Array.from(vertexMap.values());

  return {
    vertices,
    indices,
  };
}

/**
 * Convert a mesh to a list of polygons
 */
export function meshToPolygons(mesh: Mesh): Polygon[] {
  if (mesh.indices.length % 3 !== 0) {
    throw new Error('Mesh indices must be a multiple of 3 to form triangles');
  }
  const polygons: Polygon[] = [];
  for (let i = 0; i < mesh.indices.length; i += 3) {
    const indices = mesh.indices.slice(i, i + 3);
    if (indices.length !== 3) {
      throw new Error('Mesh indices must form triangles');
    }
    const vertices = indices.map(index => mesh.vertices[index]) as [
      Point,
      Point,
      Point
    ];
    polygons.push({ vertices });
  }
  return polygons;
}

/**
 * Convert a mesh to a list of edges
 */
export function meshToEdges(mesh: Mesh): Line[] {
  if (mesh.indices.length % 2 !== 0) {
    throw new Error('Mesh indices must be a multiple of 2 to form edges');
  }
  const edges: Line[] = [];
  for (let i = 0; i < mesh.indices.length; i += 2) {
    const startIndex = mesh.indices[i];
    const endIndex = mesh.indices[i + 1];
    if (
      startIndex >= mesh.vertices.length ||
      endIndex >= mesh.vertices.length
    ) {
      throw new Error('Mesh indices out of bounds');
    }
    edges.push({
      start: mesh.vertices[startIndex],
      end: mesh.vertices[endIndex],
    });
  }
  return edges;
}

/**
 * Calculate the centroid of a mesh
 */
export function meshCentroid(mesh: Mesh): Point {
  return vec3.div(
    mesh.vertices.reduce((acc, v) => vec3.add(acc, v), vec3()),
    mesh.vertices.length
  );
}

/**
 * Perform an edge manifold check to tell if a mesh is watertight
 *
 * Every edge in a watertight mesh should be shared by exactly two triangles
 *
 * This isn't perfect, but it should be sufficient for most simple cases
 */
export function meshIsWatertight(mesh: Mesh): boolean {
  // Create a map to store edge counts
  // Key format: "smallerVertexIndex,largerVertexIndex"
  const edgeCounts = new Map<string, number>();

  // Process each triangle
  for (let i = 0; i < mesh.indices.length; i += 3) {
    const v1 = mesh.indices[i];
    const v2 = mesh.indices[i + 1];
    const v3 = mesh.indices[i + 2];

    // For each edge in the triangle, create a canonical key
    const edges = [
      [Math.min(v1, v2), Math.max(v1, v2)],
      [Math.min(v2, v3), Math.max(v2, v3)],
      [Math.min(v3, v1), Math.max(v3, v1)],
    ];

    // Count each edge
    edges.forEach(([a, b]) => {
      const key = `${a},${b}`;
      edgeCounts.set(key, (edgeCounts.get(key) || 0) + 1);
    });
  }

  // Check if all edges appear exactly twice
  return Array.from(edgeCounts.values()).every(count => count === 2);
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
  closestPoint?: Point;
  distance: number;
} {
  // Vector from ray origin to point
  const toPoint = vec3.sub(point, ray.origin);

  // Get normalized ray direction
  const rayDirection = vec3.nor(ray.direction);

  // Project toPoint onto the ray direction
  const projection = vec3.dot(toPoint, rayDirection);

  // Calculate closest point on ray
  const closestPoint = vec3.add(
    ray.origin,
    vec3.mul(rayDirection, Math.max(0, projection))
  );

  // Calculate distance from point to closest point
  const distance = vec3.len(vec3.sub(point, closestPoint));

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
  const lineVector = vec3.sub(line.end, line.start);

  // Get normalized line direction
  const lineDirection = vec3.nor(lineVector);

  // Get vector from line start to point
  const toPoint = vec3.sub(point, line.start);

  // Project toPoint onto the line direction
  const projection = vec3.dot(toPoint, lineDirection);

  // Get line length
  const lineLength = vec3.len(lineVector);

  // Clamp projection to line segment
  const clampedProjection = Math.max(0, Math.min(lineLength, projection));

  // Calculate closest point on line segment
  const closestPoint = vec3.add(
    line.start,
    vec3.mul(lineDirection, clampedProjection)
  );

  // Calculate distance from point to closest point
  const distance = vec3.len(vec3.sub(point, closestPoint));

  return {
    // Point is on line if distance is effectively zero
    intersects: distance < constants.EPSILON,
    closestPoint,
    distance,
  };
}

/**
 * Check if a point is inside a sphere
 *
 * Also returns the closest point on the sphere edge and the distance to it
 *
 * If the point is inside the sphere, the distance will be negative
 */
export function pointInSphere(
  point: Point,
  sphere: Sphere
): {
  intersects: boolean;
  closestPoint: Point;
  distance: number;
} {
  // Calculate vector from sphere center to point
  const toPoint = vec3.sub(point, sphere.position);

  // Calculate distance from point to sphere center
  const distanceToCenter = vec3.len(toPoint);

  // Check if point is inside the sphere
  const intersects = distanceToCenter <= sphere.radius;

  // Calculate distance to circle edge
  const distance = intersects
    ? -(sphere.radius - distanceToCenter) // Negative if inside
    : distanceToCenter - sphere.radius; // Positive if outside

  // Calculate closest point on sphere edge
  const closestPoint = vec3.add(
    sphere.position,
    vec3.mul(vec3.nor(toPoint), sphere.radius)
  );

  return {
    intersects,
    closestPoint,
    distance,
  };
}

/**
 * Check if a point is inside a cuboid
 */
export function pointInCuboid(
  point: Point,
  cuboid: Cuboid
): {
  intersects: boolean;
  closestPoint: Point;
  distance: number;
} {
  const { position, size, rotation = vec3() } = cuboid;
  const halfSize = vec3.div(size, 2);

  // Transform point to local space by undoing rotation and translation
  let localPoint = vec3.sub(point, position);
  if (cuboidIsRotated(cuboid)) {
    localPoint = vec3.rota(localPoint, vec3.mul(rotation, -1));
  }

  // Calculate distances to each face in local space
  const dx = Math.max(Math.abs(localPoint.x) - halfSize.x, 0);
  const dy = Math.max(Math.abs(localPoint.y) - halfSize.y, 0);
  const dz = Math.max(Math.abs(localPoint.z) - halfSize.z, 0);

  // Calculate closest point in local space
  const closestLocalPoint = vec3(
    clamp(localPoint.x, -halfSize.x, halfSize.x),
    clamp(localPoint.y, -halfSize.y, halfSize.y),
    clamp(localPoint.z, -halfSize.z, halfSize.z)
  );

  // Transform closest point back to world space
  let closestPoint = closestLocalPoint;
  if (cuboidIsRotated(cuboid)) {
    closestPoint = vec3.rota(closestPoint, rotation);
  }
  closestPoint = vec3.add(closestPoint, position);

  // Calculate if point is inside and the distance
  const intersects = dx === 0 && dy === 0 && dz === 0;
  const distance = intersects
    ? -Math.min(
        halfSize.x - Math.abs(localPoint.x),
        halfSize.y - Math.abs(localPoint.y),
        halfSize.z - Math.abs(localPoint.z)
      )
    : Math.sqrt(dx * dx + dy * dy + dz * dz);

  return {
    intersects,
    closestPoint,
    distance,
  };
}

export function pointOnPolygon(
  point: Point,
  polygon: Polygon
): {
  intersects: boolean;
  closestPoint: Point;
  distance: number;
} | null {
  // First validate the polygon
  if (!polygonIsValid(polygon)) {
    return null;
  }
  const [v1, v2, v3] = polygon.vertices;

  // Calculate two edges of the triangle
  const edge1 = vec3.sub(v2, v1);
  const edge2 = vec3.sub(v3, v1);

  // Calculate the normal vector of the plane containing the triangle
  const normal = vec3.nor(vec3.cross(edge1, edge2));

  // Calculate plane constant d
  const d = -vec3.dot(normal, v1);

  // Calculate the signed distance from the point to the plane
  const signedDistance = vec3.dot(normal, point) + d;

  // Project the point onto the plane
  const projectedPoint = vec3.sub(point, vec3.mul(normal, signedDistance));

  // Now we need to check if the projected point is inside the triangle
  // We'll use the barycentric coordinate method
  const area = vec3.len(vec3.cross(edge1, edge2)) / 2; // Triangle area

  // Calculate barycentric coordinates using sub-triangle areas
  const edge3 = vec3.sub(v3, v2);
  const vp1 = vec3.sub(projectedPoint, v1);
  const vp2 = vec3.sub(projectedPoint, v2);
  const vp3 = vec3.sub(projectedPoint, v3);

  const alpha = vec3.len(vec3.cross(edge3, vp2)) / (2 * area);
  const beta = vec3.len(vec3.cross(edge2, vp3)) / (2 * area);
  const gamma = vec3.len(vec3.cross(edge1, vp1)) / (2 * area);

  // Point is inside triangle if all barycentric coordinates are between 0 and 1
  // and their sum is approximately 1
  const sum = alpha + beta + gamma;
  const isInside =
    alpha >= -constants.EPSILON &&
    beta >= -constants.EPSILON &&
    gamma >= -constants.EPSILON &&
    Math.abs(sum - 1) < constants.EPSILON;

  // If point is inside, the closest point is the projected point
  // If point is outside, find the closest point on the triangle's edges
  let closestPoint: Point;
  let distance: number;

  if (isInside) {
    closestPoint = projectedPoint;
    distance = Math.abs(signedDistance);
  } else {
    // Check distances to each edge
    const p1 = pointOnLine(point, { start: v1, end: v2 });
    const p2 = pointOnLine(point, { start: v2, end: v3 });
    const p3 = pointOnLine(point, { start: v3, end: v1 });

    // Find the minimum distance
    const minDist = Math.min(p1.distance, p2.distance, p3.distance);

    // Use the closest point from the edge with minimum distance
    if (minDist === p1.distance) {
      closestPoint = p1.closestPoint;
    } else if (minDist === p2.distance) {
      closestPoint = p2.closestPoint;
    } else {
      closestPoint = p3.closestPoint;
    }
    distance = minDist;
  }

  return {
    intersects: distance < constants.EPSILON,
    closestPoint,
    distance,
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
  gridTopLeftFront: vec3,
  gridBottomRightBack: vec3,
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

  // Make sure the grid boundaries are integers
  gridTopLeftFront = vec3.map(gridTopLeftFront, Math.floor);
  gridBottomRightBack = vec3.map(gridBottomRightBack, Math.ceil);

  // Normalize ray direction and handle zero components
  const rayDir = vec3.nor(ray.direction);
  if (vectorAlmostZero(rayDir)) {
    return { cells: [] };
  }

  const cells: Point[] = [];

  // Calculate initial cell coordinates
  let currentCell = vec3.map(
    vec3.div(vec3.sub(ray.origin, gridTopLeftFront), cellSize),
    Math.floor
  );

  // Calculate grid size in cells
  const gridSize = vec3.sub(gridBottomRightBack, gridTopLeftFront);

  // If starting point is outside grid bounds, find entry point
  if (
    currentCell.x < 0 ||
    currentCell.x >= gridSize.x ||
    currentCell.y < 0 ||
    currentCell.y >= gridSize.y ||
    currentCell.z < 0 ||
    currentCell.z >= gridSize.z
  ) {
    // Use cuboid intersection to find grid entry point
    const gridCuboid = {
      position: vec3.add(
        gridTopLeftFront,
        vec3.div(vec3.sub(gridBottomRightBack, gridTopLeftFront), 2)
      ),
      size: vec3.sub(gridBottomRightBack, gridTopLeftFront),
    };

    const intersection = rayIntersectsCuboid(ray, gridCuboid);
    if (!intersection.intersects || !intersection.intersectionPoints) {
      return { cells }; // Ray misses grid entirely
    }

    // Get the first intersection point (closest to ray origin)
    const entryPoint = intersection.intersectionPoints[0];
    currentCell = vec3.map(
      vec3.div(vec3.sub(entryPoint, gridTopLeftFront), cellSize),
      Math.floor
    );

    // Check if entry point is valid
    if (
      currentCell.x < 0 ||
      currentCell.x >= gridSize.x ||
      currentCell.y < 0 ||
      currentCell.y >= gridSize.y ||
      currentCell.z < 0 ||
      currentCell.z >= gridSize.z
    ) {
      return { cells }; // No valid entry point found
    }
  }

  // Calculate step direction (either 1 or -1) for each axis
  const step = {
    x: Math.sign(rayDir.x),
    y: Math.sign(rayDir.y),
    z: Math.sign(rayDir.z),
  };

  // Calculate tDelta - distance along ray from one grid line to next
  const tDelta = {
    x: rayDir.x !== 0 ? Math.abs(cellSize / rayDir.x) : Infinity,
    y: rayDir.y !== 0 ? Math.abs(cellSize / rayDir.y) : Infinity,
    z: rayDir.z !== 0 ? Math.abs(cellSize / rayDir.z) : Infinity,
  };

  // Calculate initial cell boundary positions
  const initialBoundary = vec3(
    gridTopLeftFront.x + (currentCell.x + (step.x > 0 ? 1 : 0)) * cellSize,
    gridTopLeftFront.y + (currentCell.y + (step.y > 0 ? 1 : 0)) * cellSize,
    gridTopLeftFront.z + (currentCell.z + (step.z > 0 ? 1 : 0)) * cellSize
  );

  // Calculate initial tMax values
  const tMax = {
    x:
      rayDir.x !== 0
        ? Math.abs((initialBoundary.x - ray.origin.x) / rayDir.x)
        : Infinity,
    y:
      rayDir.y !== 0
        ? Math.abs((initialBoundary.y - ray.origin.y) / rayDir.y)
        : Infinity,
    z:
      rayDir.z !== 0
        ? Math.abs((initialBoundary.z - ray.origin.z) / rayDir.z)
        : Infinity,
  };

  // If we're exactly on a boundary, we need to adjust tMax
  if (Math.abs(ray.origin.x - initialBoundary.x) < constants.EPSILON) {
    tMax.x = tDelta.x;
  }
  if (Math.abs(ray.origin.y - initialBoundary.y) < constants.EPSILON) {
    tMax.y = tDelta.y;
  }
  if (Math.abs(ray.origin.z - initialBoundary.z) < constants.EPSILON) {
    tMax.z = tDelta.z;
  }

  // Add starting cell
  cells.push(vec3(currentCell.x, currentCell.y, currentCell.z));
  let cellCount = 1;

  // Main loop
  while (
    cellCount < maxCells &&
    currentCell.x >= 0 &&
    currentCell.x < gridSize.x &&
    currentCell.y >= 0 &&
    currentCell.y < gridSize.y &&
    currentCell.z >= 0 &&
    currentCell.z < gridSize.z
  ) {
    // Advance to next cell based on shortest tMax
    if (tMax.x < tMax.y && tMax.x < tMax.z) {
      tMax.x += tDelta.x;
      currentCell.x += step.x;
    } else if (tMax.y < tMax.z) {
      tMax.y += tDelta.y;
      currentCell.y += step.y;
    } else {
      tMax.z += tDelta.z;
      currentCell.z += step.z;
    }

    // Check if we're still in bounds
    if (
      currentCell.x < 0 ||
      currentCell.x >= gridSize.x ||
      currentCell.y < 0 ||
      currentCell.y >= gridSize.y ||
      currentCell.z < 0 ||
      currentCell.z >= gridSize.z
    ) {
      break;
    }

    // Add current cell
    cells.push(vec3(currentCell.x, currentCell.y, currentCell.z));
    cellCount++;
  }

  return { cells };
}

/**
 * Check if a ray intersects a sphere
 */
export function rayIntersectsSphere(
  ray: Ray,
  sphere: Sphere
): {
  intersects: boolean;
  intersectionPoints?: Point[];
} {
  // Normalize ray direction
  const rayDir = vec3.nor(ray.direction);

  // Calculate vector from ray origin to sphere center
  const toCenter = vec3.sub(sphere.position, ray.origin);

  // Calculate quadratic equation coefficients
  // a = dot(dir, dir) (should be 1 since dir is normalized)
  const a = vec3.dot(rayDir, rayDir);

  // b = 2 * dot(dir, (origin - center))
  const b = 2 * vec3.dot(rayDir, vec3.mul(toCenter, -1));

  // c = dot((origin - center), (origin - center)) - radius²
  const c = vec3.dot(toCenter, toCenter) - sphere.radius * sphere.radius;

  // Solve quadratic equation using discriminant
  const discriminant = b * b - 4 * a * c;

  // No intersection if discriminant is negative
  if (discriminant < -constants.EPSILON) {
    return { intersects: false };
  }

  // Handle case where ray just touches sphere (discriminant ≈ 0)
  if (Math.abs(discriminant) < constants.EPSILON) {
    const t = -b / (2 * a);
    if (t >= 0) {
      const point = vec3.add(ray.origin, vec3.mul(rayDir, t));
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

  // If both t values are negative, ray points away from sphere
  if (t2 < 0) {
    return { intersects: false };
  }

  // Calculate intersection points for positive t values
  const intersectionPoints: Point[] = [];
  if (t1 >= 0) {
    intersectionPoints.push(vec3.add(ray.origin, vec3.mul(rayDir, t1)));
  }
  if (t2 >= 0) {
    intersectionPoints.push(vec3.add(ray.origin, vec3.mul(rayDir, t2)));
  }

  return {
    intersects: intersectionPoints.length > 0,
    intersectionPoints:
      intersectionPoints.length > 0 ? intersectionPoints : undefined,
  };
}

/**
 * Check if a ray intersects a plane
 */
export function rayIntersectsPlane(
  ray: Ray,
  plane: Plane
): {
  intersects: boolean;
  intersectionPoint?: Point;
} {
  // Normalize the ray direction and plane normal
  const rayDir = vec3.nor(ray.direction);
  const planeNormal = vec3.nor(plane.normal);

  // Calculate denominator (dot product of ray direction and plane normal)
  const denominator = vec3.dot(rayDir, planeNormal);

  // If denominator is close to 0, ray is parallel to plane
  if (Math.abs(denominator) < constants.EPSILON) {
    return { intersects: false };
  }

  // Calculate distance from ray origin to plane
  const t =
    vec3.dot(vec3.sub(plane.point, ray.origin), planeNormal) / denominator;

  // If t is negative, intersection is behind ray origin
  if (t < 0) {
    return { intersects: false };
  }

  // Calculate intersection point
  const intersectionPoint = vec3.add(ray.origin, vec3.mul(rayDir, t));

  return {
    intersects: true,
    intersectionPoint,
  };
}

/**
 * Check if a ray intersects a cuboid
 */
export function rayIntersectsCuboid(
  ray: Ray,
  cuboid: Cuboid
): {
  intersects: boolean;
  intersectionPoints?: Point[];
} {
  // Normalize ray direction
  const rayDir = vec3.nor(ray.direction);

  // Extract cuboid properties with default rotation
  const { position, size, rotation = vec3() } = cuboid;

  // Transform ray to local space if cuboid is rotated
  let localRayOrigin = vec3.sub(ray.origin, position);
  let localRayDir = rayDir;

  if (cuboidIsRotated(cuboid)) {
    // Undo rotation by applying inverse rotation to ray
    const inverseRotation = vec3.mul(rotation, -1);
    localRayOrigin = vec3.rota(localRayOrigin, inverseRotation);
    localRayDir = vec3.rota(localRayDir, inverseRotation);
  }

  const halfSize = vec3.div(size, 2);

  // Calculate intersection with each pair of parallel planes
  const txMin = vec3.div(
    vec3.sub(vec3.mul(halfSize, -1), localRayOrigin),
    localRayDir
  );
  const txMax = vec3.div(vec3.sub(halfSize, localRayOrigin), localRayDir);

  // Find the farthest near intersection and the closest far intersection
  const tNear = vec3(
    Math.min(txMin.x, txMax.x),
    Math.min(txMin.y, txMax.y),
    Math.min(txMin.z, txMax.z)
  );
  const tFar = vec3(
    Math.max(txMin.x, txMax.x),
    Math.max(txMin.y, txMax.y),
    Math.max(txMin.z, txMax.z)
  );

  // If the largest tNear is greater than the smallest tFar, there is no
  // intersection
  const tMin = Math.max(tNear.x, tNear.y, tNear.z);
  const tMax = Math.min(tFar.x, tFar.y, tFar.z);

  if (tMin > tMax || tMax < 0) {
    return { intersects: false };
  }

  // Calculate intersection points
  const intersectionPoints: Point[] = [];

  // Add entry point if it's in front of ray origin
  if (tMin >= 0) {
    let point = vec3.add(localRayOrigin, vec3.mul(localRayDir, tMin));
    if (cuboidIsRotated(cuboid)) {
      point = vec3.rota(point, rotation);
    }
    intersectionPoints.push(vec3.add(position, point));
  }

  // Add exit point if different from entry point
  if (tMax > tMin && tMax >= 0) {
    let point = vec3.add(localRayOrigin, vec3.mul(localRayDir, tMax));
    if (cuboidIsRotated(cuboid)) {
      point = vec3.rota(point, rotation);
    }
    intersectionPoints.push(vec3.add(position, point));
  }

  return {
    intersects: intersectionPoints.length > 0,
    intersectionPoints:
      intersectionPoints.length > 0 ? intersectionPoints : undefined,
  };
}
