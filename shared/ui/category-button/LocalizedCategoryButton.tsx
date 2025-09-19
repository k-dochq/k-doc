import { type Locale } from 'shared/config';
import { LocaleLink } from 'shared/ui/locale-link';
import { getLocalizedTextByLocale } from 'shared/model/types/common';
import { type CategoryButtonData } from './CategoryButton';
import { categoryButtonStyles } from './styles';

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
    <LocaleLink href={href} className={`${categoryButtonStyles.wrapper} ${className}`}>
      <div className={`${categoryButtonStyles.container} ${iconClassName}`}>{category.icon()}</div>
      <span className={`${categoryButtonStyles.label} ${labelClassName}`}>{getLabel()}</span>
    </LocaleLink>
  );
}
