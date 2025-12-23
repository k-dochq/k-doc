interface MoreVerticalIconProps {
  className?: string;
  width?: number;
  height?: number;
}

export function MoreVerticalIcon({
  className = '',
  width = 24,
  height = 24,
}: MoreVerticalIconProps) {
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
        d='M12 11.9925L12 12.0075M12 6L12 6.01498M12 17.985L12 18'
        stroke='#404040'
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
