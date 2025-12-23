import { ReviewRepository } from '../infrastructure/repositories/review-repository';

export class DeleteReview {
  private readonly reviewRepository: ReviewRepository;

  constructor(reviewRepository: ReviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  /**
   * 리뷰 삭제 유스케이스
   */
  async execute(reviewId: string): Promise<{ reviewId: string; hospitalId: string }> {
    // 입력 검증
    if (!reviewId || typeof reviewId !== 'string' || reviewId.trim().length === 0) {
      throw new Error('Review ID is required');
    }

    // 리뷰 삭제 실행
    const result = await this.reviewRepository.deleteReview(reviewId);

    return result;
  }
}
