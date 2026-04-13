'use client';

import { useSearchParams, usePathname } from 'next/navigation';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useLocalizedRouter } from 'shared/model/hooks';
import { type TipsSortOption, useInfiniteTips } from 'entities/tip/model/useInfiniteTips';
import { TipArticleList } from 'entities/tip/ui/TipArticleList';
import { TipArticleCardSkeletonList } from 'entities/tip/ui/TipArticleCardSkeleton';
import { TipsSortFilterBar } from 'entities/tip/ui/TipsSortFilterBar';
import { TipsErrorState } from 'entities/tip/ui/TipsErrorState';

interface TipsContentProps {
  lang: Locale;
  dict: Dictionary;
  initialSort: TipsSortOption;
}

function parseSort(value: string | null): TipsSortOption {
  return value === 'popular' ? 'popular' : 'latest';
}

export function TipsContent({ lang, dict, initialSort }: TipsContentProps) {
  const router = useLocalizedRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const sort = parseSort(searchParams?.get('sort') ?? initialSort);

  const handleSortChange = (next: TipsSortOption) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('sort', next);
    const basePath = pathname?.replace(/^\/[^/]+/, '') || '/tips';
    router.replace(`${basePath}?${params.toString()}`);
  };

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
        onSortChange={handleSortChange}
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
