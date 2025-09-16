'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useHospitalDetail } from 'entities/hospital/model/useHospitalDetail';
import { HospitalCard } from 'entities/hospital/ui/HospitalCard';
import { useAuth } from 'shared/lib/auth/useAuth';
import { ConsultationRequestLoading } from './ConsultationRequestLoading';
import { ConsultationRequestError } from './ConsultationRequestError';
import { convertHospitalToCardData } from '../lib/convert-hospital-to-card-data';
import { PageHeader } from 'shared/ui/page-header';
import { ConsultationForm } from './ConsultationForm';

interface ConsultationRequestFormProps {
  hospitalId: string;
  lang: Locale;
  dict: Dictionary;
}

export function ConsultationRequestForm({ hospitalId, lang, dict }: ConsultationRequestFormProps) {
  const { user } = useAuth();
  const { data: hospitalDetail, isLoading, error } = useHospitalDetail(hospitalId);

  if (isLoading) {
    return <ConsultationRequestLoading />;
  }

  if (error || !hospitalDetail?.hospital) {
    return <ConsultationRequestError lang={lang} dict={dict} />;
  }

  return (
    <div className=''>
      <PageHeader
        lang={lang}
        title={dict.consultation?.request?.title || '상담신청'}
        fallbackUrl={`/hospital/${hospitalId}`}
        variant='light'
      />
      <div className='p-5'>
        <HospitalCard
          hospital={convertHospitalToCardData(hospitalDetail.hospital)}
          dict={dict}
          lang={lang}
          user={user}
          showLikeButton={false}
        />
      </div>

      <div className='h-[1px] bg-neutral-200' />

      {/* 상담신청 폼 */}
      <ConsultationForm lang={lang} dict={dict} />
    </div>
  );
}
