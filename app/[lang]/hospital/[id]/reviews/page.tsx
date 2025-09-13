import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getDictionary } from '../../../dictionaries';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { extractLocalizedText } from 'shared/lib';
import { getHospitalDetail } from 'entities/hospital';
import { HospitalReviewsContent } from './HospitalReviewsContent';
import { HospitalReviewsSkeleton } from './HospitalReviewsSkeleton';

interface HospitalReviewsPageProps {
  params: Promise<{
    lang: Locale;
    id: string;
  }>;
}

// 리뷰 리스트 페이지는 서버 컴포넌트로 동적 렌더링, 5분 캐시
export const revalidate = 300; // 5분 (300초)

export default async function HospitalReviewsPage({ params }: HospitalReviewsPageProps) {
  const { lang, id } = await params;

  try {
    // 즉시 렌더링 가능한 데이터만 먼저 로드
    const dict = await getDictionary(lang);

    return (
      <div className='container mx-auto space-y-6 px-4 py-6'>
        {/* 헤더 - 병원 정보 로딩을 기다리지 않고 기본 제목 먼저 표시 */}
        <div className='border-b border-gray-200 pb-4'>
          <h1 className='text-2xl font-bold text-gray-900'>
            {dict.hospitalReviews?.title || '시술후기'}
          </h1>
          <Suspense
            fallback={<div className='mt-2 h-5 w-64 animate-pulse rounded bg-gray-200'></div>}
          >
            <HospitalSubtitle hospitalId={id} lang={lang} dict={dict} />
          </Suspense>
        </div>

        {/* 리뷰 리스트 - Suspense로 감싸서 스트리밍 */}
        <Suspense fallback={<HospitalReviewsSkeleton />}>
          <HospitalReviewsContent hospitalId={id} lang={lang} dict={dict} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error loading hospital reviews page:', error);
    notFound();
  }
}

// 병원 부제목을 별도 컴포넌트로 분리하여 스트리밍
async function HospitalSubtitle({
  hospitalId,
  lang,
  dict,
}: {
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
}) {
  try {
    const { hospital } = await getHospitalDetail({ id: hospitalId });

    return (
      <p className='mt-2 text-gray-600'>
        {extractLocalizedText(hospital.name, lang)}{' '}
        {dict.hospitalReviews?.subtitle || '의 시술후기'}
      </p>
    );
  } catch {
    return <p className='mt-2 text-gray-600'>{dict.hospitalReviews?.subtitle || '의 시술후기'}</p>;
  }
}

// 동적 메타데이터 생성
export async function generateMetadata({ params }: HospitalReviewsPageProps) {
  const { lang, id } = await params;

  try {
    const [hospitalResult, dict] = await Promise.all([
      getHospitalDetail({ id }),
      getDictionary(lang),
    ]);

    const { hospital } = hospitalResult;

    const hospitalName = extractLocalizedText(hospital.name, lang) || '병원';

    return {
      title: `${hospitalName} ${dict.hospitalReviews?.title || '시술후기'}`,
      description: `${hospitalName}의 실제 시술후기를 확인하세요. 다양한 시술 경험과 후기를 통해 더 나은 선택을 하실 수 있습니다.`,
    };
  } catch (_error) {
    return {
      title: '시술후기',
      description: '병원 시술후기 목록',
    };
  }
}
