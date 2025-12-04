interface HeartOutlineIconV2Props {
  className?: string;
}

export function HeartOutlineIconV2({ className }: HeartOutlineIconV2Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      className={className}
    >
      <path
        d='M6.06514 2.91666C3.63644 2.91666 1.66699 5.02156 1.66699 7.61729C1.66699 12.8125 10.0003 17.9167 10.0003 17.9167C10.0003 17.9167 18.3337 12.8125 18.3337 7.61729C18.3337 4.40126 16.3642 2.91666 13.9355 2.91666C12.2133 2.91666 10.7225 3.9747 10.0003 5.51519C9.2781 3.9747 7.78736 2.91666 6.06514 2.91666Z'
        fill='black'
        fillOpacity='0.1'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
