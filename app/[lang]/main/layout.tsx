import { Header } from 'widgets/header';
import { MaxWidthLayout } from 'widgets/max-width-layout';
import { BottomNavigation } from 'widgets/bottom-navigation';
import { type Locale } from 'shared/config';

interface MainLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function MainLayout({ children, params }: MainLayoutProps) {
  const { lang } = await params;

  return (
    <MaxWidthLayout>
      <Header currentLang={lang} />
      <main>{children}</main>
      <div className='h-16' />
      <BottomNavigation currentLang={lang} />
    </MaxWidthLayout>
  );
}
