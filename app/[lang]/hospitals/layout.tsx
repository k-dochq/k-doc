import { Header } from 'widgets/header';
import { BottomNavigation } from 'widgets/bottom-navigation';
import { type Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';

interface HospitalsLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function HospitalsLayout({ children, params }: HospitalsLayoutProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Header currentLang={lang} dict={dict} />
      <main>{children}</main>
      <BottomNavigation currentLang={lang} dict={dict} />
    </>
  );
}
