import { type DoctorDetail } from '@/lib/queries/doctor';
import { type HospitalDoctor } from 'entities/hospital/api/entities/types';
import { type Prisma, type MedicalSpecialtyType } from '@prisma/client';

/**
 * DoctorDetail을 HospitalDoctor 타입으로 변환합니다.
 */
export function transformDoctorDetailToHospitalDoctor(doctor: DoctorDetail): HospitalDoctor {
  return {
    id: doctor.id,
    name: doctor.name as Prisma.JsonValue, // LocalizedText를 JsonValue로 캐스팅
    position: doctor.position as Prisma.JsonValue, // LocalizedText를 JsonValue로 캐스팅
    description: doctor.description || undefined, // null을 undefined로 변환
    genderType: doctor.genderType,
    hospital: {
      id: doctor.hospital.id,
      name: doctor.hospital.name as Prisma.JsonValue, // LocalizedText를 JsonValue로 캐스팅
    },
    medicalSpecialties: doctor.medicalSpecialties.map(
      (specialty: DoctorDetail['medicalSpecialties'][0]) => ({
        id: specialty.id,
        name: specialty.name as Prisma.JsonValue, // LocalizedText를 JsonValue로 캐스팅
        specialtyType: specialty.specialtyType as MedicalSpecialtyType,
      }),
    ),
    doctorImages: doctor.doctorImages.map((image: DoctorDetail['doctorImages'][0]) => ({
      id: image.id,
      doctorId: doctor.id,
      imageType: image.imageType as 'PROFILE',
      imageUrl: image.imageUrl,
      alt: image.alt,
      order: image.order,
      isActive: true,
      createdAt: doctor.createdAt,
      updatedAt: doctor.updatedAt,
    })),
    createdAt: doctor.createdAt,
    updatedAt: doctor.updatedAt,
  };
}
