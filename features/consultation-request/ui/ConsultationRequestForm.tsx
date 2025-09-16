'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useHospitalDetail } from 'entities/hospital/model/useHospitalDetail';
import { HospitalCard } from 'entities/hospital/ui/HospitalCard';
import { useAuth } from 'shared/lib/auth/useAuth';
import { ConsultationRequestLoading } from './ConsultationRequestLoading';
import { ConsultationRequestError } from './ConsultationRequestError';
import { convertHospitalToCardData } from '../lib/convert-hospital-to-card-data';

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
      <HospitalCard
        hospital={convertHospitalToCardData(hospitalDetail.hospital)}
        dict={dict}
        lang={lang}
        user={user}
        showLikeButton={false}
      />
    </div>
  );
}
