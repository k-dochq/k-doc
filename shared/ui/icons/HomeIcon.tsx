interface HomeIconProps {
  className?: string;
  active?: boolean;
}

export function HomeIcon({ className, active = false }: HomeIconProps) {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M21.5 21.5V10.1L12 2.5L2.5 10.1V21.5H8.675V13.9H15.325V21.5H21.5Z'
        fill='currentColor'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinejoin='round'
      />
    </svg>
  );
}
