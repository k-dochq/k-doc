interface CommentIconProps {
  size?: number;
  className?: string;
}

export function CommentIcon({ size = 20, className = '' }: CommentIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 20 20'
      fill='none'
      className={className}
    >
      <path
        d='M6.29662 9.99998H6.30588M10.0003 9.99998H10.0096M13.704 9.99998H13.7133M18.3337 9.99998C18.3337 14.1419 14.6022 17.5 10.0003 17.5C8.63808 17.5035 7.29218 17.1996 6.06051 16.6103L1.66699 17.5L2.95866 14.0125C2.14107 12.8519 1.66699 11.4756 1.66699 9.99998C1.66699 5.85812 5.39847 2.5 10.0003 2.5C14.6022 2.5 18.3337 5.85812 18.3337 9.99998Z'
        stroke='#DA47EF'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
