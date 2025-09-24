interface StarIconProps {
  color?: string;
  width?: number;
  height?: number;
}

export function StarIcon({ color = '#DA47EF', width = 14, height = 13 }: StarIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 14 13'
      fill='none'
    >
      <path
        d='M6.9997 1L8.62363 4.98034L12.9149 5.29822L9.62563 8.07617L10.6553 12.25L6.9997 9.98342L3.34415 12.25L4.37378 8.07617L1.08447 5.29822L5.37578 4.98034L6.9997 1Z'
        fill={color}
      />
      <path
        d='M6.9997 1L5.37578 4.98034L1.08447 5.29822L4.37378 8.07617L3.34415 12.25L6.9997 9.98342M6.9997 1L8.62363 4.98034L12.9149 5.29822L9.62563 8.07617L10.6553 12.25L6.9997 9.98342'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
