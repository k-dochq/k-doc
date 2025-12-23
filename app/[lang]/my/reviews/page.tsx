import { type Locale } from 'shared/config';
import { getDictionary } from '../../dictionaries';
import { PageHeaderV2 } from 'shared/ui/page-header';

interface MyReviewsPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function MyReviewsPage({ params }: MyReviewsPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const title = dict.my?.activityStats?.myPosts || '내가 작성한 글';

  return (
    <div className='min-h-screen bg-neutral-100'>
      <PageHeaderV2 title={title} fallbackUrl={`/${lang}/my`} backgroundColor='bg-neutral-100' />
      <div className='h-[58px]' />
      <div className='p-5'>{/* 컨텐츠 영역 - 추후 구현 예정 */}</div>
    </div>
  );
}
