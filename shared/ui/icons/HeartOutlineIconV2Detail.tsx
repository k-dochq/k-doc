interface HeartOutlineIconV2DetailProps {
  className?: string;
  width?: number;
  height?: number;
}

export function HeartOutlineIconV2Detail({
  className = '',
  width = 24,
  height = 24,
}: HeartOutlineIconV2DetailProps) {
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
        d='M7.27778 3.5C4.36333 3.5 2 6.02588 2 9.14076C2 15.375 12 21.5 12 21.5C12 21.5 22 15.375 22 9.14076C22 5.28153 19.6367 3.5 16.7222 3.5C14.6556 3.5 12.8667 4.76965 12 6.61824C11.1333 4.76965 9.34445 3.5 7.27778 3.5Z'
        stroke='#404040'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
