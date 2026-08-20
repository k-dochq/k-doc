'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useConsultationEntry } from 'features/consultation-entry';

/** 로그인 이후 대기 중인 메시지를 찾을 때 쓰는 키. 복귀 경로와 짝이다. */
export const FREE_GREAT_GIFT_PENDING_KEY = 'pending_free_great_gift_consult';

/**
 * Free Great Gift 이벤트 페이지 하단 CTA 액션.
 *
 * 컨시어지와 같은 흐름으로 K-DOC 상담 채팅에 진입하되,
 * 이벤트 참여자에게 맞는 안내 메시지가 먼저 발송된다.
 */
export function useFreeGreatGiftConsultation(lang: Locale, dict: Dictionary) {
  return useConsultationEntry({
    lang,
    dict,
    message: dict.freeGreatGift.consultationMessage,
    redirectPath: `/${lang}/event/free-great-gift/consult-redirect`,
    storageKey: FREE_GREAT_GIFT_PENDING_KEY,
  });
}
