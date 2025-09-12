import { type Locale } from 'shared/config';
import { QuickMenu } from './QuickMenu';

interface QuickMenuWrapperProps {
  lang: Locale;
}

export function QuickMenuWrapper({ lang }: QuickMenuWrapperProps) {
  return <QuickMenu lang={lang} />;
}
