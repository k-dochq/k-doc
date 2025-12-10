import { prisma } from 'shared/lib/prisma';
import { handleDatabaseError } from 'shared/lib';

export interface GetHospitalReviewStatsRequest {
  hospitalId: string;
}

export interface GetHospitalReviewStatsResponse {
  averageRating: number;
  reviewCount: number;
}

export async function getHospitalReviewStats(
  request: GetHospitalReviewStatsRequest,
): Promise<GetHospitalReviewStatsResponse> {
  try {
    const { hospitalId } = request;

    // 병원의 리뷰 통계 조회
    const [reviewStats, reviewCount] = await Promise.all([
      prisma.review.aggregate({
        where: {
          hospitalId,
        },
        _avg: {
          rating: true,
        },
      }),
      prisma.review.count({
        where: {
          hospitalId,
        },
      }),
    ]);

    // 평균 별점 계산 (소수점 첫째자리까지 반올림)
    const averageRating = reviewStats._avg.rating
      ? Math.round(reviewStats._avg.rating * 10) / 10
      : 0;

    return {
      averageRating,
      reviewCount,
    };
  } catch (error) {
    throw handleDatabaseError(error, 'getHospitalReviewStats');
  }
}
