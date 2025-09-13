'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { ErrorState } from 'shared/ui/error-state';

interface PopularReviewsErrorProps {
  lang: Locale;
  dict: Dictionary;
  onRetry?: () => void;
  className?: string;
}

export function PopularReviewsError({
  lang,
  dict,
  onRetry,
  className = '',
}: PopularReviewsErrorProps) {
  return (
    <ErrorState
      title='후기를 불러올 수 없습니다'
      message='네트워크 연결을 확인하고 다시 시도해주세요.'
      onRetry={onRetry}
      retryButtonText='다시 시도'
      className={className}
    />
  );
}
