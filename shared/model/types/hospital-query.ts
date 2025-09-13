import { type MedicalSpecialtyType } from '@prisma/client';

// 병원 정렬 타입 정의
export const HOSPITAL_SORT_OPTIONS = {
  POPULAR: 'popular',
  RECOMMENDED: 'recommended',
  NEWEST: 'newest',
} as const;

export type HospitalSortOption = (typeof HOSPITAL_SORT_OPTIONS)[keyof typeof HOSPITAL_SORT_OPTIONS];

// 정렬 순서 타입 정의
export const SORT_ORDER_OPTIONS = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export type SortOrderOption = (typeof SORT_ORDER_OPTIONS)[keyof typeof SORT_ORDER_OPTIONS];

// 데이터베이스 정렬 필드 타입 정의
export const DB_SORT_FIELDS = {
  RATING: 'rating',
  VIEW_COUNT: 'viewCount',
  CREATED_AT: 'createdAt',
} as const;

export type DbSortField = (typeof DB_SORT_FIELDS)[keyof typeof DB_SORT_FIELDS];

// 프론트엔드 정렬 옵션을 데이터베이스 필드로 매핑하는 타입
export const SORT_OPTION_TO_DB_FIELD_MAP: Record<HospitalSortOption, DbSortField> = {
  [HOSPITAL_SORT_OPTIONS.POPULAR]: DB_SORT_FIELDS.RATING,
  [HOSPITAL_SORT_OPTIONS.RECOMMENDED]: DB_SORT_FIELDS.VIEW_COUNT,
  [HOSPITAL_SORT_OPTIONS.NEWEST]: DB_SORT_FIELDS.CREATED_AT,
} as const;

// API 쿼리 파라미터 타입 정의
export interface HospitalQueryParams {
  page?: string;
  limit?: string;
  sort?: HospitalSortOption;
  sortOrder?: SortOrderOption;
  category?: MedicalSpecialtyType;
  minRating?: string;
}

// 파싱된 쿼리 파라미터 타입 정의
export interface ParsedHospitalQueryParams extends Record<string, unknown> {
  page: number;
  limit: number;
  sort: HospitalSortOption;
  sortOrder: SortOrderOption;
  category?: MedicalSpecialtyType;
  minRating: number;
}

// 데이터베이스 쿼리 파라미터 타입 정의
export interface DbHospitalQueryParams {
  page: number;
  limit: number;
  sortBy: DbSortField;
  sortOrder: SortOrderOption;
  specialtyType?: MedicalSpecialtyType;
  minRating: number;
}

// 기본값 정의
export const DEFAULT_HOSPITAL_QUERY_PARAMS: ParsedHospitalQueryParams = {
  page: 1,
  limit: 10,
  sort: HOSPITAL_SORT_OPTIONS.POPULAR,
  sortOrder: SORT_ORDER_OPTIONS.DESC,
  minRating: 0,
} as const;
