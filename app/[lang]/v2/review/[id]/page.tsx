import { type Locale } from 'shared/config';
import { getDictionary } from '../../../dictionaries';
import { getReviewDetail } from 'entities/review/api/use-cases/get-review-detail';
import { PageHeaderV2 } from 'shared/ui/page-header/PageHeaderV2';
import { ReviewLikeButtonV2 } from 'features/review-like/ui/ReviewLikeButtonV2';
import { ReviewListCardV2 } from 'entities/review/ui/ReviewListCardV2';
import { type User } from '@supabase/supabase-js';

interface V2ReviewDetailPageProps {
  params: Promise<{
    lang: Locale;
    id: string;
  }>;
}

export default async function V2ReviewDetailPage({ params }: V2ReviewDetailPageProps) {
  const { lang, id } = await params;
  const dict = await getDictionary(lang);

  // 리뷰 상세 데이터 (헤더용)
  const { review } = await getReviewDetail({ reviewId: id });
  const title = '';

  return (
    <div className='min-h-screen bg-white'>
      <PageHeaderV2
        title={title}
        fallbackUrl={`/${lang}/reviews`}
        rightContent={<ReviewLikeButtonV2 reviewId={review.id} locale={lang} dict={dict} />}
        // 투명 처리 옵션 기본 false
        enableScrollTransparency={false}
      />

      <div className='h-[58px]' />

      {/* 리뷰 본문 카드: 내용 기본 펼침, 더보기 버튼 없음 */}
      <ReviewListCardV2
        review={review}
        lang={lang}
        dict={dict}
        user={null as unknown as User | null}
        forceContentExpanded
        disableLink
        useHorizontalImages
      />
    </div>
  );
}
