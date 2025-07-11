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
export declare function isVec2(value: any): value is vec2;
/**
 * Check if a value is a vec3
 */
export declare function isVec3(value: any): value is vec3;
