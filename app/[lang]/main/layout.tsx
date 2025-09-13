import { Header } from 'widgets/header';
import { MaxWidthLayout } from 'widgets/max-width-layout';
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
    <MaxWidthLayout>
      <Header currentLang={lang} />
      <main>{children}</main>
      <Footer lang={lang} dict={dict} />
      <div className='h-16' />
      <BottomNavigation currentLang={lang} />
    </MaxWidthLayout>
  );
}
