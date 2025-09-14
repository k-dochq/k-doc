import { type MedicalSpecialtyType } from '@prisma/client';

// 리뷰 정렬 타입 정의
export const REVIEW_SORT_OPTIONS = {
  LATEST: 'latest',
  POPULAR: 'popular',
} as const;

export type ReviewSortOption = (typeof REVIEW_SORT_OPTIONS)[keyof typeof REVIEW_SORT_OPTIONS];

// API 쿼리 파라미터 타입 정의
export interface ReviewQueryParams {
  page?: string;
  limit?: string;
  category?: MedicalSpecialtyType;
  sort?: ReviewSortOption;
}
