import { type Locale } from 'shared/config';
import { SearchBar } from 'shared/ui';
import { QuickMenuWrapper } from 'features/quick-menu/ui/QuickMenuWrapper';
import { HospitalListWrapper } from 'widgets/hospital-list';
import { PopularReviewsWrapper } from 'widgets/popular-reviews';
import { NoticeSection } from 'widgets/notice-section/ui/NoticeSection';
import { LimousineBanner } from 'widgets/limousine-banner';
import { CautionSection } from 'widgets/caution-section';
import { TaxiReservationSection } from 'widgets/taxi-reservation';
import { EventBannerCarousel } from 'widgets/event-banner';
import { getDictionary } from 'app/[lang]/dictionaries';
import { fetchBestHospitalsServer } from 'entities/hospital/api/server/fetch-best-hospitals-server';

interface MainPageLayoutProps {
  lang: Locale;
}

export async function MainPageLayout({ lang }: MainPageLayoutProps) {
  const dict = await getDictionary(lang);

  // 서버에서 Best Hospitals 데이터 미리 가져오기
  const initialBestHospitals = await fetchBestHospitalsServer();

  return (
    <>
      <div className='overflow-x-hidden'>
        <div className='mt-2 px-5'>
          <SearchBar lang={lang} dict={dict} />
        </div>

        <div className='mt-4 px-5'>
          <QuickMenuWrapper lang={lang} />
        </div>

        <div className='mt-8 px-5'>
          <EventBannerCarousel currentLocale={lang} />
        </div>

        <div className='mt-12'>
          <HospitalListWrapper lang={lang} dict={dict} initialData={initialBestHospitals} />
        </div>

        <div className='mt-12'>
          <PopularReviewsWrapper lang={lang} dict={dict} />
        </div>

        <div className='mt-16'>
          <NoticeSection lang={lang} dict={dict} />
        </div>

        <div>
          <LimousineBanner lang={lang} />
        </div>

        <div className='bg-[#FE7A8F]'>
          <div className='px-5'>
            <CautionSection lang={lang} dict={dict} />
          </div>
        </div>
      </div>
      <TaxiReservationSection lang={lang} dict={dict} />
    </>
  );
}
