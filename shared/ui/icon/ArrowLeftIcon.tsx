interface ArrowLeftIconProps {
  className?: string;
  width?: number;
  height?: number;
}

export function ArrowLeftIcon({ className = '', width = 24, height = 24 }: ArrowLeftIconProps) {
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
        d='M15 5L8 12L15 19'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
