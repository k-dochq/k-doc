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
    loading: dict.favorites?.loading || '로딩 중...',
    error: dict.favorites?.error || '데이터를 불러오는 중 오류가 발생했습니다.',
    retry: dict.favorites?.retry || '다시 시도',
    empty: {
      hospitals: {
        title: dict.favorites?.empty?.hospitals?.title || '좋아요한 병원이 없습니다',
        description:
          dict.favorites?.empty?.hospitals?.description ||
          '마음에 드는 병원을 찾아 좋아요를 눌러보세요',
      },
      reviews: {
        title: dict.favorites?.empty?.reviews?.title || '좋아요한 시술후기가 없습니다',
        description:
          dict.favorites?.empty?.reviews?.description ||
          '유용한 시술후기를 찾아 좋아요를 눌러보세요',
      },
    },
    loadingMore: dict.favorites?.loadingMore || '더 많은 데이터를 불러오는 중...',
    allLoaded: dict.favorites?.allLoaded || '모든 데이터를 불러왔습니다',
  };

  return (
    <div className='space-y-6'>
      <div className='px-4'>
        <h1 className='text-2xl font-bold text-gray-900'>{dict.favorites?.title || '즐겨찾기'}</h1>
      </div>

      <FavoritesTabs lang={lang} dict={favoritesDict} />
    </div>
  );
}
