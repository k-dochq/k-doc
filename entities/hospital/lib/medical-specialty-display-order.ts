import { type MedicalSpecialtyType } from '@prisma/client';

/**
 * 부위 카테고리 태그 표시 순서 (눈 → 코 → 리프팅 → … → 기타)
 * 하위 카테고리(절개/비절개 등)는 parentSpecialtyId가 있는 항목으로 DB에서 조회
 */
export const MEDICAL_SPECIALTY_DISPLAY_ORDER: readonly MedicalSpecialtyType[] = [
  'EYES', // 1. 눈
  'NOSE', // 2. 코
  'LIFTING', // 3. 리프팅
  'FACIAL_CONTOURING', // 4. 안면윤곽
  'BREAST', // 5. 가슴
  'STEM_CELL', // 6. 줄기세포
  'LIPOSUCTION', // 7. 지방흡입
  'BODY', // 8. 바디
  'HAIR_TRANSPLANT', // 9. 모발이식
  'DERMATOLOGY', // 10. 피부과
  'DENTAL', // 11. 치과
  'ETC', // 12. 기타 (그 외 LIPS, CHIN, CHEEKS, FOREHEAD 등)
] as const;

const ORDER_INDEX_MAP = new Map<string, number>(
  MEDICAL_SPECIALTY_DISPLAY_ORDER.map((key, index) => [key, index]),
);

/** 정렬 시 순서에 없으면 맨 뒤로 보낼 때 사용하는 인덱스 */
const FALLBACK_INDEX = MEDICAL_SPECIALTY_DISPLAY_ORDER.length;

/** LocalizedText에서 ko_KR 추출 */
function getKoKrName(name: unknown): string | undefined {
  if (name && typeof name === 'object' && 'ko_KR' in name) {
    const ko = (name as { ko_KR?: string }).ko_KR;
    return typeof ko === 'string' ? ko : undefined;
  }
  return undefined;
}

/**
 * 항목의 표시 순서 인덱스를 반환 (작을수록 먼저 표시)
 * - 상위 카테고리: specialtyType으로 ORDER 배열에서 조회
 * - 하위 카테고리 (parentSpecialtyId 존재): 부모 specialtyType 인덱스 + name.ko_KR 기반 오프셋
 *   - '절개' → 부모 인덱스 + 0.1
 *   - '비절개' → 부모 인덱스 + 0.2
 *   - 그 외 → order 필드 또는 부모 인덱스 + 0.5
 */
export function getMedicalSpecialtySortIndex(s: {
  id: string;
  specialtyType?: string;
  parentSpecialtyId?: string | null;
  name?: unknown;
  order?: number | null;
}): number {
  const isSubCategory = !!s.parentSpecialtyId;

  if (isSubCategory && s.specialtyType) {
    const parentIndex = ORDER_INDEX_MAP.get(s.specialtyType) ?? FALLBACK_INDEX;
    const koKrName = getKoKrName(s.name);

    if (koKrName === '절개') return parentIndex + 0.1;
    if (koKrName === '비절개') return parentIndex + 0.2;
    if (s.order != null) return parentIndex + 0.01 * Math.min(s.order, 99);

    return parentIndex + 0.5;
  }

  if (s.specialtyType && ORDER_INDEX_MAP.has(s.specialtyType)) {
    return ORDER_INDEX_MAP.get(s.specialtyType) ?? FALLBACK_INDEX;
  }

  return FALLBACK_INDEX;
}

export type MedicalSpecialtySortKey = {
  id: string;
  specialtyType?: string;
  parentSpecialtyId?: string | null;
  name?: unknown;
  order?: number | null;
};

/**
 * medicalSpecialties 배열을 표시 순서대로 정렬
 * 상위 카테고리 → 하위 카테고리 순서 (예: Lifting → Non-Incisional)
 * DB 상위/하위 카테고리 모두 지원
 */
export function sortMedicalSpecialtiesByDisplayOrder<T>(
  arr: T[],
  getKey: (t: T) => MedicalSpecialtySortKey,
): T[] {
  const keyMap = new Map<T, MedicalSpecialtySortKey>();
  for (const t of arr) {
    keyMap.set(t, getKey(t));
  }

  const idToIndex = new Map<string, number>();

  const getIndexFor = (key: MedicalSpecialtySortKey): number => {
    if (idToIndex.has(key.id)) return idToIndex.get(key.id)!;

    const isSubCategory = !!key.parentSpecialtyId;
    let index: number;

    if (isSubCategory && key.parentSpecialtyId) {
      const parentKey = [...keyMap.values()].find((k) => k.id === key.parentSpecialtyId);
      const parentIndex =
        parentKey !== undefined
          ? getIndexFor(parentKey)
          : ORDER_INDEX_MAP.get(key.specialtyType ?? '') ?? FALLBACK_INDEX;
      const koKrName = getKoKrName(key.name);
      if (koKrName === '절개') index = parentIndex + 0.1;
      else if (koKrName === '비절개') index = parentIndex + 0.2;
      else if (key.order != null) index = parentIndex + 0.01 * Math.min(key.order, 99);
      else index = parentIndex + 0.5;
    } else {
      index =
        key.specialtyType && ORDER_INDEX_MAP.has(key.specialtyType)
          ? ORDER_INDEX_MAP.get(key.specialtyType) ?? FALLBACK_INDEX
          : FALLBACK_INDEX;
    }

    idToIndex.set(key.id, index);
    return index;
  };

  for (const t of arr) {
    getIndexFor(keyMap.get(t)!);
  }

  return [...arr].sort(
    (a, b) => (idToIndex.get(keyMap.get(a)!.id) ?? FALLBACK_INDEX) - (idToIndex.get(keyMap.get(b)!.id) ?? FALLBACK_INDEX),
  );
}
