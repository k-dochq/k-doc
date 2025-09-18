'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type LocalizedText } from 'shared/lib/localized-text';
import { useCreateComment } from '../model';
import { useAuth } from 'shared/lib/auth';

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
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={
            !isAuthenticated
              ? dict.comments?.form?.loginRequired || '로그인이 필요합니다'
              : dict.comments?.form?.placeholder || '댓글을 입력하세요...'
          }
          className={`w-full resize-none rounded-lg border px-3 py-2 focus:outline-none ${
            !isAuthenticated || authLoading
              ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400'
              : 'border-gray-300 focus:border-transparent focus:ring-2 focus:ring-blue-500'
          }`}
          rows={3}
          disabled={isSubmitting || !isAuthenticated || authLoading}
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
