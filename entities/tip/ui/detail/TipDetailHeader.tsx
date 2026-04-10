import { type Locale } from 'shared/config';
import { MedicalSpecialtyTagsV2 } from 'shared/ui/medical-specialty-tags';
import { type TipDetail } from '../../model/useTipDetail';

interface TipDetailHeaderProps {
  article: TipDetail;
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

export function TipDetailHeader({ article, lang }: TipDetailHeaderProps) {
  const title = getLocalizedTitle(article.title as Record<string, string>, lang);
  const date = article.publishedAt ? formatDate(article.publishedAt.toString()) : '';

  return (
    <div className='flex flex-col items-center gap-2 pt-5 pb-5'>
      <MedicalSpecialtyTagsV2
        specialties={article.medicalSpecialties}
        lang={lang}
        className='justify-center'
        tagClassName='px-2 py-0.5'
        textClassName='text-sm leading-5'
      />

      <div className='flex w-full flex-col items-center gap-2'>
        <h1 className='w-full text-center text-2xl leading-8 font-semibold text-neutral-700'>
          {title}
        </h1>
        {date && (
          <p className='text-sm leading-5 font-normal text-neutral-400'>{date}</p>
        )}
      </div>
    </div>
  );
}
