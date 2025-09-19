import React from 'react';

interface MoreIconProps {
  size?: number;
  className?: string;
}

export function MoreIcon({ size = 24, className = '' }: MoreIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      className={className}
    >
      <path
        d='M11.9925 12H12.0075M6 12H6.01498M17.985 12H18'
        stroke='#DA47EF'
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
