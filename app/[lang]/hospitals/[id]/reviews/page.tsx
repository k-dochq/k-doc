import { notFound } from 'next/navigation';
import { getDictionary } from '../../../dictionaries';
import { type Locale } from 'shared/config';
import { extractLocalizedText } from 'shared/lib';
import { getHospitalDetail } from 'entities/hospital';
import { getHospitalReviews } from 'entities/review';
import { HospitalReviewsInfiniteList } from './HospitalReviewsInfiniteList';
import { ErrorBoundary, LocalizedErrorDisplay } from 'shared/ui/error-display';

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
    // 병원 정보와 첫 페이지 리뷰 데이터를 병렬로 조회
    const [hospitalResult, dict, initialReviews] = await Promise.all([
      getHospitalDetail({ id }),
      getDictionary(lang),
      getHospitalReviews({ hospitalId: id, limit: 10 }),
    ]);

    const { hospital } = hospitalResult;

    return (
      <div className='container mx-auto space-y-6 px-4 py-6'>
        {/* 헤더 */}
        <div className='border-b border-gray-200 pb-4'>
          <h1 className='text-2xl font-bold text-gray-900'>
            {dict.hospitalReviews?.title || '시술후기'}
          </h1>
          <p className='mt-2 text-gray-600'>
            {extractLocalizedText(hospital.name, lang)}{' '}
            {dict.hospitalReviews?.subtitle || '의 시술후기'}
          </p>
        </div>

        {/* 리뷰 리스트 */}
        <ErrorBoundary fallback={<LocalizedErrorDisplay error={null} lang={lang} dict={dict} />}>
          <HospitalReviewsInfiniteList
            hospitalId={id}
            lang={lang}
            dict={dict}
            initialData={initialReviews}
          />
        </ErrorBoundary>
      </div>
    );
  } catch (error) {
    console.error('Error loading hospital reviews page:', error);
    notFound();
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
