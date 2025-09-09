import { type MedicalSpecialtyType } from '@prisma/client';

/**
 * 지원되는 모든 진료 부위 타입
 */
export const MEDICAL_SPECIALTY_TYPES: readonly MedicalSpecialtyType[] = [
  'EYES',
  'NOSE',
  'FACIAL_CONTOURING',
  'BREAST',
  'STEM_CELL',
  'LIPOSUCTION',
  'LIFTING',
  'HAIR_TRANSPLANT',
] as const;

/**
 * 유효한 MedicalSpecialtyType인지 확인하는 함수
 */
export function isValidMedicalSpecialtyType(value: string): value is MedicalSpecialtyType {
  return MEDICAL_SPECIALTY_TYPES.includes(value as MedicalSpecialtyType);
}
