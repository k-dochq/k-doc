import { Header } from 'widgets/header';
import { BottomNavigation } from 'widgets/bottom-navigation';
import { type Locale } from 'shared/config';

interface HospitalsLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function HospitalsLayout({ children, params }: HospitalsLayoutProps) {
  const { lang } = await params;

  return (
    <>
      <Header currentLang={lang} />
      {children}
      <BottomNavigation currentLang={lang} />
    </>
  );
}
