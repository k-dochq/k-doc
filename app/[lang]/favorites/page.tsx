import { FavoritesTabs } from 'features/favorites-tabs';
import { type Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';

interface FavoritesPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function FavoritesPage({ params }: FavoritesPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const favoritesDict = {
    hospitals: dict.favorites?.hospitals || '병원',
    reviews: dict.favorites?.reviews || '시술후기',
  };

  return (
    <div className='space-y-6'>
      <div className='px-4'>
        <h1 className='text-2xl font-bold text-gray-900'>{dict.favorites?.title || '즐겨찾기'}</h1>
      </div>

      <FavoritesTabs dict={favoritesDict} />
    </div>
  );
}
