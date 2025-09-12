import { prisma } from 'shared/lib/prisma';
import { handleDatabaseError } from 'shared/lib';
import { type Hospital } from '../entities/types';
import { type Prisma, type MedicalSpecialtyType } from '@prisma/client';

// 카테고리별 병원 조회 옵션
export interface GetBestHospitalsOptions {
  category?: MedicalSpecialtyType | 'ALL';
  limit?: number;
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

    return hospitals;
  } catch (error) {
    throw handleDatabaseError(error, 'getBestHospitals');
  }
}
