import { type Locale } from 'shared/config';
import { PageHeaderV2 } from 'shared/ui/page-header';
import { FreeGreatGiftFloatingButton, FreeGreatGiftSections } from 'widgets/free-great-gift';
import { getDictionary } from '../../dictionaries';

interface FreeGreatGiftPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function FreeGreatGiftPage({ params }: FreeGreatGiftPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div>
      {/* 헤더 타이틀은 전 언어 공통 영문 (디자인팀 전달, 2026-08-05) */}
      <PageHeaderV2 title='Free Great Gift' fallbackUrl={`/${lang}/main`} />
      {/* 고정 헤더 높이만큼 여백 */}
      <div className='h-[58px]' />
      <FreeGreatGiftSections lang={lang} />
      {/* 하단 고정 버튼이 마지막 섹션을 가리지 않도록 버튼 높이만큼 여백 */}
      {/* <div className='h-[120px]' /> */}
      <FreeGreatGiftFloatingButton lang={lang} dict={dict} />
    </div>
  );
}
