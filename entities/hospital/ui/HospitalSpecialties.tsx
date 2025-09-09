import { type Locale } from 'shared/config';
import { extractLocalizedText } from 'shared/lib';
import { type Hospital } from '../api/entities/types';

interface HospitalSpecialtiesProps {
  medicalSpecialties?: Hospital['medicalSpecialties'];
  lang: Locale;
}

export function HospitalSpecialties({ medicalSpecialties, lang }: HospitalSpecialtiesProps) {
  if (!medicalSpecialties || medicalSpecialties.length === 0) {
    return null;
  }

  return (
    <div className='mb-6'>
      <h3 className='mb-2 text-lg font-semibold text-gray-900'>진료 부위</h3>
      <div className='flex flex-wrap gap-2'>
        {medicalSpecialties.map((specialty) => (
          <span
            key={specialty.id}
            className='inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800'
          >
            {extractLocalizedText(specialty.name, lang)}
          </span>
        ))}
      </div>
    </div>
  );
}
