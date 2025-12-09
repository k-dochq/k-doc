import { memo } from 'react';

interface HeartFilledV2Props {
  width?: number;
  height?: number;
  className?: string;
}

function HeartFilledV2Component({ width = 20, height = 20, className }: HeartFilledV2Props) {
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
        d='M6.06416 2.91663C3.63546 2.91663 1.66602 5.02153 1.66602 7.61726C1.66602 12.8125 9.99935 17.9166 9.99935 17.9166C9.99935 17.9166 18.3327 12.8125 18.3327 7.61726C18.3327 4.40123 16.3632 2.91663 13.9345 2.91663C12.2123 2.91663 10.7216 3.97467 9.99935 5.51516C9.27713 3.97467 7.78639 2.91663 6.06416 2.91663Z'
        fill='#F31110'
        stroke='#F31110'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export const HeartFilledV2 = memo(HeartFilledV2Component);
