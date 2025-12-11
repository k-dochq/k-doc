'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ReviewCardData } from 'entities/review/model/types';
import { ReviewListCardV2 } from 'entities/review/ui/ReviewListCardV2';
import { useAuth } from 'shared/lib/auth/useAuth';
import { useToggleReviewLike } from 'entities/review/model/useToggleReviewLike';
import { REVIEW_SORT_OPTIONS } from 'shared/model/types/review-query';
import { openModal } from 'shared/lib/modal';
import { LoginRequiredModal } from 'shared/ui/login-required-modal';
import { useMemo, useState } from 'react';

interface ReviewDetailCardV2ShellProps {
  review: ReviewCardData;
  lang: Locale;
  dict: Dictionary;
}

export function ReviewDetailCardV2Shell({ review, lang, dict }: ReviewDetailCardV2ShellProps) {
  const { user } = useAuth();

  const queryParams = {
    limit: 10,
    sort: REVIEW_SORT_OPTIONS.RECOMMENDED,
  };

  const toggleLikeMutation = useToggleReviewLike({ queryParams });
  const loadingReviewId = toggleLikeMutation.isPending ? toggleLikeMutation.variables : null;

  // 로컬 상태로 즉시 반영
  const initialIsLiked = useMemo(
    () => (user && review.likedUserIds ? review.likedUserIds.includes(user.id) : false),
    [review.likedUserIds, user],
  );
  const initialLikeCount = review.likeCount ?? 0;

  const [isLikedLocal, setIsLikedLocal] = useState(initialIsLiked);
  const [likeCountLocal, setLikeCountLocal] = useState(initialLikeCount);

  const handleToggleLike = (reviewId: string) => {
    const nextIsLiked = !isLikedLocal;
    const delta = nextIsLiked ? 1 : -1;

    if (!user) {
      openModal({
        content: (
          <LoginRequiredModal lang={lang} dict={dict} redirectPath={window.location.pathname} />
        ),
      });
      return;
    }

    // optimistic update
    setIsLikedLocal(nextIsLiked);
    setLikeCountLocal((prev) => prev + delta);

    toggleLikeMutation.mutate(reviewId, {
      onError: () => {
        // rollback
        setIsLikedLocal(!nextIsLiked);
        setLikeCountLocal((prev) => prev - delta);
      },
    });
  };

  const reviewWithLocal = useMemo(
    () => ({
      ...review,
      likeCount: likeCountLocal,
      likedUserIds: isLikedLocal
        ? [...(review.likedUserIds || []), user?.id || '']
        : (review.likedUserIds || []).filter((id) => id !== user?.id),
    }),
    [isLikedLocal, likeCountLocal, review, user?.id],
  );

  return (
    <ReviewListCardV2
      review={reviewWithLocal}
      lang={lang}
      dict={dict}
      user={user}
      onToggleLike={handleToggleLike}
      isLikeLoading={loadingReviewId === review.id}
      forceContentExpanded
      disableLink
      useHorizontalImages
    />
  );
}
