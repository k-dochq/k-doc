import { type CategoryItem } from '../model/types';
import { type Locale } from 'shared/config';
import { QuickMenuButton } from './QuickMenuButton';

interface QuickMenuRowProps {
  categories: CategoryItem[];
  lang: Locale;
}

export function QuickMenuRow({ categories, lang }: QuickMenuRowProps) {
  return (
    <div className='flex items-center justify-between'>
      {categories.map((category) => (
        <QuickMenuButton key={category.id} category={category} lang={lang} />
      ))}
    </div>
  );
}
