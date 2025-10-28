'use client';

import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  label: string;
  error?: string;
}

export function StarRating({ rating, onRatingChange, label, error }: StarRatingProps) {
  return (
    <div className='space-y-2'>
      <label className='text-sm font-medium text-gray-900'>{label}</label>
      <div className='flex gap-3'>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type='button'
            onClick={() => onRatingChange(star)}
            className='transition-transform duration-200 active:scale-90'
          >
            <Star
              size={48}
              fill={star <= rating ? '#DA47EF' : 'none'}
              stroke={star <= rating ? '#DA47EF' : '#E5E7EB'}
              strokeWidth={1.5}
            />
          </button>
        ))}
      </div>
      {error && <p className='text-xs text-red-500'>{error}</p>}
    </div>
  );
}
