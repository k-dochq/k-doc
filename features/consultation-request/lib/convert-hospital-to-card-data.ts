import { type HospitalCardData, parseLocalizedText } from 'shared/model/types';
import { type Hospital } from 'entities/hospital/api/entities/types';
import { getHospitalThumbnailImageUrl } from 'entities/hospital/lib/image-utils';

/**
 * Hospital 데이터를 HospitalCardData 타입으로 변환
 */
export function convertHospitalToCardData(hospital: Hospital): HospitalCardData {
  return {
    id: hospital.id,
    name: parseLocalizedText(hospital.name),
    address: parseLocalizedText(hospital.address || '{}'),
    prices: hospital.prices || null,
    rating: hospital.rating,
    reviewCount: hospital.reviewCount,
    // 썸네일 이미지 URL (MAIN → THUMBNAIL → 첫 번째 이미지 순서)
    thumbnailImageUrl: hospital.hospitalImages
      ? getHospitalThumbnailImageUrl(hospital.hospitalImages)
      : hospital.mainImageUrl || null,
    discountRate: hospital.discountRate || null,
    // 시술부위 태그 변환
    medicalSpecialties:
      hospital.medicalSpecialties?.map((specialty) => ({
        id: specialty.id,
        name: parseLocalizedText(specialty.name),
        specialtyType: specialty.specialtyType,
      })) || [],
    // 지역 정보
    district: hospital.district || null,
    displayLocationName: hospital.displayLocationName
      ? parseLocalizedText(hospital.displayLocationName)
      : null,
    // 좋아요 관련 필드
    likeCount: hospital.likeCount,
    isLiked: hospital.isLiked,
    likedUserIds: hospital.likedUserIds,
    // HOT 태그 표시를 위한 ranking
    ranking: hospital.ranking,
  };
}
