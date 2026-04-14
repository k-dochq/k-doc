interface ArrowRightLineIconProps {
  className?: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

/**
 * 오른쪽 화살표(샤프트 포함) 아이콘 — →
 */
export function ArrowRightLineIcon({
  className = '',
  size = 20,
  color = 'currentColor',
  strokeWidth = 1.5,
}: ArrowRightLineIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 20 20'
      fill='none'
      className={`rtl:scale-x-[-1] ${className}`}
    >
      <path
        d='M12.0833 14.1654L16.25 9.9987M16.25 9.9987L12.0833 5.83203M16.25 9.9987H3.75'
        stroke={color}
        strokeWidth={strokeWidth}
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
