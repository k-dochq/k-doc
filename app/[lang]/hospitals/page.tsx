import { type Locale } from 'shared/config';
import { getDictionary } from 'app/[lang]/dictionaries';
import { ErrorBoundary } from 'shared/ui/error-display';
import { ErrorState } from 'shared/ui/error-state';
// import { HospitalsContent } from './HospitalsContent';
import { HospitalsContentV2 } from '../v2/hospitals/HospitalsContentV2';

interface HospitalsPageProps {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{
    category?: string;
    sort?: string;
    search?: string;
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
            title={dict.favorites?.errorHospitals || dict.hospitals?.empty?.title || '병원 데이터를 불러올 수 없습니다'}
            message={dict.favorites?.errorMessage || dict.hospitals?.empty?.description || '네트워크 연결을 확인하고 다시 시도해주세요.'}
            retryButtonText={dict.common?.confirm || '다시 시도'}
          />
        }
      >
        {/* <HospitalsContent lang={lang} searchParams={resolvedSearchParams} dict={dict} /> */}
        <HospitalsContentV2 lang={lang} searchParams={resolvedSearchParams} dict={dict} />
      </ErrorBoundary>
    </div>
  );
}
