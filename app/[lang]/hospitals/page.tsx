import { Suspense } from 'react';
import { type Locale } from 'shared/config';
import { ErrorBoundary, LocalizedErrorDisplay } from 'shared/ui/error-display';
import { getDictionary } from 'app/[lang]/dictionaries';
import { HospitalsContent } from './HospitalsContent';
import { HospitalsSkeleton } from './HospitalsSkeleton';

interface HospitalsPageProps {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{
    page?: string;
    sortBy?: string;
    specialtyType?: string;
  }>;
}

// 병원 리스트는 자주 변경되므로 5분 캐시
export const revalidate = 300; // 5분 (300초)

export default async function HospitalsPage({ params, searchParams }: HospitalsPageProps) {
  const { lang } = await params;
  const resolvedSearchParams = await searchParams;
  const dict = await getDictionary(lang);

  return (
    <ErrorBoundary fallback={<LocalizedErrorDisplay error={null} lang={lang} dict={dict} />}>
      <Suspense fallback={<HospitalsSkeleton />}>
        <HospitalsContent lang={lang} dict={dict} searchParams={resolvedSearchParams} />
      </Suspense>
    </ErrorBoundary>
  );
}
