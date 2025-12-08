interface ShareIconV2Props {
  className?: string;
  width?: number;
  height?: number;
}

export function ShareIconV2({ className = '', width = 24, height = 24 }: ShareIconV2Props) {
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
        d='M12 5.13333V14.7667M15.4286 7.4L12 4L8.57143 7.4M4 13.0667V18.7333C4 19.3345 4.24082 19.911 4.66947 20.3361C5.09812 20.7612 5.67951 21 6.28571 21H17.7143C18.3205 21 18.9019 20.7612 19.3305 20.3361C19.7592 19.911 20 19.3345 20 18.7333V13.0667'
        stroke='#404040'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
