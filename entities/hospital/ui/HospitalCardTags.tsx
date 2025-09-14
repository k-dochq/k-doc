import { type Hospital } from '../api/entities/types';
import { type Locale } from 'shared/config';
import { MedicalSpecialtyTags } from 'shared/ui/medical-specialty-tags';

interface HospitalCardTagsProps {
  hospital: Hospital;
  lang: Locale;
}

export function HospitalCardTags({ hospital, lang }: HospitalCardTagsProps) {
  return <MedicalSpecialtyTags specialties={hospital.medicalSpecialties || []} lang={lang} />;
}
