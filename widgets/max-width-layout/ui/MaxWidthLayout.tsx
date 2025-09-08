interface MaxWidthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MaxWidthLayout({ children, className = '' }: MaxWidthLayoutProps) {
  return <div className={`mx-auto min-h-screen max-w-[500px] px-4 ${className}`}>{children}</div>;
}
