interface HeartOutlineIconProps {
  className?: string;
  width?: number;
  height?: number;
}

export function HeartOutlineIcon({
  className = '',
  width = 20,
  height = 17,
}: HeartOutlineIconProps) {
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M6.06465 2.91699C3.63595 2.91699 1.6665 5.02189 1.6665 7.61763C1.6665 12.8128 9.99984 17.917 9.99984 17.917C9.99984 17.917 18.3332 12.8128 18.3332 7.61763C18.3332 4.4016 16.3637 2.91699 13.935 2.91699C12.2128 2.91699 10.7221 3.97503 9.99984 5.51552C9.27762 3.97503 7.78688 2.91699 6.06465 2.91699Z'
        stroke='#DA47EF'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
