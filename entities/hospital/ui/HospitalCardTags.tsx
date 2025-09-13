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
      {hospital.medicalSpecialties.slice(0, 1).map((specialty) => (
        <div
          key={specialty.id}
          className='flex items-center justify-center gap-2.5 rounded bg-[#fce4ff] px-1 py-0.5'
        >
          <span className='text-xs font-medium text-[#da47ef]'>
            {extractLocalizedText(specialty.name, lang)}
          </span>
        </div>
      ))}
    </div>
  );
}
