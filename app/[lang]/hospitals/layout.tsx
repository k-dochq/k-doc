// import { Header } from 'widgets/header';
import { BottomNavigationV2 } from 'widgets/bottom-navigation';
import { type Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';
import { HeaderV2 } from '@/widgets/header/ui/HeaderV2';

interface HospitalsLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function HospitalsLayout({ children, params }: HospitalsLayoutProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    // <>
    //   <Header currentLang={lang} dict={dict} />
    //   <main>{children}</main>
    //   <BottomNavigation currentLang={lang} dict={dict} />
    // </>
    <div className='min-h-screen bg-white'>
      <HeaderV2 currentLang={lang} dict={dict} />
      <main>{children}</main>
      <div className='h-16' />
      <BottomNavigationV2 currentLang={lang} dict={dict} />
    </div>
  );
}
