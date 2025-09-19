'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type Hospital } from 'entities/hospital/api/entities/types';
import { HotLabel } from '@/shared/ui/hot-label';
import { HospitalDetailName } from 'entities/hospital/ui/HospitalDetailName';
import { HospitalDetailLocation } from 'entities/hospital/ui/HospitalDetailLocation';
import { HospitalDetailRating } from 'entities/hospital/ui/HospitalDetailRating';
import { HospitalDetailPrice } from 'entities/hospital/ui/HospitalDetailPrice';
import { HospitalCardTags } from '@/entities/hospital';

interface HospitalDetailInfoProps {
  hospital: Hospital;
  lang: Locale;
  dict: Dictionary;
}

export function HospitalDetailInfo({ hospital, lang, dict }: HospitalDetailInfoProps) {
  return (
    <div className=''>
      <HotLabel />
      <div className='mt-0.5'>
        <HospitalDetailName hospital={hospital} lang={lang} />
      </div>
      <div className='mt-0.5'>
        <HospitalDetailLocation hospital={hospital} lang={lang} dict={dict} />
      </div>

      {/* 평점과 가격 정보 */}
      <div className='mt-2 flex items-center gap-2'>
        <HospitalDetailRating hospital={hospital} />
        <HospitalDetailPrice hospital={hospital} />
      </div>
      <div className='mt-2'>
        <HospitalCardTags hospital={hospital} lang={lang} />
      </div>
    </div>
  );
}
