import { type MedicalSpecialtyWithTranslations } from '../use-cases/get-medical-specialties';

export interface GetMedicalSpecialtiesResponse {
  success: boolean;
  data: MedicalSpecialtyWithTranslations[];
}

export async function fetchMedicalSpecialties(): Promise<MedicalSpecialtyWithTranslations[]> {
  const response = await fetch('/api/medical-specialties');

  if (!response.ok) {
    throw new Error('Failed to fetch medical specialties');
  }

  const result: GetMedicalSpecialtiesResponse = await response.json();

  if (!result.success) {
    throw new Error('Failed to fetch medical specialties');
  }

  return result.data;
}
