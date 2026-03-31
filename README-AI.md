# Intersection Helpers — API Quick Reference

## How to use

### Node

```js
const { distance } = require('@basementuniverse/intersection-helpers/2d');

const pointA = { x: 1, y: 2 };
const pointB = { x: 4, y: 2 };
console.log(distance(pointA, pointB));
```

### Node (TypeScript)

```ts
import { distance, Point } from '@basementuniverse/intersection-helpers/2d';

const pointA: Point = { x: 1, y: 2 };
const pointB: Point = { x: 4, y: 2 };
console.log(distance(pointA, pointB));
```

### Browser

```html
<script src="intersection-helpers/build/index.js"></script>
<script>

const pointA = { x: 1, y: 2 };
const pointB = { x: 4, y: 2 };
console.log(intersection2d.distance(pointA, pointB));

</script>
```

---

## 2D (`@basementuniverse/intersection-helpers/2d`)

Uses the screen coordinate system (Y+ points downwards).

### Types

| Type | Shape |
|------|-------|
| `Point` | `vec2` — `{ x: number, y: number }` |
| `Ray` | `{ origin: Point, direction: vec2 }` |
| `Line` | `{ start: Point, end: Point }` |
| `Circle` | `{ position: Point, radius: number }` |
| `AABB` | `{ position: Point, size: vec2 }` — `position` is the top-left corner |
| `Rectangle` | `{ position: Point, size: vec2, rotation?: number }` — `position` is the center; `rotation` is in radians |
| `Polygon` | `{ vertices: Point[] }` |

### Utilities

```ts
distance(a: Point, b: Point): number
```

```ts
angle(a: Point, b: Point): number
// Clockwise angle from a to b in radians, range [0, 2π]. Returns 0 if points are equal.
```

```ts
angleBetween(a: Line | Ray, b: Line | Ray): number
// Clockwise angle between two lines or rays in radians, range [0, 2π]. Returns 0 if either is zero-length.
```

```ts
pointsAreCollinear(a: Point, b: Point, c: Point): boolean
```

### Line / Ray conversion

```ts
lineToRay(line: Line): Ray
rayToLine(ray: Ray, length?: number): Line  // length defaults to 1
```

### AABBs

```ts
aabb(o: Line | Rectangle | Circle | Polygon): AABB | null
// Returns the axis-aligned bounding box of a shape.

aabbToRectangle(aabb: AABB): Rectangle

aabbsOverlap(a: AABB, b: AABB): {
  intersects: boolean;
  overlap?: AABB;          // the overlapping region, if any
}

pointInAABB(point: Point, aabb: AABB): {
  intersects: boolean;
  closestPoint: Point;     // closest point on the AABB perimeter
  distance: number;        // negative if point is inside
  normal?: vec2;           // surface normal at closest point, only when intersecting
}

encloseAABBs(...aabbs: AABB[]): AABB
// Returns the smallest AABB that contains all the given AABBs.
```

### Rectangle utilities

```ts
rectangleIsRotated(rectangle: Rectangle): boolean

rectangleVertices(rectangle: Rectangle): Point[]
// Returns [topLeft, topRight, bottomRight, bottomLeft] in clockwise order
// (before rotation is applied).
```

### Polygon utilities

```ts
verticesToEdges(vertices: Point[]): Line[]

polygonIsConvex(polygon: Polygon): boolean | null       // null if polygon is invalid

polygonSelfIntersects(polygon: Polygon): boolean

polygonIsValid(polygon: Polygon): boolean
// A polygon is valid if it has ≥ 3 vertices and does not self-intersect.

polygonWindingOrder(
  polygon: Polygon,
  options?: { coordinateSystem?: 'cartesian' | 'screen' }  // default: 'screen'
): 'clockwise' | 'counter-clockwise' | null              // null if polygon is invalid

polygonArea(polygon: Polygon): number | null             // null if polygon is invalid

polygonCentroid(polygon: Polygon): Point | null          // null if invalid or degenerate

polygonConvexHull(
  polygon: Polygon,
  options?: { keepWindingOrder?: boolean }               // default: true
): Polygon | null
// Computes the convex hull using Andrew's monotone chain algorithm.
// Returns the original polygon unchanged if it is already convex.

optimisePolygon(polygon: Polygon): Polygon | null
// Removes collinear vertices and duplicate adjacent vertices.

decomposePolygon(
  polygon: Polygon,
  options?: {
    mode?: 'fast' | 'optimal';       // default: 'fast'
    keepWindingOrder?: boolean;      // default: true
  }
): Polygon[] | null
// Decomposes a concave polygon into convex sub-polygons (Bayazit algorithm).
// Returns a single-element array if the polygon is already convex.
```

