import { type Hospital } from '../api/entities/types';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { type Locale } from 'shared/config';

interface HospitalCardNameProps {
  hospital: Hospital;
  lang: Locale;
}

export function HospitalCardName({ hospital, lang }: HospitalCardNameProps) {
  return (
    <div className=''>
      <h3 className='text-sm font-medium text-neutral-900'>
        {extractLocalizedText(hospital.name, lang)}
      </h3>
    </div>
  );
}
