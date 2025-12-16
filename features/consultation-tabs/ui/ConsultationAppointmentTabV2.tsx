'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { ChatRoomEmptyStateV2 } from './ChatRoomEmptyStateV2';

interface ConsultationAppointmentTabV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function ConsultationAppointmentTabV2({ lang, dict }: ConsultationAppointmentTabV2Props) {
  return (
    <ChatRoomEmptyStateV2
      lang={lang}
      dict={dict}
      title={dict.consultation?.empty?.appointment?.title || '예약된 내역이 없어요'}
      description={
        dict.consultation?.empty?.appointment?.description || '원하는 병원에 예약을 신청해보세요'
      }
    />
  );
}
