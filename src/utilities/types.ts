import { vec2, vec3 } from '@basementuniverse/vec';

/**
 * A numeric interval with optional inclusivity
 */
export type Interval = {
  min: number;
  minInclusive?: boolean;
  max: number;
  maxInclusive?: boolean;
};

/**
 * Check if a value is a vec2
 */
export function isVec2(value: any): value is vec2 {
  return (
    value &&
    typeof value === 'object' &&
    'x' in value &&
    typeof value.x === 'number' &&
    'y' in value &&
    typeof value.y === 'number' &&
    !('z' in value)
  );
}

/**
 * Check if a value is a vec3
 */
export function isVec3(value: any): value is vec3 {
  return (
    value &&
    typeof value === 'object' &&
    'x' in value &&
    typeof value.x === 'number' &&
    'y' in value &&
    typeof value.y === 'number' &&
    'z' in value &&
    typeof value.z === 'number'
  );
}
