import { type Locale } from 'shared/config';
import { type TipArticle } from '../model/useInfiniteTips';
import { MedicalSpecialtyTagsV2 } from 'shared/ui/medical-specialty-tags';
import { LocaleLink } from 'shared/ui/locale-link';
import { ViewIcon } from './ViewIcon';

interface TipArticleCardProps {
  article: TipArticle;
  lang: Locale;
}

function getLocalizedTitle(title: Record<string, string>, lang: Locale): string {
  // short locale 매핑: zh-Hant → zh
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

export function TipArticleCard({ article, lang }: TipArticleCardProps) {
  const title = getLocalizedTitle(article.title as Record<string, string>, lang);

  return (
    <LocaleLink href={`/tip/${article.id}`} locale={lang} className='flex items-center gap-3'>
      {/* 커버이미지 */}
      <div className='h-[100px] w-[150px] shrink-0 overflow-hidden rounded-xl bg-neutral-200'>
        {article.coverImage && (
          <img
            src={article.coverImage}
            alt={title}
            className='h-full w-full object-cover'
          />
        )}
      </div>

      {/* 텍스트 영역 */}
      <div className='flex min-w-0 flex-1 flex-col gap-1'>
        {/* 시술부위 태그 */}
        <MedicalSpecialtyTagsV2
          specialties={article.medicalSpecialties}
          lang={lang}
        />

        {/* 제목 */}
        <p className='line-clamp-2 text-base font-semibold leading-6 text-neutral-700'>
          {title}
        </p>

        {/* 날짜 + 조회수 */}
        <div className='flex items-start gap-2'>
          <p className='flex-1 text-xs font-medium leading-4 text-neutral-400'>
            {article.publishedAt ? formatDate(article.publishedAt.toString()) : ''}
          </p>
          <div className='flex shrink-0 items-center gap-0.5'>
            <ViewIcon />
            <p className='text-xs font-medium leading-4 text-neutral-400'>
              {article.viewCount.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </LocaleLink>
  );
}
