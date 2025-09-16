import { type HospitalCardData, parseLocalizedText } from 'shared/model/types';
import { type Hospital } from 'entities/hospital/api/entities/types';

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
    // 썸네일 이미지 찾기 (THUMBNAIL 타입 우선, 없으면 MAIN 타입, 없으면 첫 번째 이미지)
    thumbnailImageUrl:
      hospital.hospitalImages?.find((img) => img.imageType === 'THUMBNAIL')?.imageUrl ||
      hospital.hospitalImages?.find((img) => img.imageType === 'MAIN')?.imageUrl ||
      hospital.hospitalImages?.[0]?.imageUrl ||
      hospital.mainImageUrl ||
      null,
    discountRate: hospital.discountRate || null,
    // 시술부위 태그 변환
    medicalSpecialties:
      hospital.medicalSpecialties?.map((specialty) => ({
        id: specialty.id,
        name: parseLocalizedText(specialty.name),
        specialtyType: specialty.specialtyType,
      })) || [],
    // 좋아요 관련 필드
    likeCount: hospital.likeCount,
    isLiked: hospital.isLiked,
    likedUserIds: hospital.likedUserIds,
  };
}
