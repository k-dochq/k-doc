import { Header } from 'widgets/header';
import { BottomNavigation } from 'widgets/bottom-navigation';
import { type Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';

interface FavoritesLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function FavoritesLayout({ children, params }: FavoritesLayoutProps) {
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
