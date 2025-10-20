import { type Locale } from 'shared/config';
import type { Metadata } from 'next';
import { getDictionary } from '../dictionaries';
import { NoticesContent } from './notices-content';

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

  return (
    <div className='px-5 pt-5 pb-20'>
      <NoticesContent lang={lang} dict={dict} />
    </div>
  );
}
