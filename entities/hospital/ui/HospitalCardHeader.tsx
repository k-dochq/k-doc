import { Bookmark } from 'lucide-react';
import { type Hospital } from '../api/entities/types';
import { type Locale } from 'shared/config';
import { extractLocalizedText } from 'shared/lib';
import { HospitalCardLocation } from './HospitalCardLocation';

interface HospitalCardHeaderProps {
  hospital: Hospital;
  lang: Locale;
}

export function HospitalCardHeader({ hospital, lang }: HospitalCardHeaderProps) {
  const hospitalName = extractLocalizedText(hospital.name, lang);

  return (
    <div className='flex w-full flex-col items-start justify-between'>
      <HospitalCardLocation hospital={hospital} lang={lang} />
      <h3 className='text-lg leading-7 font-semibold text-neutral-900'>{hospitalName}</h3>
    </div>
  );
}
