interface LiftingIconProps {
  variant?: 'default' | 'small';
}

export function LiftingIcon({ variant = 'default' }: LiftingIconProps) {
  const scale = variant === 'small' ? 0.87 : 1;
  const width = 37 * scale;
  const height = 44 * scale;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 37 44'
      fill='none'
    >
      <path
        d='M16.3111 41.8656V36.3871C16.3111 36.3871 10.8065 35.9746 6.40043 34.1964C1.99435 32.4143 3.78495 25.8385 3.78495 25.8385L4.88748 21.0448L2.96007 18.714C1.99837 17.2082 3.51133 16.1109 3.51133 16.1109L8.46868 14.7412C13.2852 13.6439 9.84482 8.98636 15.0758 4.19264C15.0758 4.19264 17.5545 2.27435 20.858 2.13818'
        stroke='#404040'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M3.91797 25.5702C3.91797 25.5702 7.09679 26.2511 9.36622 25.4541'
        stroke='#404040'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.3877 17.7168C12.3877 17.7168 14.1018 18.6459 16.3994 18.7941'
        stroke='#404040'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M14.633 14.2927C14.633 14.2927 14.5726 15.0897 14.2024 15.5783C13.8323 16.0668 13.3092 16.7116 13.1562 17.4805'
        stroke='#404040'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M25.8194 22.9592C23.7712 27.781 18.9748 31.165 13.3857 31.165'
        stroke='#DA47EF'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M23.6182 22.2543L26.7849 21.3533L27.6903 24.505'
        stroke='#DA47EF'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M32.4946 26.1467C30.4465 30.9685 25.6501 34.3525 20.061 34.3525'
        stroke='#DA47EF'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M30.2935 25.442L33.4602 24.5449L34.3615 27.6967'
        stroke='#DA47EF'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
