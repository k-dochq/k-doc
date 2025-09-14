'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type Hospital } from 'entities/hospital/api/use-cases/get-hospital-detail';
import { HotLabel } from '@/shared/ui/hot-label';
import { extractLocalizedText } from 'shared/lib/localized-text';

interface HospitalDetailInfoProps {
  hospital: Hospital;
  lang: Locale;
  dict: Dictionary;
}

export function HospitalDetailInfo({ hospital, lang, dict }: HospitalDetailInfoProps) {
  const hospitalAddress = extractLocalizedText(hospital.address, lang);

  return (
    <div className='p-5'>
      <HotLabel />
      <h1 className='mt-0.5 text-xl font-bold'>{extractLocalizedText(hospital.name, lang)}</h1>
      <div className='mt-0.5 flex items-center gap-1'>
        <span className='text-xs font-medium'>지역</span>
        <div className='h-[10px] w-[1px] bg-white' />
        <span className='text-xs font-medium'>{hospitalAddress}</span>
      </div>
    </div>
  );
}
