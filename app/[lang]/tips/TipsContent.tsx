'use client';

import { useInfiniteTips } from 'entities/tip/model/useInfiniteTips';
import { InfiniteScrollTrigger } from 'shared/ui/infinite-scroll-trigger';

export function TipsContent() {
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
    return <div className='py-12 text-center text-sm text-neutral-400'>로딩 중...</div>;
  }

  if (isError) {
    return <div className='py-12 text-center text-sm text-neutral-400'>데이터를 불러올 수 없습니다.</div>;
  }

  return (
    <div>
      {/* TODO: 아티클 카드 UI 구현 */}
      <div className='py-4 text-sm text-neutral-500'>
        {allArticles.length}개의 아티클 로드됨
      </div>

      {allArticles.map((article) => (
        <div key={article.id} className='border-b py-3 text-sm'>
          {article.title?.ko ?? article.title?.en ?? article.slug}
        </div>
      ))}

      <InfiniteScrollTrigger
        onIntersect={fetchNextPage}
        hasNextPage={hasNextPage ?? false}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
}
