import { type Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';
import { AboutContentV2, AboutVisionV2 } from 'features/about/ui';

interface AboutPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className=''>
      {/* <AboutTaglineV2 /> */}
      <AboutContentV2 lang={lang} dict={dict} />
      <AboutVisionV2 lang={lang} dict={dict} />
    </div>
  );
}
