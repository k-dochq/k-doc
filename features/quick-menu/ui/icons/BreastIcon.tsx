interface BreastIconProps {
  variant?: 'default' | 'small';
}

export function BreastIcon({ variant = 'default' }: BreastIconProps) {
  const scale = variant === 'small' ? 0.87 : 1;
  const width = 44 * scale;
  const height = 38 * scale;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 44 38'
      fill='none'
    >
      <g clipPath='url(#clip0_941_3319)'>
        <path
          d='M22.2897 20.7273C22.2897 24.0698 18.2616 26.5599 14.9068 26.3689C12.0898 26.2085 9.75629 23.9609 9.47898 21.13C9.35724 19.8885 9.62102 18.7186 10.1621 17.7227C10.7167 16.7029 10.8588 15.5058 10.5037 14.4007L10.0302 12.9341'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M22.2896 20.7273C22.2896 24.0698 25.7354 26.5599 29.0902 26.3689C31.9073 26.2085 34.2407 23.9609 34.518 21.13C34.6398 19.8885 34.376 18.7186 33.8349 17.7227C33.2803 16.7029 33.1382 15.5058 33.4933 14.4007L33.9668 12.9341'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M11.596 25.2092C11.596 25.2092 12.9013 29.4487 12.6105 31.6384C12.3197 33.8315 11.1631 36.3145 11.1631 36.3145'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M32.404 25.2092C32.404 25.2092 31.0986 29.4487 31.3894 31.6384C31.6803 33.8315 32.8369 36.3145 32.8369 36.3145'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M16.7057 1.68213C16.7057 1.68213 16.1613 4.33566 14.7003 5.66242C13.2394 6.98919 9.14735 7.57924 7.54098 10.3794C5.93462 13.1796 6.22164 13.0778 6.65789 20.1516'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M27.2944 1.68213C27.2944 1.68213 27.8389 4.33566 29.2999 5.66242C30.7608 6.98919 34.8528 7.57924 36.4592 10.3794C38.0655 13.1796 37.7786 13.0778 37.3423 20.1516'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M15.644 8.73218L20.2839 10.0453'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M28.3528 8.73218L23.7163 10.0453'
          stroke='#404040'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M34.4146 29.7782C38.1109 29.3076 40.7284 25.9003 40.2617 22.1724'
          stroke='#DA47EF'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M42.3313 23.0795L40.079 20.9546L37.9722 23.2227'
          stroke='#DA47EF'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M9.58561 29.7782C5.88928 29.3076 3.27174 25.9003 3.73844 22.1724'
          stroke='#DA47EF'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M1.66895 23.0795L3.91786 20.9546L6.02474 23.2227'
          stroke='#DA47EF'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_941_3319'>
          <rect width='44' height='38' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}
