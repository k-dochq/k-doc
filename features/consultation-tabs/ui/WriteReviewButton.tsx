'use client';

import { type Dictionary } from 'shared/model/types';

interface WriteReviewButtonProps {
  onClick: () => void;
  dict: Dictionary;
}

export function WriteReviewButton({ onClick, dict }: WriteReviewButtonProps) {
  return (
    <button
      onClick={onClick}
      className='bg-sub-900 flex h-9 min-w-0 items-center justify-center gap-1 overflow-hidden rounded-lg px-4 py-2'
    >
      {/* 펜 아이콘 */}
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        className='shrink-0'
      >
        <path
          d='M13.5045 4.88749C13.6615 4.73046 13.7861 4.54402 13.8712 4.33882C13.9562 4.13363 14 3.91369 14 3.69158C14 3.46947 13.9563 3.24952 13.8713 3.0443C13.7864 2.83909 13.6618 2.65262 13.5048 2.49554C13.3477 2.33846 13.1613 2.21385 12.9561 2.12883C12.7509 2.0438 12.531 2.00003 12.3089 2C12.0868 1.99997 11.8668 2.04369 11.6616 2.12867C11.4564 2.21364 11.2699 2.3382 11.1128 2.49524L3.10517 10.5048C2.96586 10.6437 2.86284 10.8147 2.80517 11.0028L2.01256 13.6141C1.99705 13.666 1.99588 13.7211 2.00917 13.7736C2.02246 13.8261 2.04971 13.874 2.08804 13.9123C2.12637 13.9506 2.17433 13.9777 2.22686 13.9909C2.27938 14.0042 2.3345 14.0029 2.38636 13.9873L4.99819 13.1953C5.18609 13.1381 5.3571 13.0357 5.49619 12.8971L13.5045 4.88749Z'
          fill='white'
        />
        <path d='M8.60156 13.4005H13.4016H8.60156Z' fill='white' />
        <path
          d='M8.60156 13.4005H13.4016'
          stroke='white'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
      <p className='line-clamp-2 min-w-0 text-sm leading-5 font-semibold text-white'>
        {dict.consultation?.appointment?.writeReview || '시술후기 작성하기'}
      </p>
    </button>
  );
}
