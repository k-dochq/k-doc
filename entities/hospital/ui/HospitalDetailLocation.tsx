import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type Hospital } from '../api/entities/types';
import { extractLocalizedText } from 'shared/lib/localized-text';

interface HospitalDetailLocationProps {
  hospital: Hospital;
  lang: Locale;
  dict: Dictionary;
}

export function HospitalDetailLocation({ hospital, lang, dict }: HospitalDetailLocationProps) {
  // hospital.displayLocationName이 있으면 사용하고, 없으면 기존 address 사용
  const displayLocation = hospital.displayLocationName
    ? extractLocalizedText(hospital.displayLocationName, lang)
    : extractLocalizedText(hospital.address, lang);

  return (
    <div className='flex items-center gap-1'>
      <span className='text-xs font-medium'>{dict.hospital.region}</span>
      <div className='h-[10px] w-[1px] bg-white' />
      <span className='text-xs font-medium'>{displayLocation}</span>
    </div>
  );
}
