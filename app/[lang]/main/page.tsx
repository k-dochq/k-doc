import { type Locale } from 'shared/config';
import { SearchBar } from 'shared/ui';
import { QuickMenuWrapper } from 'features/quick-menu/ui/QuickMenuWrapper';
import { HospitalListWrapper } from 'widgets/hospital-list';
import { PopularReviewsWrapper } from 'widgets/popular-reviews';
import { CautionSection } from 'widgets/caution-section';
import { TaxiReservationSection } from 'widgets/taxi-reservation';
import { getDictionary } from 'app/[lang]/dictionaries';

interface MainPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function MainPage({ params }: MainPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

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
          <HospitalListWrapper lang={lang} dict={dict} />
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
