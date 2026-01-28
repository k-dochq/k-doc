import { type Locale } from 'shared/config';
import { getLocalizedTextByLocale } from 'shared/model/types/common';
import { type LocalizedText } from 'shared/model/types/common';
import { LocaleLink } from 'shared/ui/locale-link';
import { renderCategoryIconV2 } from './renderCategoryIconV2';

export interface CategoryButtonV2Data {
  type: string;
  labels: LocalizedText;
  icon: () => React.ReactNode;
}

interface CategoryButtonV2Props {
  category: CategoryButtonV2Data;
  lang: Locale;
  href?: string;
  onClick?: () => void;
  className?: string;
  replace?: boolean;
  isActive?: boolean;
  variant?: 'recommend' | 'all';
}

export function CategoryButtonV2({
  category,
  lang,
  href,
  onClick,
  className = '',
  replace = false,
  isActive = false,
  variant = 'recommend',
}: CategoryButtonV2Props) {
  const getLabel = (): string => {
    // "all" 타입인 경우 variant에 따라 "전체" 또는 "추천"으로 표시
    if (category.type === 'all') {
      if (variant === 'all') {
        return getLocalizedTextByLocale(category.labels, lang);
      }
      const recommendedLabels: LocalizedText = {
        ko_KR: '추천',
        en_US: 'Recommend',
        th_TH: 'แนะนำ',
        zh_TW: '推薦',
        ja_JP: 'おすすめ',
        hi_IN: 'अनुशंसित',
        tl_PH: 'Recommend',
      };
      return getLocalizedTextByLocale(recommendedLabels, lang);
    }
    return getLocalizedTextByLocale(category.labels, lang);
  };

  const label = getLabel();

  const buttonContent = (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      {renderCategoryIconV2({
        categoryType: category.type,
        isActive,
        fallbackIcon: category.icon,
        variant,
      })}
      <p
        className={`text-center text-xs leading-4 font-medium ${
          isActive ? 'text-primary-900' : 'text-neutral-700'
        }`}
      >
        {label}
      </p>
    </div>
  );

  if (href) {
    return (
      <LocaleLink href={href} replace={replace} className='flex shrink-0'>
        {buttonContent}
      </LocaleLink>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className='flex shrink-0'>
        {buttonContent}
      </button>
    );
  }

  return <div className='flex shrink-0'>{buttonContent}</div>;
}
