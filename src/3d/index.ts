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
 * @see encloseAABBs
 *
 * Cuboid utilities
 * @see cuboidIsRotated
 * @see cuboidVertices
 * @see cuboidToPolygons
 *
 * Polygon utilities
 * @see verticesToEdges
 * @see polygonIsValid
 * @see polygonWindingOrder
 * @see polygonArea
 * @see polygonCentroid
 * @see polygonToPlane
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
 * @see rayIntersectsRay
 * @see rayIntersectsLine
 * @see rayIntersectsSphere
 * @see rayIntersectsPlane
 * @see rayIntersectsCuboid
 * @see rayIntersectsPolygon
 * @see rayIntersectsMesh
 *
 * Lines
 * @see lineIntersectsRay
 * @see lineIntersectsLine
 * @see lineIntersectsSphere
 * @see lineIntersectsPlane
 * @see lineIntersectsCuboid
 * @see lineIntersectsPolygon
 * @see lineIntersectsMesh
 *
 * Spheres
 * @see sphereIntersectsSphere
 * @see sphereIntersectsPlane
 * @see sphereIntersectsCuboid
 * @see sphereIntersectsPolygon
 * @see sphereIntersectsMesh
 *
 * Planes
 * @see planeIntersectsPlane
 * @see planeIntersectsMesh
 *
 * Cuboids
 * @see cuboidIntersectsCuboid
 * @see cuboidIntersectsPlane
 * @see cuboidIntersectsPolygon
 * @see cuboidIntersectsMesh
 *
 * Polygons
 * @see polygonIntersectsPolygon
 * @see polygonIntersectsPlane
 * @see polygonIntersectsMesh
 *
 * Meshes
 * @see meshIntersectsMesh
 * @see meshIntersectsPlane
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
 * Check if two AABBs overlap and return the overlapping volume if they do
 */
