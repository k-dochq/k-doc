interface CustomStarProps {
  filled: boolean;
  size?: number;
}

export function CustomStar({ filled, size = 40 }: CustomStarProps) {
  const fillColor = filled ? '#FFC31D' : '#d4d4d4';
  const viewBox = '0 0 43 40';

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 48 48'
      fill='none'
    >
      <path
        d='M23.9905 4.5L29.6201 18.2985L44.4967 19.4005L33.0937 29.0307L36.6631 43.5L23.9905 35.6425L11.3179 43.5L14.8873 29.0307L3.48438 19.4005L18.3609 18.2985L23.9905 4.5Z'
        fill={fillColor}
      />
      <path
        d='M23.9905 4.5L18.3609 18.2985L3.48438 19.4005L14.8873 29.0307L11.3179 43.5L23.9905 35.6425M23.9905 4.5L29.6201 18.2985L44.4966 19.4005L33.0937 29.0307L36.6631 43.5L23.9905 35.6425'
        stroke={fillColor}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
