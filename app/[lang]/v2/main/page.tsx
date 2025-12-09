import { type Locale } from 'shared/config';
import { EventBannerRibbonCarousel } from 'widgets/event-banner/ui/EventBannerRibbonCarousel';
import { SearchBarV2 } from 'shared/ui/search-bar/SearchBarV2';
import { EventBannerMainCarouselV2 } from 'widgets/event-banner/ui/EventBannerMainCarouselV2';
import { QuickMenuV2 } from 'features/quick-menu/ui/QuickMenuV2';
import { HospitalListTitleV2 } from 'widgets/hospital-list/ui/HospitalListTitleV2';
import { HospitalListV2Container } from 'widgets/hospital-list/ui/HospitalListV2Container';
import { LiveReviewV2Container } from 'widgets/live-reviews/ui';
import { PopularReviewsV2Wrapper } from 'widgets/popular-reviews/ui';
import { PremiumServiceV2Container } from 'widgets/premium-service/ui';
import { YoutubeVideosV2Wrapper } from 'widgets/youtube-videos/ui';
import { getBestHospitals } from 'entities/hospital/api/use-cases/get-best-hospitals';
import { getDictionary } from '../../dictionaries';
import { ContactFloatingButton } from 'features/contact-floating-button';

interface V2MainPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function V2MainPage({ params }: V2MainPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // 초기 데이터 prefetch (ALL 카테고리)
  const initialHospitals = await getBestHospitals({
    category: 'ALL',
    limit: 5,
  });

  return (
    <div className=''>
      <div className='bg-[#F7F7F7]'>
        <EventBannerRibbonCarousel currentLocale={lang} />
        <div className='px-5 py-5'>
          <SearchBarV2 lang={lang} dict={dict} searchPath='/search/hospitals' />
        </div>
        <EventBannerMainCarouselV2 currentLocale={lang} />
        <div className='py-5'>
          <QuickMenuV2 lang={lang} />
        </div>
      </div>

      <div className='pt-[2px] pb-9'>
        <div className='px-5'>
          <HospitalListTitleV2 lang={lang} dict={dict} />
        </div>
        <div className='h-4' />
        <HospitalListV2Container lang={lang} dict={dict} initialData={initialHospitals} />
      </div>

      <div className='bg-primary-200 py-12'>
        <LiveReviewV2Container lang={lang} dict={dict} />
      </div>

      <div className='py-9'>
        <PopularReviewsV2Wrapper lang={lang} dict={dict} />
      </div>

      <PremiumServiceV2Container lang={lang} dict={dict} />

      <div className='py-9'>
        <YoutubeVideosV2Wrapper lang={lang} dict={dict} />
      </div>

      <ContactFloatingButton />
    </div>
  );
}
