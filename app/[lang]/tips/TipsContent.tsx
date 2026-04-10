'use client';

import { type Locale } from 'shared/config';
import { useInfiniteTips } from 'entities/tip/model/useInfiniteTips';
import { TipArticleCard } from 'entities/tip/ui/TipArticleCard';
import { TipArticleCardSkeletonList } from 'entities/tip/ui/TipArticleCardSkeleton';
import { InfiniteScrollTrigger } from 'shared/ui/infinite-scroll-trigger';

interface TipsContentProps {
  lang: Locale;
}

export function TipsContent({ lang }: TipsContentProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteTips({ limit: 10 });

  const allArticles = data?.pages.flatMap((page) => page.articles) ?? [];

  if (isLoading) {
    return <TipArticleCardSkeletonList count={5} />;
  }

  if (isError) {
    return <div className='py-12 text-center text-sm text-neutral-400'>데이터를 불러올 수 없습니다.</div>;
  }

  return (
    <div className='flex flex-col gap-4 pt-4'>
      {allArticles.map((article) => (
        <TipArticleCard key={article.id} article={article} lang={lang} />
      ))}

      <InfiniteScrollTrigger
        onIntersect={fetchNextPage}
        hasNextPage={hasNextPage ?? false}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
}
