import { Header } from 'widgets/header';
import { BottomNavigation } from 'widgets/bottom-navigation';
import { Footer } from 'widgets/footer';
import { type Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';

interface MainLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function MainLayout({ children, params }: MainLayoutProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Header currentLang={lang} dict={dict} />
      <main>{children}</main>
      <Footer lang={lang} dict={dict} />
      <div className='h-16' />
      <BottomNavigation currentLang={lang} dict={dict} />
    </>
  );
}
