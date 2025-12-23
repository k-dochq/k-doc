import { type Locale } from 'shared/config';
import { getDictionary } from '../../dictionaries';
import { PageHeaderV2 } from 'shared/ui/page-header';
import { MyReviewContentV2 } from './MyReviewContentV2';

interface MyReviewsPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function MyReviewsPage({ params }: MyReviewsPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const title = dict.my?.activityStats?.myPosts || '내가 작성한 글';

  return (
    <div>
      <PageHeaderV2 title={title} fallbackUrl={`/${lang}/my`} />
      <div className='h-[58px]' />
      <MyReviewContentV2 lang={lang} dict={dict} />
    </div>
  );
}
