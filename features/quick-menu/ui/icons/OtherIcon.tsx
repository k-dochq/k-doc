interface OtherIconProps {
  variant?: 'default' | 'small';
}

export function OtherIcon({ variant = 'default' }: OtherIconProps) {
  const scale = variant === 'small' ? 0.87 : 1;
  const width = 36 * scale;
  const height = 36 * scale;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 36 36'
      fill='none'
    >
      <g clipPath='url(#clip0_213_7524)'>
        <path
          d='M29.5022 13.8674C31.8065 10.975 32.3652 7.15368 31.1651 3.81331C27.4524 2.48902 23.1412 3.30929 20.1657 6.27082C18.0663 8.36268 17.0447 11.1233 17.0877 13.8641'
          stroke='#DA47EF'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M21.3262 13.6236L26.606 8.36267'
          stroke='#DA47EF'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M31.9881 18.555H4.01177C2.71247 18.555 1.66113 17.5075 1.66113 16.2128C1.66113 14.9182 2.71247 13.8706 4.01177 13.8706H31.9847C33.284 13.8706 34.3354 14.9182 34.3354 16.2128C34.3354 17.5075 33.284 18.555 31.9847 18.555H31.9881Z'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M32.3749 19.2963V26.2241C32.3749 30.7076 28.725 34.3444 24.2254 34.3444H11.7746C7.27494 34.3444 3.625 30.7076 3.625 26.2241V19.2963'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M5.88281 7.13389L10.3097 5.74042'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M5.4101 7.28212L5.88618 7.13388L8.01862 13.8706H15.7648L12.9282 4.92014L13.4043 4.7719C14.244 4.50836 14.7135 3.61232 14.4457 2.77558C14.1779 1.93884 13.2819 1.47105 12.4422 1.73789L4.44802 4.2514C3.60827 4.51494 3.14211 5.41098 3.4066 6.24772C3.67109 7.08446 4.57035 7.55225 5.4101 7.28541V7.28212Z'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M21.2037 25.1874H19.0118V23H16.9918V25.1874H14.7998V27.1969H16.9918V29.381H19.0118V27.1969H21.2037V25.1874Z'
          fill='#404040'
        />
      </g>
      <defs>
        <clipPath id='clip0_213_7524'>
          <rect width='36' height='36' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}
