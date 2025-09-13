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
    <div className='flex items-start justify-between'>
      <div className='flex flex-1 flex-col gap-0.5'>
        <HospitalCardLocation hospital={hospital} lang={lang} />
        <h3 className='text-lg leading-7 font-semibold text-neutral-900'>{hospitalName}</h3>
      </div>
      <div className='flex items-center gap-1'>
        <Bookmark className='h-5 w-5 text-neutral-900' />
        <span className='text-sm font-medium text-neutral-900'>{hospital.reviewCount}</span>
      </div>
    </div>
  );
}
