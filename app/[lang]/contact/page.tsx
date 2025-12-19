import { type Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';
import { ContactContentV2 } from './ContactContentV2';

interface ContactPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <ContactContentV2 lang={lang} dict={dict} />;
}
