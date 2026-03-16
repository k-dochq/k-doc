import { type Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';
import { ConciergeContent } from './ConciergeContent';

interface ConciergePageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function ConciergePage({ params }: ConciergePageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <ConciergeContent lang={lang} dict={dict} />;
}
