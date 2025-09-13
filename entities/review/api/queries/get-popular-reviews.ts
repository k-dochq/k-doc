import { type GetAllReviewsResponse } from '../../model/types';
import { type MedicalSpecialtyType } from '@prisma/client';

export interface GetPopularReviewsParams {
  category?: MedicalSpecialtyType | 'ALL';
  limit?: number;
}

export interface GetPopularReviewsResponse {
  success: boolean;
  data: GetAllReviewsResponse;
}

export async function fetchPopularReviews(
  params: GetPopularReviewsParams = {},
): Promise<GetAllReviewsResponse> {
  const { category = 'ALL', limit = 5 } = params;

  const searchParams = new URLSearchParams();
  searchParams.set('category', category);
  searchParams.set('limit', limit.toString());
  searchParams.set('sortBy', 'popular'); // 인기순으로 정렬

  const response = await fetch(`/api/reviews?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch popular reviews');
  }

  const result: GetPopularReviewsResponse = await response.json();

  if (!result.success) {
    throw new Error('Failed to fetch popular reviews');
  }

  return result.data;
}
