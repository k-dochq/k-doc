interface HeartOutlineIconProps {
  className?: string;
  width?: number;
  height?: number;
}

export function HeartOutlineIcon({
  className = '',
  width = 20,
  height = 17,
}: HeartOutlineIconProps) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 20 17'
      fill='none'
    >
      <path
        d='M6.06465 0.916748C3.63595 0.916748 1.6665 3.02165 1.6665 5.61738C1.6665 10.8126 9.99984 15.9167 9.99984 15.9167C9.99984 15.9167 18.3332 10.8126 18.3332 5.61738C18.3332 2.40136 16.3637 0.916748 13.935 0.916748C12.2128 0.916748 10.7221 1.97479 9.99984 3.51528C9.27762 1.97479 7.78688 0.916748 6.06465 0.916748Z'
        stroke='#A3A3A3'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
