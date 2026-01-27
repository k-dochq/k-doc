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
import { getDictionary } from 'app/[lang]/dictionaries';
import { ContactFloatingButton } from 'features/contact-floating-button';

interface MainPageLayoutV2Props {
  lang: Locale;
}

export async function MainPageLayoutV2({ lang }: MainPageLayoutV2Props) {
  const dict = await getDictionary(lang);

  // 빌드 시 DB 조회 제거 - 클라이언트에서 데이터를 가져옵니다
  // 정적 페이지 생성 시 여러 언어로 동시에 빌드되면서 연결 풀 문제가 발생하므로
  // 빌드 시에는 데이터를 가져오지 않고, 런타임에 클라이언트에서 가져오도록 변경

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
        <HospitalListV2Container lang={lang} dict={dict} />
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

      {(lang === 'th' || lang === 'tl') && <ContactFloatingButton lang={lang} />}
    </div>
  );
}
