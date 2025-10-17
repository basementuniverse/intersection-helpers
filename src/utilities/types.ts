/**
 * A numeric interval with optional inclusivity
 */
export type Interval = {
  min: number;
  minInclusive?: boolean;
  max: number;
  maxInclusive?: boolean;
};
