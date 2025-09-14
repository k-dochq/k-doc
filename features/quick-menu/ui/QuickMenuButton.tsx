import { type CategoryButtonProps } from '../model/types';
import { LocalizedCategoryButton } from 'shared/ui/category-button';

export function QuickMenuButton({ category, lang }: CategoryButtonProps) {
  // 'all' 타입인 경우 category 쿼리 파라미터를 추가하지 않음
  const href = category.type === 'all' ? '/hospitals' : `/hospitals?category=${category.type}`;

  return <LocalizedCategoryButton category={category} lang={lang} href={href} />;
}
