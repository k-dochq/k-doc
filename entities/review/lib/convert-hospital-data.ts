import { type HospitalCardData } from 'shared/model/types';
import { type ReviewCardData } from '../model/types';

/**
 * ReviewCardData의 hospital 정보를 HospitalCardData 타입으로 변환
 */
export function convertReviewHospitalToHospitalCard(review: ReviewCardData): HospitalCardData {
  return {
    id: review.hospital.id,
    name: review.hospital.name,
    address: review.hospital.address,
    prices: review.hospital.prices,
    rating: review.hospital.rating,
    reviewCount: review.hospital.reviewCount,
    thumbnailImageUrl: review.hospital.thumbnailImageUrl,
    discountRate: review.hospital.discountRate,
  };
}
