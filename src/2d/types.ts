import { vec2 } from '@basementuniverse/vec';

/**
 * A point in 2D space
 */
export type Point = vec2;

/**
 * A ray that extends infinitely in one direction in 2D space
 */
export type Ray = {
  origin: Point;
  direction: vec2;
};

/**
 * A line segment defined by two endpoints in 2D space
 */
export type Line = {
  start: Point;
  end: Point;
};

/**
 * A circle defined by its center and radius in 2D space
 */
export type Circle = {
  position: Point;
  radius: number;
};

/**
 * A rectangle defined by the position of its center, side lengths, and
 * optional rotation in 2D space
 *
 * Rotation is in radians and is applied around the center of the rectangle
 */
export type Rectangle = {
  position: Point;
  size: vec2;
  rotation?: number;
};

/**
 * A polygon defined by its vertices in 2D space
 *
 * Vertices should be ordered either clockwise or counter-clockwise
 */
export type Polygon = {
  vertices: Point[];
};
