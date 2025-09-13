import { type Locale } from 'shared/config';
import { getLocalizedTextByLocale } from 'shared/model/types/common';
import { type LocalizedText } from 'shared/model/types/common';
import { LocaleLink } from 'shared/ui/locale-link';

export interface CategoryButtonData {
  type: string;
  labels: LocalizedText;
  icon: () => React.ReactNode;
}

interface CategoryButtonProps {
  category: CategoryButtonData;
  lang: Locale;
  href?: string;
  onClick?: () => void;
  className?: string;
  iconClassName?: string;
  labelClassName?: string;
  replace?: boolean;
}

export function CategoryButton({
  category,
  lang,
  href,
  onClick,
  className = '',
  iconClassName = '',
  labelClassName = '',
  replace = false,
}: CategoryButtonProps) {
  const getLabel = (): string => {
    return getLocalizedTextByLocale(category.labels, lang);
  };

  const buttonContent = (
    <>
      <div
        className={`flex h-[60px] w-[60px] items-center justify-center rounded-xl border border-[#f9d1ff] bg-white transition-shadow hover:shadow-md ${iconClassName}`}
      >
        {category.icon()}
      </div>
      <span
        className={`w-full min-w-0 truncate text-center text-xs leading-4 font-medium text-neutral-900 ${labelClassName}`}
      >
        {getLabel()}
      </span>
    </>
  );

  if (href) {
    return (
      <LocaleLink
        href={href}
        replace={replace}
        className={`flex min-w-0 flex-col items-center gap-1 ${className}`}
      >
        {buttonContent}
      </LocaleLink>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className={`flex min-w-0 flex-col items-center gap-1 ${className}`}>
        {buttonContent}
      </button>
    );
  }

  // 기본적으로 div로 렌더링 (href나 onClick이 없는 경우)
  return (
    <div className={`flex min-w-0 flex-col items-center gap-1 ${className}`}>{buttonContent}</div>
  );
}
