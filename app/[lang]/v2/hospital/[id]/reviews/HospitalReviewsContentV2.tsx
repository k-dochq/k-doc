import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ReviewSortOption, REVIEW_SORT_OPTIONS } from 'shared/model/types/review-query';
import { getHospitalDetail } from 'entities/hospital/api/use-cases/get-hospital-detail';
import { HospitalDetailErrorState } from 'shared/ui/error-state';
import { HospitalDetailHeaderV2 } from 'widgets/hospital-detail-header';
import { HospitalDetailConsultationFloatingV2 } from 'widgets/hospital-detail-consultation-floating/ui/HospitalDetailConsultationFloatingV2';
import { HospitalReviewsHeaderV2 } from 'features/hospital-reviews/ui/HospitalReviewsHeaderV2';
import { HospitalReviewRatingStatsV2 } from 'features/hospital-reviews/ui/HospitalReviewRatingStatsV2';
import { extractLocalizedText } from 'shared/lib/localized-text';

interface HospitalReviewsContentV2Props {
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
  sort?: ReviewSortOption;
}

export async function HospitalReviewsContentV2({
  hospitalId,
  lang,
  dict,
  sort = REVIEW_SORT_OPTIONS.POPULAR,
}: HospitalReviewsContentV2Props) {
  try {
    // 병원 상세 데이터 조회 (헤더에 병원 이름 표시용)
    const { hospital } = await getHospitalDetail({ id: hospitalId });

    return (
      <div className='relative text-neutral-900'>
        {/* 헤더 */}
        <HospitalDetailHeaderV2
          lang={lang}
          dict={dict}
          hospitalId={hospitalId}
          hospitalName={extractLocalizedText(hospital.name, lang)}
          enableScrollTransparency={false}
        />

        <div className='h-[58px]' />

        {/* 시술후기 타이틀 및 필터 섹션 */}
        <HospitalReviewsHeaderV2
          lang={lang}
          dict={dict}
          currentSort={sort}
          hospitalId={hospitalId}
        />

        {/* 리뷰 평점 통계 섹션 */}
        <HospitalReviewRatingStatsV2 hospitalId={hospitalId} lang={lang} dict={dict} />

        {/* 하단 고정 버튼을 위한 여백 */}
        <div className='h-24' />

        {/* 하단 고정 상담신청 버튼 */}
        <HospitalDetailConsultationFloatingV2 hospitalId={hospitalId} lang={lang} dict={dict} />
      </div>
    );
  } catch (error) {
    console.error('Error loading hospital reviews content:', error);
    return <HospitalDetailErrorState className='min-h-screen' />;
  }
}
