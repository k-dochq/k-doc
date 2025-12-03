import { StarIconFigma } from 'shared/ui/star-icon-figma';

interface HospitalCardV2RatingProps {
  rating: number;
  reviewCount: number;
}

export function HospitalCardV2Rating({ rating, reviewCount }: HospitalCardV2RatingProps) {
  return (
    <div className='flex shrink-0 items-center gap-1'>
      <div className='flex size-4 shrink-0 items-center justify-center'>
        <StarIconFigma size={16} color='#FFC31D' />
      </div>
      <div className='flex shrink-0 items-center gap-0.5 text-[13px] leading-[19px] font-medium'>
        <p className='relative shrink-0 text-neutral-700'>{rating.toFixed(1)}</p>
        <p className='relative shrink-0 text-neutral-400'>({reviewCount})</p>
      </div>
    </div>
  );
}
