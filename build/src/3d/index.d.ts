import { vec3 } from '@basementuniverse/vec';
import { AABB, Cuboid, Line, Mesh, Plane, Point, Polygon, Ray, Sphere } from './types';
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
export declare function distance(a: Point, b: Point): number;
/**
 * Calculate the Euler angle from point a to point b
 */
export declare function angle(a: Point, b: Point): vec3;
/**
 * Calculate the angle between two lines or rays
 *
 * Returns 0 if either line is zero-length
 */
export declare function angleBetween(a: Line | Ray, b: Line | Ray): number;
/**
 * Check if three points in 3D space are collinear
 */
export declare function pointsAreCollinear(a: Point, b: Point, c: Point): boolean;
/**
 * Convert a line segment to a ray
 */
export declare function lineToRay(line: Line): Ray;
/**
 * Convert a ray to a line segment
 */
export declare function rayToLine(ray: Ray, length?: number): Line;
/**
 * Get the bounding box (AABB) of a geometric object
 */
export declare function aabb(o: Line | Sphere | Cuboid | Polygon | Mesh): AABB | null;
/**
 * Convert an AABB to a cuboid
 */
export declare function aabbToCuboid(aabb: AABB): Cuboid;
/**
 * Check if two AABBs overlap and return the overlapping volume if they do
 */
export declare function aabbsOverlap(a: AABB, b: AABB): {
    /**
     * Whether the two AABBs overlap
     */
    intersects: boolean;
    /**
     * The overlapping volume as an AABB
     */
    overlap?: AABB;
};
/**
 * Check if a point is inside an AABB
 *
 * This should be a bit faster than pointInRectangle since we don't need to
 * worry about rotation
 */
export declare function pointInAABB(point: Point, aabb: AABB): {
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
};
/**
 * Check if a cuboid is rotated
 */
export declare function cuboidIsRotated(cuboid: Cuboid): boolean;
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
export declare function cuboidVertices(cuboid: Cuboid): Point[];
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
export declare function cuboidToPolygons(cuboid: Cuboid): Polygon[];
/**
 * Convert a list of vertices to a list of edges
 */
export declare function verticesToEdges(vertices: Point[]): Line[];
/**
 * Check if a polygon is valid
 *
 * A polygon is valid if it has exactly 3 vertices
 */
export declare function polygonIsValid(polygon: Polygon): boolean;
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
export declare function polygonWindingOrder(polygon: Polygon, options?: {
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
}): 'clockwise' | 'counter-clockwise' | null;
/**
 * Calculate the 2D area of a polygon in 3D space
 *
 * Returns null if the polygon is invalid
 */
export declare function polygonArea(polygon: Polygon): number | null;
/**
 * Calculate the centroid of a polygon
 *
 * Returns null if the polygon is invalid
 */
export declare function polygonCentroid(polygon: Polygon): Point | null;
/**
 * Convert a polygon to a plane
 */
export declare function polygonToPlane(polygon: Polygon): Plane | null;
/**
 * Convert a list of polygons to a mesh
 *
 * This optimises the number of vertices and edges by merging common vertices
 */
export declare function polygonsToMesh(polygons: Polygon[]): Mesh;
/**
 * Convert a mesh to a list of polygons
 */
export declare function meshToPolygons(mesh: Mesh): Polygon[];
/**
 * Convert a mesh to a list of edges
 */
export declare function meshToEdges(mesh: Mesh): Line[];
/**
 * Calculate the centroid of a mesh
 */
export declare function meshCentroid(mesh: Mesh): Point;
/**
 * Perform an edge manifold check to tell if a mesh is watertight
 *
 * Every edge in a watertight mesh should be shared by exactly two triangles
 *
 * This isn't perfect, but it should be sufficient for most simple cases
 */
export declare function meshIsWatertight(mesh: Mesh): boolean;
/**
 * Check if a point is on a ray
 *
 * Also returns the closest point on the ray and the distance to it
 */
export declare function pointOnRay(point: Point, ray: Ray): {
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
};
/**
 * Check if a point intersects a line segment
 *
 * Also returns the closest point on the line segment and the distance to it
 */
