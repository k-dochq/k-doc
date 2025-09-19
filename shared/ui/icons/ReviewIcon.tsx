interface ReviewIconProps {
  className?: string;
  active?: boolean;
}

export function ReviewIcon({ className, active = false }: ReviewIconProps) {
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
          d='M19.5 2H5.5C4.94771 2 4.5 2.44771 4.5 3V21C4.5 21.5523 4.94771 22 5.5 22H19.5C20.0523 22 20.5 21.5523 20.5 21V3C20.5 2.44771 20.0523 2 19.5 2Z'
          fill='#DA47EF'
          stroke='#DA47EF'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path d='M9 16H16H9Z' fill='white' />
        <path
          d='M9 16H16'
          stroke='white'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path d='M9 19H12.5H9Z' fill='white' />
        <path
          d='M9 19H12.5'
          stroke='white'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M12.6 5L13.8087 7.64739L16.7 7.9788L14.5557 9.94644L15.134 12.7987L12.6 11.3673L10.066 12.7987L10.6443 9.94644L8.5 7.9788L11.3913 7.64739L12.6 5Z'
          fill='white'
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
        d='M19.5 2H5.5C4.94771 2 4.5 2.44771 4.5 3V21C4.5 21.5523 4.94771 22 5.5 22H19.5C20.0523 22 20.5 21.5523 20.5 21V3C20.5 2.44771 20.0523 2 19.5 2Z'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9 16H16'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9 19H12.5'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.6 5L13.8087 7.64739L16.7 7.9788L14.5557 9.94644L15.134 12.7987L12.6 11.3673L10.066 12.7987L10.6443 9.94644L8.5 7.9788L11.3913 7.64739L12.6 5Z'
        fill='white'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
