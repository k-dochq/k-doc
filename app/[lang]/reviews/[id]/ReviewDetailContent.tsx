import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { getReviewDetail } from 'entities/review';
import { ReviewDetailCard } from 'entities/review/ui';

interface ReviewDetailContentProps {
  reviewId: string;
  lang: Locale;
  dict: Dictionary;
}

export async function ReviewDetailContent({ reviewId, lang, dict }: ReviewDetailContentProps) {
  try {
    // 리뷰 상세 데이터 조회
    const { review } = await getReviewDetail({ reviewId });

    return <ReviewDetailCard review={review} lang={lang} dict={dict} />;
  } catch (error) {
    console.error('Error loading review detail content:', error);
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