### Point tests

All point functions return a `closestPoint` on the shape's boundary and a signed `distance` (negative means the point is inside the shape). A `normal` is included when the point intersects.

```ts
pointOnRay(point: Point, ray: Ray): {
  intersects: boolean;
  closestPoint: Point;
  distance: number;
  normal?: vec2;
}

pointOnLine(point: Point, line: Line): {
  intersects: boolean;
  closestPoint: Point;
  distance: number;
  normal?: vec2;
}

pointInCircle(point: Point, circle: Circle): {
  intersects: boolean;
  closestPoint: Point;
  distance: number;        // negative if inside
  normal?: vec2;
}

pointInRectangle(point: Point, rectangle: Rectangle): {
  intersects: boolean;
  closestPoint: Point;
  distance: number;        // negative if inside
  normal?: vec2;
}

pointInPolygon(point: Point, polygon: Polygon): {
  intersects: boolean;
  closestPoint: Point;
  distance: number;        // negative if inside
  normal?: vec2;
} | null                   // null if polygon is invalid
```

### Ray traversal

```ts
rayTraverseGrid(
  ray: Ray,
  cellSize: number,
  gridTopLeft: vec2,
  gridBottomRight: vec2,
  maxCells?: number        // default: -1 (no limit, up to 10 000)
): { cells: Point[] }
// Returns the grid cell coordinates (as integer points) that the ray passes
// through, in traversal order. Based on Amanatides & Woo's fast voxel
// traversal algorithm.
```

### Ray intersections

```ts
rayIntersectsRay(rayA: Ray, rayB: Ray): {
  intersects: boolean;
  intersectionPoint?: Point;
}

rayIntersectsLine(ray: Ray, line: Line): {
  intersects: boolean;
  intersectionPoint?: Point;
}

rayIntersectsCircle(ray: Ray, circle: Circle): {
  intersects: boolean;
  intersectionPoints?: Point[];   // 1 or 2 points
}

rayIntersectsRectangle(ray: Ray, rectangle: Rectangle): {
  intersects: boolean;
  intersectionPoints?: Point[];   // sorted by distance from ray origin
}

rayIntersectsPolygon(ray: Ray, polygon: Polygon): {
  intersects: boolean;
  intersectionPoints?: Point[];
} | null                          // null if polygon is invalid
```

### Line intersections

```ts
lineIntersectsRay(line: Line, ray: Ray): {
  intersects: boolean;
  intersectionPoint?: Point;
}

lineIntersectsLine(lineA: Line, lineB: Line): {
  intersects: boolean;
  intersectionPoint?: Point;
}

lineIntersectsCircle(line: Line, circle: Circle): {
  intersects: boolean;
  intersectionPoints?: Point[];
}

lineIntersectsRectangle(line: Line, rectangle: Rectangle): {
  intersects: boolean;
  intersectionPoints?: Point[];
}

lineIntersectsPolygon(line: Line, polygon: Polygon): {
  intersects: boolean;
  intersectionPoints?: Point[];
} | null                          // null if polygon is invalid
```

### Circle intersections

```ts
circleIntersectsCircle(circleA: Circle, circleB: Circle): {
  intersects: boolean;
  intersectionPoints?: Point[];
  minimumSeparation?: vec2;       // vector to move circleA out of circleB
}

circleIntersectsRectangle(circle: Circle, rectangle: Rectangle): {
  intersects: boolean;
  intersectionPoints?: Point[];
  minimumSeparation?: vec2;
}

circleIntersectsPolygon(
  circle: Circle,
  polygon: Polygon,
  options?: { findMinimumSeparation?: boolean }  // default: false
): {
  intersects: boolean;
  intersectionPoints?: Point[];
  minimumSeparation?: vec2;
} | null                          // null if polygon is invalid
```

