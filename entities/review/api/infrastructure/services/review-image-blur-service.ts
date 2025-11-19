import { type ReviewCardData } from '../../../model/types';

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
   * 리뷰 데이터의 이미지 URL을 blur 이미지로 교체
   * 가슴(BREAST) 카테고리인 경우에만 처리
   * @param reviews 리뷰 데이터 배열
   * @returns 이미지 URL이 blur 이미지로 교체된 리뷰 데이터 배열 (가슴 카테고리만)
   */
  replaceReviewImagesWithBlur(reviews: ReviewCardData[]): ReviewCardData[] {
    return reviews.map((review) => {
      // 가슴(BREAST) 카테고리가 아닌 경우 원본 그대로 반환
      if (review.medicalSpecialty.specialtyType !== 'BREAST') {
        return review;
      }

      // 가슴 카테고리인 경우에만 blur 이미지로 교체
      return {
        ...review,
        images: {
          before: review.images.before.map((img) => ({
            ...img,
            imageUrl: this.getRandomBlurImageUrl(),
          })),
          after: review.images.after.map((img) => ({
            ...img,
            imageUrl: this.getRandomBlurImageUrl(),
          })),
        },
      };
    });
  }
}
