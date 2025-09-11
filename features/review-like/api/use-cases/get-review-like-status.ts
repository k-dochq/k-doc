import 'server-only';

import { ReviewLikeRepository } from '../infrastructure/repositories/review-like-repository';
import { AuthService } from 'shared/lib/auth/server';
import type { ReviewLikeStatusRequest, ReviewLikeStatusResult } from '../entities/types';

/**
 * 리뷰 좋아요 상태 조회 Use Case
 */
export class GetReviewLikeStatusUseCase {
  constructor(
    private reviewLikeRepository: ReviewLikeRepository,
    private authService: AuthService,
  ) {}

  async execute(request: ReviewLikeStatusRequest): Promise<ReviewLikeStatusResult> {
    try {
      const { reviewId, userId } = request;

      // 리뷰 존재 여부 확인
      const reviewExists = await this.reviewLikeRepository.reviewExists(reviewId);
      if (!reviewExists) {
        return {
          success: false,
          isLiked: false,
          likeCount: 0,
          error: 'Review not found',
        };
      }

      // 사용자의 좋아요 상태 확인
      const existingLike = await this.reviewLikeRepository.findLikeByUserAndReview(
        userId,
        reviewId,
      );

      // 전체 좋아요 수 조회
      const likeCount = await this.reviewLikeRepository.countLikesByReview(reviewId);

      return {
        success: true,
        isLiked: !!existingLike,
        likeCount,
      };
    } catch (error) {
      console.error('Error in GetReviewLikeStatusUseCase:', error);
      return {
        success: false,
        isLiked: false,
        likeCount: 0,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
