import { type HospitalCardData } from 'shared/model/types';
import { type ReviewCardData } from '../model/types';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { type LocalizedText } from 'shared/model/types';

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
    district: review.hospital.district
      ? {
          id: '', // ReviewCardData에는 id가 없으므로 빈 문자열
          name: review.hospital.district.name,
          displayName: review.hospital.district.displayName || null,
          countryCode: 'KR' as const, // 기본값
          level: 0, // 기본값
          order: null,
          parentId: null,
        }
      : null,
    displayLocationName: review.hospital.displayLocationName
      ? (review.hospital.displayLocationName as LocalizedText)
      : null,
  };
}
