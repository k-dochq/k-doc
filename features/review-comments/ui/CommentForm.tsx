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

  const getPlaceholderText = () => {
    if (!isAuthenticated) {
      return dict.comments?.form?.loginRequired || '로그인이 필요합니다';
    }
    return dict.comments?.form?.placeholder || '댓글을 달아보세요.';
  };

  const getButtonText = () => {
    if (authLoading) return '로딩 중...';
    if (isSubmitting) return dict.comments?.form?.submitting || '작성 중...';
    return dict.comments?.form?.submit || '등록';
  };

  return (
    <form id='comment-form' onSubmit={handleSubmit} className='bg-white px-5 pb-7'>
      <div className='relative flex items-center justify-between bg-white py-4'>
        <input
          type='text'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={getPlaceholderText()}
          disabled={isSubmitting || !isAuthenticated || authLoading}
          className={`flex-1 border-none bg-transparent text-sm leading-5 font-medium outline-none ${
            !isAuthenticated || authLoading
              ? 'cursor-not-allowed text-neutral-900'
              : 'text-neutral-900 placeholder:text-neutral-400'
          }`}
          style={{ fontFamily: 'Pretendard, sans-serif' }}
        />
        <button
          type='submit'
          disabled={!content.trim() || isSubmitting || !isAuthenticated || authLoading}
          className='text-sm leading-5 font-semibold text-[#da47ef] transition-colors disabled:cursor-not-allowed disabled:text-neutral-300'
          style={{ fontFamily: 'Pretendard, sans-serif' }}
        >
          {getButtonText()}
        </button>
      </div>
    </form>
  );
}