### Rectangle intersections

```ts
rectangleIntersectsRectangle(rectangleA: Rectangle, rectangleB: Rectangle): {
  intersects: boolean;
  intersectionPoints?: Point[];
  minimumSeparation?: vec2;
}

rectangleIntersectsPolygon(rectangle: Rectangle, polygon: Polygon): {
  intersects: boolean;
  intersectionPoints?: Point[];
} | null                          // null if polygon is invalid
```

### Polygon intersections

```ts
polygonIntersectsPolygon(polygonA: Polygon, polygonB: Polygon): {
  intersects: boolean;
  intersectionPoints?: Point[];
} | null                          // null if either polygon is invalid
```

---

## 3D (`@basementuniverse/intersection-helpers/3d`)

> **Note:** The 3D namespace is largely untested and may contain bugs.

In 3D, `Polygon` is always a triangle (exactly 3 vertices).

### Types

| Type | Shape |
|------|-------|
| `Point` | `vec3` — `{ x: number, y: number, z: number }` |
| `Ray` | `{ origin: Point, direction: vec3 }` |
| `Line` | `{ start: Point, end: Point }` |
| `Sphere` | `{ position: Point, radius: number }` |
| `AABB` | `{ position: Point, size: vec3 }` — `position` is the top-left-front corner |
| `Cuboid` | `{ position: Point, size: vec3, rotation?: vec3 }` — `position` is the center; `rotation` is Euler angles in radians |
| `Plane` | `{ point: Point, normal: vec3 }` |
| `Polygon` | `{ vertices: [Point, Point, Point] }` — always a triangle |
| `Mesh` | `{ vertices: Point[], indices: number[] }` — indices are triplets defining triangles |

### Utilities

```ts
distance(a: Point, b: Point): number

angle(a: Point, b: Point): vec3
// Returns Euler angles (x, y, z) from a to b, each in range [0, 2π].

angleBetween(a: Line | Ray, b: Line | Ray): number
// Returns the angle between two lines or rays in radians. Returns 0 if either is zero-length.

pointsAreCollinear(a: Point, b: Point, c: Point): boolean
```

### Line / Ray conversion

```ts
lineToRay(line: Line): Ray
rayToLine(ray: Ray, length?: number): Line  // length defaults to 1
```

### AABBs

```ts
aabb(o: Line | Sphere | Cuboid | Polygon | Mesh): AABB | null

aabbToCuboid(aabb: AABB): Cuboid

aabbsOverlap(a: AABB, b: AABB): {
  intersects: boolean;
  overlap?: AABB;
}

pointInAABB(point: Point, aabb: AABB): {
  intersects: boolean;
  closestPoint: Point;
  distance: number;        // negative if inside
}

encloseAABBs(...aabbs: AABB[]): AABB
```

### Cuboid utilities

```ts
cuboidIsRotated(cuboid: Cuboid): boolean

cuboidVertices(cuboid: Cuboid): Point[]
// Returns 8 vertices: upper face [TL, TR, BR, BL] then lower face [TL, TR, BR, BL].

cuboidToPolygons(cuboid: Cuboid): Polygon[]
// Returns 12 triangles (2 per face) in order: top, bottom, front, back, left, right.
```

### Polygon utilities

```ts
verticesToEdges(vertices: Point[]): Line[]

polygonIsValid(polygon: Polygon): boolean
// Valid only if it has exactly 3 vertices.

polygonWindingOrder(
  polygon: Polygon,
  options?: {
    handedness?: 'right' | 'left';  // default: 'right'
    normal?: Point;                 // optional reference normal
  }
): 'clockwise' | 'counter-clockwise' | null

polygonArea(polygon: Polygon): number | null

polygonCentroid(polygon: Polygon): Point | null

polygonToPlane(polygon: Polygon): Plane | null
// Derives the plane containing the polygon.
```

### Mesh utilities

