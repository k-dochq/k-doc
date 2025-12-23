import { ReviewRepository } from '../infrastructure/repositories/review-repository';
import {
  type UpdateReviewRequest,
  type MultilingualText,
  type ReviewUpdateData,
  type ReviewImageCreateData,
} from '../entities/types';

export class UpdateReview {
  private readonly reviewRepository: ReviewRepository;

  constructor(reviewRepository: ReviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  /**
   * 리뷰 수정 유스케이스
   */
  async execute(reviewId: string, request: UpdateReviewRequest): Promise<{ reviewId: string }> {
    // 입력 검증
    this.validateRequest(request);

    // 다국어 텍스트 생성 (사용자 입력을 모든 언어에 동일하게 저장)
    const multilingualContent: MultilingualText = {
      ko_KR: request.content,
      en_US: request.content,
      th_TH: request.content,
    };

    const multilingualProcedureName: MultilingualText = {
      ko_KR: request.procedureName,
      en_US: request.procedureName,
      th_TH: request.procedureName,
    };

    // 제목 생성 (content의 첫 50자까지)
    const generateTitle = (text: string): string => {
      const maxLength = 50;
      if (text.length <= maxLength) return text;

      // 문장 부호나 공백에서 잘라서 자연스럽게
      const trimmed = text.substring(0, maxLength);
      const lastPeriod = trimmed.lastIndexOf('.');
      const lastComma = trimmed.lastIndexOf(',');
      const lastSpace = trimmed.lastIndexOf(' ');

      const cutoff = Math.max(lastPeriod, lastComma, lastSpace);
      return cutoff > 0 ? trimmed.substring(0, cutoff) : trimmed;
    };

    const multilingualTitle: MultilingualText = {
      ko_KR: generateTitle(request.content),
      en_US: generateTitle(request.content),
      th_TH: generateTitle(request.content),
    };

    // ReviewUpdateData 생성
    const reviewData: ReviewUpdateData = {
      rating: request.rating,
      title: multilingualTitle,
      content: multilingualContent,
      concernsMultilingual: multilingualProcedureName,
      medicalSpecialtyId: request.medicalSpecialtyId,
      isRecommended: request.rating >= 3, // 평점 3점 이상이면 추천
    };

    // ReviewImage 데이터 생성
    const images: Omit<ReviewImageCreateData, 'reviewId'>[] = [
      ...request.beforeImageUrls.map((url, index) => ({
        imageType: 'BEFORE' as const,
        imageUrl: url,
        order: index,
        isActive: true,
      })),
      ...request.afterImageUrls.map((url, index) => ({
        imageType: 'AFTER' as const,
        imageUrl: url,
        order: index,
        isActive: true,
      })),
    ];

    // 리뷰 수정 (트랜잭션)
    const result = await this.reviewRepository.updateReview(reviewId, reviewData, images);

    // 병원 평균 평점 업데이트 (리뷰 수정 시에도 평점이 변경될 수 있으므로)
    const review = await this.reviewRepository.getReviewById(reviewId);
    if (review) {
      await this.reviewRepository.updateHospitalRating(review.hospitalId);
    }

    return result;
  }

  /**
   * 요청 데이터 검증
   */
  private validateRequest(request: UpdateReviewRequest): void {
    if (!request.rating || request.rating < 1 || request.rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    if (!request.content || request.content.trim().length === 0) {
      throw new Error('Content is required');
    }

    if (request.content.length > 2000) {
      throw new Error('Content must be 2000 characters or less');
    }

    if (!request.procedureName || request.procedureName.trim().length === 0) {
      throw new Error('Procedure name is required');
    }

    if (!request.medicalSpecialtyId) {
      throw new Error('Medical specialty is required');
    }

    if (request.beforeImageUrls.length > 10) {
      throw new Error('Maximum 10 before images allowed');
    }

    if (request.afterImageUrls.length > 10) {
      throw new Error('Maximum 10 after images allowed');
    }
  }
}
