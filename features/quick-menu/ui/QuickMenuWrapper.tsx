import { Suspense } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { QuickMenu } from './QuickMenu';
import { QuickMenuSkeleton } from './QuickMenuSkeleton';
import { ErrorBoundary, LocalizedErrorDisplay } from 'shared/ui/error-display';
import { getCategories } from '../api/use-cases/get-medical-specialties';

interface QuickMenuWrapperProps {
  lang: Locale;
  dict: Dictionary;
}

async function QuickMenuContent({ lang, dict }: QuickMenuWrapperProps) {
  const categories = await getCategories();
  return <QuickMenu lang={lang} dict={dict} categories={categories} />;
}

// 카테고리 데이터는 자주 변경되지 않으므로 30분 캐시
export const revalidate = 1800; // 30분 (1800초)

export function QuickMenuWrapper({ lang, dict }: QuickMenuWrapperProps) {
  return (
    <ErrorBoundary fallback={<LocalizedErrorDisplay error={null} lang={lang} dict={dict} />}>
      <Suspense fallback={<QuickMenuSkeleton />}>
        <QuickMenuContent lang={lang} dict={dict} />
      </Suspense>
    </ErrorBoundary>
  );
}
