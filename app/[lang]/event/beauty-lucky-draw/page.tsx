import { type Locale } from 'shared/config';
import { PageHeaderV2 } from 'shared/ui/page-header';
import { BeautyLuckyDrawFloatingButton, BeautyLuckyDrawSections } from 'widgets/beauty-lucky-draw';
import { getDictionary } from '../../dictionaries';

interface BeautyLuckyDrawPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function BeautyLuckyDrawPage({ params }: BeautyLuckyDrawPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div>
      {/* 헤더 타이틀은 전 언어 공통 영문 */}
      <PageHeaderV2 title='K-DOC Beauty Lucky Draw' fallbackUrl={`/${lang}/main`} />
      {/* 고정 헤더 높이만큼 여백 */}
      <div className='h-[58px]' />
      <BeautyLuckyDrawSections lang={lang} />
      <BeautyLuckyDrawFloatingButton lang={lang} dict={dict} />
    </div>
  );
}
