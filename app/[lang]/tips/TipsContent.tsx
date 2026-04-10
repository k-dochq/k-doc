'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type TipsSortOption, useInfiniteTips } from 'entities/tip/model/useInfiniteTips';
import { TipArticleList } from 'entities/tip/ui/TipArticleList';
import { TipArticleCardSkeletonList } from 'entities/tip/ui/TipArticleCardSkeleton';
import { TipsSortFilterBar } from 'entities/tip/ui/TipsSortFilterBar';
import { TipsErrorState } from 'entities/tip/ui/TipsErrorState';

interface TipsContentProps {
  lang: Locale;
  dict: Dictionary;
}

export function TipsContent({ lang, dict }: TipsContentProps) {
  const [sort, setSort] = useState<TipsSortOption>('latest');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteTips({ limit: 10, sort });

  const allArticles = data?.pages.flatMap((page) => page.articles) ?? [];

  return (
    <div>
      <TipsSortFilterBar
        dict={dict}
        currentSort={sort}
        onSortChange={setSort}
      />

      {isLoading ? (
        <TipArticleCardSkeletonList count={5} />
      ) : isError ? (
        <TipsErrorState dict={dict} />
      ) : (
        <TipArticleList
          articles={allArticles}
          lang={lang}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage ?? false}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </div>
  );
}
