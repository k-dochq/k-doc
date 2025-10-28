'use client';

import { CustomStar } from './CustomStar';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  label: string;
  error?: string;
}

export function StarRating({ rating, onRatingChange, label, error }: StarRatingProps) {
  return (
    <div className='flex flex-col items-center gap-0.5'>
      <label className='text-lg leading-[28px] font-semibold text-[#da47ef]'>{label}</label>
      <div className='flex gap-0.5'>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type='button'
            onClick={() => onRatingChange(star)}
            className='transition-transform duration-200 active:scale-90'
          >
            <CustomStar filled={star <= rating} size={40} />
          </button>
        ))}
      </div>
      {error && <p className='text-xs text-red-500'>{error}</p>}
    </div>
  );
}
