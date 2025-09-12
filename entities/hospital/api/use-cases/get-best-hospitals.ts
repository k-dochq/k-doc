import { prisma } from 'shared/lib/prisma';
import { handleDatabaseError } from 'shared/lib';
import { type Hospital } from '../entities/types';
import { type Prisma, type MedicalSpecialtyType } from '@prisma/client';

// Prisma에서 생성된 타입을 사용하여 정확한 타입 정의
type HospitalWithImages = Prisma.HospitalGetPayload<{
  include: {
    HospitalImage: true;
    HospitalMedicalSpecialty: {
      include: {
        MedicalSpecialty: true;
      };
    };
  };
}>;

// 카테고리별 병원 조회 옵션
export interface GetBestHospitalsOptions {
  category?: MedicalSpecialtyType | 'ALL';
  limit?: number;
}

/**
 * 썸네일 이미지 URL을 추출하는 헬퍼 함수
 */
function extractThumbnailImageUrl(
  hospitalImages: HospitalWithImages['HospitalImage'],
): string | null {
  if (!hospitalImages || hospitalImages.length === 0) {
    return null;
  }

  const thumbnailImage = hospitalImages.find((image) => image.imageType === 'THUMBNAIL');

  return thumbnailImage?.imageUrl || null;
}

export async function getBestHospitals(options: GetBestHospitalsOptions = {}): Promise<Hospital[]> {
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
      include: {
        HospitalImage: {
          where: {
            imageType: 'THUMBNAIL',
          },
          orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
          take: 1, // 첫 번째 썸네일 이미지만
        },
        HospitalMedicalSpecialty: {
          include: {
            MedicalSpecialty: true,
          },
        },
      },
      orderBy: [{ ranking: 'asc' }, { rating: 'desc' }, { reviewCount: 'desc' }],
      take: limit, // 지정된 개수만큼 제한
    });

    // Hospital 타입에 맞게 데이터 변환
    return hospitals.map((hospital) => ({
      id: hospital.id,
      name: hospital.name,
      rating: hospital.rating,
      reviewCount: hospital.reviewCount,
      bookmarkCount: hospital.bookmarkCount,
      viewCount: hospital.viewCount,
      approvalStatusType: hospital.approvalStatusType,
      ranking: hospital.ranking,
      createdAt: hospital.createdAt,
      updatedAt: hospital.updatedAt,
      mainImageUrl: extractThumbnailImageUrl(hospital.HospitalImage),
      hospitalImages: hospital.HospitalImage.map((image) => ({
        id: image.id,
        hospitalId: image.hospitalId,
        imageType: image.imageType,
        imageUrl: image.imageUrl,
        alt: image.alt,
        order: image.order,
        isActive: image.isActive,
        createdAt: image.createdAt,
        updatedAt: image.updatedAt,
      })),
    }));
  } catch (error) {
    throw handleDatabaseError(error, 'getBestHospitals');
  }
}
