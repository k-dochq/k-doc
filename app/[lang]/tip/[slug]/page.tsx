import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { type Locale } from 'shared/config';
import { prisma } from '@/shared/lib/prisma';
import { PageHeaderV2 } from 'shared/ui/page-header';
import { TipShareButton } from 'entities/tip/ui/detail/TipShareButton';
import { getDictionary } from '../../dictionaries';
import { TipDetailContent } from './TipDetailContent';

interface TipDetailPageProps {
  params: Promise<{ lang: Locale; slug: string }>;
}

function pickLocalizedString(value: unknown, lang: Locale): string | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
  const map = value as Record<string, unknown>;
  const shortLang = lang === 'zh-Hant' ? 'zh' : lang;
  const pick = (key: string) => {
    const v = map[key];
    return typeof v === 'string' && v.trim() ? v : undefined;
  };
  return pick(shortLang) ?? pick('ko') ?? pick('en');
}

export async function generateMetadata({ params }: TipDetailPageProps): Promise<Metadata> {
  const { slug, lang } = await params;

  const article = await prisma.insightArticle.findUnique({
    where: { slug },
    select: { title: true, excerpt: true, coverImage: true, ogImage: true },
  });

  if (!article) return {};

  const title = pickLocalizedString(article.title, lang);
  const description = pickLocalizedString(article.excerpt, lang);
  const image = article.ogImage ?? article.coverImage ?? undefined;

  return {
    title: title ? `${title} - K-DOC` : 'K-DOC',
    description,
    openGraph: {
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export default async function TipDetailPage({ params }: TipDetailPageProps) {
  const { lang, slug } = await params;

  // slug 존재 여부 확인 — 없으면 404
  const exists = await prisma.insightArticle.findUnique({
    where: { slug },
    select: { id: true },
  });
  if (!exists) notFound();

  const dict = await getDictionary(lang);

  return (
    <div className='min-h-screen bg-white'>
      <PageHeaderV2
        title=''
        fallbackUrl={`/${lang}/tips`}
        rightContent={<TipShareButton slug={slug} lang={lang} />}
      />
      <div className='h-[58px]' />
      <main className='px-5 pb-[112px]'>
        <TipDetailContent slug={slug} lang={lang} dict={dict} />
      </main>
    </div>
  );
}
