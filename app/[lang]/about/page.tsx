import { type Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';
import { AboutContentV2, AboutVisionV2, AboutTaglineV2 } from 'features/about/ui';

interface AboutPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;
  // 필리핀어(tl)일 때 about 페이지 전체를 영어로 표시
  const effectiveLang = lang === 'tl' ? 'en' : lang;
  const dict = await getDictionary(effectiveLang);

  return (
    <div className=''>
      <AboutTaglineV2 />
      <AboutContentV2 lang={effectiveLang} dict={dict} />
      <AboutVisionV2 lang={effectiveLang} dict={dict} />
    </div>
  );
}
