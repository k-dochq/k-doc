import { BottomNavigationV2 } from '@/widgets/bottom-navigation';
// import { Footer } from '@/widgets/footer';
// import { Header } from '@/widgets/header';
import { type Locale } from 'shared/config';
import { MainPageLayoutV2 } from 'widgets/main-page-layout';
import { getDictionary } from './dictionaries';
import { HeaderV2 } from '@/widgets/header/ui/HeaderV2';
import { FooterV2 } from '@/widgets/footer/ui/FooterV2';

interface HomePageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    // <>
    //   <Header currentLang={lang} dict={dict} />
    //   <main>
    //     <MainPageLayout lang={lang} />
    //   </main>
    //   <Footer lang={lang} dict={dict} />
    //   <div className='h-16' />
    //   <BottomNavigation currentLang={lang} dict={dict} />
    // </>
    <div className='min-h-screen bg-white'>
      <HeaderV2 currentLang={lang} dict={dict} />
      <main>
        <MainPageLayoutV2 lang={lang} />
      </main>
      <FooterV2 lang={lang} dict={dict} />
      <div className='h-16' />
      <BottomNavigationV2 currentLang={lang} dict={dict} />
    </div>
  );
}
