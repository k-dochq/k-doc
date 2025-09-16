import { BottomNavigation } from '@/widgets/bottom-navigation';
import { Header } from '@/widgets/header';
import { type Locale } from 'shared/config';

interface ConsultationLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function ConsultationLayout({ children, params }: ConsultationLayoutProps) {
  const { lang } = await params;

  return (
    <>
      <Header currentLang={lang} />
      <main>{children}</main>
      <div className='h-16' />
      <BottomNavigation currentLang={lang} />
    </>
  );
}
