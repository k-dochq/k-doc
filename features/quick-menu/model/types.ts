import { type Locale } from 'shared/config';

export interface CategoryItem {
  id: string;
  icon: () => React.ReactNode;
  labels: {
    ko: string;
    en: string;
    th: string;
  };
}

export interface QuickMenuProps {
  lang: Locale;
}

export interface CategoryButtonProps {
  category: CategoryItem;
  lang: Locale;
}
