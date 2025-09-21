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
  isActive?: boolean;
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
  isActive = false,
}: CategoryButtonProps) {
  const getLabel = (): string => {
    return getLocalizedTextByLocale(category.labels, lang);
  };

  const buttonContent = isActive ? (
    <>
      <div
        className='h-[50px] w-[50px] rounded-xl border-none p-0.5'
        style={{
          background: 'linear-gradient(90deg, #FF60F7 0%, #AE33FB 100%)',
        }}
      >
        <div className='flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-b from-white to-[#FFD9F9]'>
          {category.icon()}
        </div>
      </div>
      <div className={`${categoryButtonStyles.label} ${labelClassName}`}>{getLabel()}</div>
    </>
  ) : (
    <>
      <div
        className='flex h-[50px] w-[50px] items-center justify-center rounded-xl border border-white'
        style={{
          background: 'linear-gradient(180deg, #FFF 0%, #FFD9F9 100%)',
        }}
      >
        {category.icon()}
      </div>
      <div className={`${categoryButtonStyles.label} ${labelClassName}`}>{getLabel()}</div>
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
