# Intersection Helpers

## Notes

This is a basic intersections library for 2d and 3d geometry

It should have separate namespaces for 2d and 3d geometry

Each namespace should have types, functions, and constants that are relevant to that namespace
As well as intersection functions, we might include some utility functions for working with the geometry

The library should make use of the vec2, vec3, and mat types from the @basementuniverse/vec library (documentation for this library is in vec-readme.md)

The library should also make use of utility functions from the @basementuniverse/utils library where appropriate (documentation for this library is in utils-readme.md)

2d: Point2D, Ray2D, Line2D, Circle, Rectangle, Polygon
3d: Point3D, Ray3D, Line3D, Sphere, Triangle, Plane, Box

some definitions:

a ray has a starting point and direction, and extends infinitely in that direction
a line has a starting point and ending point, and is finite in length
a rectangle might be AABB or rotated, we should include optimised code path for AABB if possible
a triangle is simply a 3d polygon with 3 vertices
a plane is defined as a position and a normal vector (it's an infinite plane)

we should maybe try to standardise the return type of each function in the library? Like, maybe these functions return an object or a tuple

utility functions should include:

- distance2D (returns the distance between two 2d points)
- distance3D (returns the distance between two 3d points)
- angle2D (returns the angle between two 2d points)
- angle3D (returns the angle between two 3d points)
- polygonIsConvex
- decomposePolygon2D (using Bayazit's algorithm)
- overlap1D (checks if two 1D intervals overlap)
- also functions to convert 2d rectangles between various formats (e.g. topleft position and size, center position and size, etc.)
- also maybe a function that can take a ray and a length and return a line, or convert a line to a ray

main functions should include:

2d namespace:

pointOnRay (returns closest point on ray)
pointOnLine (returns closest point on line segment)
pointInCircle (boolean, maybe also return shortest distance to circle edge)
pointInRectangle (boolean, maybe also return shortest x/y distance to rectangle edge if AABB, or shortest distance to rectangle edge if rotated rectangle)
pointInPolygon (boolean, maybe also return shortest distance to polygon edge and some way of identifying which edge it is closest to)

rayIntersectsRay (returns intersection point if it exists, otherwise returns null)
rayIntersectsLine (returns intersection point if it exists, otherwise returns null)
rayIntersectsCircle (returns intersection point/points if any exist, otherwise returns null)
rayIntersectsRectangle (returns intersection point/points if any exist, otherwise returns null)
rayIntersectsPolygon (returns intersection point/points if any exist, otherwise returns null)

lineIntersectsRay (alias for rayIntersectsLine, but we just switch the order of the arguments)
lineIntersectsLine (returns intersection point if it exists, otherwise returns null)
lineIntersectsCircle (returns intersection point/points if any exist, otherwise returns null)
lineIntersectsRectangle (returns intersection point/points if any exist, otherwise returns null)
lineIntersectsPolygon (returns intersection point/points if any exist, otherwise returns null)

circleIntersectsCircle (returns intersection point/points if any exist, otherwise returns null)
circleIntersectsRectangle (returns intersection point/points if any exist, otherwise returns null)
circleIntersectsPolygon (returns intersection point/points if any exist, otherwise returns null)

rectangleIntersectsRectangle (returns intersection point/points if any exist, otherwise returns null)
rectangleIntersectsPolygon (returns intersection point/points if any exist, otherwise returns null)

polygonIntersectsPolygon (returns intersection point/points if any exist, otherwise returns null)

3d namespace:

pointOnRay (returns closest point on ray)
pointOnLine (returns closest point on line segment)
pointInSphere (boolean, maybe also return shortest distance to sphere surface)
pointOnPlane (returns closest point on plane)
pointInTriangle (boolean, maybe also return shortest distance to triangle surface)
pointInBox (boolean, maybe also return shortest distance to box surface)

rayIntersectsRay (returns intersection point if it exists, otherwise returns null)
rayIntersectsLine (returns intersection point if it exists, otherwise returns null)
rayIntersectsSphere (returns intersection point/points if any exist, otherwise returns null)
rayIntersectsTriangle (returns intersection point/points if any exist, otherwise returns null)
rayIntersectsPlane (returns intersection point if it exists, otherwise returns null)
rayIntersectsBox (returns intersection point/points if any exist, otherwise returns null)

lineIntersectsRay (alias for rayIntersectsLine, but we just switch the order of the arguments)
lineIntersectsLine (returns intersection point if it exists, otherwise returns null)
lineIntersectsSphere (returns intersection point/points if any exist, otherwise returns null)
lineIntersectsTriangle (returns intersection point/points if any exist, otherwise returns null)
lineIntersectsPlane (returns intersection point if it exists, otherwise returns null)
lineIntersectsBox (returns intersection point/points if any exist, otherwise returns null)

sphereIntersectsSphere (returns intersection point/points if any exist, otherwise returns null)
sphereIntersectsTriangle (returns intersection point/points if any exist, otherwise returns null)
sphereIntersectsPlane (returns intersection point if it exists, otherwise returns null)
sphereIntersectsBox (returns intersection point/points if any exist, otherwise returns null)

triangleIntersectsTriangle (returns intersection point/points if any exist, otherwise returns null)
triangleOnPlane (checks if triangle is coplanar with plane, returns true if it is, false otherwise)

planeIntersectsPlane (returns intersection line if it exists, otherwise returns null)

boxIntersectsBox (returns intersection volume if it exists, otherwise returns null)
