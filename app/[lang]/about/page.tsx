import { type Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';
import {
  AboutHero,
  // AboutDescription,
  // AboutCeoGreeting,
  // AboutSeoulOffice,
  AboutVision,
  AboutCertification,
} from 'features/about/ui';

interface AboutPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className='px-5 pt-12 pb-20'>
      <AboutHero lang={lang} dict={dict} />
      <AboutCertification dict={dict} />
      {/* <AboutDescription dict={dict} /> */}
      {/* <AboutCeoGreeting dict={dict} /> */}
      {/* <AboutSeoulOffice dict={dict} /> */}
      <AboutVision dict={dict} />
    </div>
  );
}
