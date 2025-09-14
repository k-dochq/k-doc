interface ArrowRightIconProps {
  className?: string;
  size?: number;
  strokeWidth?: number;
}

/**
 * 오른쪽 화살표 아이콘 컴포넌트
 */
export function ArrowRightIcon({
  className = '',
  size = 14,
  strokeWidth = 1.5,
}: ArrowRightIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 14 14'
      fill='none'
      className={className}
    >
      <path
        d='M5.25 11.0833L9.33333 6.99992L5.25 2.91659'
        stroke='currentColor'
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
