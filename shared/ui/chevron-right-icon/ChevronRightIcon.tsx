interface ChevronRightIconProps {
  className?: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

/**
 * 오른쪽 chevron 아이콘 컴포넌트
 */
export function ChevronRightIcon({
  className = '',
  size = 24,
  color = '#A3A3A3',
  strokeWidth = 1.5,
}: ChevronRightIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      className={className}
    >
      <path
        d='M9 5L16 12L9 19'
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
