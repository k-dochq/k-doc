import { type Prisma, type MedicalSpecialty, type MedicalSpecialtyType } from '@prisma/client';

export type { MedicalSpecialty };

export interface GetMedicalSpecialtiesRequest {
  specialtyType?: MedicalSpecialtyType;
  isActive?: boolean;
  limit?: number;
  offset?: number;
}

export interface GetMedicalSpecialtiesResponse {
  medicalSpecialties: MedicalSpecialty[];
  total: number;
}

// 기존 Category 인터페이스는 호환성을 위해 MedicalSpecialty의 별칭으로 유지
export type Category = MedicalSpecialty;
