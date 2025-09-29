import { BottomNavigation } from '@/widgets/bottom-navigation';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';
import { type Locale } from 'shared/config';
import { MainPageLayout } from 'widgets/main-page-layout';
import { getDictionary } from './dictionaries';

interface HomePageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Header currentLang={lang} dict={dict} />
      <main>
        <MainPageLayout lang={lang} />
      </main>
      <Footer lang={lang} dict={dict} />
      <div className='h-16' />
      <BottomNavigation currentLang={lang} dict={dict} />
    </>
  );
}
