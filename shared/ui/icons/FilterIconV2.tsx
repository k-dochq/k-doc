interface FilterIconV2Props {
  className?: string;
}

export function FilterIconV2({ className }: FilterIconV2Props) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'>
      <path
        d='M4.5 3V15M4.5 15L6.75 12.75M4.5 15L2.25 12.75'
        stroke='#404040'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M7.5 4.5H15.75M7.5 8.625H15.75M9.75 12.75H15.75'
        stroke='#404040'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
