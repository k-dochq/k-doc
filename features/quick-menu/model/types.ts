import { type Locale } from 'shared/config';
import { type LocalizedText } from 'shared/model/types/common';

export interface CategoryItem {
  id: string;
  type: string;
  icon: () => React.ReactNode;
  iconSmall: () => React.ReactNode;
  labels: LocalizedText;
}

export interface QuickMenuProps {
  lang: Locale;
}

export interface CategoryButtonProps {
  category: CategoryItem;
  lang: Locale;
}
