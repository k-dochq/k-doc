interface ContactCloseIconProps {
  className?: string;
}

export function ContactCloseIcon({ className }: ContactCloseIconProps) {
  return (
    <svg
      width='54'
      height='54'
      viewBox='0 0 54 54'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M0 27C0 12.0883 12.0883 0 27 0C41.9117 0 54 12.0883 54 27C54 41.9117 41.9117 54 27 54C12.0883 54 0 41.9117 0 27Z'
        fill='url(#paint0_linear_119_17322)'
      />
      <path
        d='M27 27L20.5 20.5M27 27L33.5 33.5M27 27L33.5 20.5M27 27L20.5 33.5'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <defs>
        <linearGradient
          id='paint0_linear_119_17322'
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
