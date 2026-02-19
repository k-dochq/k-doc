import { type MedicalSpecialtyType } from '@prisma/client';

/**
 * 지원되는 모든 진료 부위 타입 (표시 순서: 눈 → 코 → 리프팅 → … → 기타)
 */
export const MEDICAL_SPECIALTY_TYPES: readonly MedicalSpecialtyType[] = [
  'EYES',
  'NOSE',
  'LIFTING',
  'FACIAL_CONTOURING',
  'BREAST',
  'STEM_CELL',
  'LIPOSUCTION',
  'BODY',
  'HAIR_TRANSPLANT',
  'DERMATOLOGY',
  'DENTAL',
  'ETC',
] as const;

/**
 * 유효한 MedicalSpecialtyType인지 확인하는 함수
 */
export function isValidMedicalSpecialtyType(value: string): value is MedicalSpecialtyType {
  return MEDICAL_SPECIALTY_TYPES.includes(value as MedicalSpecialtyType);
}
