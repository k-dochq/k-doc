import { type MedicalSpecialtyType } from '@prisma/client';
import { isValidMedicalSpecialtyType } from 'shared/config';
import {
  type HospitalQueryParams,
  type ParsedHospitalQueryParams,
  type DbHospitalQueryParams,
  type HospitalSortOption,
  type SortOrderOption,
  type HospitalCategoryType,
  HOSPITAL_SORT_OPTIONS,
  SORT_ORDER_OPTIONS,
  SORT_OPTION_TO_DB_FIELD_MAP,
  DEFAULT_HOSPITAL_QUERY_PARAMS,
} from 'shared/model/types/hospital-query';

/**
 * 문자열이 유효한 HospitalSortOption인지 확인
 */
function isValidHospitalSortOption(value: string): value is HospitalSortOption {
  return Object.values(HOSPITAL_SORT_OPTIONS).includes(value as HospitalSortOption);
}

/**
 * 문자열이 유효한 SortOrderOption인지 확인
 */
function isValidSortOrderOption(value: string): value is SortOrderOption {
  return Object.values(SORT_ORDER_OPTIONS).includes(value as SortOrderOption);
}

/**
 * URL 쿼리 파라미터를 파싱하여 타입 안전한 객체로 변환
 */
export function parseHospitalQueryParams(searchParams: URLSearchParams): ParsedHospitalQueryParams {
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') || '10', 10))); // 최대 100개 제한

  const sortParam = searchParams.get('sort');
  const sort =
    sortParam && isValidHospitalSortOption(sortParam)
      ? sortParam
      : DEFAULT_HOSPITAL_QUERY_PARAMS.sort;

  const sortOrderParam = searchParams.get('sortOrder');
  const sortOrder =
    sortOrderParam && isValidSortOrderOption(sortOrderParam)
      ? sortOrderParam
      : DEFAULT_HOSPITAL_QUERY_PARAMS.sortOrder;

  const categoryParam = searchParams.get('category');
  let category: HospitalCategoryType | undefined = undefined;

  if (categoryParam) {
    if (categoryParam === 'RECOMMEND') {
      category = 'RECOMMEND';
    } else if (isValidMedicalSpecialtyType(categoryParam)) {
      category = categoryParam as MedicalSpecialtyType;
    }
  }

  const minRating = Math.max(0, Math.min(5, parseFloat(searchParams.get('minRating') || '0'))); // 0-5 범위 제한

  const search = searchParams.get('search')?.trim() || undefined;

  // 지역 필터 파라미터 파싱
  const districtsParam = searchParams.get('districts');
  const districtIds = districtsParam
    ? districtsParam
        .split(',')
        .filter(Boolean)
        .map((id) => id.trim())
    : undefined;

  return {
    page,
    limit,
    sort,
    sortOrder,
    category,
    minRating,
    search,
    districtIds,
  };
}

/**
 * 파싱된 쿼리 파라미터를 데이터베이스 쿼리 파라미터로 변환
 */
export function convertToDbQueryParams(params: ParsedHospitalQueryParams): DbHospitalQueryParams {
  // category가 RECOMMEND가 아닌 MedicalSpecialtyType인 경우에만 specialtyType으로 변환
  const specialtyType =
    params.category && params.category !== 'RECOMMEND'
      ? (params.category as MedicalSpecialtyType)
      : undefined;

  return {
    page: params.page,
    limit: params.limit,
    sortBy: SORT_OPTION_TO_DB_FIELD_MAP[params.sort],
    sortOrder: params.sortOrder,
    specialtyType,
    category: params.category,
    minRating: params.minRating,
    search: params.search,
    districtIds: params.districtIds,
  };
}

/**
 * 프론트엔드 쿼리 파라미터를 URL 쿼리 스트링으로 변환
 */
export function buildHospitalQueryString(params: Partial<ParsedHospitalQueryParams>): string {
  const searchParams = new URLSearchParams();

  if (params.page && params.page !== DEFAULT_HOSPITAL_QUERY_PARAMS.page) {
    searchParams.set('page', params.page.toString());
  }

  if (params.limit && params.limit !== DEFAULT_HOSPITAL_QUERY_PARAMS.limit) {
    searchParams.set('limit', params.limit.toString());
  }

  if (params.sort && params.sort !== DEFAULT_HOSPITAL_QUERY_PARAMS.sort) {
    searchParams.set('sort', params.sort);
  }

  if (params.sortOrder && params.sortOrder !== DEFAULT_HOSPITAL_QUERY_PARAMS.sortOrder) {
    searchParams.set('sortOrder', params.sortOrder);
  }

  if (params.category) {
    searchParams.set('category', params.category);
  }

  if (params.minRating && params.minRating !== DEFAULT_HOSPITAL_QUERY_PARAMS.minRating) {
    searchParams.set('minRating', params.minRating.toString());
  }

  if (params.search) {
    searchParams.set('search', params.search);
  }

  if (params.districtIds && params.districtIds.length > 0) {
    searchParams.set('districts', params.districtIds.join(','));
  }

  return searchParams.toString();
}

/**
 * 쿼리 파라미터 유효성 검증 결과 타입
 */
export interface QueryParamsValidationResult {
  isValid: boolean;
  errors: string[];
  params?: ParsedHospitalQueryParams;
}

/**
 * 쿼리 파라미터 유효성 검증
 */
export function validateHospitalQueryParams(
  searchParams: URLSearchParams,
): QueryParamsValidationResult {
  const errors: string[] = [];

  try {
    const params = parseHospitalQueryParams(searchParams);

    // 추가 유효성 검증
    if (params.page < 1) {
      errors.push('Page must be greater than 0');
    }

    if (params.limit < 1 || params.limit > 100) {
      errors.push('Limit must be between 1 and 100');
    }

    if (params.minRating < 0 || params.minRating > 5) {
      errors.push('MinRating must be between 0 and 5');
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
