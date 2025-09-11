import { type Locale } from 'shared/config';
import { SearchBar } from 'features/search';
import { QuickMenuWrapper } from 'features/quick-menu/ui/QuickMenuWrapper';
import { HospitalCarouselWrapper } from 'widgets/hospital-carousel';
import { getDictionary } from 'app/[lang]/dictionaries';

interface MainPageProps {
  params: Promise<{ lang: Locale }>;
}

// 메인 페이지는 가장 동적인 콘텐츠(병원 데이터)에 맞춰 10분 캐시
export const revalidate = 600; // 10분 (600초)

export default async function MainPage({ params }: MainPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className='px-5'>
      <div className='mt-2'>
        <SearchBar lang={lang} dict={dict} />
      </div>

      <div className='mt-4'>
        <QuickMenuWrapper lang={lang} dict={dict} />
      </div>

      <div className=''>
        <HospitalCarouselWrapper lang={lang} dict={dict} />
      </div>
    </div>
  );
}
