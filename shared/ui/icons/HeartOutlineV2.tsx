import { memo } from 'react';

interface HeartOutlineV2Props {
  width?: number;
  height?: number;
  className?: string;
}

function HeartOutlineV2Component({ width = 20, height = 20, className }: HeartOutlineV2Props) {
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
        d='M6.06416 2.91675C3.63546 2.91675 1.66602 5.02165 1.66602 7.61739C1.66602 12.8126 9.99935 17.9167 9.99935 17.9167C9.99935 17.9167 18.3327 12.8126 18.3327 7.61739C18.3327 4.40136 16.3632 2.91675 13.9345 2.91675C12.2123 2.91675 10.7216 3.97479 9.99935 5.51528C9.27713 3.97479 7.78639 2.91675 6.06416 2.91675Z'
        stroke='#D4D4D4'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export const HeartOutlineV2 = memo(HeartOutlineV2Component);
