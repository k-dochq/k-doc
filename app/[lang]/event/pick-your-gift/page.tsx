import { type Locale } from 'shared/config';
import { PageHeaderV2 } from 'shared/ui/page-header';
import { PickYourGiftSections } from 'widgets/pick-your-gift';

interface PickYourGiftPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function PickYourGiftPage({ params }: PickYourGiftPageProps) {
  const { lang } = await params;

  return (
    <div>
      <PageHeaderV2 title='Pick Your Gift' fallbackUrl={`/${lang}/main`} />
      {/* 고정 헤더 높이만큼 여백 */}
      <div className='h-[58px]' />
      <PickYourGiftSections lang={lang} />
    </div>
  );
}
