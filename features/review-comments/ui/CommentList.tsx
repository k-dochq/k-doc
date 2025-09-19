'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useComments } from '../model';
import { CommentItem } from './CommentItem';

interface CommentListProps {
  reviewId: string;
  lang: Locale;
  dict: Dictionary;
}

export function CommentList({ reviewId, lang, dict }: CommentListProps) {
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useComments({
    reviewId,
  });

  if (isLoading) {
    return (
      <div className='py-4'>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className='animate-pulse'>
            <div className='flex space-x-3'>
              <div className='h-8 w-8 rounded-full bg-white/50'></div>
              <div className='flex-1 space-y-2'>
                <div className='h-4 w-1/4 rounded bg-white/50'></div>
                <div className='h-4 w-3/4 rounded bg-white/50'></div>
                <div className='h-3 w-1/6 rounded bg-white/50'></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className='py-8 text-center'>
        <p className='text-gray-500'>
          {dict.comments?.list?.error || '댓글을 불러오는 중 오류가 발생했습니다.'}
        </p>
      </div>
    );
  }

  const comments = data?.pages.flatMap((page) => page.comments) || [];

  if (comments.length === 0) {
    return (
      <div className='py-4 text-center'>
        <p className=''>{dict.comments?.list?.empty || '첫 번째 댓글을 작성해보세요!'}</p>
      </div>
    );
  }

  return (
    <div className='pt-4'>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} lang={lang} dict={dict} />
      ))}

      {hasNextPage && (
        <div className='pt-4 text-center'>
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className='px-4 text-blue-600 hover:text-blue-800 disabled:text-gray-400'
          >
            {isFetchingNextPage
              ? dict.comments?.list?.loading || '로딩 중...'
              : dict.comments?.list?.loadMore || '더 보기'}
          </button>
        </div>
      )}
    </div>
  );
}
