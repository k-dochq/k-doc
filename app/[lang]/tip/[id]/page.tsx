import { type Locale } from 'shared/config';
import { PageHeaderV2 } from 'shared/ui/page-header';

interface TipDetailPageProps {
  params: Promise<{ lang: Locale; id: string }>;
}

export default async function TipDetailPage({ params }: TipDetailPageProps) {
  const { lang } = await params;

  return (
    <div className='min-h-screen bg-white'>
      <PageHeaderV2 title='' fallbackUrl={`/${lang}/tips`} />
      <div className='h-[58px]' />
      <main>
        {/* TODO: 아티클 상세 콘텐츠 구현 */}
      </main>
    </div>
  );
}
