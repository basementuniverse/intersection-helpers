## Polygon-polygon intersections

Detecting whether two polygons intersect or one completely encloses the other can be approached using computational geometry algorithms. Here are some common methods:

1. Separating Axis Theorem (SAT)
SAT is a common algorithm for collision detection between convex polygons. It checks whether there exists an axis along which the projections of the two polygons do not overlap. If such an axis exists, the polygons do not intersect.
For concave polygons, you can first decompose them into convex polygons (using algorithms like ear clipping or triangulation) and then apply SAT to each pair of convex polygons.
2. Point-in-Polygon Test
To check if one polygon completely encloses another:
Test if all vertices of one polygon lie inside the other using a point-in-polygon algorithm (e.g., ray-casting or winding number method).
If any vertex of one polygon lies outside the other, it cannot be completely enclosed.
3. Edge Intersection Test
Check if any edge of one polygon intersects with any edge of the other polygon. If there is an intersection, the polygons overlap.
For concave polygons, this method works directly without decomposition.
4. Bounding Box Optimization
Compute the bounding boxes of the polygons first. If the bounding boxes do not overlap, the polygons cannot intersect. This is a quick pre-check to optimize performance.
5. Sweep Line Algorithm
For efficient intersection detection, you can use a sweep line algorithm to detect edge intersections. This is particularly useful for polygons with many edges.
6. Boolean Operations on Polygons
Libraries like Clipper or CGAL provide robust implementations for polygon intersection and containment checks. These libraries use advanced algorithms to handle edge cases and precision issues.
Suggested Approach:
For concave polygons:

Decompose them into convex polygons.
Use SAT for intersection detection.
Combine with point-in-polygon tests for containment checks.

## Return types 2d

{
  intersects: boolean;
  closestPoint: Point;
  distance: number;
}

{
  intersects: boolean;
  intersectionPoint?: Point;
}

{
  intersects: boolean;
  intersectionPoints?: Point[];
}

{
  intersects: boolean;
  intersectionPoints?: Point[];
  minimumSeparation?: vec2;
}

## Minimum separation vector for polygons

This is a fascinating geometric problem! You're right that calculating the minimum separation vector between a circle and a concave polygon is significantly more complex than for convex shapes. Let me break down some possible approaches:

1. Convex Polygon Case
For a convex polygon, the solution is more straightforward:

If the circle center is inside the polygon:

Find the closest edge to the circle center
The separation vector points along the normal to that edge
Length is (circle radius + distance to edge)
If the circle center is outside the polygon:

Find the closest feature (vertex or edge) to the circle center
The separation vector points from that feature to the circle center
Length is (circle radius - distance to feature)
Here's a sketch of how this might look:

```ts
function getMinSeparationConvex(circle: Circle, polygon: Polygon): vec2 {
  const centerPoint = pointInPolygon(circle.position, polygon);
  if (!centerPoint) return vec2();

  if (centerPoint.intersects) {
    // Circle center is inside polygon
    // Find closest edge and push circle out along edge normal
    let minDist = Infinity;
    let closestEdgeNormal = vec2();

    for (let i = 0; i < polygon.vertices.length; i++) {
      const start = polygon.vertices[i];
      const end = polygon.vertices[(i + 1) % polygon.vertices.length];
      const edge = { start, end };

      const dist = pointOnLine(circle.position, edge).distance;
      if (dist < minDist) {
        minDist = dist;
        // Calculate edge normal pointing outward
        const edgeVec = vec2.sub(end, start);
        closestEdgeNormal = vec2.nor(vec2({
          x: -edgeVec.y,
          y: edgeVec.x
        }));
      }
    }

    return vec2.mul(closestEdgeNormal, circle.radius + minDist);
  } else {
    // Circle center is outside polygon
    // Use vector from closest point to circle center
    return vec2.mul(
      vec2.nor(vec2.sub(circle.position, centerPoint.closestPoint)),
      circle.radius - centerPoint.distance
    );
  }
}
```

