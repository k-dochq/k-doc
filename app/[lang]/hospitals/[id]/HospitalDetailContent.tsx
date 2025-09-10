import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { getHospitalDetail } from 'entities/hospital/api/use-cases/get-hospital-detail';
import { getHospitalReviews } from 'entities/review';
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
    // 병원 상세 데이터와 리뷰 데이터를 병렬로 조회
    const [{ hospital }, { reviews }] = await Promise.all([
      getHospitalDetail({ id: hospitalId }),
      getHospitalReviews({ hospitalId, limit: 10 }),
    ]);

    return (
      <>
        {/* 병원 상세 정보 */}
        <HospitalDetailCard hospital={hospital} lang={lang} dict={dict} />

        {/* 리뷰 섹션 */}
        <div className='border-t border-gray-200 pt-8'>
          <ReviewCarouselWrapper
            reviews={reviews}
            hospitalId={hospitalId}
            lang={lang}
            dict={dict}
          />
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
