import { type Locale } from 'shared/config';
import { SearchBar } from 'features/search';
import { QuickMenuWrapper } from 'features/quick-menu/ui/QuickMenuWrapper';
import { HospitalListWrapper } from 'widgets/hospital-list';
import { getDictionary } from 'app/[lang]/dictionaries';

interface MainPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function MainPage({ params }: MainPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
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
    </div>
  );
}
