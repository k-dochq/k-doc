import { type Locale } from 'shared/config';
import { type ReviewSortOption, REVIEW_SORT_OPTIONS } from 'shared/model/types/review-query';
import { getDictionary } from '../../../../dictionaries';
import { HospitalReviewsContentV2 } from './HospitalReviewsContentV2';

interface V2HospitalReviewsPageProps {
  params: Promise<{ lang: Locale; id: string }>;
  searchParams: Promise<{ sort?: string }>;
}

export default async function V2HospitalReviewsPage({
  params,
  searchParams,
}: V2HospitalReviewsPageProps) {
  const { lang, id } = await params;
  const resolvedSearchParams = await searchParams;
  const dict = await getDictionary(lang);

  const sort = (resolvedSearchParams.sort as ReviewSortOption) || REVIEW_SORT_OPTIONS.POPULAR;

  return <HospitalReviewsContentV2 hospitalId={id} lang={lang} dict={dict} sort={sort} />;
}
