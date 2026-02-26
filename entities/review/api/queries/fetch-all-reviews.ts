import { type GetAllReviewsResponse } from '../../model/types';
import { type ReviewSortOption } from 'shared/model/types/review-query';

export interface FetchAllReviewsParams {
  pageParam: number;
  limit?: number;
  category?: string;
  sort?: ReviewSortOption;
  seed?: string;
  hospitalId?: string;
  likedOnly?: boolean;
}

interface AllReviewsApiResponse {
  success: boolean;
  data: GetAllReviewsResponse;
  error?: string;
}

/**
 * 전체 리뷰 API 페치 (클라이언트용)
 * /api/reviews 엔드포인트 호출
 */
export async function fetchAllReviews({
  pageParam = 1,
  limit = 10,
  category,
  sort = 'recommended',
  seed,
  hospitalId,
  likedOnly = false,
}: FetchAllReviewsParams): Promise<GetAllReviewsResponse> {
  const params = new URLSearchParams({
    page: pageParam.toString(),
    limit: limit.toString(),
    sort,
  });

  if (seed) {
    params.append('seed', seed);
  }

  if (category) {
    params.append('category', category);
  }

  if (hospitalId) {
    params.append('hospitalId', hospitalId);
  }

  if (likedOnly) {
    params.append('likedOnly', 'true');
  }

  const response = await fetch(`/api/reviews?${params.toString()}`, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result: AllReviewsApiResponse = await response.json();

  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch reviews');
  }

  return result.data;
}