```ts
polygonsToMesh(polygons: Polygon[]): Mesh
// Merges shared vertices automatically.

meshToPolygons(mesh: Mesh): Polygon[]

meshToEdges(mesh: Mesh): Line[]

meshCentroid(mesh: Mesh): Point

meshIsWatertight(mesh: Mesh): boolean
// Checks that every edge is shared by exactly 2 triangles (edge-manifold check).
```

### Point tests

```ts
pointOnRay(point: Point, ray: Ray): {
  intersects: boolean;
  closestPoint?: Point;
  distance: number;
}

pointOnLine(point: Point, line: Line): {
  intersects: boolean;
  closestPoint: Point;
  distance: number;
}

pointInSphere(point: Point, sphere: Sphere): {
  intersects: boolean;
  closestPoint: Point;
  distance: number;        // negative if inside
}

pointInCuboid(point: Point, cuboid: Cuboid): {
  intersects: boolean;
  closestPoint: Point;
  distance: number;        // negative if inside
}

pointOnPolygon(point: Point, polygon: Polygon): {
  intersects: boolean;
  closestPoint: Point;
  distance: number;
} | null                   // null if polygon is invalid
```

### Ray traversal

```ts
rayTraverseGrid(
  ray: Ray,
  cellSize: number,
  gridTopLeftFront: vec3,
  gridBottomRightBack: vec3,
  maxCells?: number        // default: -1 (no limit, up to 10 000)
): { cells: Point[] }
// 3D extension of Amanatides & Woo's fast voxel traversal algorithm.
```

### Ray intersections

```ts
rayIntersectsRay(rayA: Ray, rayB: Ray): {
  intersects: boolean;
  intersectionPoint?: Point;
}

rayIntersectsLine(ray: Ray, line: Line): {
  intersects: boolean;
  intersectionPoint?: Point;
}

rayIntersectsSphere(ray: Ray, sphere: Sphere): {
  intersects: boolean;
  intersectionPoints?: Point[];   // 1 or 2 points
}

rayIntersectsPlane(ray: Ray, plane: Plane): {
  intersects: boolean;
  intersectionPoint?: Point;      // undefined when ray lies in the plane
}

rayIntersectsCuboid(ray: Ray, cuboid: Cuboid): {
  intersects: boolean;
  intersectionPoints?: Point[];   // entry and exit points
}

rayIntersectsPolygon(ray: Ray, polygon: Polygon): {
  intersects: boolean;
  intersectionPoint?: Point;
} | null                          // null if polygon is invalid

rayIntersectsMesh(ray: Ray, mesh: Mesh): {
  intersects: boolean;
  intersectionPoints?: Point[];   // one point per intersected triangle
}
```

### Line intersections

```ts
lineIntersectsRay(line: Line, ray: Ray): {
  intersects: boolean;
  intersectionPoint?: Point;
}

lineIntersectsLine(lineA: Line, lineB: Line): {
  intersects: boolean;
  intersectionPoint?: Point;
}

lineIntersectsSphere(line: Line, sphere: Sphere): {
  intersects: boolean;
  intersectionPoints?: Point[];
}

lineIntersectsPlane(line: Line, plane: Plane): {
  intersects: boolean;
  intersectionPoint?: Point;      // undefined when line lies in the plane
}

lineIntersectsCuboid(line: Line, cuboid: Cuboid): {
  intersects: boolean;
  intersectionPoints?: Point[];
}

lineIntersectsPolygon(line: Line, polygon: Polygon): {
  intersects: boolean;
  intersectionPoint?: Point;
}

lineIntersectsMesh(line: Line, mesh: Mesh): {
  intersects: boolean;
  intersectionPoints?: Point[];
}
```

### Sphere intersections

