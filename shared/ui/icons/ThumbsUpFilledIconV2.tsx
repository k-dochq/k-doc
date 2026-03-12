interface ThumbsUpFilledIconV2Props {
  className?: string;
  width?: number;
  height?: number;
}

export function ThumbsUpFilledIconV2({
  className = '',
  width = 20,
  height = 20,
}: ThumbsUpFilledIconV2Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 20 20'
      fill='none'
      className={className}
    >
      <path
        d='M6.667 9.167V15.833M6.667 9.167L9.167 3.333C9.608 3.333 10.032 3.508 10.345 3.821C10.658 4.134 10.833 4.558 10.833 5V7.5H14.592C14.806 7.497 15.018 7.542 15.212 7.63C15.406 7.719 15.578 7.85 15.716 8.014C15.854 8.178 15.954 8.37 16.008 8.577C16.062 8.784 16.069 9 16.025 9.21L14.942 14.21C14.87 14.552 14.683 14.859 14.412 15.079C14.141 15.299 13.803 15.418 13.455 15.417H6.667M6.667 9.167H4.583C4.252 9.167 3.935 9.298 3.7 9.533C3.465 9.768 3.333 10.085 3.333 10.417V14.583C3.333 14.914 3.465 15.232 3.7 15.467C3.935 15.702 4.252 15.833 4.583 15.833H6.667'
        stroke='#FF5580'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        fill='#FF5580'
        fillOpacity='0.15'
      />
    </svg>
  );
}
