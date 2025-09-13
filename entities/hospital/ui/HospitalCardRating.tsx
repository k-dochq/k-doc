import { type Hospital } from '../api/entities/types';
import { StarIcon } from '@/entities/review/ui/StarIcon';

interface HospitalCardRatingProps {
  hospital: Hospital;
}

export function HospitalCardRating({ hospital }: HospitalCardRatingProps) {
  return (
    <div className='flex items-center gap-0.5'>
      <StarIcon />
      <span className='text-xs font-medium text-neutral-900'>{hospital.rating.toFixed(1)}</span>
      <span className='text-xs font-medium text-neutral-400'>({hospital.reviewCount})</span>
    </div>
  );
}
