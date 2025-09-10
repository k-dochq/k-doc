import { type MedicalSpecialtyType } from '@prisma/client';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { ErrorBoundary, LocalizedErrorDisplay } from 'shared/ui/error-display';
import { getHospitals } from 'entities/hospital';
import { HospitalsInfiniteList } from './HospitalsInfiniteList';

interface HospitalsContentProps {
  lang: Locale;
  dict: Dictionary;
  searchParams: {
    sortBy?: string;
    specialtyType?: string;
    minRating?: string;
  };
}

export async function HospitalsContent({ lang, dict, searchParams }: HospitalsContentProps) {
  // 첫 페이지 데이터를 서버에서 미리 가져오기 (성능 최적화)
  const { sortBy = 'createdAt', specialtyType, minRating = '0' } = searchParams;

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
          searchParams={searchParams}
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
        <HospitalsInfiniteList lang={lang} searchParams={searchParams} dict={dict} />
      </ErrorBoundary>
    );
  }
}
