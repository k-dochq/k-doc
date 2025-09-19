import { type Locale } from 'shared/config';
import { getLocalizedTextByLocale } from 'shared/model/types/common';
import { type LocalizedText } from 'shared/model/types/common';
import { LocaleLink } from 'shared/ui/locale-link';
import { categoryButtonStyles } from './styles';

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
      <div className={`${categoryButtonStyles.container} ${iconClassName}`}>{category.icon()}</div>
      <span className={`${categoryButtonStyles.label} ${labelClassName}`}>{getLabel()}</span>
    </>
  );

  if (href) {
    return (
      <LocaleLink
        href={href}
        replace={replace}
        className={`${categoryButtonStyles.wrapper} ${className}`}
      >
        {buttonContent}
      </LocaleLink>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className={`${categoryButtonStyles.wrapper} ${className}`}>
        {buttonContent}
      </button>
    );
  }

  // 기본적으로 div로 렌더링 (href나 onClick이 없는 경우)
  return <div className={`${categoryButtonStyles.wrapper} ${className}`}>{buttonContent}</div>;
}
