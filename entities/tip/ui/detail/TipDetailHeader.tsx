import { type Locale } from 'shared/config';
import { MedicalSpecialtyTagsV2 } from 'shared/ui/medical-specialty-tags';
import { type TipDetail } from '../../model/useTipDetail';
import { formatDate } from 'shared/lib/date-utils';

interface TipDetailHeaderProps {
  article: TipDetail;
  lang: Locale;
}

function getLocalizedTitle(title: Record<string, string>, lang: Locale): string {
  const shortLang = lang === 'zh-Hant' ? 'zh' : lang;
  return title[shortLang] ?? title.ko ?? title.en ?? '';
}

export function TipDetailHeader({ article, lang }: TipDetailHeaderProps) {
  const title = getLocalizedTitle(article.title as Record<string, string>, lang);
  const date = article.publishedAt ? formatDate(article.publishedAt.toString(), lang) : '';

  return (
    <div className='flex flex-col items-center gap-2 pt-5 pb-5'>
      <MedicalSpecialtyTagsV2
        specialties={article.medicalSpecialties}
        lang={lang}
        className='justify-center'
        textClassName='!text-sm !leading-5'
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
