import { Header } from 'widgets/header';
import { BottomNavigation } from 'widgets/bottom-navigation';
import { type Locale } from 'shared/config';

interface FavoritesLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function FavoritesLayout({ children, params }: FavoritesLayoutProps) {
  const { lang } = await params;

  return (
    <>
      <Header currentLang={lang} />
      <main className='py-8 pb-20'>{children}</main>
      <BottomNavigation currentLang={lang} />
    </>
  );
}
