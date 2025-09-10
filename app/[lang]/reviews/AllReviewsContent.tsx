import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { getAllReviews, getMedicalSpecialties } from 'entities/review';
import { AllReviewsInfiniteList } from './AllReviewsInfiniteList';
import { ErrorBoundary } from 'shared/ui/error-display';

interface AllReviewsContentProps {
  lang: Locale;
  dict: Dictionary;
}

export async function AllReviewsContent({ lang, dict }: AllReviewsContentProps) {
  try {
    // 첫 페이지 리뷰 데이터와 부위 목록을 병렬로 조회
    const [initialReviews, specialties] = await Promise.all([
      getAllReviews({ limit: 10 }),
      getMedicalSpecialties(),
    ]);

    return (
      <ErrorBoundary>
        <AllReviewsInfiniteList
          lang={lang}
          dict={dict}
          specialties={specialties}
          initialData={initialReviews}
        />
      </ErrorBoundary>
    );
  } catch (error) {
    console.error('Error loading all reviews content:', error);
    return (
      <div className='flex flex-col items-center justify-center py-12'>
        <div className='text-center'>
          <h2 className='mb-2 text-lg font-medium text-gray-900'>
            리뷰를 불러오는 중 오류가 발생했습니다
          </h2>
          <p className='text-gray-500'>잠시 후 다시 시도해주세요.</p>
        </div>
      </div>
    );
  }
}
