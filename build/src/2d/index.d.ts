import { vec2 } from '@basementuniverse/vec';
import { AABB, Circle, Line, Point, Polygon, Ray, Rectangle } from './types';
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
export declare function distance(a: Point, b: Point): number;
/**
 * Calculate the clockwise angle from point a to point b
 *
 * The result is in radians and ranges from 0 to 2π (360 degrees)
 *
 * Returns 0 if the vectors are equal
 */
export declare function angle(a: Point, b: Point): number;
/**
 * Calculate the clockwise angle between two lines or rays
 *
 * Returns 0 if either line is zero-length
 */
export declare function angleBetween(a: Line | Ray, b: Line | Ray): number;
/**
 * Check if three points in 2D space are collinear
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
export declare function aabb(o: Line | Rectangle | Circle | Polygon): AABB | null;
/**
 * Convert an AABB to a rectangle
 */
export declare function aabbToRectangle(aabb: AABB): Rectangle;
/**
 * Check if two AABBs overlap and return the overlapping area if so
 */
export declare function aabbsOverlap(a: AABB, b: AABB): {
    /**
     * Whether the two AABBs overlap
     */
    intersects: boolean;
    /**
     * The overlapping area, if the AABBs overlap
     */
    overlap?: AABB;
};
/**
 * Check if a point is inside an AABB
 *
 * This should be faster than pointInRectangle since we don't need to consider
 * rotation
 */
export declare function pointInAABB(point: Point, aabb: AABB): {
    /**
     * Whether the point is inside the AABB
     */
    intersects: boolean;
    /**
     * The closest point on the AABB perimeter to the given point
     */
    closestPoint: Point;
    /**
     * The distance from the point to the closest point on the AABB
     *
     * If the point is inside the AABB, this will be negative
     */
    distance: number;
    /**
     * The intersecting surface normal, if there is an intersection
     */
    normal?: vec2;
};
/**
 * Check if a rectangle is rotated
 */
export declare function rectangleIsRotated(rectangle: Rectangle): boolean;
/**
 * Get the vertices of a rectangle
 *
 * Vertices will be returned in clockwise order starting at the top-left:
 * - Top-left
 * - Top-right
 * - Bottom-right
 * - Bottom-left
 */
export declare function rectangleVertices(rectangle: Rectangle): Point[];
/**
 * Convert a list of vertices to a list of edges
 */
export declare function verticesToEdges(vertices: Point[]): Line[];
/**
 * Check if a polygon is convex
 *
 * Returns null if the polygon is invalid
 */
export declare function polygonIsConvex(polygon: Polygon): boolean | null;
/**
 * Check if a polygon self-intersects
 */
export declare function polygonSelfIntersects(polygon: Polygon): boolean;
/**
 * Check if a polygon is valid
 *
 * A polygon is valid if it has at least 3 vertices and does not
 * self-intersect
 */
export declare function polygonIsValid(polygon: Polygon): boolean;
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
export declare function polygonWindingOrder(polygon: Polygon, options?: {
    /**
     * The coordinate system can be 'cartesian' (where y increases upwards) or
     * 'screen' (where y increases downwards, this is the default)
     */
    coordinateSystem?: 'cartesian' | 'screen';
}): 'clockwise' | 'counter-clockwise' | null;
/**
 * Calculate the area of a polygon
 *
 * Returns null if the polygon is invalid
 */
export declare function polygonArea(polygon: Polygon): number | null;
/**
 * Calculate the centroid of a polygon
 *
 * Returns null if the polygon is invalid or degenerate (i.e. all vertices are
 * collinear)
 */
export declare function polygonCentroid(polygon: Polygon): Point | null;
/**
 * Calculate the convex hull of a polygon
 */
export declare function polygonConvexHull(polygon: Polygon, options?: {
    /**
     * Whether or not the convex hull should keep the same winding order as the
     * original polygon. Default value is true
     *
     * If this is false, the convex hull will always be returned in
     * counter-clockwise winding order
     */
    keepWindingOrder?: boolean;
}): Polygon | null;
/**
 * Optimise a polygon by removing collinear vertices and duplicate adjacent
 * vertices
 */
export declare function optimisePolygon(polygon: Polygon): Polygon | null;
/**
 * Decompose a polygon into a set of convex polygons using the Bayazit
 * algorithm
 *
 * Returns null if the polygon is invalid or cannot be decomposed
 */
