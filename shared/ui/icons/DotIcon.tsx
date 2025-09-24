interface DotIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export function DotIcon({ className = '', size = 2, color = '#737373' }: DotIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 2 2'
      fill='none'
      className={className}
    >
      <circle cx='1' cy='1' r='1' fill={color} />
    </svg>
  );
}
