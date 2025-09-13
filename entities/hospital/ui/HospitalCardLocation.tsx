import { type Hospital } from '../api/entities/types';
import { type Locale } from 'shared/config';
import { extractLocalizedText } from 'shared/lib';
import { LikeButton } from 'shared/ui/buttons/LikeButton';

interface HospitalCardLocationProps {
  hospital: Hospital;
  lang: Locale;
}

export function HospitalCardLocation({ hospital, lang }: HospitalCardLocationProps) {
  const hospitalAddress = extractLocalizedText(hospital.address, lang);

  return (
    <div className='flex w-full items-center'>
      <div className='flex items-center gap-1'>
        <span className='text-xs font-medium text-neutral-500'>지역</span>
        <div className='h-[10px] w-[1px] bg-neutral-300' />
        <span className='text-xs font-medium text-neutral-500'>{hospitalAddress}</span>
      </div>
      <div className='ml-auto'>
        <LikeButton count={15} />
      </div>
    </div>
  );
}
