'use client';

import { type Locale } from 'shared/config';
import { ReviewImagesHeader } from './ReviewImagesHeader';
import { ErrorState } from 'shared/ui/error-state/ErrorState';

interface ReviewImagesErrorStateProps {
  lang: Locale;
  error?: Error | null;
  onRetry?: () => void;
  className?: string;
}

export function ReviewImagesErrorState({
  lang,
  error,
  onRetry,
  className = '',
}: ReviewImagesErrorStateProps) {
  const getErrorMessage = () => {
    if (error?.message?.includes('404') || error?.message?.includes('not found')) {
      return {
        title: '리뷰를 찾을 수 없습니다',
        message: '요청하신 리뷰가 존재하지 않거나 삭제되었을 수 있습니다.',
      };
    }

    return {
      title: '이미지를 불러올 수 없습니다',
      message: '네트워크 연결을 확인하고 잠시 후 다시 시도해주세요.',
    };
  };

  const { title, message } = getErrorMessage();

  return (
    <div className={`flex min-h-screen flex-col bg-white ${className}`}>
      <ReviewImagesHeader headerText={null} lang={lang} />
      <div className='flex flex-1 items-center justify-center'>
        <ErrorState title={title} message={message} onRetry={onRetry} retryButtonText='다시 시도' />
      </div>
    </div>
  );
}
