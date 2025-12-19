interface EyeOffIconProps {
  className?: string;
}

export function EyeOffIcon({ className = '' }: EyeOffIconProps) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
    >
      <path
        d='M8.82194 8.82245C8.50943 9.13507 8.33391 9.55904 8.33398 10.0011C8.33406 10.4431 8.50974 10.867 8.82236 11.1795C9.13498 11.492 9.55895 11.6676 10.001 11.6675C10.443 11.6674 10.8669 11.4917 11.1794 11.1791'
        stroke='#A3A3A3'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M13.9008 13.8942C12.7319 14.6256 11.3789 15.0091 10 15C7 15 4.5 13.3334 2.5 10C3.56 8.23336 4.76 6.93503 6.1 6.10503M8.48333 5.15002C8.98253 5.04897 9.49068 4.99871 10 5.00003C13 5.00003 15.5 6.66669 17.5 10C16.945 10.925 16.3508 11.7225 15.7183 12.3917'
        stroke='#A3A3A3'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M2.5 2.5L17.5 17.5'
        stroke='#A3A3A3'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

interface EyeIconProps {
  className?: string;
}

export function EyeIcon({ className = '' }: EyeIconProps) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
    >
      <path
        d='M8.33398 9.99998C8.33398 10.442 8.50958 10.8659 8.82214 11.1785C9.1347 11.4911 9.55862 11.6666 10.0007 11.6666C10.4427 11.6666 10.8666 11.4911 11.1792 11.1785C11.4917 10.8659 11.6673 10.442 11.6673 9.99998C11.6673 9.55795 11.4917 9.13403 11.1792 8.82147C10.8666 8.50891 10.4427 8.33331 10.0007 8.33331C9.55862 8.33331 9.1347 8.50891 8.82214 8.82147C8.50958 9.13403 8.33398 9.55795 8.33398 9.99998Z'
        stroke='#A3A3A3'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M17.5 10C15.5 13.3333 13 15 10 15C7 15 4.5 13.3333 2.5 10C4.5 6.66667 7 5 10 5C13 5 15.5 6.66667 17.5 10Z'
        stroke='#A3A3A3'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