export declare function decomposePolygon(polygon: Polygon, options?: {
    /**
     * The mode of decomposition: 'fast' uses a quick decomposition
     * algorithm that may not always produce the optimal result, while 'optimal'
     * uses a more complex algorithm that guarantees the best result
     * but is slower. Default is 'fast'
     */
    mode?: 'fast' | 'optimal';
    /**
     * Whether or not the convex polygons should keep the same winding
     * order as the original polygon. Default value is true
     *
     * If this is false, the convex polygons will be returned in whichever
     * winding order the decomposition algorithm produces (generally this is
     * clockwise, but it's not guaranteed; it could return a mixture of
     * clockwise and counter-clockwise winding orders)
     */
    keepWindingOrder?: boolean;
}): Polygon[] | null;
/**
 * Check if a point is on a ray
 */
export declare function pointOnRay(point: Point, ray: Ray): {
    /**
     * Whether the point is on the ray
     */
    intersects: boolean;
    /**
     * The closest point on the ray to the given point
     */
    closestPoint: Point;
    /**
     * The distance from the point to the closest point on the ray
     */
    distance: number;
    /**
     * The intersection normal - a unit vector perpendicular to the ray,
     * pointing towards the side that the test point is on
     *
     * If the point is on the ray, this will be undefined
     */
    normal?: vec2;
};
/**
 * Check if a point intersects a line segment
 */
export declare function pointOnLine(point: Point, line: Line): {
    /**
     * Whether the point intersects the line segment
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
    /**
     * The intersection normal - a unit vector perpendicular to the line,
     * pointing towards the side that the test point is on
     *
     * If the point is on the line, this will be undefined
     */
    normal?: vec2;
};
/**
 * Check if a point is inside a circle
 */
export declare function pointInCircle(point: Point, circle: Circle): {
    /**
     * Whether the point is inside the circle
     */
    intersects: boolean;
    /**
     * The closest point on the circle edge to the given point
     */
    closestPoint: Point;
    /**
     * The distance from the point to the closest point on the circle edge
     *
     * If the point is inside the circle, this will be negative
     */
    distance: number;
    /**
     * The intersection normal, if there is an intersection
     *
     * This will be normal to the tangent line at the closest point on the
     * circle edge
     */
    normal?: vec2;
};
/**
 * Check if a point is inside a rectangle
 *
 * In cases where the closest point is ambiguous (e.g. corners), the first edge
 * encountered with a closest point will be returned after evaluating edges in
 * this order:
 * top, right, bottom, left (before applying the rectangle's rotation)
 */
export declare function pointInRectangle(point: Point, rectangle: Rectangle): {
    /**
     * Whether the point is inside the rectangle
     */
    intersects: boolean;
    /**
     * The closest point on the rectangle edge to the given point
     */
    closestPoint: Point;
    /**
     * The distance from the point to the closest point on the rectangle edge
     *
     * If the point is inside the rectangle, this will be negative
     */
    distance: number;
    /**
     * The intersection normal, if there is an intersection
     *
     * This will be a normal to the surface on which the closest point lies
     *
     * This will be undefined if the rectangle has zero-size
     */
    normal?: vec2;
};
/**
 * Check if a point is inside a polygon
 *
 * Returns null if the polygon is invalid
 */
