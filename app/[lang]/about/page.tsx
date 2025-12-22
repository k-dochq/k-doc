import { type Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';
import {
  AboutHero,
  // AboutDescription,
  // AboutCeoGreeting,
  // AboutSeoulOffice,
  AboutVision,
  AboutCertification,
  AboutContentV2,
  AboutVisionV2,
} from 'features/about/ui';

interface AboutPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className=''>
      <AboutContentV2 lang={lang} dict={dict} />
      <AboutVisionV2 lang={lang} dict={dict} />
    </div>
  );
}
