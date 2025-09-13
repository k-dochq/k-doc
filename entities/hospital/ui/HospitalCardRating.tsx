import { Star } from 'lucide-react';
import { type Hospital } from '../api/entities/types';

interface HospitalCardRatingProps {
  hospital: Hospital;
}

export function HospitalCardRating({ hospital }: HospitalCardRatingProps) {
  return (
    <div className='flex items-center gap-0.5'>
      <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
      <span className='text-xs font-medium text-neutral-900'>{hospital.rating.toFixed(1)}</span>
      <span className='text-xs font-medium text-neutral-400'>({hospital.reviewCount})</span>
    </div>
  );
}
