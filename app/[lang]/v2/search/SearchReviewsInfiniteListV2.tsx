'use client';

import { type MedicalSpecialtyType } from '@prisma/client';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ReviewSortOption, REVIEW_SORT_OPTIONS } from 'shared/model/types/review-query';
import { ReviewListCardV2 } from 'entities/review/ui/ReviewListCardV2';
import { ReviewsSkeletonV2 } from 'entities/review/ui/ReviewsSkeletonV2';
import { useInfiniteSearchReviews } from 'entities/review/api/queries/use-infinite-search-reviews';
import { useToggleReviewLike } from 'entities/review/model/useToggleReviewLike';
import { useToggleReviewRecommend } from 'entities/review/model/useToggleReviewRecommend';
import { ErrorState } from 'shared/ui/error-state';
import { InfiniteScrollTrigger } from 'shared/ui/infinite-scroll-trigger';
import { SearchEmptyState } from 'shared/ui/empty-state';
import { useAuth } from 'shared/lib/auth/useAuth';
import { openDrawer } from 'shared/lib/drawer';
import { LoginRequiredDrawer } from 'shared/ui/login-required-drawer';

interface SearchReviewsInfiniteListV2Props {
  lang: Locale;
  dict: Dictionary;
  query: string;
  sort?: ReviewSortOption;
  categories?: MedicalSpecialtyType[];
}

export function SearchReviewsInfiniteListV2({
  lang,
  dict,
  query,
  sort = REVIEW_SORT_OPTIONS.POPULAR,
  categories,
}: SearchReviewsInfiniteListV2Props) {
  const { user } = useAuth();

  const queryParams = { query, limit: 10, categories };

  const toggleLikeMutation = useToggleReviewLike({ queryParams: { limit: 10, sort } });
  const toggleRecommendMutation = useToggleReviewRecommend({ queryParams: { limit: 10, sort } });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteSearchReviews(queryParams);

  const handleToggleLike = async (reviewId: string) => {
    if (!user) {
      await openDrawer({ content: <LoginRequiredDrawer lang={lang} dict={dict} /> });
      return;
    }
    toggleLikeMutation.mutate(reviewId);
  };

  const handleToggleRecommend = async (reviewId: string) => {
    if (!user) {
      await openDrawer({ content: <LoginRequiredDrawer lang={lang} dict={dict} /> });
      return;
    }
    toggleRecommendMutation.mutate(reviewId);
  };

  const loadingReviewId = toggleLikeMutation.isPending ? toggleLikeMutation.variables : null;
  const loadingRecommendReviewId = toggleRecommendMutation.isPending
    ? toggleRecommendMutation.variables
    : null;

  if (isLoading) {
    return <ReviewsSkeletonV2 count={6} />;
  }

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

  const allReviews = data?.pages.flatMap((page) => page.reviews) || [];

  return (
    <div>
      {allReviews.length > 0 ? (
        <div className='flex flex-col'>
          {allReviews.map((review) => (
            <ReviewListCardV2
              key={review.id}
              review={review}
              lang={lang}
              dict={dict}
              user={user}
              onToggleLike={handleToggleLike}
              isLikeLoading={loadingReviewId === review.id}
              onToggleRecommend={handleToggleRecommend}
              isRecommendLoading={loadingRecommendReviewId === review.id}
            />
          ))}
          <InfiniteScrollTrigger
            onIntersect={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            loadingText={dict.allReviews?.loadingMore || '더 많은 리뷰를 불러오는 중...'}
            endText={dict.allReviews?.allLoaded || '모든 리뷰를 불러왔습니다.'}
          />
        </div>
      ) : (
        <SearchEmptyState dict={dict} />
      )}
    </div>
  );
}
