import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PopularReviewsV2Container } from './PopularReviewsV2Container';
import { ErrorBoundary, LocalizedErrorDisplay } from 'shared/ui/error-display';

interface PopularReviewsV2WrapperProps {
  lang: Locale;
  dict: Dictionary;
}

export function PopularReviewsV2Wrapper({ lang, dict }: PopularReviewsV2WrapperProps) {
  return (
    <ErrorBoundary fallback={<LocalizedErrorDisplay error={null} lang={lang} dict={dict} />}>
      <PopularReviewsV2Container lang={lang} dict={dict} />
    </ErrorBoundary>
  );
}
