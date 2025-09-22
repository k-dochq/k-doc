import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { getHospitalDetail } from 'entities/hospital/api/use-cases/get-hospital-detail';
import { HospitalDetailErrorState } from 'shared/ui/error-state';
import { HospitalDetailHeader } from 'widgets/hospital-detail-header';
import { HospitalDetailPhotos } from 'widgets/hospital-detail-photos';
import { HospitalDetailInfo } from 'widgets/hospital-detail-info';
import { HospitalDetailConsultationFloating } from 'widgets/hospital-detail-consultation-floating';
import { HospitalDetailTabs } from 'widgets/hospital-detail-tabs';
import { HospitalDetailReviews } from 'widgets/hospital-detail-reviews';
import { extractLocalizedText } from 'shared/lib/localized-text';

interface HospitalDetailContentProps {
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
}

export async function HospitalDetailContent({
  hospitalId,
  lang,
  dict,
}: HospitalDetailContentProps) {
  try {
    // 병원 상세 데이터만 조회
    const { hospital } = await getHospitalDetail({ id: hospitalId });

    return (
      <div className='text-white'>
        {/* 헤더 */}
        <HospitalDetailHeader
          lang={lang}
          dict={dict}
          hospitalId={hospitalId}
          hospitalName={extractLocalizedText(hospital.name, lang)}
        />

        {/* 병원 사진 섹션 */}
        <HospitalDetailPhotos hospital={hospital} lang={lang} dict={dict} />

        {/* 병원 정보 섹션 */}
        <div className='p-5'>
          <HospitalDetailInfo hospital={hospital} lang={lang} dict={dict} />
        </div>

        {/* 탭 기반 컨텐츠 */}
        <HospitalDetailTabs hospital={hospital} hospitalId={hospitalId} lang={lang} dict={dict} />

        {/* 리뷰 후기 섹션 */}
        <div className='px-5 pt-8'>
          <HospitalDetailReviews hospitalId={hospitalId} lang={lang} dict={dict} />
        </div>

        {/* 하단 고정 버튼을 위한 여백 */}
        <div className='h-24' />

        {/* 하단 고정 상담신청 버튼 */}
        <HospitalDetailConsultationFloating hospitalId={hospitalId} lang={lang} dict={dict} />
      </div>
    );
  } catch (error) {
    console.error('Error loading hospital detail content:', error);
    return <HospitalDetailErrorState className='min-h-screen' />;
  }
}
