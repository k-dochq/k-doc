'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ReviewSortOption, REVIEW_SORT_OPTIONS } from 'shared/model/types/review-query';
import {
  ReviewListCard,
  ReviewsSkeleton,
  useInfiniteAllReviews,
  createHospitalReviewsInfiniteQueryParams,
} from 'entities/review';
import { useToggleReviewLike } from 'entities/review/model/useToggleReviewLike';
import { ErrorState } from 'shared/ui/error-state';
import { InfiniteScrollTrigger } from 'shared/ui/infinite-scroll-trigger';
import { EmptyReviewsState } from 'shared/ui/empty-state';
import { PageHeader } from 'shared/ui/page-header';
import { useAuth } from 'shared/lib/auth/useAuth';
import { openModal } from 'shared/lib/modal';
import { LoginRequiredModal } from 'shared/ui/login-required-modal';

interface HospitalReviewsContentProps {
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
  searchParams?: {
    sort?: ReviewSortOption;
  };
}

export function HospitalReviewsContent({
  hospitalId,
  lang,
  dict,
  searchParams = {},
}: HospitalReviewsContentProps) {
  const { sort } = searchParams;
  const { user } = useAuth();

  // 공통 쿼리 파라미터 생성 함수 사용
  const queryParams = createHospitalReviewsInfiniteQueryParams(
    hospitalId,
    sort || REVIEW_SORT_OPTIONS.LATEST,
    10,
  );

  // 좋아요 토글 뮤테이션
  const toggleLikeMutation = useToggleReviewLike({ queryParams });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteAllReviews(queryParams);

  // 좋아요 토글 핸들러
  const handleToggleLike = (reviewId: string) => {
    // 로그인 체크
    if (!user) {
      openModal({
        content: (
          <LoginRequiredModal lang={lang} dict={dict} redirectPath={window.location.pathname} />
        ),
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
        title={dict.hospitalReviews?.error?.title || '리뷰 데이터를 불러올 수 없습니다'}
        message={
          dict.hospitalReviews?.error?.message ||
          '네트워크 연결을 확인하고 잠시 후 다시 시도해주세요'
        }
        onRetry={() => window.location.reload()}
        className='py-12'
      />
    );
  }

  // 데이터 플래튼
  const allReviews = data?.pages.flatMap((page) => page.reviews) || [];

  return (
    <div className=''>
      {/* 헤더 */}
      <PageHeader
        lang={lang}
        title={dict.hospitalReviews?.title || '시술후기'}
        fallbackUrl={`/${lang}/hospital/${hospitalId}`}
        variant='light'
      />

      {/* 리뷰 리스트 */}
      {allReviews.length > 0 ? (
        <div className='flex flex-col gap-6 px-5 py-5'>
          {allReviews.map((review, index) => (
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
            loadingText={dict.hospitalReviews?.loadingMore || '더 많은 리뷰를 불러오는 중...'}
            endText={dict.hospitalReviews?.allLoaded || '모든 리뷰를 불러왔습니다.'}
          />
        </div>
      ) : (
        <EmptyReviewsState dict={dict} />
      )}
    </div>
  );
}
