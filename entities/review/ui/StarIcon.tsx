'use client';

interface StarIconProps {
  className?: string;
}

export function StarIcon({ className = '' }: StarIconProps) {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M7.9997 2L9.62363 5.98034L13.9149 6.29822L10.6256 9.07617L11.6553 13.25L7.9997 10.9834L4.34415 13.25L5.37378 9.07617L2.08447 6.29822L6.37578 5.98034L7.9997 2Z'
        fill='#DA47EF'
      />
      <path
        d='M7.9997 2L6.37578 5.98034L2.08447 6.29822L5.37378 9.07617L4.34415 13.25L7.9997 10.9834M7.9997 2L9.62363 5.98034L13.9149 6.29822L10.6256 9.07617L11.6553 13.25L7.9997 10.9834'
        stroke='#DA47EF'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
