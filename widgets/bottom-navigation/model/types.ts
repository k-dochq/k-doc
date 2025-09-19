import { type Locale } from 'shared/config';

export interface NavigationItem {
  id: string;
  href: string;
  icon: React.ComponentType<{ className?: string; active?: boolean }>;
  label: Record<Locale, string>;
}

export interface BottomNavigationProps {
  currentLang: Locale;
  currentPath?: string;
}
