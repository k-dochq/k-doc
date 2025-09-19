import { MAX_MOBILE_WIDTH_CLASS } from 'shared/config';

interface MaxWidthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MaxWidthLayout({ children, className = '' }: MaxWidthLayoutProps) {
  return <div className={`mx-auto min-h-screen max-w-screen ${className}`}>{children}</div>;
}
