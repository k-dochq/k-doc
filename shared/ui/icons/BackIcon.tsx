interface BackIconProps {
  className?: string;
}

export function BackIcon({ className = '' }: BackIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      className={className}
    >
      <path
        d='M12 12L18 6M12 12L6 18M12 12L6 6M12 12L18 18'
        stroke='#737373'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
