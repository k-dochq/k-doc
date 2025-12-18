import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { getHospitalDetail } from 'entities/hospital/api/use-cases/get-hospital-detail';
import { HospitalDetailErrorState } from 'shared/ui/error-state';
import { HospitalDetailHeaderV2 } from 'widgets/hospital-detail-header';
import { HospitalDetailPhotosV2 } from 'widgets/hospital-detail-photos/ui/HospitalDetailPhotosV2';
import { HospitalDetailInfoV2 } from 'widgets/hospital-detail-info/ui/HospitalDetailInfoV2';
import { HospitalDetailHoursAndLocationV2 } from 'widgets/hospital-detail-hours-location/ui/HospitalDetailHoursAndLocationV2';
import { HospitalDetailRegistrationPromptV2 } from 'widgets/hospital-detail-registration-prompt/ui/HospitalDetailRegistrationPromptV2';
import { HospitalDetailTabsV2 } from 'widgets/hospital-detail-tabs/ui/HospitalDetailTabsV2';
import { LiveReviewV2ContainerForHospital } from 'widgets/live-reviews/ui/LiveReviewV2ContainerForHospital';
import { PopularReviewsV2ContainerForHospital } from 'widgets/popular-reviews/ui/PopularReviewsV2ContainerForHospital';
import { HospitalDetailConsultationFloatingV2 } from 'widgets/hospital-detail-consultation-floating/ui/HospitalDetailConsultationFloatingV2';
import { REVIEW_SORT_OPTIONS } from 'shared/model/types/review-query';
import { extractLocalizedText } from 'shared/lib/localized-text';

interface HospitalDetailContentV2Props {
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
}

export async function HospitalDetailContentV2({
  hospitalId,
  lang,
  dict,
}: HospitalDetailContentV2Props) {
  try {
    // 병원 상세 데이터만 조회
    const { hospital } = await getHospitalDetail({ id: hospitalId });

    return (
      <div className='relative text-neutral-900'>
        {/* 헤더 - 이미지 위에 겹쳐서 표시 */}
        <HospitalDetailHeaderV2
          lang={lang}
          dict={dict}
          hospitalId={hospitalId}
          hospitalName={extractLocalizedText(hospital.name, lang)}
        />

        {/* 병원 이미지 섹션 - 여백 없이 최상단에 배치 */}
        <div className='relative'>
          <HospitalDetailPhotosV2 hospital={hospital} lang={lang} dict={dict} />
        </div>

        {/* 병원 정보 섹션 */}
        <HospitalDetailInfoV2 hospital={hospital} lang={lang} dict={dict} />

        {/* 구분선 */}
        <div className='px-5'>
          <div className='h-px w-full bg-neutral-200' />
        </div>

        {/* 병원 운영시간 및 위치 섹션 */}
        <HospitalDetailHoursAndLocationV2 hospital={hospital} lang={lang} dict={dict} />

        {/* 회원가입 유도 버튼 섹션 - 로그인하지 않은 경우에만 표시 */}
        <HospitalDetailRegistrationPromptV2 lang={lang} dict={dict} />

        {/* 구분선 */}
        <div className='h-[6px] w-full bg-neutral-100' />

        {/* 탭 섹션 */}
        <HospitalDetailTabsV2 hospital={hospital} hospitalId={hospitalId} lang={lang} dict={dict} />

        {/* 생생후기 섹션 */}
        <LiveReviewV2ContainerForHospital hospitalId={hospitalId} lang={lang} dict={dict} />

        {/* 시술후기 섹션 - 최신순 */}
        <div className='py-9'>
          <PopularReviewsV2ContainerForHospital
            hospitalId={hospitalId}
            lang={lang}
            dict={dict}
            sort={REVIEW_SORT_OPTIONS.LATEST}
          />
        </div>

        {/* 하단 고정 버튼을 위한 여백 */}
        <div className='h-24' />

        {/* 하단 고정 상담신청 버튼 */}
        <HospitalDetailConsultationFloatingV2 hospitalId={hospitalId} lang={lang} dict={dict} />
      </div>
    );
  } catch (error) {
    console.error('Error loading hospital detail content:', error);
    return <HospitalDetailErrorState className='min-h-screen' />;
  }
}
