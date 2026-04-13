import Image from 'next/image';
import { type Locale } from 'shared/config';
import { LocaleLink } from 'shared/ui/locale-link';
import { MedicalSpecialtyTagsV2 } from 'shared/ui/medical-specialty-tags';
import { type RecommendedTipArticle } from '../../model/useTipDetail';

interface RecommendedTipCardProps {
  article: RecommendedTipArticle;
  lang: Locale;
}

function getLocalizedTitle(title: Record<string, string>, lang: Locale): string {
  const shortLang = lang === 'zh-Hant' ? 'zh' : lang;
  return title[shortLang] ?? title.ko ?? title.en ?? '';
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

export function RecommendedTipCard({ article, lang }: RecommendedTipCardProps) {
  const title = getLocalizedTitle(article.title as Record<string, string>, lang);
  const date = article.publishedAt ? formatDate(article.publishedAt.toString()) : '';

  return (
    <LocaleLink
      href={`/tip/${article.id}`}
      locale={lang}
      className='flex flex-col gap-3'
    >
      {/* 커버이미지 */}
      <div className='relative aspect-[335/224] w-full overflow-hidden rounded-xl bg-neutral-200'>
        {article.coverImage && (
          <Image
            src={article.coverImage}
            alt={title}
            fill
            sizes='(max-width: 500px) 100vw, 500px'
            loading='lazy'
            className='object-cover'
          />
        )}
      </div>

      {/* 텍스트 영역 */}
      <div className='flex flex-col gap-1'>
        <MedicalSpecialtyTagsV2
          specialties={article.medicalSpecialties}
          lang={lang}
          tagClassName='px-2 py-0.5'
          textClassName='text-sm leading-5'
        />
        <p className='text-xl leading-7 font-semibold text-neutral-700'>{title}</p>
        {date && (
          <p className='text-sm leading-5 font-medium text-neutral-400'>{date}</p>
        )}
      </div>
    </LocaleLink>
  );
}
