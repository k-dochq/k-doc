import { type ReviewSortOption, REVIEW_SORT_OPTIONS } from 'shared/model/types/review-query';

/**
 * 병원 리뷰 무한 스크롤 쿼리 파라미터 인터페이스
 */
export interface HospitalReviewsInfiniteQueryParams extends Record<string, unknown> {
  limit: number;
  category?: string;
  sort: ReviewSortOption;
  hospitalId: string;
  likedOnly: boolean;
}

/**
 * 병원 리뷰 무한 스크롤용 기본 쿼리 파라미터 생성
 * HospitalDetailReviews와 HospitalReviewsContent에서 동일하게 사용
 */
export function createHospitalReviewsInfiniteQueryParams(
  hospitalId: string,
  sort: ReviewSortOption = REVIEW_SORT_OPTIONS.LATEST,
  limit: number = 10,
): HospitalReviewsInfiniteQueryParams {
  return {
    limit,
    category: undefined,
    sort,
    hospitalId,
    likedOnly: false,
  };
}
