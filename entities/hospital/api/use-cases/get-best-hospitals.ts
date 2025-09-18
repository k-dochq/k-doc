import { prisma } from 'shared/lib/prisma';
import { handleDatabaseError } from 'shared/lib';
import { type Prisma, type MedicalSpecialtyType } from '@prisma/client';
import { type HospitalCardData, parseLocalizedText, parsePriceInfo } from 'shared/model/types';
import { getHospitalThumbnailImageUrl } from '../../lib/image-utils';

// 카테고리별 병원 조회 옵션
export interface GetBestHospitalsOptions {
  category?: MedicalSpecialtyType | 'ALL';
  limit?: number;
}

export async function getBestHospitals(options: GetBestHospitalsOptions = {}) {
  try {
    const { category = 'ALL', limit = 5 } = options;

    // 카테고리별 필터링을 위한 where 조건 구성
    const whereCondition: Prisma.HospitalWhereInput = {
      approvalStatusType: 'APPROVED',
    };

    // 특정 카테고리가 선택된 경우 해당 카테고리를 가진 병원만 필터링
    if (category !== 'ALL') {
      whereCondition.HospitalMedicalSpecialty = {
        some: {
          MedicalSpecialty: {
            specialtyType: category,
            isActive: true,
          },
        },
      };
    }

    const hospitals = await prisma.hospital.findMany({
      where: whereCondition,
      select: {
        id: true,
        name: true,
        address: true,
        prices: true,
        rating: true,
        discountRate: true,
        displayLocationName: true,
        HospitalImage: {
          where: {
            isActive: true,
          },
          orderBy: [
            { imageType: 'asc' }, // MAIN이 먼저 오도록
            { order: 'asc' },
          ],
          select: {
            imageType: true,
            imageUrl: true,
          },
        },
        HospitalMedicalSpecialty: {
          select: {
            MedicalSpecialty: {
              select: {
                id: true,
                name: true,
                specialtyType: true,
              },
            },
          },
          take: 3, // 최대 3개의 전문 분야만 표시
        },
        District: {
          select: {
            id: true,
            name: true,
            displayName: true,
            countryCode: true,
            level: true,
            order: true,
            parentId: true,
          },
        },
        _count: {
          select: {
            Review: true, // 실제 리뷰 수 계산
          },
        },
      },
      orderBy: [{ ranking: 'asc' }, { rating: 'desc' }, { reviewCount: 'desc' }],
      take: limit, // 지정된 개수만큼 제한
    });

    // 직접 HospitalCardData 타입으로 반환 (JsonValue를 적절한 타입으로 파싱)
    return hospitals.map((hospital) => ({
      id: hospital.id,
      name: parseLocalizedText(hospital.name),
      address: parseLocalizedText(hospital.address),
      prices: parsePriceInfo(hospital.prices),
      rating: hospital.rating,
      reviewCount: hospital._count.Review, // 실제 리뷰 수
      thumbnailImageUrl: getHospitalThumbnailImageUrl(hospital.HospitalImage),
      discountRate: hospital.discountRate,
      medicalSpecialties: hospital.HospitalMedicalSpecialty.map((hms) => ({
        id: hms.MedicalSpecialty.id,
        name: parseLocalizedText(hms.MedicalSpecialty.name),
        specialtyType: hms.MedicalSpecialty.specialtyType,
      })),
      displayLocationName: parseLocalizedText(hospital.displayLocationName || '{}'),
      district: hospital.District || null, // District 정보 추가
    }));
  } catch (error) {
    throw handleDatabaseError(error, 'getBestHospitals');
  }
}
