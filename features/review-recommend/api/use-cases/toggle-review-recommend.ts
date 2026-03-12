import 'server-only';

import { ReviewRecommendRepository } from '../infrastructure/repositories/review-recommend-repository';
import { AuthService } from 'shared/lib/auth/server';
import type { ReviewRecommendRequest, ReviewRecommendResult } from '../entities/types';

/**
 * 리뷰 추천 토글 Use Case
 */
export class ToggleReviewRecommendUseCase {
  constructor(
    private reviewRecommendRepository: ReviewRecommendRepository,
    private authService: AuthService,
  ) {}

  async execute(request: ReviewRecommendRequest): Promise<ReviewRecommendResult> {
    try {
      const { reviewId, userId } = request;

      // 리뷰 존재 여부 확인
      const reviewExists = await this.reviewRecommendRepository.reviewExists(reviewId);
      if (!reviewExists) {
        return {
          success: false,
          isRecommended: false,
          error: 'Review not found',
        };
      }

      // 기존 추천 확인
      const existingRecommend = await this.reviewRecommendRepository.findRecommendByUserAndReview(
        userId,
        reviewId,
      );

      let isRecommended: boolean;

      if (existingRecommend) {
        // 추천이 있으면 삭제
        await this.reviewRecommendRepository.deleteRecommend(existingRecommend.id);
        isRecommended = false;
      } else {
        // 추천이 없으면 추가
        await this.reviewRecommendRepository.createRecommend(userId, reviewId);
        isRecommended = true;
      }

      return {
        success: true,
        isRecommended,
      };
    } catch (error) {
      console.error('Error in ToggleReviewRecommendUseCase:', error);
      return {
        success: false,
        isRecommended: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
