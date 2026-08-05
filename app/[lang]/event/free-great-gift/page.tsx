import { type Locale } from 'shared/config';
import { PageHeaderV2 } from 'shared/ui/page-header';
import { FreeGreatGiftSections } from 'widgets/free-great-gift';

interface FreeGreatGiftPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function FreeGreatGiftPage({ params }: FreeGreatGiftPageProps) {
  const { lang } = await params;

  return (
    <div>
      {/* 헤더 타이틀은 전 언어 공통 영문 (디자인팀 전달, 2026-08-05) */}
      <PageHeaderV2 title='Free Great Gift' fallbackUrl={`/${lang}/main`} />
      {/* 고정 헤더 높이만큼 여백 */}
      <div className='h-[58px]' />
      <FreeGreatGiftSections lang={lang} />
    </div>
  );
}
