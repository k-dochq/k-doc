interface ArrowIconProps {
  className?: string;
}

export function LeftArrowIcon({ className = '' }: ArrowIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      className={className}
    >
      <path
        d='M12.5 15.834L6.66667 10.0007L12.5 4.16732'
        stroke='#DA47EF'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export function RightArrowIcon({ className = '' }: ArrowIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      className={className}
    >
      <path
        d='M7.5 15.834L13.3333 10.0007L7.5 4.16732'
        stroke='#DA47EF'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
