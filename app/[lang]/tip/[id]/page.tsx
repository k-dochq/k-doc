import { type Locale } from 'shared/config';
import { PageHeaderV2 } from 'shared/ui/page-header';
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
      <PageHeaderV2 title='' fallbackUrl={`/${lang}/tips`} />
      <div className='h-[58px]' />
      <main className='px-5 pb-10'>
        <TipDetailContent id={id} lang={lang} dict={dict} />
      </main>
    </div>
  );
}
