import { type HospitalCardData, parsePriceInfo } from 'shared/model/types';
import { type DoctorDetail } from '@/lib/queries/doctor';
import { type Prisma, DistrictCountryCode } from '@prisma/client';

/**
 * DoctorDetail의 hospital 정보를 HospitalCardData 타입으로 변환
 * 이제 doctor 데이터에 완전한 hospital 정보가 포함되어 있음
 */
export function transformDoctorHospitalToHospitalCard(doctor: DoctorDetail): HospitalCardData {
  // 병원 썸네일 이미지 URL 추출 (MAIN 타입 우선, 없으면 첫 번째 이미지)
  const thumbnailImageUrl =
    doctor.hospital.hospitalImages.find((img) => img.imageType === 'MAIN')?.imageUrl ||
    doctor.hospital.hospitalImages[0]?.imageUrl ||
    null;

  return {
    id: doctor.hospital.id,
    name: doctor.hospital.name,
    address: doctor.hospital.address,
    prices: parsePriceInfo(doctor.hospital.prices), // 실제 가격 정보 파싱
    rating: doctor.hospital.rating,
    reviewCount: doctor.hospital.reviewCount,
    thumbnailImageUrl,
    discountRate: doctor.hospital.discountRate,
    medicalSpecialties: doctor.hospital.medicalSpecialties.map((specialty) => ({
      id: specialty.id,
      name: specialty.name,
      specialtyType: specialty.specialtyType,
    })),
    district: doctor.hospital.district
      ? {
          id: doctor.hospital.district.id,
          name: doctor.hospital.district.name as Prisma.JsonValue,
          displayName: doctor.hospital.district.displayName as Prisma.JsonValue,
          countryCode: doctor.hospital.district.countryCode as DistrictCountryCode,
          level: doctor.hospital.district.level,
          order: doctor.hospital.district.order,
          parentId: doctor.hospital.district.parentId,
        }
      : null,
    displayLocationName: doctor.hospital.displayLocationName,
    // 좋아요 관련 필드는 없음 (doctor 상세에서는 좋아요 기능 비활성화)
    likeCount: 0,
    isLiked: false,
    likedUserIds: [],
  };
}
