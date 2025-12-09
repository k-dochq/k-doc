import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { getHospitalDetail } from 'entities/hospital/api/use-cases/get-hospital-detail';
import { HospitalDetailErrorState } from 'shared/ui/error-state';
import { HospitalDetailHeaderV2 } from 'widgets/hospital-detail-header';
import { HospitalDetailPhotosV2 } from 'widgets/hospital-detail-photos/ui/HospitalDetailPhotosV2';
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
        {/* 병원 이미지 섹션 - 여백 없이 최상단에 배치 */}
        <div className='relative'>
          <HospitalDetailPhotosV2 hospital={hospital} lang={lang} dict={dict} />
        </div>

        {/* 헤더 - 이미지 위에 겹쳐서 표시 */}
        <HospitalDetailHeaderV2
          lang={lang}
          dict={dict}
          hospitalId={hospitalId}
          hospitalName={extractLocalizedText(hospital.name, lang)}
        />
      </div>
    );
  } catch (error) {
    console.error('Error loading hospital detail content:', error);
    return <HospitalDetailErrorState className='min-h-screen' />;
  }
}
