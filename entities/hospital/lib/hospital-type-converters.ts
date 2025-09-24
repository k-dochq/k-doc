import { type Hospital } from '../api/entities/types';
import { type HospitalCardData, parseLocalizedText } from 'shared/model/types';
import { getHospitalThumbnailImageUrl } from './image-utils';

/**
 * Hospital 타입을 HospitalCardData 타입으로 변환하는 함수
 * FSD 아키텍처에 따라 타입 변환 로직을 분리
 */
export function convertHospitalToCardData(hospital: Hospital): HospitalCardData {
  return {
    id: hospital.id,
    name: parseLocalizedText(hospital.name || '{}'),
    address: parseLocalizedText(hospital.address || '{}'),
    prices: hospital.prices || null,
    rating: hospital.rating,
    reviewCount: hospital.reviewCount,
    thumbnailImageUrl: hospital.hospitalImages
      ? getHospitalThumbnailImageUrl(hospital.hospitalImages)
      : null,
    discountRate: hospital.discountRate || null,
    medicalSpecialties:
      hospital.medicalSpecialties?.map((ms) => ({
        id: ms.id,
        name: parseLocalizedText(ms.name),
        specialtyType: ms.specialtyType,
      })) || [],
    displayLocationName: parseLocalizedText(hospital.displayLocationName || '{}'),
    district: hospital.district,
    likeCount: hospital.likeCount,
    likedUserIds: hospital.likedUserIds,
    isLiked: hospital.isLiked,
    // Hospital 타입과의 호환성을 위한 추가 필드들
    bookmarkCount: hospital.bookmarkCount,
    viewCount: hospital.viewCount,
    approvalStatusType: hospital.approvalStatusType,
    ranking: hospital.ranking,
    createdAt: hospital.createdAt,
    updatedAt: hospital.updatedAt,
    mainImageUrl: hospital.hospitalImages
      ? getHospitalThumbnailImageUrl(hospital.hospitalImages)
      : null,
    latitude: hospital.latitude,
    longitude: hospital.longitude,
  };
}

/**
 * Hospital 배열을 HospitalCardData 배열로 변환하는 함수
 */
export function convertHospitalsToCardData(hospitals: Hospital[]): HospitalCardData[] {
  return hospitals.map(convertHospitalToCardData);
}
