'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useComments } from '../model';
import { CommentList } from './CommentList';
import { CommentForm } from './CommentForm';

interface ReviewCommentsSectionV2Props {
  reviewId: string;
  lang: Locale;
  dict: Dictionary;
  className?: string;
}

export function ReviewCommentsSectionV2({
  reviewId,
  lang,
  dict,
  className = '',
}: ReviewCommentsSectionV2Props) {
  const { data } = useComments({ reviewId });

  // 모든 페이지의 댓글을 합쳐 총 개수 계산
  const totalComments = data?.pages.reduce((total, page) => total + page.comments.length, 0) || 0;

  return (
    <section className={`bg-white ${className} border-t-[6px] border-neutral-100`}>
      <div className='p-5'>
        <div className='flex items-center gap-1 text-base font-semibold text-neutral-900'>
          <span>{dict.comments?.title || '댓글'}</span>
          {totalComments > 0 && <span className='text-primary-900'>{totalComments}</span>}
        </div>

        <CommentList reviewId={reviewId} lang={lang} dict={dict} />
      </div>

      <div className='border-t border-neutral-200'>
        <CommentForm reviewId={reviewId} lang={lang} dict={dict} />
      </div>
    </section>
  );
}
