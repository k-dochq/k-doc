interface CloseIconProps {
  className?: string;
  width?: number;
  height?: number;
}

export function CloseIcon({ className, width = 24, height = 24 }: CloseIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      className={className}
    >
      <path
        d='M12 12L6 6M12 12L18 18M12 12L18 6M12 12L6 18'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
