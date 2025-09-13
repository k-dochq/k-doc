import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { getHospitalDetail } from 'entities/hospital/api/use-cases/get-hospital-detail';
import { HospitalDetailCard } from 'entities/hospital/ui/HospitalDetailCard';
import { ReviewCarouselWrapper } from 'widgets/review-carousel';

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
      <>
        {/* 병원 상세 정보 */}
        <HospitalDetailCard hospital={hospital} lang={lang} dict={dict} />

        {/* 리뷰 섹션 */}
        <div className='border-t border-gray-200 pt-8'>
          <ReviewCarouselWrapper hospitalId={hospitalId} lang={lang} dict={dict} />
        </div>
      </>
    );
  } catch (error) {
    console.error('Error loading hospital detail content:', error);
    return (
      <div className='flex flex-col items-center justify-center py-12'>
        <div className='text-center'>
          <h2 className='mb-2 text-lg font-medium text-gray-900'>
            병원 정보를 불러오는 중 오류가 발생했습니다
          </h2>
          <p className='text-gray-500'>잠시 후 다시 시도해주세요.</p>
        </div>
      </div>
    );
  }
}
