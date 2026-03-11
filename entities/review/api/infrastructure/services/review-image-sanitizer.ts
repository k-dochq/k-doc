import type { Prisma } from '@prisma/client';

/**
 * Hospital.isActive 값에 따라 리뷰 이미지 노출 여부를 제어하기 위한 유틸들입니다.
 *
 * - Hospital.isActive === false 인 병원에 속한 리뷰라면 ReviewImage를 항상 빈 배열로 마스킹합니다.
 * - Review 구조가 살짝 달라도 최소한 Hospital.isActive와 ReviewImage 필드만 있으면 동작하도록 느슨하게 설계합니다.
 */

// Prisma Review payload 중 Hospital.isActive만 필요한 최소 타입
export type ReviewWithHospitalAndImages = {
  Hospital?: {
    isActive?: boolean | null;
  } | null;
  ReviewImage?: Array<{
    id: string;
    imageType: Prisma.ReviewImageType;
    imageUrl: string;
    alt: string | null;
    order: number | null;
  }>;
};

/**
 * 단일 리뷰에 대해, 병원이 숨김(isActive=false)이면 ReviewImage를 빈 배열로 대체합니다.
 */
export function sanitizeReviewImagesByHospitalActive<T extends ReviewWithHospitalAndImages>(
  review: T,
): T {
  if (review.Hospital && review.Hospital.isActive === false) {
    return {
      ...review,
      ReviewImage: [],
    };
  }

  return review;
}

/**
 * 리뷰 리스트에 대해 일괄로 sanitizeReviewImagesByHospitalActive 를 적용합니다.
 */
export function sanitizeReviewListByHospitalActive<T extends ReviewWithHospitalAndImages>(
  reviews: T[],
): T[] {
  return reviews.map((review) => sanitizeReviewImagesByHospitalActive(review));
}

