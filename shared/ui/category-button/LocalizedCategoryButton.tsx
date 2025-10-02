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

  // Dermatology 카테고리만 1줄로 표시 (말줄임 없이)
  const isDermatology = category.type === 'DERMATOLOGY';
  const textClasses = isDermatology
    ? 'w-full min-w-0 text-center text-xs leading-4 font-medium text-neutral-900 whitespace-nowrap overflow-visible'
    : 'line-clamp-2 w-full min-w-0 text-center text-xs leading-4 font-medium break-words text-neutral-900';

  return (
    <LocaleLink href={href} className={`flex min-w-0 flex-col items-center justify-center gap-1 ${isDermatology ? 'w-auto' : 'w-[70px]'} ${className}`}>
      <div
        className={`flex h-[60px] w-[60px] items-center justify-center rounded-xl border border-white bg-gradient-to-b from-white to-[#FFD9F9] shadow-[1px_1px_12px_0_rgba(76,25,168,0.12)] transition-all duration-200 ease-out hover:scale-105 hover:shadow-[2px_2px_16px_0_rgba(76,25,168,0.2)] active:scale-95 active:shadow-[0px_0px_8px_0_rgba(76,25,168,0.15)] ${iconClassName}`}
      >
        {category.icon()}
      </div>
      <span
        className={`${textClasses} ${labelClassName}`}
      >
        {getLabel()}
      </span>
    </LocaleLink>
  );
}
