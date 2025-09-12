import { type BestHospital } from 'shared/model/types/common';
import { HospitalCard } from './HospitalCard';

interface HospitalListProps {
  hospitals: BestHospital[];
}

export function HospitalList({ hospitals }: HospitalListProps) {
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
        <HospitalCard key={hospital.id} hospital={hospital} />
      ))}
    </div>
  );
}
