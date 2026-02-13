import { type Hospital } from '../api/entities/types';
import { type Locale } from 'shared/config';
import { extractLocalizedText } from 'shared/lib';
import { type Dictionary } from 'shared/model/types';

interface HospitalCardLocationProps {
  hospital: Hospital;
  lang: Locale;
  dict: Dictionary;
}

export function HospitalCardLocation({ hospital, lang, dict }: HospitalCardLocationProps) {
  // hospital.displayLocationName이 있으면 사용하고, 없으면 기존 address 사용 (현재 언어로 표시)
  const displayLocation = hospital.displayLocationName
    ? extractLocalizedText(hospital.displayLocationName, lang)
    : extractLocalizedText(hospital.address, lang);

  return (
    <div className='flex items-center gap-1'>
      <span className='text-xs font-medium text-neutral-500'>{dict.hospital.region}</span>
      <div className='h-[10px] w-[1px] bg-neutral-300' />
      <span className='text-xs font-medium text-neutral-500'>{displayLocation}</span>
    </div>
  );
}
