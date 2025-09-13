import { type CategoryButtonProps } from '../model/types';
import { LocaleLink } from 'shared/ui/locale-link';
import { getLocalizedTextByLocale } from 'shared/model/types/common';

export function QuickMenuButton({ category, lang }: CategoryButtonProps) {
  const getLabel = (): string => {
    return getLocalizedTextByLocale(category.labels, lang);
  };

  return (
    <LocaleLink
      href={`/hospitals?category=${category.type}`}
      className='flex min-w-0 flex-col items-center gap-1'
    >
      <div className='flex h-[60px] w-[60px] items-center justify-center rounded-xl border border-[#f9d1ff] bg-white transition-shadow hover:shadow-md'>
        {category.icon()}
      </div>
      <span className='w-full min-w-0 truncate text-center text-xs leading-4 font-medium text-neutral-900'>
        {getLabel()}
      </span>
    </LocaleLink>
  );
}
