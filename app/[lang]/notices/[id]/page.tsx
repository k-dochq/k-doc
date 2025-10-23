import { type Locale } from 'shared/config';
import type { Metadata } from 'next';
import { getDictionary } from '../../dictionaries';
import { NoticeDetailContent } from './notice-detail-content';

interface NoticeDetailPageProps {
  params: Promise<{ lang: Locale; id: string }>;
}

export async function generateMetadata({ params }: NoticeDetailPageProps): Promise<Metadata> {
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

export default async function NoticeDetailPage({ params }: NoticeDetailPageProps) {
  const { lang, id } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className='px-5 pt-5 pb-20'>
      <NoticeDetailContent noticeId={id} lang={lang} dict={dict} />
    </div>
  );
}
