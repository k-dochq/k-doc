'use client';

import { FieldLabel } from 'features/consultation-request/ui/FieldLabel';
import { FieldError } from 'features/consultation-request/ui/FieldError';
import { CustomStar } from 'features/review-write/ui/CustomStar';

interface ReviewEditRatingSectionProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  error?: string;
  ratingQuestion?: string;
}

export function ReviewEditRatingSection({
  rating,
  onRatingChange,
  error,
  ratingQuestion = 'How was your experience?',
}: ReviewEditRatingSectionProps) {
  return (
    <div className='flex w-full flex-col gap-2'>
      <div className='flex flex-col items-center gap-0.5'>
        <FieldLabel label={ratingQuestion} />
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
      </div>
      <FieldError message={error} />
    </div>
  );
}
