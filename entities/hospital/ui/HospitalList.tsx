import { type BestHospital } from 'shared/model/types/common';
import { type Dictionary } from 'shared/model/types';
import { type Locale } from 'shared/config';
import { HospitalCard } from './HospitalCard';

interface HospitalListProps {
  hospitals: BestHospital[];
  dict: Dictionary;
  lang: Locale;
}

export function HospitalList({ hospitals, dict, lang }: HospitalListProps) {
  if (hospitals.length === 0) {
    return (
      <div className='py-8 text-center text-gray-500'>
        선택한 카테고리에 해당하는 병원이 없습니다.
      </div>
    );
  }

  return (
    <div className='space-y-3'>
      {hospitals.map((hospital) => (
        <HospitalCard key={hospital.id} hospital={hospital} dict={dict} lang={lang} />
      ))}
    </div>
  );
}
