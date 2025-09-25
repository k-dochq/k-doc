import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { HospitalDetailIntroduction } from 'widgets/hospital-detail-introduction';
import { HospitalDetailInfoSection } from 'widgets/hospital-detail-info-section';
import { HospitalDetailMap } from 'widgets/hospital-detail-map';
import { HospitalDetailDoctors } from 'widgets/hospital-detail-doctors';
import { HospitalDetailAddressSection } from 'widgets/hospital-detail-address-section';

interface HospitalDetailIntroductionTabProps {
  hospital: any; // TODO: 정확한 타입 정의 필요
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
}

/**
 * 병원소개 탭 컨텐츠 컴포넌트
 */
export function HospitalDetailIntroductionTab({
  hospital,
  hospitalId,
  lang,
  dict,
}: HospitalDetailIntroductionTabProps) {
  return (
    <div className='flex flex-col'>
      {/* 병원 소개 */}
      <HospitalDetailIntroduction hospital={hospital} lang={lang} dict={dict} />

      <div className='h-9' />

      {/* 병원 정보 */}
      <HospitalDetailInfoSection hospital={hospital} lang={lang} dict={dict} />

      <div className='h-9' />

      {/* 위치 (위도/경도가 있는 경우만) */}
      {hospital.latitude && hospital.longitude && (
        <>
          <h2 className='text-base font-bold'>{dict.hospital.map.title}</h2>

          <div className='mt-4 rounded-xl border border-white bg-white/50 p-4 shadow-[1px_1px_12px_0_rgba(76,25,168,0.12)] backdrop-blur-[6px]'>
            <HospitalDetailMap
              lang={lang}
              dict={dict}
              latitude={hospital.latitude}
              longitude={hospital.longitude}
            />

            {/* 주소 정보 섹션 */}
            <HospitalDetailAddressSection
              address={
                extractLocalizedText(hospital.address, lang) || dict.hospital.address.noAddress
              }
              lang={lang}
              dict={dict}
            />
          </div>
        </>
      )}

      {/* 소속 의료진 섹션 (의료진이 있는 경우만) */}
      {hospital.doctors && hospital.doctors.length > 0 && (
        <>
          <div className='h-9' />
          <HospitalDetailDoctors lang={lang} dict={dict} doctors={hospital.doctors} />
        </>
      )}
    </div>
  );
}
