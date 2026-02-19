import { type HospitalCardData } from 'shared/model/types';
import {
  INCISIONAL_HOSPITAL_IDS,
  NON_INCISIONAL_HOSPITAL_IDS,
  INCISIONAL_CATEGORY,
  NON_INCISIONAL_CATEGORY,
} from './hospital-category-constants';
import { sortMedicalSpecialtiesByDisplayOrder } from './medical-specialty-display-order';

type AdditionalCategorySpecialtyType = 'INCISIONAL' | 'NON_INCISIONAL';

type AdditionalCategory = typeof INCISIONAL_CATEGORY | typeof NON_INCISIONAL_CATEGORY;

export type AdditionalCategoryMedicalSpecialty = {
  id: string;
  name: AdditionalCategory['name'];
  specialtyType: AdditionalCategorySpecialtyType;
};

/**
 * 병원 ID에 따라 추가 카테고리를 반환하는 함수
 */
export function getAdditionalCategoryForHospital(
  hospitalId: string,
): AdditionalCategory | null {
  const incisionalHospitalIds = INCISIONAL_HOSPITAL_IDS as readonly string[];
  const nonIncisionalHospitalIds = NON_INCISIONAL_HOSPITAL_IDS as readonly string[];

  if (incisionalHospitalIds.includes(hospitalId)) {
    return INCISIONAL_CATEGORY;
  }
  if (nonIncisionalHospitalIds.includes(hospitalId)) {
    return NON_INCISIONAL_CATEGORY;
  }
  return null;
}

/**
 * medicalSpecialties 배열에 (병원 ID 기반) 절개/비절개 카테고리를 추가하는 함수
 * - 기존에 동일 id가 있으면 중복 추가하지 않음
 */
export function addAdditionalCategoryToMedicalSpecialties<
  TMedicalSpecialty extends { id: string; name: unknown },
>(
  hospitalId: string,
  medicalSpecialties?: readonly TMedicalSpecialty[] | null,
): Array<TMedicalSpecialty | AdditionalCategoryMedicalSpecialty> {
  const additionalCategory = getAdditionalCategoryForHospital(hospitalId);
  const existingSpecialties = (medicalSpecialties ?? []) as readonly TMedicalSpecialty[];

  if (!additionalCategory) {
    return [...existingSpecialties];
  }

  const alreadyExists = existingSpecialties.some((s) => s.id === additionalCategory.id);
  if (alreadyExists) {
    return [...existingSpecialties];
  }

  const specialtyType: AdditionalCategorySpecialtyType =
    additionalCategory.id === 'incisional-category' ? 'INCISIONAL' : 'NON_INCISIONAL';

  return [
    ...existingSpecialties,
    {
      id: additionalCategory.id,
      name: additionalCategory.name,
      specialtyType,
    },
  ];
}

/**
 * HospitalCardData에 추가 카테고리를 추가하고, 부위 태그 표시 순서로 정렬하는 함수
 */
export function addCategoryToHospitalCardData(hospital: HospitalCardData): HospitalCardData {
  const combined = addAdditionalCategoryToMedicalSpecialties(
    hospital.id,
    hospital.medicalSpecialties,
  );
  const sorted = sortMedicalSpecialtiesByDisplayOrder(combined, (s) => ({
    id: s.id,
    specialtyType: 'specialtyType' in s ? (s.specialtyType as string) : undefined,
  }));
  return {
    ...hospital,
    medicalSpecialties: sorted,
  } satisfies HospitalCardData;
}
