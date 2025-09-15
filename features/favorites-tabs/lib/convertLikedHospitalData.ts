import { type HospitalCardData, parseLocalizedText } from 'shared/model/types';
import { type LikedHospital } from '../api/entities/types';

/**
 * LikedHospital 데이터를 HospitalCardData 타입으로 변환
 * best hospitals API와 동일한 데이터 구조로 변환합니다.
 */
export function convertLikedHospitalToCardData(likedHospital: LikedHospital): HospitalCardData {
  return {
    id: likedHospital.id,
    name: parseLocalizedText(likedHospital.name),
    address: parseLocalizedText(likedHospital.address || '{}'),
    prices: likedHospital.prices || null, // 이미 PriceInfo | null 타입이므로 직접 사용
    rating: likedHospital.rating,
    reviewCount: likedHospital.reviewCount,
    // THUMBNAIL 이미지 URL 사용 (best hospitals와 동일)
    thumbnailImageUrl: likedHospital.mainImageUrl || null,
    discountRate: likedHospital.discountRate || null,
    // 시술부위 태그 추가
    medicalSpecialties:
      likedHospital.medicalSpecialties?.map((specialty) => ({
        id: specialty.id,
        name: parseLocalizedText(specialty.name),
        specialtyType: specialty.specialtyType,
      })) || [],
  };
}

/**
 * LikedHospital 배열을 HospitalCardData 배열로 변환
 */
export function convertLikedHospitalsToCardData(
  likedHospitals: LikedHospital[],
): HospitalCardData[] {
  return likedHospitals.map(convertLikedHospitalToCardData);
}
