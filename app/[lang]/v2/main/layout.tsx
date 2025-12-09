import { HeaderV2 } from 'widgets/header/ui/HeaderV2';
import { type Locale } from 'shared/config';
import { getDictionary } from '../../dictionaries';
import { BottomNavigationV2 } from '@/widgets/bottom-navigation';
import { FooterV2 } from 'widgets/footer/ui/FooterV2';

interface V2MainLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function V2MainLayout({ children, params }: V2MainLayoutProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className='min-h-screen bg-white'>
      <HeaderV2 currentLang={lang} dict={dict} />
      <main>{children}</main>
      <FooterV2 lang={lang} dict={dict} />
      <div className='h-16' />
      <BottomNavigationV2 currentLang={lang} dict={dict} />
    </div>
  );
}
