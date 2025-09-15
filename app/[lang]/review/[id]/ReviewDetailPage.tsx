import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { getReviewDetail } from 'entities/review';
import { ReviewDetailContent as ReviewDetailContentComponent } from 'entities/review/ui';
import { ErrorState } from 'shared/ui/error-state';

interface ReviewDetailPageProps {
  reviewId: string;
  lang: Locale;
  dict: Dictionary;
}

export async function ReviewDetailPage({ reviewId, lang, dict }: ReviewDetailPageProps) {
  try {
    // 리뷰 상세 데이터 조회
    const { review } = await getReviewDetail({ reviewId });

    return <ReviewDetailContentComponent review={review} lang={lang} dict={dict} />;
  } catch (error) {
    console.error('Error loading review detail content:', error);
    return (
      <ErrorState
        title='리뷰를 불러오는 중 오류가 발생했습니다'
        message='네트워크 연결을 확인하고 다시 시도해주세요.'
        retryButtonText='다시 시도'
      />
    );
  }
}
