import 'server-only';

import { prisma } from 'shared/lib/prisma';
import type { ReviewRecommend, Prisma } from '@prisma/client';

/**
 * 리뷰 추천 데이터 액세스 계층
 */
export class ReviewRecommendRepository {
  /**
   * 사용자의 특정 리뷰 추천 상태 조회
   */
  async findRecommendByUserAndReview(
    userId: string,
    reviewId: string,
  ): Promise<ReviewRecommend | null> {
    const whereInput: Prisma.ReviewRecommendWhereUniqueInput = {
      userId_reviewId: {
        userId,
        reviewId,
      },
    };

    return await prisma.reviewRecommend.findUnique({
      where: whereInput,
    });
  }

  /**
   * 추천 생성
   */
  async createRecommend(userId: string, reviewId: string): Promise<ReviewRecommend> {
    const createInput: Prisma.ReviewRecommendCreateInput = {
      id: crypto.randomUUID(),
      User: {
        connect: { id: userId },
      },
      Review: {
        connect: { id: reviewId },
      },
    };

    return await prisma.reviewRecommend.create({
      data: createInput,
    });
  }

  /**
   * 추천 삭제
   */
  async deleteRecommend(recommendId: string): Promise<void> {
    const whereInput: Prisma.ReviewRecommendWhereUniqueInput = {
      id: recommendId,
    };

    await prisma.reviewRecommend.delete({
      where: whereInput,
    });
  }

  /**
   * 리뷰 존재 여부 확인
   */
  async reviewExists(reviewId: string): Promise<boolean> {
    const review = await prisma.review.findFirst({
      where: {
        id: reviewId,
        isActive: { not: false },
      },
      select: { id: true },
    });

    return !!review;
  }
}
