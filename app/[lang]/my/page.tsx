import { type Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';
import { PageHeader } from 'shared/ui/page-header';
import { MyContent, MyContentV2 } from 'features/my-page';

interface MyPageProps {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function MyPage({ params }: MyPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    // <div>
    //   <PageHeader title={dict.my.title} lang={lang} variant='light' />
    //   <MyContent lang={lang} dict={dict} />
    // </div>
    <MyContentV2 lang={lang} dict={dict} />
  );
}
