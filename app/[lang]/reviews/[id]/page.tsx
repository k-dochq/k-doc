import { notFound } from 'next/navigation';
import { getDictionary } from '../../dictionaries';
import { type Locale } from 'shared/config';
import { extractLocalizedText } from 'shared/lib';
import { getReviewDetail } from 'entities/review';
import { ReviewDetailCard } from 'entities/review/ui';

interface ReviewDetailPageProps {
  params: Promise<{
    lang: Locale;
    id: string;
  }>;
}

// 리뷰 페이지는 서버 컴포넌트로 동적 렌더링, 10분 캐시
export const revalidate = 600; // 10분 (600초)

export default async function ReviewDetailPage({ params }: ReviewDetailPageProps) {
  const { lang, id } = await params;

  try {
    // 리뷰 상세 데이터 조회
    const { review } = await getReviewDetail({ reviewId: id });

    // 다국어 사전 조회
    const dict = await getDictionary(lang);

    return <ReviewDetailCard review={review} lang={lang} dict={dict} />;
  } catch (error) {
    console.error('Error loading review detail:', error);
    notFound();
  }
}

// 동적 메타데이터 생성
export async function generateMetadata({ params }: ReviewDetailPageProps) {
  const { lang, id } = await params;

  try {
    const { review } = await getReviewDetail({ reviewId: id });
    const dict = await getDictionary(lang);

    const title = extractLocalizedText(review.title, lang) || '시술후기';
    const medicalSpecialtyName = extractLocalizedText(review.medicalSpecialty.name, lang) || '';

    return {
      title: `${title} - ${dict.reviewDetail?.title || '시술후기'}`,
      description:
        extractLocalizedText(review.content, lang)?.slice(0, 160) ||
        `${medicalSpecialtyName} 시술후기를 확인하세요.`,
    };
  } catch (_error) {
    return {
      title: '시술후기',
      description: '시술후기 상세 정보',
    };
  }
}
