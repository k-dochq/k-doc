import { ArticleItem } from './ArticleItem';
import { type ArticleItemType } from './types';

interface ArticleItemsProps {
  items: ArticleItemType[];
}

export function ArticleItems({ items }: ArticleItemsProps) {
  return (
    <div className='flex flex-col gap-2'>
      {items.map((item, index) => (
        <ArticleItem key={index} item={item} index={index} />
      ))}
    </div>
  );
}
