'use client';

import { type MedicalSpecialtyType } from '@prisma/client';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ReviewSortOption, REVIEW_SORT_OPTIONS } from 'shared/model/types/review-query';
import { ReviewListCard, ReviewsSkeleton, useInfiniteAllReviews } from 'entities/review';
import { ErrorState } from 'shared/ui/error-state';
import { InfiniteScrollTrigger } from 'shared/ui/infinite-scroll-trigger';
import { useAuth } from 'shared/lib/auth/useAuth';

interface AllReviewsInfiniteListProps {
  lang: Locale;
  dict: Dictionary;
  searchParams: {
    category?: MedicalSpecialtyType;
    sort?: ReviewSortOption;
  };
}

export function AllReviewsInfiniteList({ lang, dict, searchParams }: AllReviewsInfiniteListProps) {
  const { category, sort } = searchParams;
  const { user: _user } = useAuth();

  // 타입 안전한 파라미터 구성
  const queryParams = {
    limit: 10,
    sortBy: sort || REVIEW_SORT_OPTIONS.LATEST,
    category,
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteAllReviews(queryParams);

  // 로딩 상태
  if (isLoading) {
    return <ReviewsSkeleton count={6} />;
  }

  // 에러 상태
  if (isError) {
    return (
      <ErrorState
        title='리뷰 데이터를 불러올 수 없습니다'
        message='네트워크 연결을 확인하고 잠시 후 다시 시도해주세요'
        onRetry={() => window.location.reload()}
        className='py-12'
      />
    );
  }

  // 데이터 플래튼
  const allReviews = data?.pages.flatMap((page) => page.reviews) || [];

  return (
    <div>
      {/* 리뷰 리스트 */}
      {allReviews.length > 0 ? (
        <div className=''>
          {allReviews.map((review) => (
            <div key={review.id} className='p-5'>
              <ReviewListCard review={review} lang={lang} />
            </div>
          ))}

          {/* 무한 스크롤 트리거 */}
          <InfiniteScrollTrigger
            onIntersect={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            loadingText='더 많은 리뷰를 불러오는 중...'
            endText='모든 리뷰를 불러왔습니다.'
          />
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center py-12'>
          <div className='text-center'>
            <p className='text-gray-500'>{dict.allReviews?.empty?.title || '리뷰가 없습니다.'}</p>
          </div>
        </div>
      )}
    </div>
  );
}
