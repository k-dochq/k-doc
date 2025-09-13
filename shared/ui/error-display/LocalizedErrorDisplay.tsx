'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { ErrorState } from '../error-state/ErrorState';

interface LocalizedErrorDisplayProps {
  error: unknown;
  lang: Locale;
  dict: Dictionary;
  onRetry?: () => void;
  className?: string;
}
export function LocalizedErrorDisplay({
  error,
  lang,
  dict,
  onRetry,
  className = '',
}: LocalizedErrorDisplayProps) {
  // onRetry가 제공되지 않은 경우 기본적으로 페이지 새로고침
  const handleRetry =
    onRetry ||
    (() => {
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    });

  return (
    <ErrorState
      title={dict.error.title}
      message={dict.error.description}
      onRetry={handleRetry}
      className={className}
    />
  );
}
