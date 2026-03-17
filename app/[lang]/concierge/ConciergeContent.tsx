'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PageHeaderV2 } from 'shared/ui/page-header';
import { ConciergeHero } from 'widgets/concierge-hero';
import { ConciergeSection2 } from 'widgets/concierge-section2';
import { ConciergeSection3 } from 'widgets/concierge-section3';
import { ConciergePlanTable } from 'widgets/concierge-section4';
import { ConciergeReviews } from 'widgets/concierge-section5';
import { ConciergeWhyChoose } from 'widgets/concierge-section6';
import { ConciergeTravel } from 'widgets/concierge-section7';
import { ConciergeJourneyBanner } from 'widgets/concierge-section8';
import { ConciergeFaq } from 'widgets/concierge-faq';
import { ConciergeFloatingButton } from 'widgets/concierge-floating';

interface ConciergeContentProps {
  lang: Locale;
  dict: Dictionary;
}

export function ConciergeContent({ lang, dict }: ConciergeContentProps) {
  return (
    <div className='min-h-screen bg-white' dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <PageHeaderV2 title='K-DOC Concierge Services' fallbackUrl={`/${lang}/main`} />
      <div className='h-[58px]' />

      <ConciergeHero lang={lang} />
      <ConciergeSection2 lang={lang} />
      <ConciergeSection3 dict={dict} />
      <ConciergePlanTable dict={dict} />
      <ConciergeReviews dict={dict} lang={lang} />
      <ConciergeWhyChoose dict={dict} lang={lang} />
      <ConciergeTravel dict={dict} />
      <ConciergeJourneyBanner lang={lang} />
      <ConciergeFaq dict={dict} />
      <ConciergeFloatingButton dict={dict} />
    </div>
  );
}
