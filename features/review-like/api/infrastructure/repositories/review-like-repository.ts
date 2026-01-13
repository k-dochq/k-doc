import 'server-only';

import { prisma } from 'shared/lib/prisma';
import type { ReviewLike, Prisma } from '@prisma/client';

/**
 * 리뷰 좋아요 데이터 액세스 계층
 */
export class ReviewLikeRepository {
  /**
   * 사용자의 특정 리뷰 좋아요 상태 조회
   */
  async findLikeByUserAndReview(userId: string, reviewId: string): Promise<ReviewLike | null> {
    const whereInput: Prisma.ReviewLikeWhereUniqueInput = {
      userId_reviewId: {
        userId,
        reviewId,
      },
    };

    return await prisma.reviewLike.findUnique({
      where: whereInput,
    });
  }

  /**
   * 특정 리뷰의 총 좋아요 수 조회
   */
  async countLikesByReview(reviewId: string): Promise<number> {
    const whereInput: Prisma.ReviewLikeWhereInput = {
      reviewId,
    };

    return await prisma.reviewLike.count({
      where: whereInput,
    });
  }

  /**
   * 좋아요 생성
   */
  async createLike(userId: string, reviewId: string): Promise<ReviewLike> {
    const createInput: Prisma.ReviewLikeCreateInput = {
      id: crypto.randomUUID(),
      User: {
        connect: { id: userId },
      },
      Review: {
        connect: { id: reviewId },
      },
    };

    return await prisma.reviewLike.create({
      data: createInput,
    });
  }

  /**
   * 좋아요 삭제
   */
  async deleteLike(likeId: string): Promise<void> {
    const whereInput: Prisma.ReviewLikeWhereUniqueInput = {
      id: likeId,
    };

    await prisma.reviewLike.delete({
      where: whereInput,
    });
  }

  /**
   * 리뷰 존재 여부 확인
   */
  async reviewExists(reviewId: string): Promise<boolean> {
    // findFirst를 사용하여 isActive 조건 포함
    const review = await prisma.review.findFirst({
      where: {
        id: reviewId,
        // isActive가 false인 리뷰는 제외 (null과 true는 포함)
        isActive: { not: false },
      },
      select: { id: true }, // 성능 최적화: id만 선택
    });

    return !!review;
  }
}
