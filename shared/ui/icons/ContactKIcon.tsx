interface ContactKIconProps {
  className?: string;
}

export function ContactKIcon({ className }: ContactKIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='54'
      height='54'
      viewBox='0 0 62 62'
      fill='none'
      className={className}
    >
      <g filter='url(#filter0_d_119_17293)'>
        <path
          d='M4 29C4 14.0883 16.0883 2 31 2C45.9117 2 58 14.0883 58 29V56H31C16.0883 56 4 43.9117 4 29Z'
          fill='url(#paint0_linear_119_17293)'
        />
        <path
          d='M22 42V16H28.4423V26.2698L35.9564 16H42.8087L34.95 26.0751L44 41.7866H37.1477L31.1793 31.451L28.4423 34.7934V42H22Z'
          fill='white'
        />
      </g>
      <defs>
        <filter
          id='filter0_d_119_17293'
          x='0'
          y='0'
          width='62'
          height='62'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='2' />
          <feGaussianBlur stdDeviation='2' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0' />
          <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_119_17293' />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_119_17293'
            result='shape'
          />
        </filter>
        <linearGradient
          id='paint0_linear_119_17293'
          x1='13.72'
          y1='6.32'
          x2='58'
          y2='57.62'
          gradientUnits='userSpaceOnUse'
        >
          <stop offset='0.0155908' stopColor='#DC007A' />
          <stop offset='1' stopColor='#CA7CFF' />
        </linearGradient>
      </defs>
    </svg>
  );
}
