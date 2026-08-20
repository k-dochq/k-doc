'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useConsultationEntry } from 'features/consultation-entry';

/** 로그인 이후 대기 중인 메시지를 찾을 때 쓰는 키. 복귀 경로와 짝이다. */
export const CONCIERGE_PENDING_KEY = 'pending_concierge_consult';

/**
 * 컨시어지 "Start Free Consultation" / "Go Premium" 버튼 액션.
 *
 * 동작은 이벤트 페이지와 동일해 features/consultation-entry 로 옮겼고,
 * 여기서는 컨시어지에 해당하는 메시지와 복귀 경로만 지정한다.
 */
export function useConciergeConsultation(lang: Locale, dict: Dictionary) {
  return useConsultationEntry({
    lang,
    dict,
    message: dict.concierge.consultationMessage,
    redirectPath: `/${lang}/concierge/consult-redirect`,
    storageKey: CONCIERGE_PENDING_KEY,
  });
}