export declare function pointInPolygon(point: Point, polygon: Polygon): {
    /**
     * Whether the point is inside the polygon
     */
    intersects: boolean;
    /**
     * The closest point on the polygon edge to the given point
     */
    closestPoint: Point;
    /**
     * The distance from the point to the closest point on the polygon edge
     *
     * If the point is inside the polygon, this will be negative
     */
    distance: number;
    /**
     * The intersection normal, if there is an intersection
     *
     * This will be a normal to the surface on which the closest point lies
     */
    normal?: vec2;
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
export declare function rayTraverseGrid(ray: Ray, cellSize: number, gridTopLeft: vec2, gridBottomRight: vec2, maxCells?: number): {
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
 * Check if a ray intersects a circle
 */
export declare function rayIntersectsCircle(ray: Ray, circle: Circle): {
    /**
     * Whether the ray intersects the circle
     */
    intersects: boolean;
    /**
     * The intersection points if the ray intersects the circle
     */
    intersectionPoints?: Point[];
};
/**
 * Check if a ray intersects a rectangle
 */
export declare function rayIntersectsRectangle(ray: Ray, rectangle: Rectangle): {
    /**
     * Whether the ray intersects the rectangle
     */
    intersects: boolean;
    /**
     * The intersection points if the ray intersects the rectangle
     */
    intersectionPoints?: Point[];
};
/**
 * Check if a ray intersects a polygon
 *
 * Returns null if the polygon is invalid
 */
export declare function rayIntersectsPolygon(ray: Ray, polygon: Polygon): {
    /**
     * Whether the ray intersects the polygon
     */
    intersects: boolean;
    /**
     * The intersection points if the ray intersects the polygon
     */
    intersectionPoints?: Point[];
} | null;
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
     * Whether the line segments intersect
     */
    intersects: boolean;
    /**
     * The intersection point if the line segments intersect
     */
    intersectionPoint?: Point;
};
/**
 * Check if a line segment intersects a circle
 */
export declare function lineIntersectsCircle(line: Line, circle: Circle): {
    /**
     * Whether the line segment intersects the circle
     */
    intersects: boolean;
    /**
     * The intersection points if the line segment intersects the circle
     */
    intersectionPoints?: Point[];
};
/**
 * Check if a line segment intersects a rectangle
 */
export declare function lineIntersectsRectangle(line: Line, rectangle: Rectangle): {
    /**
     * Whether the line segment intersects the rectangle
     */
    intersects: boolean;
    /**
     * The intersection points if the line segment intersects the rectangle
     */
    intersectionPoints?: Point[];
};
/**
 * Check if a line segment intersects a polygon
 *
 * Returns null if the polygon is invalid
 */
export declare function lineIntersectsPolygon(line: Line, polygon: Polygon): {
    /**
     * Whether the line segment intersects the polygon
     */
    intersects: boolean;
    /**
     * The intersection points if the line segment intersects the polygon
     */
    intersectionPoints?: Point[];
} | null;
/**
 * Check if two circles intersect
 */
export declare function circleIntersectsCircle(circleA: Circle, circleB: Circle): {
    /**
     * Whether the circles intersect
     */
    intersects: boolean;
    /**
     * The intersection points on each circle's circumference if the circles
     * intersect
     */
    intersectionPoints?: Point[];
    /**
     * The minimum separation vector between the circles if they intersect
     */
    minimumSeparation?: vec2;
};
/**
 * Check if a circle intersects a rectangle
 */
export declare function circleIntersectsRectangle(circle: Circle, rectangle: Rectangle): {
    /**
     * Whether the circle intersects the rectangle
     */
    intersects: boolean;
    /**
     * The intersection points on the rectangle's edges if the circle intersects
     * the rectangle
     */
    intersectionPoints?: Point[];
    /**
     * The minimum separation vector between the circle and rectangle if they
     * intersect
     */
    minimumSeparation?: vec2;
};
/**
 * Check if a circle intersects a polygon
 *
 * Returns null if the polygon is invalid
 */
export declare function circleIntersectsPolygon(circle: Circle, polygon: Polygon, options?: {
    /**
     * Whether to find the minimum separation vector between the circle and
     * polygon if they intersect. Default is false
     */
    findMinimumSeparation?: boolean;
}): {
    /**
     * Whether the circle intersects the polygon
     */
    intersects: boolean;
    /**
     * The intersection points on the polygon's edges if the circle intersects
     * the polygon
     */
    intersectionPoints?: Point[];
    /**
     * The minimum separation vector between the circle and polygon if they
     * intersect and `findMinimumSeparation` is true
     */
    minimumSeparation?: vec2;
} | null;
/**
 * Check if two rectangles intersect
 */
export declare function rectangleIntersectsRectangle(rectangleA: Rectangle, rectangleB: Rectangle): {
    /**
     * Whether the rectangles intersect
     */
    intersects: boolean;
    /**
     * The intersection points on the edges of the rectangles if they intersect
     */
    intersectionPoints?: Point[];
    /**
     * The minimum separation vector between the rectangles if they intersect
     */
    minimumSeparation?: vec2;
};
/**
 * Check if a rectangle intersects a polygon
 *
 * Returns null if the polygon is invalid
 */
export declare function rectangleIntersectsPolygon(rectangle: Rectangle, polygon: Polygon): {
    /**
     * Whether the rectangle intersects the polygon
     */
    intersects: boolean;
    /**
     * The intersection points on the polygon's edges if the rectangle intersects
     * the polygon
     */
    intersectionPoints?: Point[];
} | null;
/**
 * Check if two polygons intersect
 *
 * Returns null if either polygon is invalid
 */
export declare function polygonIntersectsPolygon(polygonA: Polygon, polygonB: Polygon): {
    /**
     * Whether the polygons intersect
     */
    intersects: boolean;
    /**
     * The intersection points on the edges of the polygons if they intersect
     */
    intersectionPoints?: Point[];
} | null;
