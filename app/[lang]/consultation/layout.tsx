import { BottomNavigation } from '@/widgets/bottom-navigation';
import { Header } from '@/widgets/header';
import { type Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';

interface ConsultationLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function ConsultationLayout({ children, params }: ConsultationLayoutProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Header currentLang={lang} dict={dict} />
      <main>{children}</main>
      <div className='h-16' />
      <BottomNavigation currentLang={lang} dict={dict} />
    </>
  );
}
