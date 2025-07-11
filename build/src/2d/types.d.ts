import { vec2 } from '@basementuniverse/vec';
/**
 * A point in 2D space
 */
export type Point = vec2;
/**
 * Type guard to check if a value is a Point
 */
export declare function isPoint(value: any): value is Point;
/**
 * A ray that extends infinitely in one direction
 */
export type Ray = {
    origin: Point;
    direction: vec2;
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
 * A circle defined by its center and radius
 */
export type Circle = {
    position: Point;
    radius: number;
};
/**
 * Check if a value is a Circle
 */
export declare function isCircle(value: any): value is Circle;
/**
 * An axis-aligned bounding box (AABB) defined by the position of its top-left
 * corner and its width and height
 */
export type AABB = {
    position: Point;
    size: vec2;
};
/**
 * Check if a value is an AABB
 */
export declare function isAABB(value: any): value is AABB;
/**
 * A rectangle defined by the position of its center, side lengths, and
 * optional rotation
 *
 * Rotation is in radians and is applied around the center of the rectangle
 */
export type Rectangle = {
    position: Point;
    size: vec2;
    rotation?: number;
};
/**
 * Check if a value is a Rectangle
 */
export declare function isRectangle(value: any): value is Rectangle;
/**
 * A polygon defined by its vertices
 *
 * Vertices can be ordered in clockwise or counter-clockwise winding order
 */
export type Polygon = {
    vertices: Point[];
};
/**
 * Check if a value is a Polygon
 */
export declare function isPolygon(value: any): value is Polygon;
