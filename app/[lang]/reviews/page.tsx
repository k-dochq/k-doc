import { getDictionary } from '../dictionaries';
import { type Locale } from 'shared/config';
import { AllReviewsContent } from './AllReviewsContent';

interface AllReviewsPageProps {
  params: Promise<{
    lang: Locale;
  }>;
  searchParams: Promise<{
    category?: string;
    sort?: string;
  }>;
}

export default async function AllReviewsPage({ params, searchParams }: AllReviewsPageProps) {
  const { lang } = await params;
  const resolvedSearchParams = await searchParams;
  const dict = await getDictionary(lang);

  return (
    <div className=''>
      <AllReviewsContent lang={lang} dict={dict} searchParams={resolvedSearchParams} />
    </div>
  );
}

// 메타데이터 생성
export async function generateMetadata({ params }: AllReviewsPageProps) {
  const { lang } = await params;

  try {
    const dict = await getDictionary(lang);

    return {
      title: dict.allReviews?.title || '전체 시술후기',
      description:
        dict.allReviews?.subtitle ||
        '모든 병원의 실제 시술후기를 확인하세요. 다양한 부위별 시술 경험과 후기를 통해 더 나은 선택을 하실 수 있습니다.',
    };
  } catch (error) {
    console.error('Error generating metadata for all reviews page:', error);
    return {
      title: 'All Reviews',
      description: '모든 병원의 실제 시술후기를 확인하세요.',
    };
  }
}
