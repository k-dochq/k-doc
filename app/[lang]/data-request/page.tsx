import { type Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';
import { DataRequestContent } from './DataRequestContent';

interface DataRequestPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function DataRequestPage({ params }: DataRequestPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <DataRequestContent lang={lang} dict={dict} />;
}
