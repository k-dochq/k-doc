import { type MedicalSpecialtyType } from '@prisma/client';
import { isValidMedicalSpecialtyType } from 'shared/config';
import {
  type ReviewQueryParams,
  type ReviewSortOption,
  REVIEW_SORT_OPTIONS,
} from 'shared/model/types/review-query';

/**
 * 파싱된 리뷰 쿼리 파라미터 타입
 */
export interface ParsedReviewQueryParams {
  page: number;
  limit: number;
  sort: ReviewSortOption;
  category?: MedicalSpecialtyType;
  hospitalId?: string;
}

/**
 * 데이터베이스 쿼리용 리뷰 파라미터 타입
 */
export interface DbReviewQueryParams {
  page: number;
  limit: number;
  sort: ReviewSortOption;
  category?: MedicalSpecialtyType;
  hospitalId?: string;
}

/**
 * 기본 리뷰 쿼리 파라미터
 */
export const DEFAULT_REVIEW_QUERY_PARAMS = {
  page: 1,
  limit: 10,
  sort: REVIEW_SORT_OPTIONS.LATEST,
} as const;

/**
 * 문자열이 유효한 ReviewSortOption인지 확인
 */
function isValidReviewSortOption(value: string): value is ReviewSortOption {
  return Object.values(REVIEW_SORT_OPTIONS).includes(value as ReviewSortOption);
}

/**
 * URL 쿼리 파라미터를 파싱하여 타입 안전한 객체로 변환
 */
export function parseReviewQueryParams(searchParams: URLSearchParams): ParsedReviewQueryParams {
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const limit = Math.max(1, Math.min(50, parseInt(searchParams.get('limit') || '10', 10))); // 최대 50개 제한

  const sortParam = searchParams.get('sort');
  const sort =
    sortParam && isValidReviewSortOption(sortParam) ? sortParam : DEFAULT_REVIEW_QUERY_PARAMS.sort;

  const categoryParam = searchParams.get('category');
  const category =
    categoryParam && categoryParam !== 'ALL' && isValidMedicalSpecialtyType(categoryParam)
      ? (categoryParam as MedicalSpecialtyType)
      : undefined;

  const hospitalId = searchParams.get('hospitalId') || undefined;

  return {
    page,
    limit,
    sort,
    category,
    hospitalId,
  };
}

/**
 * 파싱된 쿼리 파라미터를 데이터베이스 쿼리 파라미터로 변환
 */
export function convertToDbReviewQueryParams(params: ParsedReviewQueryParams): DbReviewQueryParams {
  return {
    page: params.page,
    limit: params.limit,
    sort: params.sort,
    category: params.category,
    hospitalId: params.hospitalId,
  };
}

/**
 * 쿼리 파라미터로부터 쿼리 스트링 생성
 */
export function buildReviewQueryString(params: Partial<ParsedReviewQueryParams>): string {
  const searchParams = new URLSearchParams();

  if (params.page && params.page > 1) {
    searchParams.set('page', params.page.toString());
  }

  if (params.limit && params.limit !== DEFAULT_REVIEW_QUERY_PARAMS.limit) {
    searchParams.set('limit', params.limit.toString());
  }

  if (params.sort && params.sort !== DEFAULT_REVIEW_QUERY_PARAMS.sort) {
    searchParams.set('sort', params.sort);
  }

  if (params.category) {
    searchParams.set('category', params.category);
  }

  if (params.hospitalId) {
    searchParams.set('hospitalId', params.hospitalId);
  }

  return searchParams.toString();
}

/**
 * 쿼리 파라미터 유효성 검증 결과 타입
 */
export interface ReviewQueryParamsValidationResult {
  isValid: boolean;
  errors: string[];
  params?: ParsedReviewQueryParams;
}

/**
 * 쿼리 파라미터 유효성 검증
 */
export function validateReviewQueryParams(
  searchParams: URLSearchParams,
): ReviewQueryParamsValidationResult {
  const errors: string[] = [];

  try {
    const params = parseReviewQueryParams(searchParams);

    // 추가 유효성 검증
    if (params.page < 1) {
      errors.push('Page must be greater than 0');
    }

    if (params.limit < 1 || params.limit > 50) {
      errors.push('Limit must be between 1 and 50');
    }

    // sort 유효성 검증
    if (!Object.values(REVIEW_SORT_OPTIONS).includes(params.sort)) {
      errors.push('Invalid sort option. Use "latest" or "popular"');
    }

    return {
      isValid: errors.length === 0,
      errors,
      params: errors.length === 0 ? params : undefined,
    };
  } catch (error) {
    errors.push(
      `Invalid query parameters: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
    return {
      isValid: false,
      errors,
    };
  }
}
