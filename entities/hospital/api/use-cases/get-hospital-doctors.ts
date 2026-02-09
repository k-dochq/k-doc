import { type Prisma } from '@prisma/client';
import { prisma } from 'shared/lib/prisma';
import { handleDatabaseError } from 'shared/lib';
import { type HospitalDoctor } from '../entities/types';

// Prisma 타입 정의
type DoctorWithRelations = Prisma.DoctorGetPayload<{
  include: {
    Hospital: {
      select: {
        id: true;
        name: true;
      };
    };
    DoctorMedicalSpecialty: {
      include: {
        MedicalSpecialty: true;
      };
    };
    DoctorImage: {
      where: {
        isActive: true;
      };
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }];
    };
  };
}>;

// HospitalDoctor 타입은 ../entities/types.ts에서 import

export interface GetHospitalDoctorsRequest {
  hospitalId: string;
}

export interface GetHospitalDoctorsResponse {
  doctors: HospitalDoctor[];
}

/**
 * 특정 병원의 소속 의사 목록을 조회합니다.
 */
export async function getHospitalDoctors(
  request: GetHospitalDoctorsRequest,
): Promise<GetHospitalDoctorsResponse> {
  try {
    const { hospitalId } = request;

    console.log(`[${new Date().toISOString()}] 병원 소속 의사 조회: ${hospitalId}`);

    const doctorsData = await prisma.doctor.findMany({
      where: {
        hospitalId,
        stop: false, // 활성 상태인 의사만 조회
      },
      include: {
        Hospital: {
          select: {
            id: true,
            name: true,
          },
        },
        DoctorMedicalSpecialty: {
          include: {
            MedicalSpecialty: true,
          },
        },
        DoctorImage: {
          where: {
            isActive: true,
          },
          orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
        },
      },
      orderBy: [
        { order: 'asc' }, // 순서 우선
        { createdAt: 'asc' }, // 생성일 순
      ],
    });

    // 데이터 변환
    const doctors = doctorsData.map((doctor) => transformDoctor(doctor));

    return {
      doctors,
    };
  } catch (error) {
    console.error('Error fetching hospital doctors:', error);
    throw handleDatabaseError(error, 'getHospitalDoctors');
  }
}

/**
 * Prisma 데이터를 HospitalDoctor 타입으로 변환합니다.
 */
function transformDoctor(data: DoctorWithRelations): HospitalDoctor {
  // 시술부위 변환
  const medicalSpecialties = data.DoctorMedicalSpecialty.map((dms) => ({
    id: dms.MedicalSpecialty.id,
    name: dms.MedicalSpecialty.name,
    specialtyType: dms.MedicalSpecialty.specialtyType,
  }));

  // 의사 이미지 변환
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
