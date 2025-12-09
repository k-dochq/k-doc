interface ContactKIconProps {
  className?: string;
}

export function ContactKIcon({ className }: ContactKIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='54'
      height='54'
      viewBox='0 0 54 54'
      fill='none'
      className={className}
    >
      <path
        d='M0 27C0 12.0883 12.0883 0 27 0C41.9117 0 54 12.0883 54 27V54H27C12.0883 54 0 41.9117 0 27Z'
        fill='url(#paint0_linear_890_9364)'
      />
      <path
        d='M18 40V14H24.4423V24.2698L31.9564 14H38.8087L30.95 24.0751L40 39.7866H33.1477L27.1793 29.451L24.4423 32.7934V40H18Z'
        fill='white'
      />
      <defs>
        <linearGradient
          id='paint0_linear_890_9364'
          x1='9.72'
          y1='4.32'
          x2='54'
          y2='55.62'
          gradientUnits='userSpaceOnUse'
        >
          <stop offset='0.0155908' stopColor='#DC007A' />
          <stop offset='1' stopColor='#CA7CFF' />
        </linearGradient>
      </defs>
    </svg>
  );
}
