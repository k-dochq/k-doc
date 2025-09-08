import { Suspense } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { QuickMenu } from './QuickMenu';
import { QuickMenuSkeleton } from './QuickMenuSkeleton';
import { QuickMenuErrorBoundary } from './QuickMenuErrorBoundary';
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
    <QuickMenuErrorBoundary lang={lang} dict={dict}>
      <Suspense fallback={<QuickMenuSkeleton />}>
        <QuickMenuContent lang={lang} dict={dict} />
      </Suspense>
    </QuickMenuErrorBoundary>
  );
}
