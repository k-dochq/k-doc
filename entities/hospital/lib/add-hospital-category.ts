import { type HospitalCardData } from 'shared/model/types';
import {
  INCISIONAL_HOSPITAL_IDS,
  NON_INCISIONAL_HOSPITAL_IDS,
  INCISIONAL_CATEGORY,
  NON_INCISIONAL_CATEGORY,
} from './hospital-category-constants';

/**
 * 병원 ID에 따라 추가 카테고리를 반환하는 함수
 */
export function getAdditionalCategoryForHospital(
  hospitalId: string,
): typeof INCISIONAL_CATEGORY | typeof NON_INCISIONAL_CATEGORY | null {
  if (INCISIONAL_HOSPITAL_IDS.includes(hospitalId as any)) {
    return INCISIONAL_CATEGORY;
  }
  if (NON_INCISIONAL_HOSPITAL_IDS.includes(hospitalId as any)) {
    return NON_INCISIONAL_CATEGORY;
  }
  return null;
}

/**
 * HospitalCardData에 추가 카테고리를 추가하는 함수
 */
export function addCategoryToHospitalCardData(hospital: HospitalCardData): HospitalCardData {
  const additionalCategory = getAdditionalCategoryForHospital(hospital.id);

  if (!additionalCategory) {
    return hospital;
  }

  // 기존 medicalSpecialties에 추가 카테고리 추가
  const existingSpecialties = hospital.medicalSpecialties || [];
  const updatedSpecialties = [
    ...existingSpecialties,
    {
      id: additionalCategory.id,
      name: additionalCategory.name,
      specialtyType:
        additionalCategory.id === 'incisional-category' ? 'INCISIONAL' : 'NON_INCISIONAL',
    },
  ];

  return {
    ...hospital,
    medicalSpecialties: updatedSpecialties,
  };
}
