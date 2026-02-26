import { prisma } from 'shared/lib/prisma';
import { handleDatabaseError } from 'shared/lib';
import { type Prisma, type MedicalSpecialtyType } from '@prisma/client';

// Prisma에서 생성된 타입을 사용하여 정확한 타입 정의
export type MedicalSpecialtyWithTranslations = Prisma.MedicalSpecialtyGetPayload<{
  select: {
    id: true;
    name: true;
    specialtyType: true;
    order: true;
    isActive: true;
  };
}>;

/**
 * HospitalListTabs에서 사용할 주요 카테고리만 조회하는 함수
 * QuickMenu와 동일한 순서로 필터링
 */
export async function getMainMedicalSpecialties(): Promise<MedicalSpecialtyWithTranslations[]> {
  try {
    const specialties = await prisma.medicalSpecialty.findMany({
      where: {
        isActive: true,
        parentSpecialtyId: null, // 상위 카테고리만 (하위 카테고리 제외)
      },
      select: {
        id: true,
        name: true,
        specialtyType: true,
        order: true,
        isActive: true,
      },
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    });

    return specialties;
  } catch (error) {
    throw handleDatabaseError(error, 'getMainMedicalSpecialties');
  }
}
