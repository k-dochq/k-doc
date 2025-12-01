/**
 * Figma MCP에서 가져온 눈 아이콘 SVG 컴포넌트
 * 업데이트된 SVG 버전
 */
interface EyeIconFigmaProps {
  className?: string;
  size?: number;
  iconColor?: string;
  arrowColor?: string;
}

export function EyeIconFigma({
  className = '',
  size = 40,
  iconColor = '#404040',
  arrowColor = '#DA47EF',
}: EyeIconFigmaProps) {
  // 비율에 맞게 height 계산 (40:26)
  const height = (size * 26) / 40;

  return (
    <svg
      className={className}
      width={size}
      height={height}
      viewBox='0 0 40 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_47_1427)'>
        <path
          d='M17.0223 6.00366C10.1203 6.00366 4.08052 9.78154 0.77002 15.4267C4.08052 21.0718 10.1203 24.8497 17.0223 24.8497C23.9243 24.8497 29.964 21.0718 33.2745 15.4267C29.964 9.78154 23.9243 6.00366 17.0223 6.00366Z'
          stroke={iconColor}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M17.0225 24.1564C21.7337 24.1564 25.5528 20.248 25.5528 15.4267C25.5528 10.6054 21.7337 6.69702 17.0225 6.69702C12.3113 6.69702 8.49219 10.6054 8.49219 15.4267C8.49219 20.248 12.3113 24.1564 17.0225 24.1564Z'
          stroke={iconColor}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M17.0222 10.1636C16.3678 10.1636 15.7442 10.2936 15.1668 10.5221C15.7481 10.9081 16.133 11.5818 16.133 12.3421C16.133 13.5436 15.1822 14.5166 14.0081 14.5166C13.2613 14.5166 12.6069 14.1227 12.2297 13.5278C12.0064 14.1187 11.8794 14.7569 11.8794 15.4266C11.8794 18.3339 14.1813 20.6896 17.0222 20.6896C19.8631 20.6896 22.165 18.3339 22.165 15.4266C22.165 12.5193 19.8631 10.1636 17.0222 10.1636Z'
          fill={iconColor}
        />
        <path
          d='M1.15479 7.12964C1.15479 7.12964 17.9613 -8.97062 37.2084 10.1354'
          stroke={arrowColor}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M32.6872 10.6358L37.8027 10.3149L37.4892 5.07977'
          stroke={arrowColor}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_47_1427'>
          <rect width='40' height='26' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}
