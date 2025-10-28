import { type MedicalSpecialtyType } from '@prisma/client';

// 리뷰 정렬 타입 정의
export const REVIEW_SORT_OPTIONS = {
  POPULAR: 'popular',
  RECOMMENDED: 'recommended',
  LATEST: 'latest',
} as const;

export type ReviewSortOption = (typeof REVIEW_SORT_OPTIONS)[keyof typeof REVIEW_SORT_OPTIONS];

// 정렬 순서 타입 정의
export const SORT_ORDER_OPTIONS = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export type SortOrderOption = (typeof SORT_ORDER_OPTIONS)[keyof typeof SORT_ORDER_OPTIONS];

// 데이터베이스 정렬 필드 타입 정의
export const DB_SORT_FIELDS = {
  VIEW_COUNT: 'viewCount',
  LIKE_COUNT: 'likeCount',
  CREATED_AT: 'createdAt',
  RATING: 'rating',
} as const;

export type DbSortField = (typeof DB_SORT_FIELDS)[keyof typeof DB_SORT_FIELDS];

// 프론트엔드 정렬 옵션을 데이터베이스 필드로 매핑하는 타입
export const SORT_OPTION_TO_DB_FIELD_MAP: Record<ReviewSortOption, DbSortField> = {
  [REVIEW_SORT_OPTIONS.POPULAR]: DB_SORT_FIELDS.VIEW_COUNT,
  [REVIEW_SORT_OPTIONS.RECOMMENDED]: DB_SORT_FIELDS.LIKE_COUNT,
  [REVIEW_SORT_OPTIONS.LATEST]: DB_SORT_FIELDS.CREATED_AT,
} as const;

// API 쿼리 파라미터 타입 정의
export interface ReviewQueryParams {
  page?: string;
  limit?: string;
  category?: MedicalSpecialtyType;
  sort?: ReviewSortOption;
}
