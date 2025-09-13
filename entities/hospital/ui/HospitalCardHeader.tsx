import { type Hospital } from '../api/entities/types';
import { type Locale } from 'shared/config';
import { LikeButton } from 'shared/ui/buttons/LikeButton';
import { HospitalCardLocation } from './HospitalCardLocation';

interface HospitalCardHeaderProps {
  hospital: Hospital;
  lang: Locale;
}

export function HospitalCardHeader({ hospital, lang }: HospitalCardHeaderProps) {
  return (
    <div className='flex w-full flex-col items-start justify-between'>
      <div className='flex w-full items-center'>
        <HospitalCardLocation hospital={hospital} lang={lang} />
        <div className='ml-auto'>
          <LikeButton count={15} />
        </div>
      </div>
    </div>
  );
}
