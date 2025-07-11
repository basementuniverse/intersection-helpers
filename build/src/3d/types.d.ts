import { vec3 } from '@basementuniverse/vec';
/**
 * A point in 3D space
 */
export type Point = vec3;
/**
 * Type guard to check if a value is a Point
 */
export declare function isPoint(value: any): value is Point;
/**
 * A ray that extends infinitely in one direction
 */
export type Ray = {
    origin: Point;
    direction: vec3;
};
/**
 * Check if a value is a Ray
 */
export declare function isRay(value: any): value is Ray;
/**
 * A line segment defined by two endpoints
 */
export type Line = {
    start: Point;
    end: Point;
};
/**
 * Check if a value is a Line
 */
export declare function isLine(value: any): value is Line;
/**
 * A sphere defined by its center and radius
 */
export type Sphere = {
    position: Point;
    radius: number;
};
/**
 * Check if a value is a Sphere
 */
export declare function isSphere(value: any): value is Sphere;
/**
 * An axis-aligned bounding box (AABB) defined by the position of its top-left
 * corner and its width, height, and depth
 */
export type AABB = {
    position: Point;
    size: vec3;
};
/**
 * Check if a value is an AABB
 */
export declare function isAABB(value: any): value is AABB;
/**
 * A cuboid defined by the position of its center, side lengths, and
 * optional rotation
 *
 * Rotation is represented as Euler angles measured in radians and is applied
 * around the center of the rectangle
 */
export type Cuboid = {
    position: Point;
    size: vec3;
    rotation?: vec3;
};
/**
 * Check if a value is a Cuboid
 */
export declare function isCuboid(value: any): value is Cuboid;
/**
 * A plane defined by a point on the plane and a normal vector
 */
export type Plane = {
    point: Point;
    normal: vec3;
};
/**
 * Check if a value is a Plane
 */
export declare function isPlane(value: any): value is Plane;
/**
 * A polygon (triangle in 3D space) defined by three vertices
 */
export type Polygon = {
    vertices: [Point, Point, Point];
};
/**
 * Check if a value is a Polygon
 */
export declare function isPolygon(value: any): value is Polygon;
/**
 * A mesh defined by its vertices and indices
 *
 * Vertices are points in 3D space, and indices define how these vertices
 * are connected to form triangles
 */
export type Mesh = {
    vertices: Point[];
    indices: number[];
};
/**
 * Check if a value is a Mesh
 */
export declare function isMesh(value: any): value is Mesh;
