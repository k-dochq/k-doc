'use client';

import { type Locale } from 'shared/config';
import { ConsultRedirectRunner } from 'features/consultation-entry';
import { FREE_GREAT_GIFT_PENDING_KEY } from 'features/free-great-gift-consultation';

interface ConsultRedirectContentProps {
  lang: Locale;
}

export function ConsultRedirectContent({ lang }: ConsultRedirectContentProps) {
  return (
    <ConsultRedirectRunner
      lang={lang}
      storageKey={FREE_GREAT_GIFT_PENDING_KEY}
      fallbackPath={`/${lang}/event/free-great-gift`}
    />
  );
}
