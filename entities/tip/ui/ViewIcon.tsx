export function ViewIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      className={className}
    >
      <path
        d='M6.66406 7.99935C6.66406 8.35297 6.80454 8.69211 7.05459 8.94216C7.30464 9.19221 7.64377 9.33268 7.9974 9.33268C8.35102 9.33268 8.69016 9.19221 8.9402 8.94216C9.19025 8.69211 9.33073 8.35297 9.33073 7.99935C9.33073 7.64573 9.19025 7.30659 8.9402 7.05654C8.69016 6.80649 8.35102 6.66602 7.9974 6.66602C7.64377 6.66602 7.30464 6.80649 7.05459 7.05654C6.80454 7.30659 6.66406 7.64573 6.66406 7.99935Z'
        stroke='#A3A3A3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M14 8C12.4 10.6667 10.4 12 8 12C5.6 12 3.6 10.6667 2 8C3.6 5.33333 5.6 4 8 4C10.4 4 12.4 5.33333 14 8Z'
        stroke='#A3A3A3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
