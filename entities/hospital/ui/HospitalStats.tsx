import { type Hospital } from '../api/entities/types';

interface HospitalStatsProps {
  hospital: Hospital;
}

export function HospitalStats({ hospital }: HospitalStatsProps) {
  return (
    <div className='grid grid-cols-3 gap-4 border-t border-gray-200 pt-4'>
      <div className='text-center'>
        <p className='text-2xl font-bold text-blue-600'>{hospital.viewCount}</p>
        <p className='text-sm text-gray-600'>조회수</p>
      </div>
      <div className='text-center'>
        <p className='text-2xl font-bold text-green-600'>{hospital.reviewCount}</p>
        <p className='text-sm text-gray-600'>리뷰</p>
      </div>
      <div className='text-center'>
        <p className='text-2xl font-bold text-purple-600'>{hospital.bookmarkCount}</p>
        <p className='text-sm text-gray-600'>북마크</p>
      </div>
    </div>
  );
}