export function aabbsOverlap(
  a: AABB,
  b: AABB
): {
  /**
   * Whether the two AABBs overlap
   */
  intersects: boolean;

  /**
   * The overlapping volume as an AABB
   */
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
  /**
   * Whether the point is inside the AABB
   */
  intersects: boolean;

  /**
   * The closest point on the AABB surface to the given point
   */
  closestPoint: Point;

  /**
   * The distance from the point to the closest point on the AABB
   *
   * If the point is inside the AABB, this will be negative
   */
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
 * Enclose a set of AABBs in a single AABB
 */
export function encloseAABBs(...aabbs: AABB[]): AABB {
  if (aabbs.length === 0) {
    return { position: vec3(), size: vec3() };
  }

  const minX = Math.min(...aabbs.map(({ position }) => position.x));
  const minY = Math.min(...aabbs.map(({ position }) => position.y));
  const minZ = Math.min(...aabbs.map(({ position }) => position.z));
  const maxX = Math.max(
    ...aabbs.map(({ position, size }) => position.x + size.x)
  );
  const maxY = Math.max(
    ...aabbs.map(({ position, size }) => position.y + size.y)
  );
  const maxZ = Math.max(
    ...aabbs.map(({ position, size }) => position.z + size.z)
  );

  return {
    position: vec3(minX, minY, minZ),
    size: vec3(maxX - minX, maxY - minY, maxZ - minZ),
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
 * Convert a cuboid to a list of polygons representing its faces
 *
 * Polygons will be returned in the following order:
 * - Upper face (top)
 * - Lower face (bottom)
 * - Front face
 * - Back face
 * - Left face
 * - Right face
 */
export function cuboidToPolygons(cuboid: Cuboid): Polygon[] {
  const vertices = cuboidVertices(cuboid);
  if (vertices.length !== 8) {
    throw new Error('Cuboid must have exactly 8 vertices');
  }

  // Create polygons for each face of the cuboid
  return [
    // Upper face
    { vertices: [vertices[0], vertices[1], vertices[2]] },
    { vertices: [vertices[0], vertices[2], vertices[3]] },
    // Lower face
    { vertices: [vertices[4], vertices[5], vertices[6]] },
    { vertices: [vertices[4], vertices[6], vertices[7]] },
    // Front face
    { vertices: [vertices[0], vertices[1], vertices[5]] },
    { vertices: [vertices[0], vertices[5], vertices[4]] },
    // Back face
    { vertices: [vertices[2], vertices[3], vertices[7]] },
    { vertices: [vertices[2], vertices[7], vertices[6]] },
    // Left face
    { vertices: [vertices[0], vertices[3], vertices[7]] },
    { vertices: [vertices[0], vertices[7], vertices[4]] },
    // Right face
    { vertices: [vertices[1], vertices[2], vertices[6]] },
    { vertices: [vertices[1], vertices[6], vertices[5]] },
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
     *
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
 * Convert a polygon to a plane
 */
export function polygonToPlane(polygon: Polygon): Plane | null {
  if (!polygonIsValid(polygon)) {
    return null;
  }

  // Calculate the normal vector
  const [a, b, c] = polygon.vertices;
  const ab = vec3.sub(b, a);
  const ac = vec3.sub(c, a);
  const normal = vec3.nor(vec3.cross(ab, ac));

  // Calculate the plane's position as the centroid of the polygon
  const point = polygonCentroid(polygon)!;

  return {
    point,
    normal,
  };
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
  /**
   * Whether the point is on the ray
   */
  intersects: boolean;

  /**
   * The closest point on the ray to the given point
   */
  closestPoint?: Point;

  /**
   * The distance from the point to the closest point on the ray
   */
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
  /**
   * Whether the point is on the line segment
   */
  intersects: boolean;

  /**
   * The closest point on the line segment to the given point
   */
  closestPoint: Point;

  /**
   * The distance from the point to the closest point on the line segment
   */
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
  /**
   * Whether the point is in the sphere
   */
  intersects: boolean;

  /**
   * The closest point on the sphere surface to the given point
   */
  closestPoint: Point;

  /**
   * The distance from the point to the closest point on the sphere
   *
   * If the point is inside the sphere, this will be negative
   */
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
  /**
   * Whether the point is inside the cuboid
   */
  intersects: boolean;

  /**
   * The closest point on the cuboid surface to the given point
   */
  closestPoint: Point;

  /**
   * The distance from the point to the closest point on the cuboid
   *
   * If the point is inside the cuboid, this will be negative
   */
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
  /**
   * Whether the point intersects the polygon
   */
  intersects: boolean;

  /**
   * The closest point on the polygon to the given point
   */
  closestPoint: Point;

  /**
   * The distance from the point to the closest point on the polygon
   */
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
 * Check if two rays intersect
 */
export function rayIntersectsRay(
  rayA: Ray,
  rayB: Ray
): {
  /**
   * Whether the rays intersect
   */
  intersects: boolean;

  /**
   * The intersection point if the rays intersect
   */
  intersectionPoint?: Point;
} {
  // Normalize ray directions
  const dirA = vec3.nor(rayA.direction);
  const dirB = vec3.nor(rayB.direction);

  // If either ray has zero direction, they cannot intersect
  if (vectorAlmostZero(dirA) || vectorAlmostZero(dirB)) {
    return {
      intersects: false,
    };
  }

  // Calculate vector between ray origins
  const originDiff = vec3.sub(rayB.origin, rayA.origin);

  // Calculate triple products
  const normal = vec3.cross(dirA, dirB);
  const normalLengthSq = vec3.dot(normal, normal);

  // If normal is zero, rays are parallel
  if (normalLengthSq < constants.EPSILON) {
    // Check if rays are coincident
    const crossOrigins = vec3.cross(originDiff, dirA);
    if (vec3.len(crossOrigins) < constants.EPSILON) {
      // Rays are coincident - return point on rayA closest to rayB.origin
      const t = vec3.dot(originDiff, dirA);
      if (t >= 0) {
        return {
          intersects: true,
          intersectionPoint: vec3.add(rayA.origin, vec3.mul(dirA, t)),
        };
      }
    }
    return { intersects: false };
  }

  // Calculate parameters for closest points
  const c1 = vec3.dot(originDiff, vec3.cross(dirB, normal)) / normalLengthSq;
  const c2 = vec3.dot(originDiff, vec3.cross(dirA, normal)) / normalLengthSq;

  // If either parameter is negative, closest points are behind ray origins
  if (c1 < 0 || c2 < 0) {
    return { intersects: false };
  }

  // Calculate closest points on each ray
  const pointA = vec3.add(rayA.origin, vec3.mul(dirA, c1));
  const pointB = vec3.add(rayB.origin, vec3.mul(dirB, c2));

  // Check if points are close enough to consider intersection
  const distance = vec3.len(vec3.sub(pointA, pointB));
  if (distance < constants.EPSILON) {
    // Use midpoint as intersection point
    return {
      intersects: true,
      intersectionPoint: vec3.add(
        pointA,
        vec3.mul(vec3.sub(pointB, pointA), 0.5)
      ),
    };
  }

  return { intersects: false };
}

/**
 * Check if a ray intersects a line segment
 */
export function rayIntersectsLine(
  ray: Ray,
  line: Line
): {
  /**
   * Whether the ray intersects the line segment
   */
  intersects: boolean;

  /**
   * The intersection point if the ray intersects the line segment
   */
  intersectionPoint?: Point;
} {
  // Convert line to a direction vector
  let lineDir = vec3.sub(line.end, line.start);
  const lineLength = vec3.len(lineDir);

  // If the line has zero length, it cannot intersect
  if (lineLength < constants.EPSILON) {
    return {
      intersects: false,
    };
  }

  // Normalize ray and line directions
  const rayDir = vec3.nor(ray.direction);
  lineDir = vec3.div(lineDir, lineLength); // Normalize line direction

  // Calculate vector between ray origin and line start
  const startDiff = vec3.sub(line.start, ray.origin);

  // Calculate triple products
  const normal = vec3.cross(rayDir, lineDir);
  const normalLengthSq = vec3.dot(normal, normal);

  // If normal is zero, ray and line are parallel
  if (normalLengthSq < constants.EPSILON) {
    // Check if they are collinear
    const crossOrigins = vec3.cross(startDiff, rayDir);
    if (vec3.len(crossOrigins) < constants.EPSILON) {
      // They are collinear - find closest point on line to ray origin
      const t = vec3.dot(startDiff, lineDir);
      if (t >= 0 && t <= lineLength) {
        return {
          intersects: true,
          intersectionPoint: vec3.add(line.start, vec3.mul(lineDir, t)),
        };
      }
    }
    return { intersects: false };
  }

  // Calculate parameters for closest points
  const c1 = vec3.dot(startDiff, vec3.cross(lineDir, normal)) / normalLengthSq;
  const c2 = vec3.dot(startDiff, vec3.cross(rayDir, normal)) / normalLengthSq;

  // Check if intersection occurs on ray and within line segment bounds
  if (c1 >= 0 && c2 >= 0 && c2 <= lineLength) {
    // Calculate closest points
    const pointOnRay = vec3.add(ray.origin, vec3.mul(rayDir, c1));
    const pointOnLine = vec3.add(line.start, vec3.mul(lineDir, c2));

    // Check if points are close enough to consider intersection
    const distance = vec3.len(vec3.sub(pointOnRay, pointOnLine));
    if (distance < constants.EPSILON) {
      // Use midpoint as intersection point
      return {
        intersects: true,
        intersectionPoint: vec3.add(
          pointOnRay,
          vec3.mul(vec3.sub(pointOnLine, pointOnRay), 0.5)
        ),
      };
    }
  }

  return { intersects: false };
}

/**
 * Check if a ray intersects a sphere
 */
export function rayIntersectsSphere(
  ray: Ray,
  sphere: Sphere
): {
  /**
   * Whether the ray intersects the sphere
   */
  intersects: boolean;

  /**
   * The intersection points if the ray intersects the sphere
   */
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
  /**
   * Whether the ray intersects the plane
   */
  intersects: boolean;

  /**
   * The intersection point if the ray intersects the plane
   *
   * If the ray lies in the plane, this will be undefined since there are
   * infinite intersection points
   */
  intersectionPoint?: Point;
} {
  // Normalize the ray direction and plane normal
  const rayDir = vec3.nor(ray.direction);
  const planeNormal = vec3.nor(plane.normal);

  // Calculate denominator (dot product of ray direction and plane normal)
  const denominator = vec3.dot(rayDir, planeNormal);

  // If denominator is close to 0, ray is parallel to plane
  if (Math.abs(denominator) < constants.EPSILON) {
    // Check if the ray lies in the plane (origin is on the plane)
    const distanceToPlane = vec3.dot(
      vec3.sub(ray.origin, plane.point),
      planeNormal
    );
    if (Math.abs(distanceToPlane) < constants.EPSILON) {
      // Ray lies in the plane: infinite intersection points
      return { intersects: true };
    }
    // Ray is parallel and not on the plane
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
  /**
   * Whether the ray intersects the cuboid
   */
  intersects: boolean;

  /**
   * The intersection points if the ray intersects the cuboid
   */
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

/**
 * Check if a ray intersects a polygon
 */
export function rayIntersectsPolygon(
  ray: Ray,
  polygon: Polygon
): {
  /**
   * Whether the ray intersects the polygon
   */
  intersects: boolean;

  /**
   * The intersection point if the ray intersects the polygon
   */
  intersectionPoint?: Point;
} | null {
  // First validate the polygon
  if (!polygonIsValid(polygon)) {
    return null;
  }

  // Calculate the plane of the polygon
  const [v1, v2, v3] = polygon.vertices;
  const edge1 = vec3.sub(v2, v1);
  const edge2 = vec3.sub(v3, v1);
  const normal = vec3.nor(vec3.cross(edge1, edge2));

  // Create a plane from the polygon
  const plane: Plane = {
    point: v1,
    normal,
  };

  // Check if the ray intersects the plane
  const intersection = rayIntersectsPlane(ray, plane);
  if (!intersection.intersects || !intersection.intersectionPoint) {
    return { intersects: false };
  }

  // Check if the intersection point is inside the polygon
  const pointCheck = pointOnPolygon(intersection.intersectionPoint, polygon);
  if (!pointCheck || !pointCheck.intersects) {
    return { intersects: false };
  }

  return {
    intersects: true,
    intersectionPoint: intersection.intersectionPoint,
  };
}

/**
 * Check if a ray intersects any of the polygons in a mesh
 */
export function rayIntersectsMesh(
  ray: Ray,
  mesh: Mesh
): {
  /**
   * Whether the ray intersects any polygon in the mesh
   */
  intersects: boolean;

  /**
   * The intersection points if the ray intersects any polygon in the mesh
   */
  intersectionPoints?: Point[];
} {
  const polygons = meshToPolygons(mesh);
  const intersectionPoints: Point[] = [];

  polygons.forEach(polygon => {
    const intersection = rayIntersectsPolygon(ray, polygon);
    if (intersection && intersection.intersects) {
      intersectionPoints.push(intersection.intersectionPoint!);
    }
  });

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
  /**
   * Whether the line segment intersects the ray
   */
  intersects: boolean;

  /**
   * The intersection point if the line segment intersects the ray
   */
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
  /**
   * Whether the two line segments intersect
   */
  intersects: boolean;

  /**
   * The intersection point if the line segments intersect
   */
  intersectionPoint?: Point;
} {
  // Convert lines to direction vectors
  const dirA = vec3.sub(lineA.end, lineA.start);
  const dirB = vec3.sub(lineB.end, lineB.start);

  // Get line lengths
  const lengthA = vec3.len(dirA);
  const lengthB = vec3.len(dirB);

  // If either line has zero length, they cannot intersect
  if (lengthA < constants.EPSILON || lengthB < constants.EPSILON) {
    return { intersects: false };
  }

  // Normalize directions
  const normA = vec3.div(dirA, lengthA);
  const normB = vec3.div(dirB, lengthB);

  // Calculate vector between line starts
  const startDiff = vec3.sub(lineB.start, lineA.start);

  // Calculate cross product of directions
  const normal = vec3.cross(normA, normB);
  const normalLengthSq = vec3.dot(normal, normal);

  // If normal is zero, lines are parallel
  if (normalLengthSq < constants.EPSILON) {
    // Check if they are collinear
    const crossStarts = vec3.cross(startDiff, normA);
    if (vec3.len(crossStarts) < constants.EPSILON) {
      // They are collinear - check for overlap
      const t0 = vec3.dot(startDiff, normA);
      const t1 = t0 + vec3.dot(dirB, normA);

      // Find overlap interval
      const tMin = Math.min(t0, t1);
      const tMax = Math.max(t0, t1);

      // Check if lines overlap
      if (tMin <= lengthA && tMax >= 0) {
        // Calculate intersection point at middle of overlap
        const t = clamp(0, Math.max(0, tMin), lengthA);
        return {
          intersects: true,
          intersectionPoint: vec3.add(lineA.start, vec3.mul(normA, t)),
        };
      }
    }
    return { intersects: false };
  }

  // Calculate parameters for closest points
  const c1 = vec3.dot(startDiff, vec3.cross(dirB, normal)) / normalLengthSq;
  const c2 = vec3.dot(startDiff, vec3.cross(dirA, normal)) / normalLengthSq;

  // Check if closest points lie within line segments
  if (c1 >= 0 && c1 <= lengthA && c2 >= 0 && c2 <= lengthB) {
    // Calculate closest points
    const pointOnA = vec3.add(lineA.start, vec3.mul(normA, c1));
    const pointOnB = vec3.add(lineB.start, vec3.mul(normB, c2));

    // Check if points are close enough to consider intersection
    const distance = vec3.len(vec3.sub(pointOnA, pointOnB));
    if (distance < constants.EPSILON) {
      // Use midpoint as intersection point
      return {
        intersects: true,
        intersectionPoint: vec3.add(
          pointOnA,
          vec3.mul(vec3.sub(pointOnB, pointOnA), 0.5)
        ),
      };
    }
  }

  return { intersects: false };
}

/**
 * Check if a line segments intersects a sphere
 */
export function lineIntersectsSphere(
  line: Line,
  sphere: Sphere
): {
  /**
   * Whether the line segment intersects the sphere
   */
  intersects: boolean;

  /**
   * The intersection points if the line segment intersects the sphere
   */
  intersectionPoints?: Point[];
} {
  // Calculate line direction and length
  const lineDir = vec3.sub(line.end, line.start);
  const lineLength = vec3.len(lineDir);

  // If line has zero length, treat as point-sphere intersection
  if (lineLength < constants.EPSILON) {
    const distance = vec3.len(vec3.sub(line.start, sphere.position));
    if (distance <= sphere.radius) {
      return {
        intersects: true,
        intersectionPoints: [line.start],
      };
    }
    return { intersects: false };
  }

  // Normalize line direction
  const normDir = vec3.div(lineDir, lineLength);

  // Calculate vector from line start to sphere center
  const toCenter = vec3.sub(sphere.position, line.start);

  // Calculate quadratic equation coefficients
  // a = dot(dir, dir) = 1 since dir is normalized
  const a = vec3.dot(normDir, normDir);

  // b = 2 * dot(dir, (start - center))
  const b = 2 * vec3.dot(normDir, vec3.mul(toCenter, -1));

  // c = dot((start - center), (start - center)) - radius²
  const c = vec3.dot(toCenter, toCenter) - sphere.radius * sphere.radius;

  // Solve quadratic equation using discriminant
  const discriminant = b * b - 4 * a * c;

  // No intersection if discriminant is negative
  if (discriminant < -constants.EPSILON) {
    return { intersects: false };
  }

  // Handle case where line just touches sphere (discriminant ≈ 0)
  if (Math.abs(discriminant) < constants.EPSILON) {
    const t = -b / (2 * a);
    if (t >= 0 && t <= lineLength) {
      const point = vec3.add(line.start, vec3.mul(normDir, t));
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

  // Collect intersection points that lie within line segment
  const intersectionPoints: Point[] = [];

  if (t1 >= 0 && t1 <= lineLength) {
    intersectionPoints.push(vec3.add(line.start, vec3.mul(normDir, t1)));
  }

  if (t2 >= 0 && t2 <= lineLength) {
    intersectionPoints.push(vec3.add(line.start, vec3.mul(normDir, t2)));
  }

  return {
    intersects: intersectionPoints.length > 0,
    intersectionPoints:
      intersectionPoints.length > 0 ? intersectionPoints : undefined,
  };
}

/**
 * Check if a line segments intersects a plane
 */
export function lineIntersectsPlane(
  line: Line,
  plane: Plane
): {
  /**
   * Whether the line segment intersects the plane
   */
  intersects: boolean;

  /**
   * The intersection point if the line segment intersects the plane
   *
   * If the line segment lies in the plane, this will be undefined since there
   * are infinite intersection points
   */
  intersectionPoint?: Point;
} {
  // Convert line to direction vector
  const lineDir = vec3.sub(line.end, line.start);
  const lineLength = vec3.len(lineDir);

  // If the line has zero length, it cannot intersect
  if (lineLength < constants.EPSILON) {
    return { intersects: false };
  }

  // Normalize line direction
  const normDir = vec3.div(lineDir, lineLength);

  // Calculate denominator (dot product of line direction and plane normal)
  const denominator = vec3.dot(normDir, plane.normal);

  // If denominator is close to 0, line is parallel to plane
  if (Math.abs(denominator) < constants.EPSILON) {
    // Check if the line start is on the plane
    const distanceToPlane = vec3.dot(
      vec3.sub(line.start, plane.point),
      plane.normal
    );
    if (Math.abs(distanceToPlane) < constants.EPSILON) {
      // Line lies in the plane: infinite intersection points
      return { intersects: true };
    }
    // Line is parallel and not on the plane
    return { intersects: false };
  }

  // Calculate distance from line start to plane
  const t =
    vec3.dot(vec3.sub(plane.point, line.start), plane.normal) / denominator;

  // If t is negative or greater than line length, intersection is outside of
  // the line segment
  if (t < 0 || t > lineLength) {
    return { intersects: false };
  }

  // Calculate intersection point
  const intersectionPoint = vec3.add(line.start, vec3.mul(normDir, t));

  return {
    intersects: true,
    intersectionPoint,
  };
}

/**
 * Check if a line segment intersects a cuboid
 */
export function lineIntersectsCuboid(
  line: Line,
  cuboid: Cuboid
): {
  /**
   * Whether the line segment intersects the cuboid
   */
  intersects: boolean;

  /**
   * The intersection points if the line segment intersects the cuboid
   */
  intersectionPoints?: Point[];
} {
  // Get line direction and length
  const lineDir = vec3.sub(line.end, line.start);
  const lineLength = vec3.len(lineDir);

  // If line has zero length, treat as point-cuboid intersection
  if (lineLength < constants.EPSILON) {
    const result = pointInCuboid(line.start, cuboid);
    return {
      intersects: result.intersects,
      intersectionPoints: result.intersects ? [line.start] : undefined,
    };
  }

  // Normalize line direction
  const normDir = vec3.div(lineDir, lineLength);

  // Extract cuboid properties with default rotation
  const { position, size, rotation = vec3() } = cuboid;

  // Transform line to local space if cuboid is rotated
  let localLineStart = vec3.sub(line.start, position);
  let localLineDir = normDir;
  if (cuboidIsRotated(cuboid)) {
    // Undo rotation by applying inverse rotation
    const inverseRotation = vec3.mul(rotation, -1);
    localLineStart = vec3.rota(localLineStart, inverseRotation);
    localLineDir = vec3.rota(localLineDir, inverseRotation);
  }

  const halfSize = vec3.div(size, 2);

  // Calculate intersection with each pair of parallel planes
  const txMin = vec3.div(
    vec3.sub(vec3.mul(halfSize, -1), localLineStart),
    localLineDir
  );
  const txMax = vec3.div(vec3.sub(halfSize, localLineStart), localLineDir);

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

  // Find the latest entry and earliest exit
  const tMin = Math.max(tNear.x, tNear.y, tNear.z);
  const tMax = Math.min(tFar.x, tFar.y, tFar.z);

  // If the entry is after the exit, or the exit is before the start of the
  // line, or the entry is after the end of the line, there is no intersection
  if (tMin > tMax || tMax < 0 || tMin > lineLength) {
    return { intersects: false };
  }

  // Calculate intersection points
  const intersectionPoints: Point[] = [];

  // Add entry point if it's within line segment
  if (tMin >= 0 && tMin <= lineLength) {
    let point = vec3.add(localLineStart, vec3.mul(localLineDir, tMin));
    if (cuboidIsRotated(cuboid)) {
      point = vec3.rota(point, rotation);
    }
    intersectionPoints.push(vec3.add(position, point));
  }

  // Add exit point if it's different from entry point and within line segment
  if (tMax > tMin && tMax >= 0 && tMax <= lineLength) {
    let point = vec3.add(localLineStart, vec3.mul(localLineDir, tMax));
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

/**
 * Check if a line segment intersects a polygon
 */
export function lineIntersectsPolygon(
  line: Line,
  polygon: Polygon
): {
  /**
   * Whether the line segment intersects the polygon
   */
  intersects: boolean;

  /**
   * The intersection point if the line segment intersects the polygon
   */
  intersectionPoint?: Point;
} {
  // First validate the polygon
  if (!polygonIsValid(polygon)) {
    return { intersects: false };
  }

  // Calculate the plane of the polygon
  const [v1, v2, v3] = polygon.vertices;
  const edge1 = vec3.sub(v2, v1);
  const edge2 = vec3.sub(v3, v1);
  const normal = vec3.nor(vec3.cross(edge1, edge2));

  // Create a plane from the polygon
  const plane: Plane = {
    point: v1,
    normal,
  };

  // Check if the line intersects the plane
  const intersection = lineIntersectsPlane(line, plane);
  if (!intersection.intersects || !intersection.intersectionPoint) {
    return { intersects: false };
  }

  // Check if the intersection point is inside the polygon
  const pointCheck = pointOnPolygon(intersection.intersectionPoint, polygon);
  if (!pointCheck || !pointCheck.intersects) {
    return { intersects: false };
  }

  return {
    intersects: true,
    intersectionPoint: intersection.intersectionPoint,
  };
}

/**
 * Check if a line segment intersects a cuboid
 */
export function lineIntersectsMesh(
  line: Line,
  mesh: Mesh
): {
  /**
   * Whether the line segment intersects any polygon in the mesh
   */
  intersects: boolean;

  /**
   * The intersection points if the line segment intersects any polygon in the
   * mesh
   */
  intersectionPoints?: Point[];
} {
  const polygons = meshToPolygons(mesh);
  const intersectionPoints: Point[] = [];

  polygons.forEach(polygon => {
    const intersection = lineIntersectsPolygon(line, polygon);
    if (intersection && intersection.intersects) {
      intersectionPoints.push(intersection.intersectionPoint!);
    }
  });

  return {
    intersects: intersectionPoints.length > 0,
    intersectionPoints:
      intersectionPoints.length > 0 ? intersectionPoints : undefined,
  };
}

/**
 * Check if two spheres intersect
 */
export function sphereIntersectsSphere(
  sphereA: Sphere,
  sphereB: Sphere
): {
  /**
   * Whether the spheres intersect
   */
  intersects: boolean;

  /**
   * The point at the center of the intersection volume
   */
  intersectionPoint?: Point;

  /**
   * How deeply the spheres are intersecting
   */
  penetrationDepth?: number;

  /**
   * Unit vector pointing from sphere A to sphere B
   */
  normal?: Point;

  /**
   * The closest points on each sphere's surface along the intersection axis
   */
  contactPoints?: {
    sphereA: Point;
    sphereB: Point;
  };
} {
  // Calculate vector from center of sphere A to center of sphere B
  const centerToCenter = vec3.sub(sphereB.position, sphereA.position);

  // Calculate actual distance between centers
  const distance = vec3.len(centerToCenter);

  // Calculate sum of radii
  const radiiSum = sphereA.radius + sphereB.radius;

  // If distance is greater than sum of radii, spheres don't intersect
  if (distance > radiiSum) {
    return { intersects: false };
  }

  // If distance is zero, spheres are concentric
  if (distance < constants.EPSILON) {
    return {
      intersects: true,
      intersectionPoint: sphereA.position,
      penetrationDepth: radiiSum,
      normal: vec3(1, 0, 0), // Arbitrary normal for concentric spheres
      contactPoints: {
        sphereA: vec3.add(sphereA.position, vec3(sphereA.radius, 0, 0)),
        sphereB: vec3.add(sphereB.position, vec3(sphereB.radius, 0, 0)),
      },
    };
  }

  // Calculate normalized direction from sphere A to sphere B
  const normal = vec3.nor(centerToCenter);

  // Calculate penetration depth
  const penetrationDepth = radiiSum - distance;

  // Calculate intersection center point (halfway between surface intersection
  // points)
  const intersectionPoint = vec3.add(
    sphereA.position,
    vec3.mul(normal, sphereA.radius + penetrationDepth / 2)
  );

  // Calculate contact points on each sphere's surface
  const contactPoints = {
    sphereA: vec3.add(sphereA.position, vec3.mul(normal, sphereA.radius)),
    sphereB: vec3.add(sphereB.position, vec3.mul(normal, -sphereB.radius)),
  };

  return {
    intersects: true,
    intersectionPoint,
    penetrationDepth,
    normal,
    contactPoints,
  };
}

/**
 * Check if a sphere intersects a plane
 */
export function sphereIntersectsPlane(
  sphere: Sphere,
  plane: Plane
): {
  /**
   * Whether the sphere intersects the plane
   */
  intersects: boolean;

  /**
   * The point at the center of the intersection volume
   */
  intersectionPoint?: Point;

  /**
   * How deeply the spheres are intersecting
   */
  penetrationDepth?: number;

  /**
   * The radius of the intersection volume
   */
  intersectionRadius?: number;
} {
  // Normalize the plane normal
  const normal = vec3.nor(plane.normal);

  // Calculate signed distance from sphere center to plane
  const signedDistance = vec3.dot(
    vec3.sub(sphere.position, plane.point),
    normal
  );

  // If the distance is greater than sphere radius, no intersection
  if (Math.abs(signedDistance) > sphere.radius) {
    return { intersects: false };
  }

  // Calculate penetration depth
  const penetrationDepth = sphere.radius - Math.abs(signedDistance);

  // Calculate intersection point (center of intersection circle)
  // This is the projection of the sphere's center onto the plane
  const intersectionPoint = vec3.sub(
    sphere.position,
    vec3.mul(normal, signedDistance)
  );

  // Calculate radius of intersection circle using Pythagorean theorem
  const intersectionRadius = Math.sqrt(
    sphere.radius * sphere.radius - signedDistance * signedDistance
  );

  return {
    intersects: true,
    intersectionPoint,
    penetrationDepth,
    intersectionRadius,
  };
}

/**
 * Check if a sphere intersects a cuboid
 */
export function sphereIntersectsCuboid(
  sphere: Sphere,
  cuboid: Cuboid
): {
  /**
   * Whether the sphere intersects the cuboid
   */
  intersects: boolean;

  /**
   * The point at the center of the intersection volume
   */
  intersectionPoint?: Point;

  /**
   * How deeply the sphere penetrates the cuboid
   */
  penetrationDepth?: number;

  /**
   * Direction of minimum separation (unit vector)
   * Points from cuboid center towards sphere center
   */
  normal?: Point;

  /**
   * Closest point on cuboid surface to sphere center
   */
  contactPoint?: Point;
} {
  const { position, size, rotation = vec3() } = cuboid;
  const halfSize = vec3.div(size, 2);

  // Transform sphere center to cuboid's local space
  let localSphereCenter = vec3.sub(sphere.position, position);
  if (cuboidIsRotated(cuboid)) {
    localSphereCenter = vec3.rota(localSphereCenter, vec3.mul(rotation, -1));
  }

  // Find the closest point on the cuboid to the sphere center
  const closestLocalPoint = vec3(
    clamp(localSphereCenter.x, -halfSize.x, halfSize.x),
    clamp(localSphereCenter.y, -halfSize.y, halfSize.y),
    clamp(localSphereCenter.z, -halfSize.z, halfSize.z)
  );

  // Transform closest point back to world space
  let closestPoint = closestLocalPoint;
  if (cuboidIsRotated(cuboid)) {
    closestPoint = vec3.rota(closestPoint, rotation);
  }
  closestPoint = vec3.add(closestPoint, position);

  // Calculate vector from closest point to sphere center
  const separationVector = vec3.sub(sphere.position, closestPoint);
  const distance = vec3.len(separationVector);

  // If distance is greater than sphere radius, no intersection
  if (distance > sphere.radius) {
    return { intersects: false };
  }

  // Handle case where sphere center is exactly on cuboid surface
  if (distance < constants.EPSILON) {
    // Use vector from cuboid center to sphere center as normal
    let normal = vec3.nor(vec3.sub(sphere.position, position));
    const penetrationDepth = sphere.radius;

    return {
      intersects: true,
      intersectionPoint: sphere.position,
      penetrationDepth,
      normal,
      contactPoint: closestPoint,
    };
  }

  // Calculate normal and penetration depth
  const normal = vec3.nor(separationVector);
  const penetrationDepth = sphere.radius - distance;

  // Calculate intersection point at center of intersection volume
  const intersectionPoint = vec3.add(
    closestPoint,
    vec3.mul(normal, penetrationDepth / 2)
  );

  return {
    intersects: true,
    intersectionPoint,
    penetrationDepth,
    normal,
    contactPoint: closestPoint,
  };
}

/**
 * Check if a sphere intersects a polygon
 */
export function sphereIntersectsPolygon(
  sphere: Sphere,
  polygon: Polygon
): {
  /**
   * Whether the sphere intersects the polygon
   */
  intersects: boolean;

  /**
   * The point at the center of the intersection volume
   */
  intersectionPoint?: Point;

  /**
   * How deeply the sphere is intersecting
   */
  penetrationDepth?: number;

  /**
   * Points where the sphere surface intersects the polygon edges, if any
   */
  polygonIntersectionPoints?: Point[];
} | null {
  // First validate the polygon
  if (!polygonIsValid(polygon)) {
    return null;
  }

  const [v1, v2, v3] = polygon.vertices;

  // Calculate polygon plane
  const edge1 = vec3.sub(v2, v1);
  const edge2 = vec3.sub(v3, v1);
  const normal = vec3.nor(vec3.cross(edge1, edge2));

  // Create plane from polygon
  const plane: Plane = {
    point: v1,
    normal,
  };

  // Check sphere-plane intersection first
  const planeIntersection = sphereIntersectsPlane(sphere, plane);
  if (!planeIntersection.intersects) {
    return { intersects: false };
  }

  // Check each vertex distance from sphere center
  const vertexDistances = polygon.vertices.map(vertex =>
    vec3.len(vec3.sub(vertex, sphere.position))
  );

  // If all vertices are inside sphere, polygon is contained
  if (vertexDistances.every(dist => dist <= sphere.radius)) {
    return {
      intersects: true,
      intersectionPoint: planeIntersection.intersectionPoint,
      penetrationDepth: sphere.radius,
    };
  }

  // Create polygon edges
  const edges: Line[] = [
    { start: v1, end: v2 },
    { start: v2, end: v3 },
    { start: v3, end: v1 },
  ];

  // Check each edge for intersection with sphere
  const polygonIntersectionPoints: Point[] = [];
  edges.forEach(edge => {
    const lineIntersection = lineIntersectsSphere(edge, sphere);
    if (lineIntersection.intersects && lineIntersection.intersectionPoints) {
      // Only add points that lie on the polygon edges
      lineIntersection.intersectionPoints.forEach(point => {
        const onLine = pointOnLine(point, edge);
        if (onLine.intersects) {
          polygonIntersectionPoints.push(point);
        }
      });
    }
  });

  // Check if sphere center projects onto polygon
  const projectedCenter = pointOnPolygon(sphere.position, polygon);
  if (projectedCenter && projectedCenter.intersects) {
    const distance = vec3.len(
      vec3.sub(sphere.position, projectedCenter.closestPoint)
    );
    if (distance <= sphere.radius) {
      return {
        intersects: true,
        intersectionPoint: projectedCenter.closestPoint,
        penetrationDepth: sphere.radius - distance,
        polygonIntersectionPoints:
          polygonIntersectionPoints.length > 0
            ? polygonIntersectionPoints
            : undefined,
      };
    }
  }

  // If we have intersection points but no center projection,
  // use the midpoint of intersection points as intersection point
  if (polygonIntersectionPoints.length > 0) {
    const midPoint = vec3.div(
      polygonIntersectionPoints.reduce((sum, p) => vec3.add(sum, p), vec3()),
      polygonIntersectionPoints.length
    );

    return {
      intersects: true,
      intersectionPoint: midPoint,
      penetrationDepth:
        sphere.radius - vec3.len(vec3.sub(midPoint, sphere.position)),
      polygonIntersectionPoints: polygonIntersectionPoints,
    };
  }

  // No intersection found
  return { intersects: false };
}

/**
 * Check if a sphere intersects any polygon in a mesh
 */
export function sphereIntersectsMesh(
  sphere: Sphere,
  mesh: Mesh
): {
  /**
   * Whether the sphere intersects any polygon in the mesh
   */
  intersects: boolean;

  /**
   * The intersection points if the sphere intersects any polygon in the mesh
   */
  intersectionPoints?: Point[];

  /**
   * The intersection points on the polygons if any
   */
  polygonIntersectionPoints?: Point[];
} {
  const polygons = meshToPolygons(mesh);
  let intersects = false;
  const intersectionPoints: Point[] = [];
  const polygonIntersectionPoints: Point[] = [];

  polygons.forEach(polygon => {
    const intersection = sphereIntersectsPolygon(sphere, polygon);
    if (intersection && intersection.intersects) {
      intersects = true;
      intersectionPoints.push(intersection.intersectionPoint!);
      if (intersection.polygonIntersectionPoints) {
        polygonIntersectionPoints.push(
          ...intersection.polygonIntersectionPoints
        );
      }
    }
  });

  return {
    intersects,
    intersectionPoints:
      intersectionPoints.length > 0 ? intersectionPoints : undefined,
    polygonIntersectionPoints:
      polygonIntersectionPoints.length > 0
        ? polygonIntersectionPoints
        : undefined,
  };
}

/**
 * Check if two planes intersect
 *
 * Based on the algorithm described in "Real-Time Collision Detection" by
 * Christer Ericson
 */
export function planeIntersectsPlane(
  planeA: Plane,
  planeB: Plane
): {
  /**
   * Whether the planes intersect
   *
   * Will be false only if the planes are parallel with a gap between them
   */
  intersects: boolean;

  /**
   * The line where the planes intersect
   *
   * Will be undefined if:
   * - The planes don't intersect (parallel with gap)
   * - The planes are coincident (infinite intersection)
   */
  intersectionLine?: Line;
} {
  // Normalize plane normals
  const normalA = vec3.nor(planeA.normal);
  const normalB = vec3.nor(planeB.normal);

  // Calculate direction of intersection line using cross product
  const direction = vec3.cross(normalA, normalB);
  const directionLengthSq = vec3.dot(direction, direction);

  // If direction length is almost zero, planes are parallel
  if (directionLengthSq < constants.EPSILON) {
    // Check if planes are coincident by comparing distance from one plane's point to other plane
    const signedDistance = vec3.dot(
      vec3.sub(planeB.point, planeA.point),
      normalA
    );

    // If distance is effectively zero, planes are coincident
    if (Math.abs(signedDistance) < constants.EPSILON) {
      return {
        intersects: true, // Coincident planes have infinite intersection
      };
    }

    // Planes are parallel with gap between them
    return {
      intersects: false,
    };
  }

  // Planes intersect along a line
  // Calculate a point on the intersection line using:
  // point = (b₂n₁ - b₁n₂) × (n₁ × n₂) / |n₁ × n₂|²
  // where b₁, b₂ are the plane constants (d in ax + by + cz + d = 0 form)
  // and n₁, n₂ are the plane normals
  const b1 = -vec3.dot(normalA, planeA.point);
  const b2 = -vec3.dot(normalB, planeB.point);

  const point = vec3.div(
    vec3.cross(
      vec3.sub(vec3.mul(normalA, b2), vec3.mul(normalB, b1)),
      direction
    ),
    directionLengthSq
  );

  return {
    intersects: true,
    intersectionLine: {
      start: point,
      end: vec3.add(point, direction),
    },
  };
}

/**
 * Check if a plane intersects one or more polygons in a mesh
 */
export function planeIntersectsMesh(
  plane: Plane,
  mesh: Mesh
): {
  /**
   * Whether any polygon in the mesh intersects the plane
   */
  intersects: boolean;

  /**
   * The points where the mesh's edges intersect the plane
   *
   * Will be undefined if:
   * - The mesh doesn't intersect the plane
   * - The mesh lies entirely in the plane
   */
  intersectionPoints?: Point[];

  /**
   * How deeply the mesh penetrates the plane in the direction opposite to
   * the plane's normal
   */
  penetrationDepth?: number;
} {
  return meshIntersectsPlane(mesh, plane);
}

/**
 * Check if two cuboids intersect using the Separating Axis Theorem
 */
export function cuboidIntersectsCuboid(
  cuboidA: Cuboid,
  cuboidB: Cuboid
): {
  /**
   * Whether the cuboids intersect
   */
  intersects: boolean;

  /**
   * The approximate point at the center of the intersection volume
   */
  intersectionPoint?: Point;

  /**
   * How deeply the cuboids are intersecting along the minimum separation axis
   */
  penetrationDepth?: number;

  /**
   * Direction of minimum separation (unit vector)
   * Points from cuboid A to cuboid B
   */
  normal?: Point;

  /**
   * The closest points on each cuboid's surface along the separation axis
   */
  contactPoints?: {
    cuboidA: Point;
    cuboidB: Point;
  };
} {
  // Extract properties with default rotations
  const { position: posA, size: sizeA, rotation: rotationA = vec3() } = cuboidA;
  const { position: posB, size: sizeB, rotation: rotationB = vec3() } = cuboidB;

  // Calculate half-sizes
  const halfSizeA = vec3.div(sizeA, 2);
  const halfSizeB = vec3.div(sizeB, 2);

  // Get rotation matrices for both cuboids
  const rotMatA = cuboidIsRotated(cuboidA)
    ? getRotationMatrix(rotationA)
    : null;
  const rotMatB = cuboidIsRotated(cuboidB)
    ? getRotationMatrix(rotationB)
    : null;

  // Get cuboid axes (face normals)
  const axesA = getRotatedAxes(rotMatA);
  const axesB = getRotatedAxes(rotMatB);

  // Vector between cuboid centers
  const centerDiff = vec3.sub(posB, posA);

  // Test all 15 potential separating axes:
  // - 3 from cuboid A's face normals
  // - 3 from cuboid B's face normals
  // - 9 from cross products of edges (3x3)
  const axes = [...axesA, ...axesB, ...getCrossProductAxes(axesA, axesB)];

  let minPenetration = Infinity;
  let separationAxis: Point | null = null;

  // Test each axis
  for (const axis of axes) {
    const axisLength = vec3.len(axis);
    if (axisLength < constants.EPSILON) continue;

    // Normalize axis
    const normAxis = vec3.div(axis, axisLength);

    // Project center-to-center vector onto axis
    const centerProj = vec3.dot(centerDiff, normAxis);

    // Project both cuboids onto axis
    const projA = projectCuboid(halfSizeA, rotMatA, normAxis);
    const projB = projectCuboid(halfSizeB, rotMatB, normAxis);

    // Calculate penetration depth along this axis
    const penetration = projA + projB - Math.abs(centerProj);

    // If there's a gap, cuboids are separated
    if (penetration <= 0) {
      return { intersects: false };
    }

    // Track minimum penetration and its axis
    if (penetration < minPenetration) {
      minPenetration = penetration;
      separationAxis = normAxis;
    }
  }

  // If we get here, no separating axis was found - cuboids intersect
  if (!separationAxis) {
    return { intersects: true };
  }

  // Ensure normal points from A to B
  const normal =
    vec3.dot(centerDiff, separationAxis) < 0
      ? vec3.mul(separationAxis, -1)
      : separationAxis;

  // Calculate contact points on each cuboid's surface
  const contactA = getContactPoint(cuboidA, normal);
  const contactB = getContactPoint(cuboidB, vec3.mul(normal, -1));

  // Calculate intersection point halfway between contacts
  const intersectionPoint = vec3.add(
    contactA,
    vec3.mul(vec3.sub(contactB, contactA), 0.5)
  );

  return {
    intersects: true,
    intersectionPoint,
    penetrationDepth: minPenetration,
    normal,
    contactPoints: {
      cuboidA: contactA,
      cuboidB: contactB,
    },
  };
}

/**
 * Helper function to create a rotation matrix from Euler angles
 */
function getRotationMatrix(rotation: Point): Point[] {
  const cx = Math.cos(rotation.x);
  const cy = Math.cos(rotation.y);
  const cz = Math.cos(rotation.z);
  const sx = Math.sin(rotation.x);
  const sy = Math.sin(rotation.y);
  const sz = Math.sin(rotation.z);

  return [
    vec3(cy * cz, cy * sz, -sy),
    vec3(sx * sy * cz - cx * sz, sx * sy * sz + cx * cz, sx * cy),
    vec3(cx * sy * cz + sx * sz, cx * sy * sz - sx * cz, cx * cy),
  ];
}

/**
 * Helper function to get rotated axes for a cuboid
 */
function getRotatedAxes(rotationMatrix: Point[] | null): Point[] {
  if (!rotationMatrix) {
    return [vec3(1, 0, 0), vec3(0, 1, 0), vec3(0, 0, 1)];
  }
  return rotationMatrix;
}

/**
 * Helper function to generate cross product axes
 */
function getCrossProductAxes(axesA: Point[], axesB: Point[]): Point[] {
  const crossAxes: Point[] = [];
  for (const axisA of axesA) {
    for (const axisB of axesB) {
      crossAxes.push(vec3.cross(axisA, axisB));
    }
  }
  return crossAxes;
}

/**
 * Helper function to project cuboid onto axis
 */
function projectCuboid(
  halfSize: Point,
  rotationMatrix: Point[] | null,
  axis: Point
): number {
  let projection = 0;

  if (!rotationMatrix) {
    // Unrotated cuboid - just sum up the components
    projection =
      Math.abs(halfSize.x * axis.x) +
      Math.abs(halfSize.y * axis.y) +
      Math.abs(halfSize.z * axis.z);
  } else {
    // Rotated cuboid - need to account for rotation
    projection =
      Math.abs(vec3.dot(vec3.mul(rotationMatrix[0], halfSize.x), axis)) +
      Math.abs(vec3.dot(vec3.mul(rotationMatrix[1], halfSize.y), axis)) +
      Math.abs(vec3.dot(vec3.mul(rotationMatrix[2], halfSize.z), axis));
  }

  return projection;
}

/**
 * Helper function to get contact point on cuboid surface
 */
function getContactPoint(cuboid: Cuboid, normal: Point): Point {
  const vertices = cuboidVertices(cuboid);
  let maxProj = -Infinity;
  let contactPoint = vertices[0];

  // Find vertex with maximum projection along normal
  for (const vertex of vertices) {
    const proj = vec3.dot(vertex, normal);
    if (proj > maxProj) {
      maxProj = proj;
      contactPoint = vertex;
    }
  }

  return contactPoint;
}

/**
 * Check if a cuboid intersects a plane
 */
export function cuboidIntersectsPlane(
  cuboid: Cuboid,
  plane: Plane
): {
  /**
   * Whether the cuboid intersects the plane
   */
  intersects: boolean;

  /**
   * The points where the cuboid's edges intersect the plane
   */
  intersectionPoints?: Point[];

  /**
   * How deeply the cuboid penetrates the plane in the direction opposite to
   * the plane's normal
   */
  penetrationDepth?: number;
} {
  // Get cuboid faces as triangles
  const polygons = cuboidToPolygons(cuboid);
  const allIntersectionPoints: Point[] = [];

  // Track vertices on each side of the plane for penetration depth calculation
  const normalizedPlaneNormal = vec3.nor(plane.normal);
  let maxPenetration = -Infinity;
  let minPenetration = Infinity;

  // Check each vertex's signed distance to plane
  const vertices = cuboidVertices(cuboid);
  vertices.forEach(vertex => {
    const signedDistance = vec3.dot(
      vec3.sub(vertex, plane.point),
      normalizedPlaneNormal
    );
    maxPenetration = Math.max(maxPenetration, signedDistance);
    minPenetration = Math.min(minPenetration, signedDistance);
  });

  // Check each polygon for intersection
  for (const polygon of polygons) {
    const intersection = polygonIntersectsPlane(polygon, plane);
    if (intersection?.intersects) {
      // If polygon has specific intersection points, add them
      if (intersection.intersectionPoints) {
        intersection.intersectionPoints.forEach(point => {
          // Check if point is already in list (within epsilon)
          const isDuplicate = allIntersectionPoints.some(
            existing => vec3.len(vec3.sub(existing, point)) < constants.EPSILON
          );
          if (!isDuplicate) {
            allIntersectionPoints.push(point);
          }
        });
      }
    }
  }

  // Calculate penetration depth
  // If min and max penetrations have different signs, cuboid straddles the
  // plane. Otherwise, penetration is the minimum absolute distance to plane
  let penetrationDepth: number | undefined;
  if (minPenetration * maxPenetration <= 0) {
    // Cuboid straddles plane - penetration is the larger absolute value
    penetrationDepth = Math.max(
      Math.abs(minPenetration),
      Math.abs(maxPenetration)
    );
  } else if (Math.abs(maxPenetration) < Math.abs(minPenetration)) {
    // All vertices on positive side of plane
    penetrationDepth = Math.abs(maxPenetration);
  } else {
    // All vertices on negative side of plane
    penetrationDepth = Math.abs(minPenetration);
  }

  return {
    intersects: allIntersectionPoints.length > 0,
    intersectionPoints:
      allIntersectionPoints.length > 0 ? allIntersectionPoints : undefined,
    penetrationDepth: penetrationDepth,
  };
}

/**
 * Check if a cuboid intersects a polygon
 */
export function cuboidIntersectsPolygon(
  cuboid: Cuboid,
  polygon: Polygon
): {
  /**
   * Whether the cuboid intersects the polygon
   */
  intersects: boolean;

  /**
   * The points where the cuboid's edges intersect the polygon
   *
   * Will be undefined if:
   * - The polygon is entirely inside the cuboid
   * - The polygon is coincident with a cuboid face
   * - There are no intersections
   */
  intersectionPoints?: Point[];
} | null {
  // First validate the polygon
  if (!polygonIsValid(polygon)) {
    return null;
  }

  // Check if any polygon vertex is inside the cuboid
  const verticesInside = polygon.vertices.map(v => pointInCuboid(v, cuboid));
  if (verticesInside.every(result => result.intersects)) {
    // Polygon is entirely contained within cuboid
    return { intersects: true };
  }

  // Get cuboid vertices and check if any are on the polygon
  const cuboidVerticesArray = cuboidVertices(cuboid);
  const verticesOnPolygon = cuboidVerticesArray.map(v =>
    pointOnPolygon(v, polygon)
  );
  if (verticesOnPolygon.some(result => result?.intersects)) {
    // At least one cuboid vertex lies on the polygon
    // This likely means the polygon is coincident with a cuboid face
    return { intersects: true };
  }

  // Get cuboid edges
  const cuboidEdges = verticesToEdges(cuboidVerticesArray);
  const intersectionPoints: Point[] = [];

  // Check each cuboid edge for intersection with the polygon
  for (const edge of cuboidEdges) {
    const intersection = lineIntersectsPolygon(edge, polygon);
    if (
      intersection &&
      intersection.intersects &&
      intersection.intersectionPoint
    ) {
      // Check if this point is already in our list (within epsilon)
      const isDuplicate = intersectionPoints.some(existing =>
        vectorsAlmostEqual(existing, intersection.intersectionPoint!)
      );
      if (!isDuplicate) {
        intersectionPoints.push(intersection.intersectionPoint);
      }
    }
  }

  // Get polygon edges and check against cuboid faces
  const polygonEdges = verticesToEdges(polygon.vertices);
  const cuboidPolygons = cuboidToPolygons(cuboid);

  // Check each polygon edge against each cuboid face
  for (const edge of polygonEdges) {
    for (const face of cuboidPolygons) {
      const intersection = lineIntersectsPolygon(edge, face);
      if (
        intersection &&
        intersection.intersects &&
        intersection.intersectionPoint
      ) {
        // Check if this point is already in our list (within epsilon)
        const isDuplicate = intersectionPoints.some(existing =>
          vectorsAlmostEqual(existing, intersection.intersectionPoint!)
        );
        if (!isDuplicate) {
          intersectionPoints.push(intersection.intersectionPoint);
        }
      }
    }
  }

  return {
    intersects:
      intersectionPoints.length > 0 ||
      verticesInside.some(result => result.intersects) ||
      verticesOnPolygon.some(result => result?.intersects),
    intersectionPoints:
      intersectionPoints.length > 0 ? intersectionPoints : undefined,
  };
}

/**
 * Check if a cuboid intersects any polygon in a mesh
 */
export function cuboidIntersectsMesh(
  cuboid: Cuboid,
  mesh: Mesh
): {
  /**
   * Whether the cuboid intersects any polygon in the mesh
   */
  intersects: boolean;

  /**
   * The points where the cuboid intersects the mesh's polygons
   *
   * Will be undefined if:
   * - There are no intersections
   * - A polygon is entirely inside the cuboid
   * - A polygon is coincident with a cuboid face
   */
  intersectionPoints?: Point[];
} {
  const polygons = meshToPolygons(mesh);
  const intersectionPoints: Point[] = [];

  // Check each polygon in the mesh against the cuboid
  for (const polygon of polygons) {
    const intersection = cuboidIntersectsPolygon(cuboid, polygon);
    if (intersection && intersection.intersects) {
      // If we have specific intersection points, add them
      if (intersection.intersectionPoints) {
        intersection.intersectionPoints.forEach(point => {
          // Check if point is already in list (within epsilon)
          const isDuplicate = intersectionPoints.some(existing =>
            vectorsAlmostEqual(existing, point)
          );
          if (!isDuplicate) {
            intersectionPoints.push(point);
          }
        });
      } else {
        // If we don't have intersection points but we know there's an
        // intersection, we can early return since we know they intersect
        // (this happens when a polygon is inside the cuboid or coincident
        // with a face)
        return {
          intersects: true,
        };
      }
    }
  }

  return {
    intersects: intersectionPoints.length > 0,
    intersectionPoints:
      intersectionPoints.length > 0 ? intersectionPoints : undefined,
  };
}

/**
 * Check if two polygons intersect
 */
export function polygonIntersectsPolygon(
  polygonA: Polygon,
  polygonB: Polygon
): {
  /**
   * Whether the polygons intersect
   */
  intersects: boolean;

  /**
   * The points where the polygons intersect
   *
   * Will be undefined if:
   * - The polygons don't intersect
   * - The polygons are coplanar and overlapping (infinite intersection points)
   */
  intersectionPoints?: Point[];
} | null {
  // First validate both polygons
  if (!polygonIsValid(polygonA) || !polygonIsValid(polygonB)) {
    return null;
  }

  // Create planes from both polygons
  const planeA: Plane = {
    point: polygonA.vertices[0],
    normal: vec3.nor(
      vec3.cross(
        vec3.sub(polygonA.vertices[1], polygonA.vertices[0]),
        vec3.sub(polygonA.vertices[2], polygonA.vertices[0])
      )
    ),
  };

  const planeB: Plane = {
    point: polygonB.vertices[0],
    normal: vec3.nor(
      vec3.cross(
        vec3.sub(polygonB.vertices[1], polygonB.vertices[0]),
        vec3.sub(polygonB.vertices[2], polygonB.vertices[0])
      )
    ),
  };

  // Check if planes intersect
  const planeIntersection = planeIntersectsPlane(planeA, planeB);

  // If planes don't intersect, polygons can't intersect
  if (!planeIntersection.intersects) {
    return { intersects: false };
  }

  // If planes are coincident, we need to check for polygon overlap
  if (!planeIntersection.intersectionLine) {
    // First check if any vertex of polygon A lies inside polygon B
    for (const vertex of polygonA.vertices) {
      const pointCheck = pointOnPolygon(vertex, polygonB);
      if (pointCheck?.intersects) {
        return { intersects: true }; // Coplanar overlap
      }
    }

    // Then check if any vertex of polygon B lies inside polygon A
    for (const vertex of polygonB.vertices) {
      const pointCheck = pointOnPolygon(vertex, polygonA);
      if (pointCheck?.intersects) {
        return { intersects: true }; // Coplanar overlap
      }
    }

    // No overlap found
    return { intersects: false };
  }

  // Get edges from both polygons
  const edgesA = verticesToEdges(polygonA.vertices);
  const edgesB = verticesToEdges(polygonB.vertices);

  const intersectionPoints: Point[] = [];

  // Check each edge of polygon A against each edge of polygon B
  for (const edgeA of edgesA) {
    for (const edgeB of edgesB) {
      const intersection = lineIntersectsLine(edgeA, edgeB);
      if (intersection.intersects && intersection.intersectionPoint) {
        // Verify the intersection point lies on both edges
        const onEdgeA = pointOnLine(intersection.intersectionPoint, edgeA);
        const onEdgeB = pointOnLine(intersection.intersectionPoint, edgeB);

        if (onEdgeA.intersects && onEdgeB.intersects) {
          // Check if this point is already in our list (within epsilon)
          const isDuplicate = intersectionPoints.some(
            existing =>
              vec3.len(vec3.sub(existing, intersection.intersectionPoint!)) <
              constants.EPSILON
          );

          if (!isDuplicate) {
            intersectionPoints.push(intersection.intersectionPoint);
          }
        }
      }
    }
  }

  return {
    intersects: intersectionPoints.length > 0,
    intersectionPoints:
      intersectionPoints.length > 0 ? intersectionPoints : undefined,
  };
}

/**
 * Check if a polygon intersects a plane
 */
export function polygonIntersectsPlane(
  polygon: Polygon,
  plane: Plane
): {
  /**
   * Whether the polygon intersects the plane
   *
   * Will be true if:
   * - The polygon intersects the plane at one or more points
   * - The polygon lies entirely in the plane
   */
  intersects: boolean;

  /**
   * The points where the polygon's edges intersect the plane
   *
   * Will be undefined if:
   * - The polygon doesn't intersect the plane
   * - The polygon lies entirely in the plane (infinite intersection points)
   */
  intersectionPoints?: Point[];
} | null {
  // First validate the polygon
  if (!polygonIsValid(polygon)) {
    return null;
  }

  // Convert polygon vertices to edges
  const edges = verticesToEdges(polygon.vertices);
  const intersectionPoints: Point[] = [];
  let edgeInPlane = false;

  // Check each edge for intersection with the plane
  for (const edge of edges) {
    const intersection = lineIntersectsPlane(edge, plane);

    if (intersection.intersects) {
      if (intersection.intersectionPoint) {
        // Edge intersects plane at a point
        intersectionPoints.push(intersection.intersectionPoint);
      } else {
        // Edge lies in the plane
        edgeInPlane = true;
        break; // Early exit as polygon must lie in plane
      }
    }
  }

  // If any edge lies in the plane, the whole polygon must lie in the plane
  // (since we've verified it's a valid triangle)
  if (edgeInPlane) {
    return {
      intersects: true,
    };
  }

  // Remove duplicate intersection points (within epsilon)
  const uniquePoints = intersectionPoints.filter((point, index) => {
    return !intersectionPoints.some(
      (p, i) => i < index && vec3.len(vec3.sub(p, point)) < constants.EPSILON
    );
  });

  return {
    intersects: uniquePoints.length > 0,
    intersectionPoints: uniquePoints.length > 0 ? uniquePoints : undefined,
  };
}

/**
 * Check if a polygon intersects any polygon in a mesh
 */
export function polygonIntersectsMesh(
  polygon: Polygon,
  mesh: Mesh
): {
  /**
   * Whether the polygon intersects any polygon in the mesh
   */
  intersects: boolean;

  /**
   * The points where the polygon intersects the mesh's polygons
   *
   * Will be undefined if:
   * - There are no intersections
   * - The polygons are coplanar and overlapping
   */
  intersectionPoints?: Point[];
} | null {
  // First validate the polygon
  if (!polygonIsValid(polygon)) {
    return null;
  }

  const meshPolygons = meshToPolygons(mesh);
  const intersectionPoints: Point[] = [];

  // Check the polygon against each mesh polygon
  for (const meshPolygon of meshPolygons) {
    const intersection = polygonIntersectsPolygon(polygon, meshPolygon);
    if (intersection && intersection.intersects) {
      // If we have intersection points, collect them
      if (intersection.intersectionPoints) {
        intersection.intersectionPoints.forEach(point => {
          // Check if point is already in list (within epsilon)
          const isDuplicate = intersectionPoints.some(existing =>
            vectorsAlmostEqual(existing, point)
          );
          if (!isDuplicate) {
            intersectionPoints.push(point);
          }
        });
      } else {
        // If we have an intersection but no points, it means we have
        // coplanar overlapping polygons - we can return early
        return {
          intersects: true,
        };
      }
    }
  }

  return {
    intersects: intersectionPoints.length > 0,
    intersectionPoints:
      intersectionPoints.length > 0 ? intersectionPoints : undefined,
  };
}

/**
 * Check if two meshes intersect using their polygons
 */
export function meshIntersectsMesh(
  meshA: Mesh,
  meshB: Mesh
): {
  /**
   * Whether any polygons in either mesh intersect with polygons from the other
   * mesh
   */
  intersects: boolean;

  /**
   * The points where the polygons intersect
   */
  intersectionPoints?: Point[];
} {
  const polygonsA = meshToPolygons(meshA);
  const polygonsB = meshToPolygons(meshB);
  const intersectionPoints: Point[] = [];

  // Check each polygon in mesh A against each polygon in mesh B
  for (const polygonA of polygonsA) {
    for (const polygonB of polygonsB) {
      const intersection = polygonIntersectsPolygon(polygonA, polygonB);
      if (intersection && intersection.intersects) {
        if (intersection.intersectionPoints) {
          intersection.intersectionPoints.forEach(point => {
            // Check if point is already in list (within epsilon)
            const isDuplicate = intersectionPoints.some(
              existing =>
                vec3.len(vec3.sub(existing, point)) < constants.EPSILON
            );
            if (!isDuplicate) {
              intersectionPoints.push(point);
            }
          });
        }
      }
    }
  }

  return {
    intersects: intersectionPoints.length > 0,
    intersectionPoints:
      intersectionPoints.length > 0 ? intersectionPoints : undefined,
  };
}

/**
 * Check if any polygons in a mesh intersect a plane
 */
export function meshIntersectsPlane(
  mesh: Mesh,
  plane: Plane
): {
  /**
   * Whether any polygon in the mesh intersects the plane
   */
  intersects: boolean;

  /**
   * The points where the mesh's edges intersect the plane
   *
   * Will be undefined if:
   * - The mesh doesn't intersect the plane
   * - The mesh lies entirely in the plane
   */
  intersectionPoints?: Point[];

  /**
   * How deeply the mesh penetrates the plane in the direction opposite to
   * the plane's normal
   */
  penetrationDepth?: number;
} {
  // Convert mesh to polygons
  const polygons = meshToPolygons(mesh);
  const allIntersectionPoints: Point[] = [];

  // Track maximum penetration depth
  let maxPenetration = -Infinity;
  let minPenetration = Infinity;

  // Normalize plane normal for consistent signed distance calculations
  const normalizedPlaneNormal = vec3.nor(plane.normal);

  // Check each vertex's signed distance to plane
  mesh.vertices.forEach(vertex => {
    const signedDistance = vec3.dot(
      vec3.sub(vertex, plane.point),
      normalizedPlaneNormal
    );
    maxPenetration = Math.max(maxPenetration, signedDistance);
    minPenetration = Math.min(minPenetration, signedDistance);
  });

  // Check each polygon for intersection
  let hasIntersection = false;
  for (const polygon of polygons) {
    const intersection = polygonIntersectsPlane(polygon, plane);
    if (intersection?.intersects) {
      hasIntersection = true;

      // If polygon has specific intersection points, add them
      if (intersection.intersectionPoints) {
        intersection.intersectionPoints.forEach(point => {
          // Check if point is already in list (within epsilon)
          const isDuplicate = allIntersectionPoints.some(
            existing => vec3.len(vec3.sub(existing, point)) < constants.EPSILON
          );
          if (!isDuplicate) {
            allIntersectionPoints.push(point);
          }
        });
      }
    }
  }

  // Calculate penetration depth
  // If min and max penetrations have different signs, mesh straddles the plane
  // Otherwise, penetration is the minimum absolute distance to plane
  let penetrationDepth: number | undefined;
  if (minPenetration * maxPenetration <= 0) {
    // Mesh straddles plane - penetration is the larger absolute value
    penetrationDepth = Math.max(
      Math.abs(minPenetration),
      Math.abs(maxPenetration)
    );
  } else if (Math.abs(maxPenetration) < Math.abs(minPenetration)) {
    // All vertices on positive side of plane
    penetrationDepth = Math.abs(maxPenetration);
  } else {
    // All vertices on negative side of plane
    penetrationDepth = Math.abs(minPenetration);
  }

  return {
    intersects: hasIntersection,
    intersectionPoints:
      allIntersectionPoints.length > 0 ? allIntersectionPoints : undefined,
    penetrationDepth: penetrationDepth,
  };
}
