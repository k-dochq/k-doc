import { FavoritesTabs } from 'features/favorites-tabs';
import { type Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';

interface FavoritesPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function FavoritesPage({ params }: FavoritesPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <FavoritesTabs lang={lang} dict={dict} />;
}
