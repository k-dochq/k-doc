import { Suspense } from 'react';
import { getDictionary } from '../dictionaries';
import { type Locale } from 'shared/config';
import { AllReviewsContent } from './AllReviewsContent';
import { AllReviewsSkeleton } from './AllReviewsSkeleton';

interface AllReviewsPageProps {
  params: Promise<{
    lang: Locale;
  }>;
}

// 전체 리뷰 페이지는 서버 컴포넌트로 동적 렌더링, 5분 캐시
export const revalidate = 300; // 5분 (300초)

export default async function AllReviewsPage({ params }: AllReviewsPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className='container mx-auto space-y-6 px-4 py-6'>
      {/* 헤더 - 즉시 표시 */}
      <div className='border-b border-gray-200 pb-4'>
        <h1 className='text-2xl font-bold text-gray-900'>
          {dict.allReviews?.title || '전체 시술후기'}
        </h1>
        <p className='mt-2 text-gray-600'>
          {dict.allReviews?.subtitle || '모든 병원의 시술후기를 확인하세요'}
        </p>
      </div>

      {/* 리뷰 리스트 - Suspense로 스트리밍 */}
      <Suspense fallback={<AllReviewsSkeleton />}>
        <AllReviewsContent lang={lang} dict={dict} />
      </Suspense>
    </div>
  );
}

// 메타데이터 생성
export async function generateMetadata({ params }: AllReviewsPageProps) {
  const { lang } = await params;

  try {
    const dict = await getDictionary(lang);

    return {
      title: dict.allReviews?.title || '전체 시술후기',
      description:
        dict.allReviews?.subtitle ||
        '모든 병원의 실제 시술후기를 확인하세요. 다양한 부위별 시술 경험과 후기를 통해 더 나은 선택을 하실 수 있습니다.',
    };
  } catch (error) {
    console.error('Error generating metadata for all reviews page:', error);
    return {
      title: '전체 시술후기',
      description: '모든 병원의 실제 시술후기를 확인하세요.',
    };
  }
}
