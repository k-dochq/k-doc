import { type Locale } from 'shared/config';
import { LocaleLink } from 'shared/ui/locale-link';
import { getLocalizedTextByLocale } from 'shared/model/types/common';
import { type CategoryButtonData } from './CategoryButton';
import { getCategoryBackgroundSvg } from './utils/getCategoryBackgroundSvg';

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

  const backgroundSvg = getCategoryBackgroundSvg(category.type);

  return (
    <LocaleLink
      href={href}
      className={`flex w-[71px] min-w-0 flex-col items-center justify-center gap-1 ${className}`}
    >
      <div
        className={`relative flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-xl transition-all duration-200 ease-out hover:scale-105 active:scale-95 ${iconClassName}`}
        style={{
          backgroundImage: `url(${backgroundSvg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className='relative z-10'>{category.icon()}</div>
      </div>
      <span
        className={`line-clamp-2 w-full min-w-0 text-center text-xs leading-4 font-medium break-words text-neutral-900 ${labelClassName}`}
      >
        {getLabel()}
      </span>
    </LocaleLink>
  );
}
