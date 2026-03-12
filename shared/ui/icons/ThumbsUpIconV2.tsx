interface ThumbsUpIconV2Props {
  className?: string;
  width?: number;
  height?: number;
}

export function ThumbsUpIconV2({ className = '', width = 20, height = 20 }: ThumbsUpIconV2Props) {
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
        d='M11.5934 7.02497V3.725C11.5934 2.35809 10.4955 1.25 9.14101 1.25L5.87109 8.67496V17.7499H15.3702C16.1854 17.7592 16.8829 17.1609 17.0052 16.3474L18.1333 8.92246C18.2053 8.44382 18.0653 7.95744 17.7506 7.59215C17.4358 7.22687 16.978 7.01947 16.4983 7.02497H11.5934Z'
        stroke='#404040'
        strokeWidth='1.5'
        strokeLinejoin='round'
      />
      <path
        d='M5.87034 8.19559H3.52823C2.50061 8.17778 1.62214 9.01203 1.48438 10.0102V16.0282C1.62214 17.0264 2.50061 17.7654 3.52823 17.7476H5.87034V8.19559Z'
        stroke='#404040'
        strokeWidth='1.5'
        strokeLinejoin='round'
      />
    </svg>
  );
}
