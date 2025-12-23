'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { ReviewLikeButtonV2 } from '@/features/review-like/ui/ReviewLikeButtonV2';
import { MoreVerticalIcon } from 'shared/ui/icons';
import { openDrawer } from 'shared/lib/drawer';
import { useAuth } from 'shared/lib/auth/useAuth';
import { ReviewActionDrawer } from './ReviewActionDrawer';

interface ReviewDetailHeaderActionsProps {
  reviewId: string;
  reviewUserId: string;
  locale: Locale;
  dict: Dictionary;
}

export function ReviewDetailHeaderActions({
  reviewId,
  reviewUserId,
  locale,
  dict,
}: ReviewDetailHeaderActionsProps) {
  const { user } = useAuth();

  // 내가 작성한 리뷰인지 확인
  const isMyReview = user?.id === reviewUserId;

  const handleMoreClick = async () => {
    await openDrawer({
      content: <ReviewActionDrawer lang={locale} dict={dict} />,
    });
  };

  return (
    <div className='flex items-center gap-3'>
      {/* 좋아요 버튼 */}
      <ReviewLikeButtonV2 reviewId={reviewId} locale={locale} dict={dict} />

      {/* 내가 작성한 리뷰인 경우 햄버거 버튼 표시 */}
      {isMyReview && (
        <button
          onClick={handleMoreClick}
          className='flex h-6 w-6 items-center justify-center transition-opacity hover:opacity-70'
          type='button'
          aria-label='더보기'
        >
          <MoreVerticalIcon width={24} height={24} />
        </button>
      )}
    </div>
  );
}
