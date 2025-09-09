import { prisma } from 'shared/lib/prisma';
import { handleDatabaseError } from 'shared/lib';
import { type MedicalSpecialty } from '../entities/types';

export async function getMedicalSpecialties(): Promise<MedicalSpecialty[]> {
  try {
    const medicalSpecialties = await prisma.medicalSpecialty.findMany({
      where: {
        isActive: true,
      },
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    });

    return medicalSpecialties;
  } catch (error) {
    throw handleDatabaseError(error, 'getMedicalSpecialties');
  }
}

// 기존 함수명 호환성을 위한 별칭
export const getCategories = getMedicalSpecialties;
