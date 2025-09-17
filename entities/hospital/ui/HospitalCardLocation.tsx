import { type Hospital } from '../api/entities/types';
import { type Locale } from 'shared/config';
import { extractLocalizedText } from 'shared/lib';

interface HospitalCardLocationProps {
  hospital: Hospital;
  lang: Locale;
}

export function HospitalCardLocation({ hospital, lang }: HospitalCardLocationProps) {
  // district.displayName이 있으면 사용하고, 없으면 기존 address 사용
  const displayLocation = hospital.district?.displayName
    ? extractLocalizedText(hospital.district.displayName, lang)
    : extractLocalizedText(hospital.address, lang);

  return (
    <div className='flex items-center gap-1'>
      <span className='text-xs font-medium text-neutral-500'>지역</span>
      <div className='h-[10px] w-[1px] bg-neutral-300' />
      <span className='text-xs font-medium text-neutral-500'>{displayLocation}</span>
    </div>
  );
}
