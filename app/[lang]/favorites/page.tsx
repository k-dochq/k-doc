import { FavoritesContentV2 } from './FavoritesContentV2';
import { type Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';

interface FavoritesPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function FavoritesPage({ params }: FavoritesPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <FavoritesContentV2 lang={lang} dict={dict} />;
}