export declare function pointOnLine(point: Point, line: Line): {
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
};
/**
 * Check if a point is inside a sphere
 *
 * Also returns the closest point on the sphere edge and the distance to it
 *
 * If the point is inside the sphere, the distance will be negative
 */
export declare function pointInSphere(point: Point, sphere: Sphere): {
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
};
/**
 * Check if a point is inside a cuboid
 */
export declare function pointInCuboid(point: Point, cuboid: Cuboid): {
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
};
export declare function pointOnPolygon(point: Point, polygon: Polygon): {
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
} | null;
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
export declare function rayTraverseGrid(ray: Ray, cellSize: number, gridTopLeftFront: vec3, gridBottomRightBack: vec3, maxCells?: number): {
    cells: Point[];
};
/**
 * Check if two rays intersect
 */
export declare function rayIntersectsRay(rayA: Ray, rayB: Ray): {
    /**
     * Whether the rays intersect
     */
    intersects: boolean;
    /**
     * The intersection point if the rays intersect
     */
    intersectionPoint?: Point;
};
/**
 * Check if a ray intersects a line segment
 */
export declare function rayIntersectsLine(ray: Ray, line: Line): {
    /**
     * Whether the ray intersects the line segment
     */
    intersects: boolean;
    /**
     * The intersection point if the ray intersects the line segment
     */
    intersectionPoint?: Point;
};
/**
 * Check if a ray intersects a sphere
 */
export declare function rayIntersectsSphere(ray: Ray, sphere: Sphere): {
    /**
     * Whether the ray intersects the sphere
     */
    intersects: boolean;
    /**
     * The intersection points if the ray intersects the sphere
     */
    intersectionPoints?: Point[];
};
/**
 * Check if a ray intersects a plane
 */
export declare function rayIntersectsPlane(ray: Ray, plane: Plane): {
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
};
/**
 * Check if a ray intersects a cuboid
 */
export declare function rayIntersectsCuboid(ray: Ray, cuboid: Cuboid): {
    /**
     * Whether the ray intersects the cuboid
     */
    intersects: boolean;
    /**
     * The intersection points if the ray intersects the cuboid
     */
    intersectionPoints?: Point[];
};
/**
 * Check if a ray intersects a polygon
 */
export declare function rayIntersectsPolygon(ray: Ray, polygon: Polygon): {
    /**
     * Whether the ray intersects the polygon
     */
    intersects: boolean;
    /**
     * The intersection point if the ray intersects the polygon
     */
    intersectionPoint?: Point;
} | null;
/**
 * Check if a ray intersects any of the polygons in a mesh
 */
export declare function rayIntersectsMesh(ray: Ray, mesh: Mesh): {
    /**
     * Whether the ray intersects any polygon in the mesh
     */
    intersects: boolean;
    /**
     * The intersection points if the ray intersects any polygon in the mesh
     */
    intersectionPoints?: Point[];
};
/**
 * Check if a line segment intersects a ray
 */
export declare function lineIntersectsRay(line: Line, ray: Ray): {
    /**
     * Whether the line segment intersects the ray
     */
    intersects: boolean;
    /**
     * The intersection point if the line segment intersects the ray
     */
    intersectionPoint?: Point;
};
/**
 * Check if two line segments intersect
 */
export declare function lineIntersectsLine(lineA: Line, lineB: Line): {
    /**
     * Whether the two line segments intersect
     */
    intersects: boolean;
    /**
     * The intersection point if the line segments intersect
     */
    intersectionPoint?: Point;
};
/**
 * Check if a line segments intersects a sphere
 */
export declare function lineIntersectsSphere(line: Line, sphere: Sphere): {
    /**
     * Whether the line segment intersects the sphere
     */
    intersects: boolean;
    /**
     * The intersection points if the line segment intersects the sphere
     */
    intersectionPoints?: Point[];
};
/**
 * Check if a line segments intersects a plane
 */
