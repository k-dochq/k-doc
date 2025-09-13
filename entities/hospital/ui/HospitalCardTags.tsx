import { type Hospital } from '../api/entities/types';
import { type Locale } from 'shared/config';
import { extractLocalizedText } from 'shared/lib';

interface HospitalCardTagsProps {
  hospital: Hospital;
  lang: Locale;
}

export function HospitalCardTags({ hospital, lang }: HospitalCardTagsProps) {
  if (!hospital.medicalSpecialties || hospital.medicalSpecialties.length === 0) {
    return null;
  }

  return (
    <div className='flex gap-1'>
      {hospital.medicalSpecialties.map((specialty) => (
        <div
          key={specialty.id}
          className='bg-primary-light flex items-center justify-center gap-2.5 rounded px-1 py-0.5'
        >
          <span className='text-primary text-xs font-medium'>
            {extractLocalizedText(specialty.name, lang)}
          </span>
        </div>
      ))}
    </div>
  );
}
