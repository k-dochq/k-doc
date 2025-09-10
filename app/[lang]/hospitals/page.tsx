import { Suspense } from 'react';
import { type Locale } from 'shared/config';
import { getDictionary } from 'app/[lang]/dictionaries';
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
    <div className='container mx-auto space-y-6 px-4 py-6'>
      {/* 헤더 - 즉시 표시 */}
      <div className='border-b border-gray-200 pb-4'>
        <h1 className='text-2xl font-bold text-gray-900'>{dict.hospitals?.title || '병원 목록'}</h1>
        <p className='mt-2 text-gray-600'>다양한 병원들을 확인하세요</p>
      </div>

      {/* 병원 리스트 - Suspense로 스트리밍 */}
      <Suspense fallback={<HospitalsSkeleton />}>
        <HospitalsContent lang={lang} searchParams={resolvedSearchParams} dict={dict} />
      </Suspense>
    </div>
  );
}

// ISR 설정 - 5분마다 재검증 (리스트는 더 자주 업데이트)
export const revalidate = 300;
