import { type Locale } from 'shared/config';
import { SearchBar } from 'features/search';
import { QuickMenuWrapper } from 'features/quick-menu/ui/QuickMenuWrapper';
import { getDictionary } from 'app/[lang]/dictionaries';

interface MainPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function MainPage({ params }: MainPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <div className='mb-8'>
        <SearchBar lang={lang} dict={dict} />
      </div>

      <div className='mb-8'>
        <QuickMenuWrapper lang={lang} dict={dict} />
      </div>
    </>
  );
}
