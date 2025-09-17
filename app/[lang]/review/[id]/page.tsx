import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getDictionary } from '../../dictionaries';
import { type Locale, STATIC_GENERATION_LOCALES } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { extractLocalizedText } from 'shared/lib';
import { getReviewDetail, getAllReviewIds } from 'entities/review/api/use-cases/get-review-detail';
import { ReviewDetailSkeleton } from './ReviewDetailSkeleton';
import { ReviewDetailPage as ReviewDetailPageComponent } from './ReviewDetailPage';

// 리뷰 상세 페이지 프로퍼티
interface ReviewDetailPageProps {
  params: Promise<{
    lang: Locale;
    id: string;
  }>;
}

interface ReviewDetailContentProps {
  reviewId: string;
  lang: Locale;
  dict: Dictionary;
}

export default async function ReviewDetailPage({ params }: ReviewDetailPageProps) {
  const { lang, id } = await params;

  try {
    // 즉시 렌더링 가능한 데이터만 먼저 로드
    const dict = await getDictionary(lang);

    return (
      <div className=''>
        {/* 리뷰 상세 정보 - Suspense로 스트리밍 */}
        <Suspense fallback={<ReviewDetailSkeleton />}>
          <ReviewDetailContent reviewId={id} lang={lang} dict={dict} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error loading review detail page:', error);
    notFound();
  }
}

// 리뷰 상세 컨텐츠 컴포넌트
async function ReviewDetailContent({ reviewId, lang, dict }: ReviewDetailContentProps) {
  try {
    // 리뷰 상세 데이터 조회
    const { review } = await getReviewDetail({ reviewId });

    return <ReviewDetailPageComponent review={review} lang={lang} dict={dict} />;
  } catch (error) {
    console.error('Error loading review detail content:', error);
    notFound();
  }
}

// ISR 설정 - 15분마다 재검증
export const revalidate = 900;

// 빌드 타임에 생성되지 않은 경로도 동적으로 생성 허용
export const dynamicParams = true;

// 정적 생성을 위한 파라미터 생성
export async function generateStaticParams() {
  try {
    // 모든 리뷰 ID 조회
    const reviewIds = await getAllReviewIds();

    // 모든 언어와 리뷰 ID 조합 생성 (ko, th만)
    const params = [];
    for (const lang of STATIC_GENERATION_LOCALES) {
      for (const id of reviewIds) {
        params.push({
          lang,
          id,
        });
      }
    }

    console.log(
      `[${new Date().toISOString()}] 정적 생성할 리뷰 페이지 수: ${params.length} (리뷰: ${reviewIds.length}개 × 언어: ${STATIC_GENERATION_LOCALES.length}개)`,
    );
    return params;
  } catch (error) {
    console.error('Error generating static params:', error);
    // 에러 발생 시 빈 배열 반환하여 동적 렌더링으로 fallback
    return [];
  }
}

// 정적 생성을 위한 메타데이터
export async function generateMetadata({ params }: ReviewDetailPageProps) {
  const { lang, id } = await params;

  try {
    const { review } = await getReviewDetail({ reviewId: id });
    const dict = await getDictionary(lang);

    const reviewTitle = extractLocalizedText(review.content, lang)?.slice(0, 50) || '시술후기';
    const hospitalName = extractLocalizedText(review.hospital.name, lang) || '병원';

    return {
      title: `${reviewTitle} - ${hospitalName} | ${dict.reviewDetail?.title || '시술후기'}`,
      description:
        extractLocalizedText(review.content, lang)?.slice(0, 160) ||
        `${hospitalName}의 시술후기를 확인하세요.`,
    };
  } catch (_error) {
    return {
      title: '시술후기',
      description: '시술후기 상세 정보',
    };
  }
}
