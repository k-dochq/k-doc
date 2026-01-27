interface HospitalIconProps {
  className?: string;
  active?: boolean;
}

export function HospitalIcon({ className, active = false }: HospitalIconProps) {
  if (active) {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='25'
        height='24'
        viewBox='0 0 25 24'
        fill='none'
        className={className}
      >
        <path
          d='M16.75 5.5H20.75L22.75 10.5H2.75L4.75 5.5H8.75'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M4.75 10.5H20.75V21.5H4.75V10.5Z'
          fill='currentColor'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M16.75 2.5H8.75V10.5H16.75V2.5Z'
          fill='currentColor'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M12.75 14.5H8.75V21.5H12.75V14.5Z'
          fill='currentColor'
          stroke='white'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M16.75 14.5H12.75V21.5H16.75V14.5Z'
          fill='currentColor'
          stroke='white'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M11.25 6.5H14.25'
          stroke='white'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M18.75 21.5H6.75'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M12.75 8V5'
          stroke='white'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    );
  }

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='25'
      height='24'
      viewBox='0 0 25 24'
      fill='none'
      className={className}
    >
      <path
        d='M16.75 5.5H20.75L22.75 10.5H2.75L4.75 5.5H8.75'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M4.75 10.5H20.75V21.5H4.75V10.5Z'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M16.75 2.5H8.75V10.5H16.75V2.5Z'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.75 14.5H8.75V21.5H12.75V14.5Z'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M16.75 14.5H12.75V21.5H16.75V14.5Z'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M11.25 6.5H14.25'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M18.75 21.5H6.75'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.75 8V5'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
