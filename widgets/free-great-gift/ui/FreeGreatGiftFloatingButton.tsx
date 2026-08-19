'use client';

import { Loader2 } from 'lucide-react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { MAX_MOBILE_WIDTH_CLASS } from 'shared/config/layout';
import {
  GlowPillSurface,
  GLOW_PILL_BAR_HEIGHT_CLASS,
  GLOW_PILL_BUTTON_CLASS,
} from 'shared/ui/glow-pill';
import { useFreeGreatGiftConsultation } from 'features/free-great-gift-consultation';

export interface FreeGreatGiftFloatingButtonProps {
  lang: Locale;
  dict: Dictionary;
}

/**
 * 이벤트 페이지 하단 고정 CTA.
 *
 * 누르면 이벤트 안내 메시지가 먼저 발송되고 K-DOC 상담 채팅으로 이동한다.
 * 디자인은 컨시어지 플로팅 버튼과 동일하며 시각 레이어를 공유한다.
 */
export function FreeGreatGiftFloatingButton({ lang, dict }: FreeGreatGiftFloatingButtonProps) {
  const { handleConsult, isLoading } = useFreeGreatGiftConsultation(lang, dict);

  return (
    <div
      className={`fixed bottom-0 left-1/2 z-50 w-full -translate-x-1/2 px-5 ${GLOW_PILL_BAR_HEIGHT_CLASS} ${MAX_MOBILE_WIDTH_CLASS}`}
    >
      <button
        type='button'
        onClick={handleConsult}
        disabled={isLoading}
        className={`${GLOW_PILL_BUTTON_CLASS} disabled:opacity-70`}
      >
        <GlowPillSurface />

        {isLoading ? (
          <Loader2 className='relative z-10 h-5 w-5 animate-spin text-white' />
        ) : (
          <span className='relative z-10 text-[16px] leading-6 font-medium text-white'>
            {dict.freeGreatGift.floatingButton}
          </span>
        )}
      </button>
    </div>
  );
}
