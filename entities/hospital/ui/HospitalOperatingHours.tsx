import { Clock } from 'lucide-react';
import { type Locale } from 'shared/config';
import { type OpeningHours } from '../api/entities/opening-hours-types';
import { formatOperatingHours } from 'shared/lib';

interface HospitalOperatingHoursProps {
  openingHours?: OpeningHours;
  lang: Locale;
}

export function HospitalOperatingHours({ openingHours, lang }: HospitalOperatingHoursProps) {
  return (
    <div className='mb-6'>
      <h3 className='mb-2 flex items-center gap-2 text-lg font-semibold text-gray-900'>
        <Clock className='h-5 w-5' />
        운영시간
      </h3>
      <div className='rounded-lg bg-gray-50 p-4'>
        <pre className='font-mono text-sm whitespace-pre-line text-gray-700'>
          {formatOperatingHours(openingHours, lang)}
        </pre>
      </div>
    </div>
  );
}
