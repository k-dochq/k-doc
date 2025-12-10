import { type GetAllReviewsResponse } from '../../model/types';
import { type MedicalSpecialtyType } from '@prisma/client';

export interface GetPopularReviewsV2Params {
  category?: MedicalSpecialtyType | 'ALL';
  hospitalId?: string;
  limit?: number;
  hasBothImages?: boolean;
}

export interface GetPopularReviewsV2Response {
  success: boolean;
  data: GetAllReviewsResponse;
}

export async function fetchPopularReviewsV2(
  params: GetPopularReviewsV2Params = {},
): Promise<GetAllReviewsResponse> {
  const { category = 'ALL', hospitalId, limit = 5, hasBothImages = true } = params;

  const searchParams = new URLSearchParams();
  searchParams.set('category', category);
  if (hospitalId) {
    searchParams.set('hospitalId', hospitalId);
  }
  searchParams.set('limit', limit.toString());
  searchParams.set('sort', 'popular'); // 인기순으로 정렬
  searchParams.set('hasBothImages', hasBothImages.toString());

  const response = await fetch(`/api/reviews?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch popular reviews');
  }

  const result: GetPopularReviewsV2Response = await response.json();

  if (!result.success) {
    throw new Error('Failed to fetch popular reviews');
  }

  return result.data;
}
