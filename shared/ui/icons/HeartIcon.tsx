interface HeartIconProps {
  className?: string;
  width?: number;
  height?: number;
}

export function HeartIcon({ className = '', width = 20, height = 20 }: HeartIconProps) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 20 20'
      fill='none'
    >
      <path
        d='M6.06465 2.91675C3.63595 2.91675 1.6665 5.02165 1.6665 7.61738C1.6665 12.8126 9.99984 17.9167 9.99984 17.9167C9.99984 17.9167 18.3332 12.8126 18.3332 7.61738C18.3332 4.40136 16.3637 2.91675 13.935 2.91675C12.2128 2.91675 10.7221 3.97479 9.99984 5.51528C9.27762 3.97479 7.78688 2.91675 6.06465 2.91675Z'
        fill='url(#paint0_linear_964_7743)'
        stroke='url(#paint1_linear_964_7743)'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <defs>
        <linearGradient
          id='paint0_linear_964_7743'
          x1='1.6665'
          y1='10.4167'
          x2='18.3332'
          y2='10.4167'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#DA47EF' />
          <stop offset='1' stopColor='#AE33FB' />
        </linearGradient>
        <linearGradient
          id='paint1_linear_964_7743'
          x1='1.6665'
          y1='10.4167'
          x2='18.3332'
          y2='10.4167'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#DA47EF' />
          <stop offset='1' stopColor='#AE33FB' />
        </linearGradient>
      </defs>
    </svg>
  );
}
