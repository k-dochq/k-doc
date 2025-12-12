import { type Locale } from 'shared/config';
import { getDictionary } from '../../dictionaries';
import { CategorySectionV2 } from 'features/category-filter/ui/CategorySectionV2';
import { useCategories } from 'features/category-filter';
import { ReviewsContentV2 } from './ReviewsContentV2';

interface V2ReviewsPageProps {
  params: Promise<{
    lang: Locale;
  }>;
  searchParams: Promise<{
    category?: string;
    sort?: string;
  }>;
}

export default async function V2ReviewsPage({ params, searchParams }: V2ReviewsPageProps) {
  const { lang } = await params;
  const resolvedSearchParams = await searchParams;
  const dict = await getDictionary(lang);

  return (
    <div className=''>
      <ReviewsContentV2 lang={lang} dict={dict} searchParams={resolvedSearchParams} />
    </div>
  );
}
