import { type Locale } from 'shared/config';

export interface NavigationItem {
  id: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: Record<Locale, string>;
}

export interface BottomNavigationProps {
  currentLang: Locale;
  currentPath?: string;
}
