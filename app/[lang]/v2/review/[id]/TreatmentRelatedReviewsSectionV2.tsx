import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ReviewSortOption, REVIEW_SORT_OPTIONS } from 'shared/model/types/review-query';
import { PopularReviewsV2ContainerForHospital } from 'widgets/popular-reviews/ui/PopularReviewsV2ContainerForHospital';

interface TreatmentRelatedReviewsSectionV2Props {
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
  sort?: ReviewSortOption;
}

/**
 * 후기 상세 V2용 동일 병원 후기 섹션
 * - 병원 상세 V2 리뷰 섹션과 동일한 리스트 UI 사용
 */
export function TreatmentRelatedReviewsSectionV2({
  hospitalId,
  lang,
  dict,
  sort = REVIEW_SORT_OPTIONS.RECOMMENDED,
}: TreatmentRelatedReviewsSectionV2Props) {
  const title =
    dict.reviewDetail?.sameHospitalReviews ||
    dict.hospitalReviews?.title ||
    '같은 카테고리 시술후기';

  return (
    <div className='pt-5 pb-8'>
      <PopularReviewsV2ContainerForHospital
        hospitalId={hospitalId}
        lang={lang}
        dict={dict}
        titleOverride={title}
        limit={10}
        showStats={false}
      />
    </div>
  );
}
