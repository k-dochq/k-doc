import 'server-only';

import { ReviewLikeRepository } from '../infrastructure/repositories/review-like-repository';
import { AuthService } from 'shared/lib/auth/server';
import type { ReviewLikeRequest, ReviewLikeResult } from '../entities/types';

/**
 * 리뷰 좋아요 토글 Use Case
 */
export class ToggleReviewLikeUseCase {
  constructor(
    private reviewLikeRepository: ReviewLikeRepository,
    private authService: AuthService,
  ) {}

  async execute(request: ReviewLikeRequest): Promise<ReviewLikeResult> {
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

      // 기존 좋아요 확인
      const existingLike = await this.reviewLikeRepository.findLikeByUserAndReview(
        userId,
        reviewId,
      );

      let isLiked: boolean;

      if (existingLike) {
        // 좋아요가 있으면 삭제
        await this.reviewLikeRepository.deleteLike(existingLike.id);
        isLiked = false;
      } else {
        // 좋아요가 없으면 추가
        await this.reviewLikeRepository.createLike(userId, reviewId);
        isLiked = true;
      }

      // 업데이트된 좋아요 수 조회
      const likeCount = await this.reviewLikeRepository.countLikesByReview(reviewId);

      return {
        success: true,
        isLiked,
        likeCount,
      };
    } catch (error) {
      console.error('Error in ToggleReviewLikeUseCase:', error);
      return {
        success: false,
        isLiked: false,
        likeCount: 0,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
