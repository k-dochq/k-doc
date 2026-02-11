import { prisma } from 'shared/lib/prisma';
import { handleDatabaseError } from 'shared/lib';

export interface GetHospitalReviewStatsRequest {
  hospitalId: string;
}

export interface GetHospitalReviewStatsResponse {
  averageRating: number;
  reviewCount: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

export async function getHospitalReviewStats(
  request: GetHospitalReviewStatsRequest,
): Promise<GetHospitalReviewStatsResponse> {
  try {
    const { hospitalId } = request;

    // 병원의 리뷰 통계 조회 (숨김 처리된 리뷰 포함)
    const [reviewStats, reviewCount, reviews] = await Promise.all([
      prisma.review.aggregate({
        where: { hospitalId },
        _avg: {
          rating: true,
        },
      }),
      prisma.review.count({
        where: { hospitalId },
      }),
      prisma.review.findMany({
        where: { hospitalId },
        select: {
          rating: true,
        },
      }),
    ]);

    // 평균 별점 계산 (소수점 첫째자리까지 반올림)
    const averageRating = reviewStats._avg.rating
      ? Math.round(reviewStats._avg.rating * 10) / 10
      : 0;

    // 점수대별 개수 계산
    // 1.0 <= rating < 2.0 → 1점대
    // 2.0 <= rating < 3.0 → 2점대
    // 3.0 <= rating < 4.0 → 3점대
    // 4.0 <= rating < 5.0 → 4점대
    // 5.0 → 5점대
    const ratingDistribution = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    reviews.forEach((review) => {
      const rating = review.rating;
      // Math.floor를 사용하여 점수대 계산
      // 1.3 → Math.floor(1.3) = 1 → 1점대
      // 2.6 → Math.floor(2.6) = 2 → 2점대
      // 5.0 → Math.floor(5.0) = 5 → 5점대
      const ratingBucket = Math.floor(rating) as 1 | 2 | 3 | 4 | 5;

      // 5점은 정확히 5.0일 때만 5점대로 분류
      if (ratingBucket >= 1 && ratingBucket <= 5) {
        ratingDistribution[ratingBucket]++;
      }
    });

    return {
      averageRating,
      reviewCount,
      ratingDistribution,
    };
  } catch (error) {
    throw handleDatabaseError(error, 'getHospitalReviewStats');
  }
}
