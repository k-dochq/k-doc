interface BodyLineIconProps {
  variant?: 'default' | 'small';
}

export function BodyLineIcon({ variant = 'default' }: BodyLineIconProps) {
  const scale = variant === 'small' ? 0.87 : 1;
  const width = 46 * scale;
  const height = 32 * scale;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 46 32'
      fill='none'
    >
      <g clipPath='url(#clip0_bodyline_v1)'>
        <path
          d='M12.7543 1.64453C12.7543 1.64453 14.25 8.5 10.7831 12.2143C8.59218 16.2694 7.28049 22.0322 8.59578 30.3566'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M33.2493 1.64453C33.2493 1.64453 31.7517 8.5 35.2204 12.2143C37.4077 16.2694 38.723 22.0322 37.4077 30.3566'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M11.0859 12.4258C17.6696 14.8574 28.3433 14.8574 34.9269 12.4258'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M9.79688 15.6992C9.79688 15.6992 19.5192 18.4014 22.8993 25.0919'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M36.2118 15.6992C36.2118 15.6992 26.4895 18.4014 23.1094 25.0919'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M23 25.5176V30.3562'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M23 6.02344V7.87526'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M1.3125 5.30469H8.6026M6.16406 7.67977L8.60482 5.30387L6.16406 2.92383'
          stroke='url(#paint0_linear_bodyline_v1)'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M44.6807 5.30469H37.3906M39.8314 2.92383L37.3906 5.30469L39.8314 7.67977'
          stroke='url(#paint1_linear_bodyline_v1)'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M7 31C7 31 5.25584 27.6535 5.5 21.5C5.75156 15.1344 11.5 10 11.5 10'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeDasharray='1 3'
        />
        <path
          d='M39 31C39 31 40.7442 27.6535 40.5 21.5C40.2484 15.1344 34.5 10 34.5 10'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeDasharray='1 3'
        />
      </g>
      <defs>
        <linearGradient
          id='paint0_linear_bodyline_v1'
          x1='1.3125'
          y1='5.3018'
          x2='8.60482'
          y2='5.3018'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3E57E2' />
          <stop offset='0.4' stopColor='#B133FF' />
          <stop offset='1' stopColor='#FF5DCA' />
        </linearGradient>
        <linearGradient
          id='paint1_linear_bodyline_v1'
          x1='37.3906'
          y1='5.3018'
          x2='44.6807'
          y2='5.3018'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#FF5DCA' />
          <stop offset='0.596154' stopColor='#B133FF' />
          <stop offset='1' stopColor='#3E57E2' />
        </linearGradient>
        <clipPath id='clip0_bodyline_v1'>
          <rect width='46' height='32' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}
