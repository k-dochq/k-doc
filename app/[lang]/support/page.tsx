import { type Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';
import { SupportContent } from './SupportContent';

interface SupportPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function SupportPage({ params }: SupportPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <SupportContent lang={lang} dict={dict} />;
}
