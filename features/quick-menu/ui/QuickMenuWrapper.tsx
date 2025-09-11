import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { QuickMenu } from './QuickMenu';
import { getCategories } from '../api/use-cases/get-medical-specialties';

interface QuickMenuWrapperProps {
  lang: Locale;
  dict: Dictionary;
}

async function QuickMenuContent({ lang, dict }: QuickMenuWrapperProps) {
  const categories = await getCategories();
  return <QuickMenu lang={lang} dict={dict} categories={categories} />;
}

export function QuickMenuWrapper({ lang, dict }: QuickMenuWrapperProps) {
  return <QuickMenuContent lang={lang} dict={dict} />;
}
