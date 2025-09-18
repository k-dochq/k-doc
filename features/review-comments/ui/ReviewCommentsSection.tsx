'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { CommentList } from './CommentList';
import { CommentForm } from './CommentForm';

interface ReviewCommentsSectionProps {
  reviewId: string;
  lang: Locale;
  dict: Dictionary;
}

export function ReviewCommentsSection({ reviewId, lang, dict }: ReviewCommentsSectionProps) {
  return (
    <div className='mt-6 border-t border-gray-200 p-5'>
      <div className='mb-4'>
        <h3 className='text-base font-bold'>{dict.comments?.title || '댓글'}</h3>
      </div>

      {/* 댓글 목록 */}
      <CommentList reviewId={reviewId} lang={lang} dict={dict} />

      {/* 댓글 작성 폼 */}
      <CommentForm reviewId={reviewId} lang={lang} dict={dict} />
    </div>
  );
}
