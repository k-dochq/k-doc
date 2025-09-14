interface EyeIconProps {
  className?: string;
  width?: number;
  height?: number;
}

export function EyeIcon({ className = '', width = 16, height = 16 }: EyeIconProps) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 16 16'
      fill='none'
    >
      <path
        d='M8 3C4.5 3 1.73 5.11 1 8c.73 2.89 3.5 5 7 5s6.27-2.11 7-5c-.73-2.89-3.5-5-7-5z'
        stroke='#A3A3A3'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M8 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z'
        stroke='#A3A3A3'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
