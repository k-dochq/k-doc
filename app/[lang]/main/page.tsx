import { type Locale } from 'shared/config';
import { SearchBar } from 'shared/ui';
import { QuickMenuWrapper } from 'features/quick-menu/ui/QuickMenuWrapper';
import { HospitalListWrapper } from 'widgets/hospital-list';
import { PopularReviewsWrapper } from 'widgets/popular-reviews';
import { CautionSection } from 'widgets/caution-section';
import { TaxiReservationSection } from 'widgets/taxi-reservation';
import { getDictionary } from 'app/[lang]/dictionaries';
import { fetchBestHospitalsServer } from 'entities/hospital/api/server/fetch-best-hospitals-server';

interface MainPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function MainPage({ params }: MainPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // 서버에서 Best Hospitals 데이터 미리 가져오기
  const initialBestHospitals = await fetchBestHospitalsServer();

  return (
    <>
      <div className='px-5'>
        <div className='mt-2'>
          <SearchBar lang={lang} dict={dict} />
        </div>

        <div className='mt-4'>
          <QuickMenuWrapper lang={lang} />
        </div>

        <div className='mt-12'>
          <HospitalListWrapper lang={lang} dict={dict} initialData={initialBestHospitals} />
        </div>

        <div className='mt-12'>
          <PopularReviewsWrapper lang={lang} dict={dict} />
        </div>

        <div className=''>
          <CautionSection lang={lang} dict={dict} />
        </div>
      </div>
      <TaxiReservationSection lang={lang} dict={dict} />
    </>
  );
}
