interface CommentIconV2Props {
  className?: string;
  width?: number;
  height?: number;
}

export function CommentIconV2({ className = '', width = 20, height = 20 }: CommentIconV2Props) {
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
        d='M9.99693 17.5C8.33283 17.4998 6.71608 16.9461 5.40119 15.9261C4.08631 14.9062 3.14797 13.4779 2.73391 11.8662C2.31985 10.2544 2.45359 8.5507 3.11406 7.02329C3.77453 5.49588 4.92423 4.2315 6.38215 3.42921C7.84008 2.62692 9.52342 2.33229 11.1672 2.5917C12.8109 2.8511 14.3217 3.64982 15.4617 4.8621C16.6017 6.07437 17.3062 7.63136 17.4642 9.28794C17.6222 10.9445 17.2247 12.6066 16.3344 14.0125L17.4969 17.5L14.0094 16.3375C12.8098 17.0989 11.4178 17.5022 9.99693 17.5Z'
        stroke='#404040'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
