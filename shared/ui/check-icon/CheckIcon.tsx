interface CheckIconProps {
  className?: string;
  size?: number;
  status?: 'confirmed' | 'completed';
}

/**
 * 체크 아이콘 컴포넌트
 * 예약 완료: #15E3CE
 * 시술 완료: #737373
 */
export function CheckIcon({ className = '', size = 24, status = 'confirmed' }: CheckIconProps) {
  const fillColor = status === 'confirmed' ? '#15E3CE' : '#737373';

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
        d='M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z'
        fill={fillColor}
      />
      <path
        d='M17 8.5L10.125 15.5L7 12.3182'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
