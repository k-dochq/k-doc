import { type Hospital } from '../api/entities/types';
import { WhiteStarIcon } from 'shared/ui/star-icon/WhiteStarIcon';

interface HospitalDetailRatingProps {
  hospital: Hospital;
}

export function HospitalDetailRating({ hospital }: HospitalDetailRatingProps) {
  return (
    <div className='flex items-center gap-1'>
      <WhiteStarIcon />
      <span className='text-lg font-bold text-white'>{hospital.rating.toFixed(1)}</span>
      <span className='text-xs font-normal text-white/80'>({hospital.reviewCount})</span>
    </div>
  );
}