2. Concave Polygon Case
For concave polygons, your observation about the "U" shape highlights why this is trickier. Here are some potential approaches:

Conservative Decomposition:

Decompose into convex polygons
Find minimum separation for each convex piece
Take the largest separation vector that resolves all intersections
Medial Axis Transform:

Calculate the medial axis of the polygon (skeleton)
Use it to identify "escape routes" for the circle
Choose the shortest valid path that doesn't cause new intersections
Iterative with Path Planning:

Start with local separation vector
If moving along it causes new intersections, use path planning
A* or similar to find route to nearest non-intersecting position
Here's a sketch of the conservative decomposition approach:

```ts
function getMinSeparationConcave(circle: Circle, polygon: Polygon): vec2 | null {
  const convexParts = decomposePolygon(polygon);
  if (!convexParts) return null;

  let maxSeparation = vec2();
  let maxLength = 0;

  // Find separation vectors for all convex parts
  for (const part of convexParts) {
    const separation = getMinSeparationConvex(circle, part);
    const length = vec2.len(separation);

    // Keep the largest separation vector
    if (length > maxLength) {
      maxLength = length;
      maxSeparation = separation;
    }
  }

  // Verify this separation resolves all intersections
  const movedCircle = {
    position: vec2.add(circle.position, maxSeparation),
    radius: circle.radius
  };

  if (circleIntersectsPolygon(movedCircle, polygon)?.intersects) {
    // If still intersecting, we need a different approach
    // Could fall back to path planning here
    return null;
  }

  return maxSeparation;
}
```

3. Hybrid Approach
A practical solution might combine these approaches:

Try the conservative decomposition first
If that fails, use an iterative approach with safeguards:
Maximum number of iterations
Minimum movement threshold
Path history to detect cycles
The implementation could look something like:

```ts
function findMinSeparation(
  circle: Circle,
  polygon: Polygon,
  options = { maxIterations: 100, minMovement: 0.001 }
): vec2 | null {
  // Try conservative approach first
  const conservativeSeparation = getMinSeparationConcave(circle, polygon);
  if (conservativeSeparation) return conservativeSeparation;

  // Fall back to iterative approach
  let currentPos = circle.position;
  let totalSeparation = vec2();
  let iterations = 0;
  const visited = new Set<string>();

  while (iterations++ < options.maxIterations) {
    const currentCircle = { position: currentPos, radius: circle.radius };
    const intersection = circleIntersectsPolygon(currentCircle, polygon);

    if (!intersection?.intersects) {
      return totalSeparation;
    }

    // Find local separation vector
    const separation = getMinSeparationConvex(currentCircle, polygon);
    if (vec2.len(separation) < options.minMovement) {
      break; // Stuck in local minimum
    }

    // Update position
    currentPos = vec2.add(currentPos, separation);
    totalSeparation = vec2.add(totalSeparation, separation);

    // Check for cycles
    const posKey = `${Math.round(currentPos.x)},${Math.round(currentPos.y)}`;
    if (visited.has(posKey)) {
      break; // Detected cycle
    }
    visited.add(posKey);
  }

  // If we got here, try one final escape strategy:
  // Move directly away from polygon centroid
  const centroid = polygonCentroid(polygon);
  if (centroid) {
    const escapeDir = vec2.nor(vec2.sub(circle.position, centroid));
    return vec2.mul(escapeDir, circle.radius * 2);
  }

  return null;
}
```

This is a complex problem without a perfect solution, but these approaches provide a reasonable starting point. The hybrid approach balances practicality with robustness, falling back to simpler strategies when more sophisticated ones fail.

For your library, I'd suggest starting with the convex case first, then adding the concave handling with clear documentation about its limitations. You might also want to add options to let users choose between different strategies based on their specific needs (speed vs. accuracy vs. robustness).
