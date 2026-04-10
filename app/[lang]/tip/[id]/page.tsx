import { type Locale } from 'shared/config';
import { PageHeaderV2 } from 'shared/ui/page-header';
import { TipShareButton } from 'entities/tip/ui/detail/TipShareButton';
import { getDictionary } from '../../dictionaries';
import { TipDetailContent } from './TipDetailContent';

interface TipDetailPageProps {
  params: Promise<{ lang: Locale; id: string }>;
}

export default async function TipDetailPage({ params }: TipDetailPageProps) {
  const { lang, id } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className='min-h-screen bg-white'>
      <PageHeaderV2
        title=''
        fallbackUrl={`/${lang}/tips`}
        rightContent={<TipShareButton id={id} lang={lang} />}
      />
      <div className='h-[58px]' />
      <main className='px-5 pb-[112px]'>
        <TipDetailContent id={id} lang={lang} dict={dict} />
      </main>
    </div>
  );
}
