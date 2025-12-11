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

  // sort 파라미터 유효성 검사 및 기본값 설정
  const sortParam = resolvedSearchParams.sort;
  const isValidSort =
    sortParam && Object.values(REVIEW_SORT_OPTIONS).includes(sortParam as ReviewSortOption);
  const sort = (isValidSort ? sortParam : REVIEW_SORT_OPTIONS.RECOMMENDED) as ReviewSortOption;

  return <HospitalReviewsContentV2 hospitalId={id} lang={lang} dict={dict} sort={sort} />;
}
