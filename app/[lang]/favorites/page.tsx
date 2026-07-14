import { FavoritesContentV2, type FavoritesTab } from './FavoritesContentV2';
import { type Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';

interface FavoritesPageProps {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ tab?: string }>;
}

const FAVORITES_TAB_VALUES: FavoritesTab[] = ['hospitals', 'reviews', 'doctors'];

function parseTab(value: string | undefined): FavoritesTab {
  return FAVORITES_TAB_VALUES.includes(value as FavoritesTab)
    ? (value as FavoritesTab)
    : 'hospitals';
}

export default async function FavoritesPage({ params, searchParams }: FavoritesPageProps) {
  const { lang } = await params;
  const { tab } = await searchParams;
  const dict = await getDictionary(lang);

  return <FavoritesContentV2 lang={lang} dict={dict} initialTab={parseTab(tab)} />;
}
