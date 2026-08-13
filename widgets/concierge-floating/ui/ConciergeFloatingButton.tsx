'use client';

import { Loader2 } from 'lucide-react';
import { MAX_MOBILE_WIDTH_CLASS } from 'shared/config/layout';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import {
  GlowPillSurface,
  GLOW_PILL_BAR_HEIGHT_CLASS,
  GLOW_PILL_BUTTON_CLASS,
} from 'shared/ui/glow-pill';
import { useConciergeConsultation } from 'features/concierge-consultation';

interface ConciergeFloatingButtonProps {
  lang: Locale;
  dict: Dictionary;
}

export function ConciergeFloatingButton({ lang, dict }: ConciergeFloatingButtonProps) {
  const { handleConsult, isLoading } = useConciergeConsultation(lang, dict);

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

        {/* Label / Spinner */}
        {isLoading ? (
          <Loader2 className='relative z-10 h-5 w-5 animate-spin text-white' />
        ) : (
          <span className='relative z-10 text-[16px] leading-6 font-medium text-white'>
            {dict.concierge.floatingButtonText}
          </span>
        )}
      </button>
    </div>
  );
}
