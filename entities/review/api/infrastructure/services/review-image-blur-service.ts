import { type ReviewCardData, type ReviewImage } from '../../../model/types';

/**
 * Blur 이미지 URL 상수
 */
const BLUR_IMAGE_URLS = [
  'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/blur-images/img_blur_1.png',
  'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/blur-images/img_blur_2.png',
  'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/blur-images/img_blur_3.png',
] as const;

/**
 * 리뷰 이미지 블러 처리 서비스
 * 로그인하지 않은 사용자에게 리뷰 이미지를 blur 이미지로 교체하는 기능 제공
 */
export class ReviewImageBlurService {
  /**
   * 랜덤으로 blur 이미지 URL 선택
   */
  private getRandomBlurImageUrl(): string {
    const randomIndex = Math.floor(Math.random() * BLUR_IMAGE_URLS.length);
    return BLUR_IMAGE_URLS[randomIndex];
  }

  /**
   * 가슴(BREAST) 카테고리인지 확인
   */
  private shouldBlurReview(review: ReviewCardData): boolean {
    return review.medicalSpecialty.specialtyType === 'BREAST';
  }

  /**
   * Blur 이미지 객체 생성
   */
  private createBlurImage(reviewId: string, imageType: 'BEFORE' | 'AFTER'): ReviewImage {
    return {
      id: `blur-${imageType.toLowerCase()}-${reviewId}`,
      imageType,
      imageUrl: this.getRandomBlurImageUrl(),
      alt: null,
      order: null,
    };
  }

  /**
   * 이미지 배열 처리: 있으면 blur 이미지로 교체, 없으면 하나 생성
   */
  private processImages(
    images: ReviewImage[],
    reviewId: string,
    imageType: 'BEFORE' | 'AFTER',
  ): ReviewImage[] {
    if (images.length > 0) {
      // 이미지가 있으면 blur 이미지로 교체
      return images.map((img) => ({
        ...img,
        imageUrl: this.getRandomBlurImageUrl(),
      }));
    }

    // 이미지가 없으면 하나 생성
    return [this.createBlurImage(reviewId, imageType)];
  }

  /**
   * 단일 리뷰 이미지에 blur 적용
   */
  applyBlurToReviewImages<
    T extends {
      reviewId: string;
      specialtyType: string;
      images: {
        before: ReviewImage[];
        after: ReviewImage[];
      };
    },
  >(payload: T): T['images'] {
    if (payload.specialtyType !== 'BREAST') {
      return payload.images;
    }

    const beforeImages = this.processImages(payload.images.before, payload.reviewId, 'BEFORE');
    const afterImages = this.processImages(payload.images.after, payload.reviewId, 'AFTER');

    return {
      before: beforeImages,
      after: afterImages,
    };
  }

  /**
   * 리뷰 데이터의 이미지 URL을 blur 이미지로 교체
   * 가슴(BREAST) 카테고리인 경우에만 처리
   * before 또는 after에 이미지가 없으면 하나라도 생성하여 blur 이미지 URL 설정
   * @param reviews 리뷰 데이터 배열
   * @returns 이미지 URL이 blur 이미지로 교체된 리뷰 데이터 배열 (가슴 카테고리만)
   */
  replaceReviewImagesWithBlur(reviews: ReviewCardData[]): ReviewCardData[] {
    return reviews.map((review) => {
      const isBreastReview = review.medicalSpecialty.specialtyType === 'BREAST';
      const blurredImages = this.applyBlurToReviewImages({
        reviewId: review.id,
        specialtyType: review.medicalSpecialty.specialtyType,
        images: review.images,
      });

      return {
        ...review,
        images: blurredImages,
        requiresLogin: isBreastReview, // 가슴 카테고리면 로그인 필요
      };
    });
  }
}
