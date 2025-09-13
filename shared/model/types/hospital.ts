export type HospitalSort = 'popular' | 'recommended';

export const HOSPITAL_SORT_OPTIONS = {
  POPULAR: 'popular' as const,
  RECOMMENDED: 'recommended' as const,
} as const;

export const DEFAULT_HOSPITAL_SORT: HospitalSort = 'popular';
