'use client';

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
    <LocaleLink href={href} className={`flex min-w-0 flex-col items-center justify-center gap-1 w-[71px] ${className}`}>
      <div
        className={`flex h-[60px] w-[60px] items-center justify-center rounded-xl border border-white bg-gradient-to-b from-white to-[#FFD9F9] transition-all duration-200 ease-out hover:scale-105 active:scale-95 ${iconClassName}`}
        style={{
          filter: 'drop-shadow(1px 1px 12px rgba(76,25,168,0.12))',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.filter = 'drop-shadow(2px 2px 16px rgba(76,25,168,0.2))';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.filter = 'drop-shadow(1px 1px 12px rgba(76,25,168,0.12))';
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.filter = 'drop-shadow(0px 0px 8px rgba(76,25,168,0.15))';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.filter = 'drop-shadow(1px 1px 12px rgba(76,25,168,0.12))';
        }}
      >
        {category.icon()}
      </div>
      <span
        className={`line-clamp-2 w-full min-w-0 text-center text-xs leading-4 font-medium break-words text-neutral-900 ${labelClassName}`}
      >
        {getLabel()}
      </span>
    </LocaleLink>
  );
}
