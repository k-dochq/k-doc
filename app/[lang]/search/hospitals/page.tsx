import { type Locale } from 'shared/config';
import { getDictionary } from '../../dictionaries';
import { ErrorBoundary } from 'shared/ui/error-display';
import { ErrorState } from 'shared/ui/error-state';
import { HospitalsSearchContentV2 } from './HospitalsSearchContentV2';

interface HospitalsSearchPageProps {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{
    search?: string;
    sort?: string;
  }>;
}

export default async function HospitalsSearchPage({
  params,
  searchParams,
}: HospitalsSearchPageProps) {
  const { lang } = await params;
  const resolvedSearchParams = await searchParams;
  const dict = await getDictionary(lang);

  return (
    <div className=''>
      <ErrorBoundary
        fallback={
          <ErrorState
            title={dict.favorites?.errorHospitals || dict.hospitals?.empty?.title || '병원 데이터를 불러올 수 없습니다'}
            message={dict.favorites?.errorMessage || dict.hospitals?.empty?.description || '네트워크 연결을 확인하고 다시 시도해주세요.'}
            retryButtonText={dict.common?.confirm || '다시 시도'}
          />
        }
      >
        <HospitalsSearchContentV2 lang={lang} searchParams={resolvedSearchParams} dict={dict} />
      </ErrorBoundary>
    </div>
  );
}
