interface CheckIconProps {
  className?: string;
}

export function CheckIcon({ className }: CheckIconProps) {
  return (
    <svg
      width='17'
      height='12'
      viewBox='0 0 17 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M1 6L6 11L16 1'
        stroke='#F15BFF'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
