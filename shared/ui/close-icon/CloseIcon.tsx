interface CloseIconProps {
  className?: string;
}

export function CloseIcon({ className }: CloseIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      className={className}
    >
      <path
        d='M16 16L8 8M16 16L24 24M16 16L24 8M16 16L8 24'
        stroke='#A3A3A3'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
