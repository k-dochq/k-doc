'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type Hospital } from 'entities/hospital';
import { HospitalListTitle } from './HospitalListTitle';

interface HospitalListProps {
  hospitals: Hospital[];
  lang: Locale;
  dict: Dictionary;
}

export function HospitalList({ hospitals, lang, dict }: HospitalListProps) {
  const handleViewAll = () => {
    // TODO: 전체보기 페이지로 이동하는 로직 구현
    console.log('View all hospitals');
  };

  return (
    <div className='w-full'>
      <div className='mb-4'>
        <HospitalListTitle lang={lang} dict={dict} onViewAll={handleViewAll} />
      </div>
    </div>
  );
}
