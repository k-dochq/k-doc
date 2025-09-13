import { type CategoryButtonProps } from '../model/types';
import { LocalizedCategoryButton } from 'shared/ui/category-button';

export function QuickMenuButton({ category, lang }: CategoryButtonProps) {
  return (
    <LocalizedCategoryButton
      category={category}
      lang={lang}
      href={`/hospitals?category=${category.type}`}
    />
  );
}
