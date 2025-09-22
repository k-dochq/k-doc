import { type Locale } from 'shared/config';
import { BackButton } from 'shared/ui/button';

interface PageHeaderProps {
  lang: Locale;
  title: string;
  fallbackUrl?: string;
  rightContent?: React.ReactNode;
  className?: string;
  variant?: 'light' | 'dark';
  bgClassName?: string;
}

export function PageHeader({
  lang,
  title,
  fallbackUrl,
  rightContent,
  className = '',
  variant = 'dark',
  bgClassName,
}: PageHeaderProps) {
  const getTextColor = () => {
    return variant === 'light' ? 'text-neutral-900' : 'text-white';
  };

  return (
    <div
      className={`sticky top-0 z-50 flex w-full items-center justify-between ${bgClassName || ''} h-[58px] pr-5 pl-1 ${className}`}
      style={
        bgClassName
          ? { background: bgClassName }
          : { background: 'rgba(254, 219, 249, 0.70)', backdropFilter: 'blur(15px)' }
      }
    >
      <div className='flex items-center gap-0'>
        {/* 뒤로가기 버튼 */}
        <BackButton fallbackUrl={fallbackUrl} variant={variant} />
        {/* 제목 */}
        <h1 className={`text-lg font-semibold ${getTextColor()}`}>{title}</h1>
      </div>

      {/* 오른쪽 컨텐츠 (좋아요 버튼 등) */}
      {rightContent && <div>{rightContent}</div>}
    </div>
  );
}
