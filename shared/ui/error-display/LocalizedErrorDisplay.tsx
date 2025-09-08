'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { ErrorDisplay } from './ErrorDisplay';

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
  return (
    <ErrorDisplay
      error={error}
      title={dict.error.title}
      description={dict.error.description}
      onRetry={onRetry}
      className={className}
    />
  );
}
