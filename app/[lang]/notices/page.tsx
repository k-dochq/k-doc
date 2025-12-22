import { type Locale } from 'shared/config';
import type { Metadata } from 'next';
import { getDictionary } from '../dictionaries';
import { NoticesContentV2 } from './NoticesContentV2';

interface NoticesPageProps {
  params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: NoticesPageProps): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: `${dict.notices.title} | K-DOC`,
    description: dict.notices.title,
    openGraph: {
      title: `${dict.notices.title} | K-DOC`,
      description: dict.notices.title,
    },
  };
}

export default async function NoticesPage({ params }: NoticesPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <NoticesContentV2 lang={lang} dict={dict} />;
}