export declare function lineIntersectsPlane(line: Line, plane: Plane): {
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
};
/**
 * Check if a line segment intersects a cuboid
 */
export declare function lineIntersectsCuboid(line: Line, cuboid: Cuboid): {
    /**
     * Whether the line segment intersects the cuboid
     */
    intersects: boolean;
    /**
     * The intersection points if the line segment intersects the cuboid
     */
    intersectionPoints?: Point[];
};
/**
 * Check if a line segment intersects a polygon
 */
export declare function lineIntersectsPolygon(line: Line, polygon: Polygon): {
    /**
     * Whether the line segment intersects the polygon
     */
    intersects: boolean;
    /**
     * The intersection point if the line segment intersects the polygon
     */
    intersectionPoint?: Point;
};
/**
 * Check if a line segment intersects a cuboid
 */
export declare function lineIntersectsMesh(line: Line, mesh: Mesh): {
    /**
     * Whether the line segment intersects any polygon in the mesh
     */
    intersects: boolean;
    /**
     * The intersection points if the line segment intersects any polygon in the
     * mesh
     */
    intersectionPoints?: Point[];
};
/**
 * Check if two spheres intersect
 */
export declare function sphereIntersectsSphere(sphereA: Sphere, sphereB: Sphere): {
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
};
/**
 * Check if a sphere intersects a plane
 */
export declare function sphereIntersectsPlane(sphere: Sphere, plane: Plane): {
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
};
/**
 * Check if a sphere intersects a cuboid
 */
export declare function sphereIntersectsCuboid(sphere: Sphere, cuboid: Cuboid): {
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
};
/**
 * Check if a sphere intersects a polygon
 */
export declare function sphereIntersectsPolygon(sphere: Sphere, polygon: Polygon): {
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
} | null;
/**
 * Check if a sphere intersects any polygon in a mesh
 */
export declare function sphereIntersectsMesh(sphere: Sphere, mesh: Mesh): {
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
};
/**
 * Check if two planes intersect
 *
 * Based on the algorithm described in "Real-Time Collision Detection" by
 * Christer Ericson
 */
export declare function planeIntersectsPlane(planeA: Plane, planeB: Plane): {
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
};
/**
 * Check if a plane intersects one or more polygons in a mesh
 */
export declare function planeIntersectsMesh(plane: Plane, mesh: Mesh): {
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
};
/**
 * Check if two cuboids intersect using the Separating Axis Theorem
 */
export declare function cuboidIntersectsCuboid(cuboidA: Cuboid, cuboidB: Cuboid): {
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
};
/**
 * Check if a cuboid intersects a plane
 */
export declare function cuboidIntersectsPlane(cuboid: Cuboid, plane: Plane): {
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
};
/**
 * Check if a cuboid intersects a polygon
 */
export declare function cuboidIntersectsPolygon(cuboid: Cuboid, polygon: Polygon): {
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
} | null;
/**
 * Check if a cuboid intersects any polygon in a mesh
 */
export declare function cuboidIntersectsMesh(cuboid: Cuboid, mesh: Mesh): {
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
};
/**
 * Check if two polygons intersect
 */
export declare function polygonIntersectsPolygon(polygonA: Polygon, polygonB: Polygon): {
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
} | null;
/**
 * Check if a polygon intersects a plane
 */
export declare function polygonIntersectsPlane(polygon: Polygon, plane: Plane): {
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
} | null;
/**
 * Check if a polygon intersects any polygon in a mesh
 */
export declare function polygonIntersectsMesh(polygon: Polygon, mesh: Mesh): {
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
} | null;
/**
 * Check if two meshes intersect using their polygons
 */
export declare function meshIntersectsMesh(meshA: Mesh, meshB: Mesh): {
    /**
     * Whether any polygons in either mesh intersect with polygons from the other
     * mesh
     */
    intersects: boolean;
    /**
     * The points where the polygons intersect
     */
    intersectionPoints?: Point[];
};
/**
 * Check if any polygons in a mesh intersect a plane
 */
export declare function meshIntersectsPlane(mesh: Mesh, plane: Plane): {
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
};
