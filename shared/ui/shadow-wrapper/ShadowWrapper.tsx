interface ShadowWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function ShadowWrapper({ children, className = '' }: ShadowWrapperProps) {
  return (
    <div className={`shadow-[0_0_8px_0_rgba(0,0,0,0.20)] ${className}`}>{children}</div>
  );
}
