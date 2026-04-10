'use client';

import { type Locale } from 'shared/config';
import { type TipArticle } from '../model/useInfiniteTips';
import { TipArticleCard } from './TipArticleCard';
import { InfiniteScrollTrigger } from 'shared/ui/infinite-scroll-trigger';

interface TipArticleListProps {
  articles: TipArticle[];
  lang: Locale;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export function TipArticleList({
  articles,
  lang,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: TipArticleListProps) {
  return (
    <div className='flex flex-col gap-4 pt-4'>
      {articles.map((article) => (
        <TipArticleCard key={article.id} article={article} lang={lang} />
      ))}

      <InfiniteScrollTrigger
        onIntersect={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
}
