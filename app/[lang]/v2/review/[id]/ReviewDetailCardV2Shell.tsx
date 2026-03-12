'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ReviewCardData } from 'entities/review/model/types';
import { ReviewListCardV2 } from 'entities/review/ui/ReviewListCardV2';
import { useAuth } from 'shared/lib/auth/useAuth';
import { useToggleReviewLike } from 'entities/review/model/useToggleReviewLike';
import { useToggleReviewRecommend } from 'entities/review/model/useToggleReviewRecommend';
import { useGetReviewDetail } from 'entities/review/model/useGetReviewDetail';
import { REVIEW_SORT_OPTIONS } from 'shared/model/types/review-query';
import { openDrawer } from 'shared/lib/drawer';
import { LoginRequiredDrawer } from 'shared/ui/login-required-drawer';

interface ReviewDetailCardV2ShellProps {
  review: ReviewCardData;
  lang: Locale;
  dict: Dictionary;
}

export function ReviewDetailCardV2Shell({
  review: initialReview,
  lang,
  dict,
}: ReviewDetailCardV2ShellProps) {
  const { user } = useAuth();

  const { data: review = initialReview } = useGetReviewDetail(initialReview.id, initialReview);

  const queryParams = {
    limit: 10,
    sort: REVIEW_SORT_OPTIONS.RECOMMENDED,
  };

  const toggleLikeMutation = useToggleReviewLike({ queryParams });
  const toggleRecommendMutation = useToggleReviewRecommend({ queryParams });

  const handleToggleLike = async (reviewId: string) => {
    if (!user) {
      await openDrawer({
        content: <LoginRequiredDrawer lang={lang} dict={dict} />,
      });
      return;
    }
    toggleLikeMutation.mutate(reviewId);
  };

  const handleToggleRecommend = async (reviewId: string) => {
    if (!user) {
      await openDrawer({
        content: <LoginRequiredDrawer lang={lang} dict={dict} />,
      });
      return;
    }
    toggleRecommendMutation.mutate(reviewId);
  };

  return (
    <ReviewListCardV2
      review={review}
      lang={lang}
      dict={dict}
      user={user}
      onToggleLike={handleToggleLike}
      isLikeLoading={toggleLikeMutation.isPending}
      onToggleRecommend={handleToggleRecommend}
      isRecommendLoading={toggleRecommendMutation.isPending}
      forceContentExpanded
      disableLink
      useHorizontalImages
    />
  );
}
