import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { type Locale } from 'shared/config';
import { prisma } from '@/shared/lib/prisma';
import { getTipDetail } from 'entities/tip/api/use-cases/get-tip-detail';
import { type TipDetail } from 'entities/tip/model/useTipDetail';
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

  // 서버에서 상세 데이터를 미리 조회 — 없으면 404
  const article = await getTipDetail(slug);
  if (!article) notFound();

  const dict = await getDictionary(lang);

  // fetch 응답과 동일하게 직렬화(Date -> ISO string)하여 hydration mismatch 방지
  const initialArticle = JSON.parse(JSON.stringify(article)) as TipDetail;

  return (
    <div className='min-h-screen bg-white'>
      <PageHeaderV2
        title=''
        fallbackUrl={`/${lang}/tips`}
        centerContent={
          <Link href={`/${lang}`}>
            <Image src='/logo_3d.png' alt='K-DOC' width={109} height={30} priority />
          </Link>
        }
        rightContent={<TipShareButton slug={slug} lang={lang} />}
      />
      <div className='h-[58px]' />
      <main className='px-5 pb-[112px]'>
        <TipDetailContent slug={slug} lang={lang} dict={dict} initialArticle={initialArticle} />
      </main>
    </div>
  );
}
