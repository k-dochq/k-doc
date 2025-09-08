import { Suspense } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { QuickMenu } from './QuickMenu';
import { QuickMenuSkeleton } from './QuickMenuSkeleton';
import { ErrorBoundary, LocalizedErrorDisplay } from 'shared/ui/error-display';
import { getCategories } from '../api/use-cases/get-categories';

interface QuickMenuWrapperProps {
  lang: Locale;
  dict: Dictionary;
}

async function QuickMenuContent({ lang, dict }: QuickMenuWrapperProps) {
  const categories = await getCategories();
  return <QuickMenu lang={lang} dict={dict} categories={categories} />;
}

export function QuickMenuWrapper({ lang, dict }: QuickMenuWrapperProps) {
  return (
    <ErrorBoundary
      fallback={
        <LocalizedErrorDisplay
          error={null}
          lang={lang}
          dict={dict}
          onRetry={() => window.location.reload()}
        />
      }
    >
      <Suspense fallback={<QuickMenuSkeleton />}>
        <QuickMenuContent lang={lang} dict={dict} />
      </Suspense>
    </ErrorBoundary>
  );
}
