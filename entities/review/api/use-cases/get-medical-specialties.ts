import { prisma } from 'shared/lib/prisma';

export interface MedicalSpecialtyOption {
  id: string;
  name: Record<string, string>;
  specialtyType: string;
}

export async function getMedicalSpecialties(): Promise<MedicalSpecialtyOption[]> {
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
      },
      orderBy: {
        order: 'asc',
      },
    });

    return specialties.map((specialty) => ({
      id: specialty.id,
      name: specialty.name as Record<string, string>,
      specialtyType: specialty.specialtyType,
    }));
  } catch (error) {
    console.error('Error fetching medical specialties:', error);
    throw new Error('부위 목록을 불러오는 중 오류가 발생했습니다.');
  }
}
