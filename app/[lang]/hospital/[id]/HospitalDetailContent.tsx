import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { getHospitalDetail } from 'entities/hospital/api/use-cases/get-hospital-detail';
import { HospitalDetailErrorState } from 'shared/ui/error-state';
import { HospitalDetailHeader } from 'widgets/hospital-detail-header';
import { HospitalDetailPhotos } from 'widgets/hospital-detail-photos';
import { HospitalDetailInfo } from 'widgets/hospital-detail-info';
import { HospitalDetailIntroduction } from 'widgets/hospital-detail-introduction';
import { HospitalDetailInfoSection } from 'widgets/hospital-detail-info-section';
import { HospitalDetailMap } from 'widgets/hospital-detail-map';
import { HospitalDetailDoctors } from 'widgets/hospital-detail-doctors';
import { HospitalDetailReviews } from 'widgets/hospital-detail-reviews';
import { HospitalDetailConsultationFloating } from 'widgets/hospital-detail-consultation-floating';
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
      <div className='min-h-screen bg-gradient-to-b from-[#FE906C] to-[#FF6CA5] text-white'>
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
        <HospitalDetailInfo hospital={hospital} lang={lang} dict={dict} />

        <div className='h-8' />

        <div className='flex flex-col px-5'>
          <HospitalDetailIntroduction hospital={hospital} lang={lang} dict={dict} />
          <div className='h-8' />
          <HospitalDetailInfoSection hospital={hospital} lang={lang} dict={dict} />
          {hospital.latitude && hospital.longitude && (
            <>
              <div className='h-8' />
              <HospitalDetailMap
                lang={lang}
                dict={dict}
                latitude={hospital.latitude}
                longitude={hospital.longitude}
              />
            </>
          )}

          {/* 소속 의료진 섹션 */}
          {hospital.doctors && hospital.doctors.length > 0 && (
            <>
              <div className='h-8' />
              <HospitalDetailDoctors lang={lang} dict={dict} doctors={hospital.doctors} />
            </>
          )}

          {/* 리뷰 후기 섹션 */}
          <div className='h-8' />
          <HospitalDetailReviews hospitalId={hospitalId} lang={lang} dict={dict} />

          {/* 하단 고정 버튼을 위한 여백 */}
          <div className='h-24' />
        </div>

        {/* 하단 고정 상담신청 버튼 */}
        <HospitalDetailConsultationFloating hospitalId={hospitalId} lang={lang} dict={dict} />
      </div>
    );
  } catch (error) {
    console.error('Error loading hospital detail content:', error);
    return <HospitalDetailErrorState className='min-h-screen' />;
  }
}
