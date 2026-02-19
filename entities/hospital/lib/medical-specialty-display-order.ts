import { type MedicalSpecialtyType } from '@prisma/client';

/**
 * 부위 카테고리 태그 표시 순서 (눈 → 코 → 리프팅 → … → 기타)
 * INCISIONAL, NON_INCISIONAL는 DB enum에 없고 add-hospital-category에서 id로 추가됨
 */
export const MEDICAL_SPECIALTY_DISPLAY_ORDER: readonly (
  | MedicalSpecialtyType
  | 'INCISIONAL'
  | 'NON_INCISIONAL'
)[] = [
  'EYES',           // 1. 눈
  'NOSE',           // 2. 코
  'LIFTING',        // 3. 리프팅
  'FACIAL_CONTOURING', // 4. 안면윤곽
  'BREAST',         // 5. 가슴
  'STEM_CELL',      // 6. 줄기세포
  'LIPOSUCTION',     // 7. 지방흡입
  'BODY',           // 8. 바디
  'HAIR_TRANSPLANT', // 9. 모발이식
  'DERMATOLOGY',    // 10. 피부과
  'DENTAL',         // 11. 치과
  'INCISIONAL',     // 12. 절개 (id: incisional-category)
  'NON_INCISIONAL', // 13. 비절개 (id: non-incisional-category)
  'ETC',            // 14. 기타 (그 외 LIPS, CHIN, CHEEKS, FOREHEAD 등)
] as const;

const ORDER_INDEX_MAP = new Map<string, number>(
  MEDICAL_SPECIALTY_DISPLAY_ORDER.map((key, index) => [key, index]),
);

/** 정렬 시 순서에 없으면 맨 뒤로 보낼 때 사용하는 인덱스 */
const FALLBACK_INDEX = MEDICAL_SPECIALTY_DISPLAY_ORDER.length;

/**
 * 항목의 표시 순서 인덱스를 반환 (작을수록 먼저 표시)
 * - incisional-category / non-incisional-category 는 id로 판별
 * - 그 외는 specialtyType으로 ORDER 배열에서 조회, 없으면 맨 뒤
 */
export function getMedicalSpecialtySortIndex(s: {
  id: string;
  specialtyType?: string;
}): number {
  if (s.id === 'incisional-category') return ORDER_INDEX_MAP.get('INCISIONAL') ?? 12;
  if (s.id === 'non-incisional-category') return ORDER_INDEX_MAP.get('NON_INCISIONAL') ?? 13;
  if (s.specialtyType && ORDER_INDEX_MAP.has(s.specialtyType)) {
    return ORDER_INDEX_MAP.get(s.specialtyType) ?? FALLBACK_INDEX;
  }
  return FALLBACK_INDEX;
}

/**
 * medicalSpecialties 배열을 표시 순서대로 정렬
 * HospitalCardData.medicalSpecialties 및 add-hospital-category 추가 항목 모두 id + specialtyType 보유
 */
export function sortMedicalSpecialtiesByDisplayOrder<T>(
  arr: T[],
  getKey: (t: T) => { id: string; specialtyType?: string },
): T[] {
  return [...arr].sort(
    (a, b) =>
      getMedicalSpecialtySortIndex(getKey(a)) - getMedicalSpecialtySortIndex(getKey(b)),
  );
}
