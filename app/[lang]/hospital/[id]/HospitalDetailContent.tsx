import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { getHospitalDetail } from 'entities/hospital/api/use-cases/get-hospital-detail';
import { HospitalDetailErrorState } from 'shared/ui/error-state';
import { HospitalDetailHeader } from 'widgets/hospital-detail-header';
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
      <div className='min-h-screen bg-gradient-to-b from-[#FE906C] to-[#FF6CA5]'>
        {/* 헤더 */}
        <HospitalDetailHeader
          lang={lang}
          dict={dict}
          hospitalName={extractLocalizedText(hospital.name, lang)}
        />
      </div>
    );
  } catch (error) {
    console.error('Error loading hospital detail content:', error);
    return <HospitalDetailErrorState className='min-h-screen' />;
  }
}
