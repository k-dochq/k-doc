import 'server-only';

import { AuthService } from 'features/review-like/api/infrastructure/services/auth-service';
import { LikedReviewsRepository } from 'features/favorites-tabs/api-server/repositories/liked-reviews-repository';
import type {
  GetLikedReviewsRequest,
  GetLikedReviewsResult,
} from 'features/favorites-tabs/api/entities/types';

/**
 * 좋아요한 리뷰 목록 조회 Use Case
 */
export class GetLikedReviewsUseCase {
  constructor(
    private authService: AuthService,
    private likedReviewsRepository: LikedReviewsRepository,
  ) {}

  async execute(request: GetLikedReviewsRequest): Promise<GetLikedReviewsResult> {
    try {
      // 1. 사용자 인증 확인
      const currentUser = await this.authService.getCurrentUser();
      if (!currentUser) {
        return {
          success: false,
          error: 'Unauthorized',
        };
      }

      // 2. 좋아요한 리뷰 목록 조회
      const result = await this.likedReviewsRepository.getLikedReviews({
        userId: currentUser.id,
        cursor: request.cursor,
        limit: request.limit,
      });

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      console.error('Error in GetLikedReviewsUseCase:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
