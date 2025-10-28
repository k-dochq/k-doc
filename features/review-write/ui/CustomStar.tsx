interface CustomStarProps {
  filled: boolean;
  size?: number;
}

export function CustomStar({ filled, size = 40 }: CustomStarProps) {
  const fillColor = filled ? '#DA47EF' : '#F9D1FF';
  const viewBox = '0 0 43 40';

  return (
    <svg
      width={size}
      height={size * (40 / 43)}
      viewBox={viewBox}
      fill='none'
      className='transition-colors duration-200'
    >
      <path
        d='M21.0061 0.5L26.6357 14.2985L41.5123 15.4005L30.1093 25.0307L33.6787 39.5L21.0061 31.6425L8.33354 39.5L11.9029 25.0307L0.5 15.4005L15.3765 14.2985L21.0061 0.5Z'
        fill={fillColor}
      />
      <path
        d='M21.0061 0.5L15.3765 14.2985L0.5 15.4005L11.9029 25.0307L8.33354 39.5L21.0061 31.6425M21.0061 0.5L26.6357 14.2985L41.5123 15.4005L30.1093 25.0307L33.6787 39.5L21.0061 31.6425'
        stroke={fillColor}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
