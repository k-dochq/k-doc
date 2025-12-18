'use client';

import { type MedicalSpecialtyType } from '@prisma/client';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ReviewSortOption, REVIEW_SORT_OPTIONS } from 'shared/model/types/review-query';
import { ReviewListCard, ReviewsSkeleton, useInfiniteAllReviews } from 'entities/review';
import { useToggleReviewLike } from 'entities/review/model/useToggleReviewLike';
import { ErrorState } from 'shared/ui/error-state';
import { InfiniteScrollTrigger } from 'shared/ui/infinite-scroll-trigger';
import { EmptyReviewsState } from 'shared/ui/empty-state';
import { useAuth } from 'shared/lib/auth/useAuth';
import { openDrawer } from 'shared/lib/drawer';
import { LoginRequiredDrawer } from 'shared/ui/login-required-drawer';

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
  const { user } = useAuth();

  // 타입 안전한 파라미터 구성
  const queryParams = {
    limit: 10,
    sort: sort || REVIEW_SORT_OPTIONS.POPULAR,
    category,
  };

  // 좋아요 토글 뮤테이션
  const toggleLikeMutation = useToggleReviewLike({ queryParams });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteAllReviews(queryParams);

  // 좋아요 토글 핸들러
  const handleToggleLike = async (reviewId: string) => {
    // 로그인 체크
    if (!user) {
      await openDrawer({
        content: <LoginRequiredDrawer lang={lang} dict={dict} />,
      });
      return;
    }

    toggleLikeMutation.mutate(reviewId);
  };

  // 현재 로딩 중인 리뷰 ID (TanStack Query의 variables 활용)
  const loadingReviewId = toggleLikeMutation.isPending ? toggleLikeMutation.variables : null;

  // 로딩 상태
  if (isLoading) {
    return <ReviewsSkeleton count={6} />;
  }

  // 에러 상태
  if (isError) {
    return (
      <ErrorState
        title={dict.allReviews?.error?.title || '리뷰 데이터를 불러올 수 없습니다'}
        message={
          dict.allReviews?.error?.message || '네트워크 연결을 확인하고 잠시 후 다시 시도해주세요'
        }
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
        <div className='flex flex-col gap-6 p-5'>
          {allReviews.map((review, _index) => (
            <div key={review.id}>
              <ReviewListCard
                review={review}
                lang={lang}
                dict={dict}
                user={user}
                onToggleLike={handleToggleLike}
                isLikeLoading={loadingReviewId === review.id}
              />
            </div>
          ))}

          {/* 무한 스크롤 트리거 */}
          <InfiniteScrollTrigger
            onIntersect={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            loadingText={dict.allReviews?.loadingMore || '더 많은 리뷰를 불러오는 중...'}
            endText={dict.allReviews?.allLoaded || '모든 리뷰를 불러왔습니다.'}
          />
        </div>
      ) : (
        <EmptyReviewsState dict={dict} />
      )}
    </div>
  );
}
