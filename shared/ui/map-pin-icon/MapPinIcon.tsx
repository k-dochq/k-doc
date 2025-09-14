interface MapPinIconProps {
  className?: string;
  size?: number;
}

/**
 * 지도 핀 아이콘 컴포넌트
 */
export function MapPinIcon({ className = '', size = 20 }: MapPinIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M10 2C7.24 2 5 4.24 5 7c0 4.5 5 9 5 9s5-4.5 5-9c0-2.76-2.24-5-5-5zm0 6.5c-.83 0-1.5-.67-1.5-1.5S9.17 6.5 10 6.5s1.5.67 1.5 1.5S10.83 8.5 10 8.5z'
        fill='white'
      />
    </svg>
  );
}
