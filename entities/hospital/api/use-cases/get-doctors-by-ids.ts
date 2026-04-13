import { type Prisma } from '@prisma/client';
import { prisma } from 'shared/lib/prisma';
import { handleDatabaseError } from 'shared/lib';
import { type HospitalDoctor } from '../entities/types';

type DoctorWithRelations = Prisma.DoctorGetPayload<{
  include: {
    Hospital: { select: { id: true; name: true } };
    DoctorMedicalSpecialty: { include: { MedicalSpecialty: true } };
    DoctorImage: {
      where: { isActive: true };
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }];
    };
  };
}>;

function transformDoctor(data: DoctorWithRelations): HospitalDoctor {
  const medicalSpecialties = data.DoctorMedicalSpecialty.map((dms) => ({
    id: dms.MedicalSpecialty.id,
    name: dms.MedicalSpecialty.name,
    specialtyType: dms.MedicalSpecialty.specialtyType,
  }));

  const doctorImages = data.DoctorImage.map((img) => ({
    id: img.id,
    doctorId: img.doctorId,
    imageType: img.imageType as 'PROFILE',
    imageUrl: img.imageUrl,
    alt: img.alt,
    order: img.order,
    isActive: img.isActive,
    createdAt: img.createdAt,
    updatedAt: img.updatedAt,
  }));

  return {
    id: data.id,
    name: data.name,
    position: data.position,
    description: data.description || undefined,
    genderType: data.genderType,
    hospital: {
      id: data.Hospital.id,
      name: data.Hospital.name,
    },
    medicalSpecialties,
    doctorImages,
    order: data.order || undefined,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}

/**
 * 주어진 ID 배열에 해당하는 의사들을 HospitalDoctor 형식으로 조회.
 * 결과는 입력 배열의 순서대로 반환.
 */
export async function getDoctorsByIds(ids: string[]): Promise<HospitalDoctor[]> {
  if (ids.length === 0) return [];

  try {
    const doctors = await prisma.doctor.findMany({
      where: {
        id: { in: ids },
        stop: false,
      },
      include: {
        Hospital: {
          select: { id: true, name: true },
        },
        DoctorMedicalSpecialty: {
          include: { MedicalSpecialty: true },
        },
        DoctorImage: {
          where: { isActive: true },
          orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
        },
      },
    });

    const mapped = doctors.map(transformDoctor);

    // 입력 ID 순서대로 정렬
    const indexMap = new Map(ids.map((id, i) => [id, i]));
    mapped.sort((a, b) => (indexMap.get(a.id) ?? 0) - (indexMap.get(b.id) ?? 0));

    return mapped;
  } catch (error) {
    throw handleDatabaseError(error, 'getDoctorsByIds');
  }
}
