import { type Locale } from 'shared/config';
import { type TipsSortOption } from 'entities/tip/model/useInfiniteTips';
import { getDictionary } from '../dictionaries';
import { TipsContent } from './TipsContent';

interface TipsPageProps {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ sort?: string }>;
}

function parseSort(value: string | undefined): TipsSortOption {
  return value === 'popular' ? 'popular' : 'latest';
}

export default async function TipsPage({ params, searchParams }: TipsPageProps) {
  const { lang } = await params;
  const { sort } = await searchParams;
  const dict = await getDictionary(lang);

  return (
    <div className='px-5'>
      <img
        src='/images/tips-top-banner.png'
        alt='K-DOC Tips'
        className='w-full'
      />
      <TipsContent lang={lang} dict={dict} initialSort={parseSort(sort)} />
    </div>
  );
}
