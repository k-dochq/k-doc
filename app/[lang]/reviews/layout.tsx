import { BottomNavigation, BottomNavigationV2 } from 'widgets/bottom-navigation';
import { type Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';
import { HeaderV2 } from '@/widgets/header/ui/HeaderV2';

interface ReviewsLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function ReviewsLayout({ children, params }: ReviewsLayoutProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    // <div className='min-h-screen'>
    //   <Header currentLang={lang} dict={dict} />
    //   <main>{children}</main>
    //   <div className='h-16' />
    //   <BottomNavigation currentLang={lang} dict={dict} />
    // </div>
    <div className='min-h-screen bg-white'>
      <HeaderV2 currentLang={lang} dict={dict} />
      <main>{children}</main>
      <div className='h-16' />
      <BottomNavigationV2 currentLang={lang} dict={dict} />
    </div>
  );
}
