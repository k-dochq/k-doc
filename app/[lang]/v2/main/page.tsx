import { type Locale } from 'shared/config';
import { EventBannerRibbonCarousel } from 'widgets/event-banner/ui/EventBannerRibbonCarousel';

interface V2MainPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function V2MainPage({ params }: V2MainPageProps) {
  const { lang } = await params;

  return (
    <div className='min-h-screen bg-white'>
      <EventBannerRibbonCarousel currentLocale={lang} />
      <div>{/* 빈 페이지 - 향후 컴포넌트 추가 예정 */}</div>
    </div>
  );
}
