'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { ReviewLikeButtonV2 } from '@/features/review-like/ui/ReviewLikeButtonV2';
import { MoreVerticalIcon, ShareIconV2 } from 'shared/ui/icons';
import { openDrawer } from 'shared/lib/drawer';
import { useAuth } from 'shared/lib/auth/useAuth';
import { useShare } from 'shared/lib/hooks/useShare';
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
  const { share, isLoading } = useShare();

  const isMyReview = user?.id === reviewUserId;

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const url = typeof window !== 'undefined' ? window.location.href : '';
    await share({ title: 'K-DOC', url });
  };

  const handleMoreClick = async () => {
    await openDrawer({
      content: <ReviewActionDrawer lang={locale} dict={dict} reviewId={reviewId} />,
    });
  };

  return (
    <div className='flex items-center gap-3'>
      <div className='md:hidden'>
        <button
          onClick={handleShare}
          className={`flex items-center justify-center p-0 ${isLoading ? 'opacity-50' : ''}`}
          aria-label='공유하기'
          disabled={isLoading}
          type='button'
        >
          <ShareIconV2 />
        </button>
      </div>

      <ReviewLikeButtonV2 reviewId={reviewId} locale={locale} dict={dict} />

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
