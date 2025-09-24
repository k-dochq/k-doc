interface HeartIconProps {
  isLiked?: boolean;
  className?: string;
  width?: number;
  height?: number;
}

export function HeartIcon({
  isLiked = false,
  className = '',
  width = 20,
  height = 20,
}: HeartIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 20 20'
      fill='none'
    >
      <path
        d='M6.06465 2.91699C3.63595 2.91699 1.6665 5.02189 1.6665 7.61763C1.6665 12.8128 9.99984 17.917 9.99984 17.917C9.99984 17.917 18.3332 12.8128 18.3332 7.61763C18.3332 4.4016 16.3637 2.91699 13.935 2.91699C12.2128 2.91699 10.7221 3.97503 9.99984 5.51552C9.27762 3.97503 7.78688 2.91699 6.06465 2.91699Z'
        fill='url(#paint0_linear_1701_10915)'
        stroke='url(#paint1_linear_1701_10915)'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <defs>
        <linearGradient
          id='paint0_linear_1701_10915'
          x1='1.6665'
          y1='10.417'
          x2='18.3332'
          y2='10.417'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#FF60F7' />
          <stop offset='1' stopColor='#AE33FB' />
        </linearGradient>
        <linearGradient
          id='paint1_linear_1701_10915'
          x1='1.6665'
          y1='10.417'
          x2='18.3332'
          y2='10.417'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#FF60F7' />
          <stop offset='1' stopColor='#AE33FB' />
        </linearGradient>
      </defs>
    </svg>
  );
}
