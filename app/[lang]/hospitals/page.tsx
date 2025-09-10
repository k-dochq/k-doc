import { type MedicalSpecialtyType } from '@prisma/client';
import { type Locale } from 'shared/config';
import { ErrorBoundary, LocalizedErrorDisplay } from 'shared/ui/error-display';
import { getDictionary } from 'app/[lang]/dictionaries';
import { getHospitals } from 'entities/hospital';
import { HospitalsInfiniteList } from './HospitalsInfiniteList';

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

  // 첫 페이지 데이터를 서버에서 미리 가져오기 (성능 최적화)
  const { sortBy = 'createdAt', specialtyType, minRating = '0' } = resolvedSearchParams;

  try {
    const initialData = await getHospitals({
      page: 1,
      limit: 10,
      sortBy: sortBy as 'createdAt' | 'viewCount',
      sortOrder: 'desc',
      specialtyType: specialtyType as MedicalSpecialtyType | undefined,
      minRating: parseFloat(minRating),
    });

    return (
      <ErrorBoundary fallback={<LocalizedErrorDisplay error={null} lang={lang} dict={dict} />}>
        <HospitalsInfiniteList
          lang={lang}
          searchParams={resolvedSearchParams}
          dict={dict}
          initialData={initialData}
        />
      </ErrorBoundary>
    );
  } catch (error) {
    console.error('Error loading initial hospitals data:', error);
    // 에러 발생 시 초기 데이터 없이 렌더링
    return (
      <ErrorBoundary fallback={<LocalizedErrorDisplay error={null} lang={lang} dict={dict} />}>
        <HospitalsInfiniteList lang={lang} searchParams={resolvedSearchParams} dict={dict} />
      </ErrorBoundary>
    );
  }
}

// ISR 설정 - 5분마다 재검증 (리스트는 더 자주 업데이트)
export const revalidate = 300;
