import { type Prisma } from '@prisma/client';

export interface MedicalSpecialty {
  id: string;
  name: Prisma.JsonValue;
  specialtyType:
    | 'EYES'
    | 'NOSE'
    | 'FACIAL_CONTOURING'
    | 'BREAST'
    | 'STEM_CELL'
    | 'LIPOSUCTION'
    | 'LIFTING'
    | 'HAIR_TRANSPLANT';
  description: Prisma.JsonValue | null;
  order: number | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetMedicalSpecialtiesRequest {
  specialtyType?:
    | 'EYES'
    | 'NOSE'
    | 'FACIAL_CONTOURING'
    | 'BREAST'
    | 'STEM_CELL'
    | 'LIPOSUCTION'
    | 'LIFTING'
    | 'HAIR_TRANSPLANT';
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
