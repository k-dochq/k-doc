import { type Locale } from 'shared/config';
import type { Metadata } from 'next';
import { getDictionary } from '../../dictionaries';
import { NoticeDetailContentV2 } from './NoticeDetailContentV2';

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

  return <NoticeDetailContentV2 noticeId={id} lang={lang} dict={dict} />;
}
