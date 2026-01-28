import { MAX_MOBILE_WIDTH_CLASS } from 'shared/config';
import { ShadowWrapper } from 'shared/ui/shadow-wrapper';

interface MaxWidthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MaxWidthLayout({ children, className = '' }: MaxWidthLayoutProps) {
  return (
    <div className={`mx-auto min-h-screen max-w-[500px]`}>
      <ShadowWrapper className={className}>{children}</ShadowWrapper>
    </div>
  );
}
