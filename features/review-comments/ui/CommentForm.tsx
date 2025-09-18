'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type LocalizedText } from 'shared/lib/localized-text';
import { useCreateComment } from '../model';
import { useAuth } from 'shared/lib/auth';
import { CommentTextarea } from './CommentTextarea';

interface CommentFormProps {
  reviewId: string;
  lang: Locale;
  dict: Dictionary;
}

export function CommentForm({ reviewId, lang, dict }: CommentFormProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();

  const createCommentMutation = useCreateComment({
    reviewId,
    onSuccess: () => {
      setContent('');
      setIsSubmitting(false);
    },
    onError: (error) => {
      console.error('댓글 작성 실패:', error);
      setIsSubmitting(false);
      // TODO: 에러 토스트 표시
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() || !isAuthenticated) return;

    setIsSubmitting(true);

    // 현재 언어로만 댓글 작성 (다국어 지원은 추후 확장 가능)
    const localizedContent: LocalizedText = {
      [lang === 'ko' ? 'ko_KR' : lang === 'en' ? 'en_US' : 'th_TH']: content.trim(),
    };

    createCommentMutation.mutate(localizedContent);
  };

  return (
    <form onSubmit={handleSubmit} className='mb-6'>
      <div className='mb-3'>
        <CommentTextarea
          value={content}
          onChange={setContent}
          disabled={isSubmitting}
          isAuthenticated={isAuthenticated}
          authLoading={authLoading}
          dict={dict}
          rows={3}
        />
      </div>

      <div className='flex justify-end'>
        <button
          type='submit'
          disabled={!content.trim() || isSubmitting || !isAuthenticated || authLoading}
          className='rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300'
        >
          {authLoading
            ? '로딩 중...'
            : isSubmitting
              ? dict.comments?.form?.submitting || '작성 중...'
              : dict.comments?.form?.submit || '댓글 작성'}
        </button>
      </div>
    </form>
  );
}
