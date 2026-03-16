'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PageHeaderV2 } from 'shared/ui/page-header';
import { ConciergeHero } from 'widgets/concierge-hero';

interface ConciergeContentProps {
  lang: Locale;
  dict: Dictionary;
}

export function ConciergeContent({ lang, dict: _dict }: ConciergeContentProps) {
  return (
    <div className='min-h-screen bg-white'>
      <PageHeaderV2 title='K-DOC Concierge Services' fallbackUrl={`/${lang}/main`} />
      <div className='h-[58px]' />

      <ConciergeHero />
    </div>
  );
}
