// import { Header } from 'widgets/header';
import { BottomNavigationV2 } from 'widgets/bottom-navigation';
// import { Footer } from 'widgets/footer';
import { type Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';
import { HeaderV2 } from '@/widgets/header/ui/HeaderV2';
import { FooterV2 } from '@/widgets/footer/ui/FooterV2';

interface MainLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function MainLayout({ children, params }: MainLayoutProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    // <>
    //   <Header currentLang={lang} dict={dict} />
    //   <main>{children}</main>
    //   <Footer lang={lang} dict={dict} />
    //   <div className='h-16' />
    //   <BottomNavigation currentLang={lang} dict={dict} />
    // </>
    <div className='min-h-screen bg-white'>
      <HeaderV2 currentLang={lang} dict={dict} />
      <main>{children}</main>
      <FooterV2 lang={lang} dict={dict} />
      <div className='h-16' />
      <BottomNavigationV2 currentLang={lang} dict={dict} />
    </div>
  );
}
