interface TipsIconProps {
  className?: string;
  active?: boolean;
}

export function TipsIcon({ className, active = false }: TipsIconProps) {
  if (active) {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        className={className}
      >
        <path
          d='M1.5 20.002H12V7.11156C12 5.39418 10.6065 4.00195 8.88757 4.00195H1.5V20.002Z'
          fill='#F15BFF'
          stroke='#F15BFF'
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M12 20.002H22.5V4.00195H15.1124C13.3935 4.00195 12 5.39418 12 7.11156V20.002Z'
          fill='#F15BFF'
          stroke='#F15BFF'
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M1.5 16.8923H8.88757C10.6065 16.8923 12 18.2846 12 20.002H1.5V16.8923Z'
          fill='white'
          stroke='#F15BFF'
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M1.5 14V20.002H12'
          stroke='#F15BFF'
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M15.1124 16.8923H22.5V20.002H12C12 18.2846 13.3935 16.8923 15.1124 16.8923Z'
          fill='white'
          stroke='#F15BFF'
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M22.5 13V20.002H10'
          stroke='#F15BFF'
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M15 7.5H19.5'
          stroke='white'
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M15 10.5H19.5'
          stroke='white'
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M15 13.5H19.5'
          stroke='white'
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M4 4.75V10.3892C4 10.5462 4.17279 10.642 4.306 10.5588L5.894 9.56625C5.95885 9.52572 6.04115 9.52572 6.106 9.56625L7.694 10.5588C7.82721 10.642 8 10.5462 8 10.3892V4.75'
          fill='white'
        />
        <path
          d='M4 4.75V10.3892C4 10.5462 4.17279 10.642 4.306 10.5588L5.894 9.56625C5.95885 9.52572 6.04115 9.52572 6.106 9.56625L7.694 10.5588C7.82721 10.642 8 10.5462 8 10.3892V4.75'
          stroke='white'
          strokeWidth='1.5'
          strokeMiterlimit='10'
        />
      </svg>
    );
  }

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      className={className}
    >
      <path
        d='M1.5 20.002H12V7.11156C12 5.39418 10.6065 4.00195 8.88757 4.00195H1.5V20.002Z'
        stroke='#A3A3A3'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12 20.002H22.5V4.00195H15.1124C13.3935 4.00195 12 5.39418 12 7.11156V20.002Z'
        stroke='#A3A3A3'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M1.5 16.8923H8.88757C10.6065 16.8923 12 18.2846 12 20.002H1.5V16.8923Z'
        stroke='#A3A3A3'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M15.1124 16.8923H22.5V20.002H12C12 18.2846 13.3935 16.8923 15.1124 16.8923Z'
        stroke='#A3A3A3'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M15 7.5H19.5'
        stroke='#A3A3A3'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M15 10.5H19.5'
        stroke='#A3A3A3'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M15 13.5H19.5'
        stroke='#A3A3A3'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M4 4.75V10.3892C4 10.5462 4.17279 10.642 4.306 10.5588L5.894 9.56625C5.95885 9.52572 6.04115 9.52572 6.106 9.56625L7.694 10.5588C7.82721 10.642 8 10.5462 8 10.3892V4.75'
        stroke='#A3A3A3'
        strokeWidth='1.5'
        strokeMiterlimit='10'
      />
    </svg>
  );
}
