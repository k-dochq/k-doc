import { type Locale } from 'shared/config';
import { EventBannerRibbonCarousel } from 'widgets/event-banner/ui/EventBannerRibbonCarousel';
import { SearchBarV2 } from 'shared/ui/search-bar/SearchBarV2';
import { EventBannerMainCarouselV2 } from 'widgets/event-banner/ui/EventBannerMainCarouselV2';
import { QuickMenuV2 } from 'features/quick-menu/ui/QuickMenuV2';
import { HospitalListTitleV2 } from 'widgets/hospital-list/ui/HospitalListTitleV2';
import { HospitalListV2Container } from 'widgets/hospital-list/ui/HospitalListV2Container';
import { getMainMedicalSpecialties } from 'entities/hospital/api/use-cases/get-medical-specialties';
import { getBestHospitals } from 'entities/hospital/api/use-cases/get-best-hospitals';
import { getDictionary } from '../../dictionaries';

interface V2MainPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function V2MainPage({ params }: V2MainPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const medicalSpecialties = await getMainMedicalSpecialties();

  // 초기 데이터 prefetch (ALL 카테고리)
  const initialHospitals = await getBestHospitals({
    category: 'ALL',
    limit: 10,
  });

  return (
    <div className='min-h-screen bg-white'>
      <div className='bg-[#F7F7F7]'>
        <EventBannerRibbonCarousel currentLocale={lang} />
        <div className='px-5 py-5'>
          <SearchBarV2 lang={lang} dict={dict} />
        </div>
        <EventBannerMainCarouselV2 currentLocale={lang} />
        <div className='py-5'>
          <QuickMenuV2 lang={lang} />
        </div>
      </div>

      <div className='px-5 pt-[2px] pb-9'>
        <HospitalListTitleV2 lang={lang} dict={dict} />
        <div className='h-4' />
        <HospitalListV2Container
          lang={lang}
          dict={dict}
          medicalSpecialties={medicalSpecialties}
          initialData={initialHospitals}
        />
      </div>
    </div>
  );
}
