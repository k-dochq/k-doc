interface StarIconReviewV2Props {
  className?: string;
  width?: number;
  height?: number;
}

export function StarIconReviewV2({
  className = '',
  width = 20,
  height = 20,
}: StarIconReviewV2Props) {
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
        d='M9.99344 1.875L12.3391 7.62439L18.5377 8.08354L13.7864 12.0961L15.2737 18.125L9.99344 14.851L4.71319 18.125L6.20045 12.0961L1.44922 8.08354L7.64777 7.62439L9.99344 1.875Z'
        fill='#FFC31D'
      />
      <path
        d='M9.99344 1.875L7.64777 7.62439L1.44922 8.08354L6.20045 12.0961L4.71319 18.125L9.99344 14.851M9.99344 1.875L12.3391 7.62439L18.5377 8.08354L13.7864 12.0961L15.2737 18.125L9.99344 14.851'
        stroke='#FFC31D'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
