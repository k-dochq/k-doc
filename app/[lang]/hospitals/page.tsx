import { Suspense } from 'react';
import { type Locale } from 'shared/config';
import { getDictionary } from 'app/[lang]/dictionaries';
import { ErrorBoundary } from 'shared/ui/error-display';
import { ErrorState } from 'shared/ui/error-state';
import { HospitalsContent } from './HospitalsContent';
import { HospitalsSkeleton } from './HospitalsSkeleton';

interface HospitalsPageProps {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{
    sortBy?: string;
    specialtyType?: string;
    minRating?: string;
  }>;
}

export default async function HospitalsPage({ params, searchParams }: HospitalsPageProps) {
  const { lang } = await params;
  const resolvedSearchParams = await searchParams;
  const dict = await getDictionary(lang);

  return (
    <div className=''>
      {/* 병원 리스트 - ErrorBoundary와 Suspense로 스트리밍 */}
      <ErrorBoundary
        fallback={
          <ErrorState
            title='병원 데이터를 불러올 수 없습니다'
            message='네트워크 연결을 확인하고 다시 시도해주세요.'
            retryButtonText='다시 시도'
          />
        }
      >
        <Suspense fallback={<HospitalsSkeleton />}>
          <HospitalsContent lang={lang} searchParams={resolvedSearchParams} dict={dict} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

// ISR 설정 - 5분마다 재검증 (리스트는 더 자주 업데이트)
export const revalidate = 300;