```ts
sphereIntersectsSphere(sphereA: Sphere, sphereB: Sphere): {
  intersects: boolean;
  intersectionPoint?: Point;      // center of the intersection volume
  penetrationDepth?: number;
  normal?: Point;                 // unit vector from sphereA to sphereB
  contactPoints?: { sphereA: Point; sphereB: Point };
}

sphereIntersectsPlane(sphere: Sphere, plane: Plane): {
  intersects: boolean;
  intersectionPoint?: Point;      // center of the intersection circle
  penetrationDepth?: number;
  intersectionRadius?: number;    // radius of the intersection circle
}

sphereIntersectsCuboid(sphere: Sphere, cuboid: Cuboid): {
  intersects: boolean;
  intersectionPoint?: Point;
  penetrationDepth?: number;
  normal?: Point;                 // unit vector from cuboid toward sphere
  contactPoint?: Point;           // closest point on cuboid surface
}

sphereIntersectsPolygon(sphere: Sphere, polygon: Polygon): {
  intersects: boolean;
  intersectionPoint?: Point;
  penetrationDepth?: number;
  polygonIntersectionPoints?: Point[];  // where sphere surface crosses polygon edges
} | null                          // null if polygon is invalid

sphereIntersectsMesh(sphere: Sphere, mesh: Mesh): {
  intersects: boolean;
  intersectionPoints?: Point[];
  polygonIntersectionPoints?: Point[];
}
```

### Plane intersections

```ts
planeIntersectsPlane(planeA: Plane, planeB: Plane): {
  intersects: boolean;
  intersectionLine?: Line;  // undefined if planes are coincident (infinite intersection)
}
// intersects is false only when the planes are parallel with a gap between them.

planeIntersectsMesh(plane: Plane, mesh: Mesh): {
  intersects: boolean;
  intersectionPoints?: Point[];
  penetrationDepth?: number;
}
```

### Cuboid intersections

```ts
cuboidIntersectsCuboid(cuboidA: Cuboid, cuboidB: Cuboid): {
  intersects: boolean;
  intersectionPoint?: Point;      // approximate center of intersection volume
  penetrationDepth?: number;
  normal?: Point;                 // minimum separation axis, pointing from A to B
  contactPoints?: { cuboidA: Point; cuboidB: Point };
}
// Uses the Separating Axis Theorem (SAT).

cuboidIntersectsPlane(cuboid: Cuboid, plane: Plane): {
  intersects: boolean;
  intersectionPoints?: Point[];
  penetrationDepth?: number;
}

cuboidIntersectsPolygon(cuboid: Cuboid, polygon: Polygon): {
  intersects: boolean;
  intersectionPoints?: Point[];
} | null                          // null if polygon is invalid

cuboidIntersectsMesh(cuboid: Cuboid, mesh: Mesh): {
  intersects: boolean;
  intersectionPoints?: Point[];
}
```

### Polygon intersections

```ts
polygonIntersectsPolygon(polygonA: Polygon, polygonB: Polygon): {
  intersects: boolean;
  intersectionPoints?: Point[];   // undefined if polygons are coplanar and overlapping
} | null                          // null if either polygon is invalid

polygonIntersectsPlane(polygon: Polygon, plane: Plane): {
  intersects: boolean;
  intersectionPoints?: Point[];   // undefined if polygon lies in the plane
} | null                          // null if polygon is invalid

polygonIntersectsMesh(polygon: Polygon, mesh: Mesh): {
  intersects: boolean;
  intersectionPoints?: Point[];
} | null                          // null if polygon is invalid
```

### Mesh intersections

```ts
meshIntersectsMesh(meshA: Mesh, meshB: Mesh): {
  intersects: boolean;
  intersectionPoints?: Point[];
}

meshIntersectsPlane(mesh: Mesh, plane: Plane): {
  intersects: boolean;
  intersectionPoints?: Point[];
  penetrationDepth?: number;
}
```

---

## Utilities (`@basementuniverse/intersection-helpers/utilities`)

### Types

```ts
type Interval = {
  min: number;
  minInclusive?: boolean;  // default: true
  max: number;
  maxInclusive?: boolean;  // default: true
};
```

### Functions

```ts
vectorAlmostZero(v: vec2 | vec3): boolean

vectorsAlmostEqual(a: vec2 | vec3, b: vec2 | vec3): boolean

valueInInterval(value: number, interval: Interval): boolean

intervalsOverlap(a: Interval, b: Interval): boolean

overlapInterval(a: Interval, b: Interval): Interval | null
// Returns the overlapping portion of two intervals, or null if they don't overlap.
```
