'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { FavoritesHospitalsEmptyState } from 'features/favorites-tabs/ui/FavoritesHospitalsEmptyState';

interface ConsultationAppointmentTabProps {
  lang: Locale;
  dict: Dictionary;
}

export function ConsultationAppointmentTab({ lang, dict }: ConsultationAppointmentTabProps) {
  return (
    <FavoritesHospitalsEmptyState
      lang={lang}
      dict={dict}
      title={dict.consultation?.empty?.appointment?.title || '예약 신청 내역이 없습니다'}
      description={
        dict.consultation?.empty?.appointment?.description || '원하는 병원에 예약을 신청해보세요'
      }
    />
  );
}
