import { Header } from 'widgets/header';
import { BottomNavigation } from 'widgets/bottom-navigation';
import { type Locale } from 'shared/config';

interface ReviewsLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function ReviewsLayout({ children, params }: ReviewsLayoutProps) {
  const { lang } = await params;

  return (
    <div className='min-h-screen'>
      <Header currentLang={lang} />
      <main>{children}</main>
      <div className='h-16' />
      <BottomNavigation currentLang={lang} />
    </div>
  );
}
