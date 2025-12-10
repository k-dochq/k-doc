interface StarIconV2Props {
  className?: string;
  width?: number;
  height?: number;
}

export function StarIconV2({ className = '', width = 24, height = 24 }: StarIconV2Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      className={className}
    >
      <path
        d='M11.9933 2.25L14.8081 9.14926L22.2464 9.70025L16.5449 14.5154L18.3296 21.75L11.9933 17.8213L5.657 21.75L7.44171 14.5154L1.74023 9.70025L9.1785 9.14926L11.9933 2.25Z'
        fill='#FFC31D'
      />
      <path
        d='M11.9933 2.25L9.1785 9.14926L1.74023 9.70025L7.44171 14.5154L5.657 21.75L11.9933 17.8213M11.9933 2.25L14.8081 9.14926L22.2464 9.70025L16.5449 14.5154L18.3296 21.75L11.9933 17.8213'
        stroke='#FFC31D'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
