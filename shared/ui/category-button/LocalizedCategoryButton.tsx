import { type Locale } from 'shared/config';
import { LocaleLink } from 'shared/ui/locale-link';
import { getLocalizedTextByLocale } from 'shared/model/types/common';
import { type CategoryButtonData } from './CategoryButton';

interface LocalizedCategoryButtonProps {
  category: CategoryButtonData;
  lang: Locale;
  href: string;
  className?: string;
  iconClassName?: string;
  labelClassName?: string;
}

export function LocalizedCategoryButton({
  category,
  lang,
  href,
  className = '',
  iconClassName = '',
  labelClassName = '',
}: LocalizedCategoryButtonProps) {
  const getLabel = (): string => {
    return getLocalizedTextByLocale(category.labels, lang);
  };

  return (
    <LocaleLink href={href} className={`flex min-w-0 flex-col items-center gap-1 ${className}`}>
      <div
        className={`flex h-[60px] w-[60px] items-center justify-center rounded-xl border border-white bg-gradient-to-b from-white to-[#FFD9F9] shadow-[1px_1px_12px_0_rgba(76,25,168,0.12)] transition-shadow hover:shadow-md ${iconClassName}`}
      >
        {category.icon()}
      </div>
      <span
        className={`w-full min-w-0 truncate text-center text-xs leading-4 font-medium text-neutral-900 ${labelClassName}`}
      >
        {getLabel()}
      </span>
    </LocaleLink>
  );
}
