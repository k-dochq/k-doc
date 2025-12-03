'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { ErrorBoundary, LocalizedErrorDisplay } from 'shared/ui/error-display';
import { YoutubeVideosV2Container } from './YoutubeVideosV2Container';

interface YoutubeVideosV2WrapperProps {
  lang: Locale;
  dict: Dictionary;
}

export function YoutubeVideosV2Wrapper({ lang, dict }: YoutubeVideosV2WrapperProps) {
  return (
    <ErrorBoundary fallback={<LocalizedErrorDisplay error={null} lang={lang} dict={dict} />}>
      <YoutubeVideosV2Container lang={lang} dict={dict} />
    </ErrorBoundary>
  );
}
