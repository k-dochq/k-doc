import { type Locale } from 'shared/config';
import { EventBannerRibbonCarousel } from 'widgets/event-banner/ui/EventBannerRibbonCarousel';
import { SearchBarV2 } from 'shared/ui/search-bar/SearchBarV2';
import { getDictionary } from '../../dictionaries';

interface V2MainPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function V2MainPage({ params }: V2MainPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className='min-h-screen bg-white'>
      <EventBannerRibbonCarousel currentLocale={lang} />
      <div className='px-5 py-5'>
        <SearchBarV2 lang={lang} dict={dict} />
      </div>
      <div>{/* 빈 페이지 - 향후 컴포넌트 추가 예정 */}</div>
    </div>
  );
}
