interface FavoriteIconProps {
  className?: string;
  active?: boolean;
}

export function FavoriteIcon({ className, active = false }: FavoriteIconProps) {
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
          d='M7.52778 3.5C4.61333 3.5 2.25 6.02588 2.25 9.14076C2.25 15.375 12.25 21.5 12.25 21.5C12.25 21.5 22.25 15.375 22.25 9.14076C22.25 5.28153 19.8867 3.5 16.9722 3.5C14.9056 3.5 13.1167 4.76965 12.25 6.61824C11.3833 4.76965 9.59445 3.5 7.52778 3.5Z'
          fill='#DA47EF'
          stroke='#DA47EF'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    );
  }

  return (
    <svg
      width='25'
      height='24'
      viewBox='0 0 25 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M7.52778 3.5C4.61333 3.5 2.25 6.02588 2.25 9.14076C2.25 15.375 12.25 21.5 12.25 21.5C12.25 21.5 22.25 15.375 22.25 9.14076C22.25 5.28153 19.8867 3.5 16.9722 3.5C14.9056 3.5 13.1167 4.76965 12.25 6.61824C11.3833 4.76965 9.59444 3.5 7.52778 3.5Z'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
