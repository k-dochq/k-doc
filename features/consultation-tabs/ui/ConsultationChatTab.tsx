'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { FavoritesHospitalsEmptyState } from 'features/favorites-tabs/ui/FavoritesHospitalsEmptyState';

interface ConsultationChatTabProps {
  lang: Locale;
  dict: Dictionary;
}

export function ConsultationChatTab({ lang, dict }: ConsultationChatTabProps) {
  return (
    <FavoritesHospitalsEmptyState
      lang={lang}
      dict={dict}
      title={dict.consultation?.empty?.chat?.title || '진행 중인 상담이 없습니다'}
      description={dict.consultation?.empty?.chat?.description || '병원과 상담을 시작해보세요'}
    />
  );
}
