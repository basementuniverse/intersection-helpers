// import { at } from '@basementuniverse/utils';
import { vec3 } from '@basementuniverse/vec';
import { isPolygon } from '../2d';
import { overlapInterval, vectorAlmostZero } from '../utilities';
import * as constants from '../utilities/constants';
import {
  AABB,
  Cuboid,
  isCuboid,
  isLine,
  isMesh,
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
 * Calculate the distance between two points in 3D space
 *
 * @param a First point
 * @param b Second point
 * @returns Distance between the two points
 */
export function distance(a: Point, b: Point): number {
  return vec3.len(vec3.sub(a, b));
}

/**
 * Calculate the angle between two vectors in 3D space
 *
 * @param a First vector
 * @param b Second vector
 * @returns Angle in radians
 */
export function angle(a: vec3, b: vec3): number {
  return Math.acos(vec3.dot(a, b) / (vec3.len(a) * vec3.len(b)));
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
// function verticesToEdges(vertices: Point[]): Line[] {
//   const edges: Line[] = [];
//   for (let i = 0; i < vertices.length; i++) {
//     const start = vertices[i];
//     const end = at(vertices, i + 1);
//     edges.push({ start, end });
//   }
//   return edges;
// }

/**
 * Check if a polygon is valid
 *
 * A polygon is valid if it has exactly 3 vertices
 */
export function polygonIsValid(polygon: Polygon): boolean {
  return polygon.vertices.length === 3;
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

// TODO adapt the following functions to return more information
// (e.g. intersection point, distance, etc.)

export function rayIntersectsSphere(ray: Ray, sphere: Sphere): boolean {
  const oc = vec3.sub(ray.origin, sphere.position);
  const a = vec3.dot(ray.direction, ray.direction);
  const b = 2.0 * vec3.dot(oc, ray.direction);
  const c = vec3.dot(oc, oc) - sphere.radius * sphere.radius;
  const discriminant = b * b - 4 * a * c;

  // Only consider intersections in the positive direction along the ray
  if (discriminant < 0) {
    return false;
  }
  const sqrtDiscriminant = Math.sqrt(discriminant);
  const t1 = (-b - sqrtDiscriminant) / (2 * a);
  const t2 = (-b + sqrtDiscriminant) / (2 * a);
  return t1 >= 0 || t2 >= 0;
}

export function rayIntersectsPlane(ray: Ray, plane: Plane): vec3 | null {
  const denominator = vec3.dot(ray.direction, plane.normal);
  if (Math.abs(denominator) < constants.EPSILON) {
    // Ray is parallel to the plane
    return null;
  }
  const t =
    vec3.dot(vec3.sub(plane.point, ray.origin), plane.normal) / denominator;
  if (t < 0) {
    // Intersection is behind the ray's origin
    return null;
  }
  return vec3.add(ray.origin, vec3.scale(ray.direction, t));
}
