'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useHospitalDetail } from 'entities/hospital/model/useHospitalDetail';
import { ConsultationRequestLoading } from './ConsultationRequestLoading';
import { ConsultationRequestError } from './ConsultationRequestError';
import { convertHospitalToCardData } from '../lib/convert-hospital-to-card-data';
import { PageHeaderV2 } from 'shared/ui/page-header';
import { DoctorAffiliatedHospitalCardV2 } from 'widgets/doctor-affiliated-hospital/ui/DoctorAffiliatedHospitalCardV2';
import { ConsultationFormV2 } from './ConsultationFormV2';

interface ConsultationRequestContentV2Props {
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
}

export function ConsultationRequestContentV2({
  hospitalId,
  lang,
  dict,
}: ConsultationRequestContentV2Props) {
  const { data: hospitalDetail, isLoading, error } = useHospitalDetail(hospitalId);

  if (isLoading) {
    return <ConsultationRequestLoading />;
  }

  if (error || !hospitalDetail?.hospital) {
    return <ConsultationRequestError lang={lang} dict={dict} />;
  }

  const hospitalCard = convertHospitalToCardData(hospitalDetail.hospital);

  return (
    <div className='min-h-screen bg-white'>
      <PageHeaderV2
        title={dict.consultation?.request?.title || '상담신청'}
        fallbackUrl={`/${lang}/hospital/${hospitalId}`}
        enableScrollTransparency={false}
      />

      <div className='h-[58px]' />

      {/* 병원 정보 카드 */}
      <div className='px-5 py-6'>
        <DoctorAffiliatedHospitalCardV2 hospital={hospitalCard} lang={lang} dict={dict} />
      </div>

      {/* 상담 신청 폼 V2 */}
      <ConsultationFormV2 hospitalId={hospitalId} lang={lang} dict={dict} />
    </div>
  );
}
