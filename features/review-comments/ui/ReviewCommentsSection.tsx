'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { CommentList } from './CommentList';
import { CommentForm } from './CommentForm';
import { useComments } from '../model';

interface ReviewCommentsSectionProps {
  reviewId: string;
  lang: Locale;
  dict: Dictionary;
}

export function ReviewCommentsSection({ reviewId, lang, dict }: ReviewCommentsSectionProps) {
  const { data } = useComments({ reviewId });

  // 모든 페이지의 댓글을 합쳐서 총 개수 계산
  const totalComments = data?.pages.reduce((total, page) => total + page.comments.length, 0) || 0;

  return (
    <div className='mt-6 bg-white/50'>
      <div className='px-5 pt-5 pb-8'>
        <h3 className='text-base font-bold'>
          {dict.comments?.title || '댓글'} {totalComments > 0 && `${totalComments}개`}
        </h3>
        {/* 댓글 목록 */}
        <CommentList reviewId={reviewId} lang={lang} dict={dict} />
      </div>

      {/* 댓글 작성 폼 */}
      <CommentForm reviewId={reviewId} lang={lang} dict={dict} />
    </div>
  );
}
