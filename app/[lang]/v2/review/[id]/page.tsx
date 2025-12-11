import { type Locale } from 'shared/config';
import { getDictionary } from '../../../dictionaries';
import { getReviewDetail } from 'entities/review/api/use-cases/get-review-detail';
import { PageHeaderV2 } from 'shared/ui/page-header/PageHeaderV2';
import { ReviewLikeButtonV2 } from 'features/review-like/ui/ReviewLikeButtonV2';
import { TreatmentHospitalSectionV2 } from './TreatmentHospitalSectionV2';
import { TreatmentRelatedReviewsSectionV2 } from './TreatmentRelatedReviewsSectionV2';
import { ReviewCommentsSectionV2 } from 'features/review-comments/ui/ReviewCommentsSectionV2';
import { convertReviewHospitalToHospitalCard } from 'entities/review/lib/convert-hospital-data';
import { ReviewDetailCardV2Shell } from './ReviewDetailCardV2Shell';

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
  const hospitalCard = convertReviewHospitalToHospitalCard(review);

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
      <ReviewDetailCardV2Shell review={review} lang={lang} dict={dict} />

      {/* 시술 병원 섹션 */}
      <TreatmentHospitalSectionV2 hospital={hospitalCard} lang={lang} dict={dict} />

      {/* 동일 병원 후기 섹션 */}
      <TreatmentRelatedReviewsSectionV2 hospitalId={review.hospital.id} lang={lang} dict={dict} />

      {/* 댓글 섹션 */}
      <ReviewCommentsSectionV2 reviewId={review.id} lang={lang} dict={dict} className='bg-white' />
    </div>
  );
}
