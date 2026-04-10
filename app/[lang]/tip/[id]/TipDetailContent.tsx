'use client';

import { type JSONContent } from '@tiptap/core';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useTipDetail } from 'entities/tip/model/useTipDetail';
import { TipDetailHeader } from 'entities/tip/ui/detail/TipDetailHeader';
import { TipDetailSkeleton } from 'entities/tip/ui/detail/TipDetailSkeleton';
import { TipCoverImage } from 'entities/tip/ui/detail/TipCoverImage';
import { TipContentRenderer } from 'entities/tip/ui/detail/TipContentRenderer';
import { TipDetailDivider } from 'entities/tip/ui/detail/TipDetailDivider';
import { TipRecommendedHospitals } from 'entities/tip/ui/detail/TipRecommendedHospitals';
import { TipsErrorState } from 'entities/tip/ui/TipsErrorState';

interface TipDetailContentProps {
  id: string;
  lang: Locale;
  dict: Dictionary;
}

function getLocalizedContent(
  content: Record<string, unknown>,
  lang: Locale,
): JSONContent | null {
  const shortLang = lang === 'zh-Hant' ? 'zh' : lang;
  const value = content[shortLang] ?? content.ko ?? content.en;
  return (value as JSONContent) ?? null;
}

export function TipDetailContent({ id, lang, dict }: TipDetailContentProps) {
  const { data: article, isLoading, isError } = useTipDetail(id);

  if (isLoading) {
    return <TipDetailSkeleton />;
  }

  if (isError || !article) {
    return <TipsErrorState dict={dict} />;
  }

  const localizedContent = getLocalizedContent(
    article.content as Record<string, unknown>,
    lang,
  );

  const title = (article.title as Record<string, string>)[
    lang === 'zh-Hant' ? 'zh' : lang
  ] ?? article.slug;

  return (
    <div>
      <TipDetailHeader article={article} lang={lang} />
      {article.coverImage && <TipCoverImage src={article.coverImage} alt={title} />}
      {localizedContent && (
        <div className='mt-5'>
          <TipContentRenderer content={localizedContent} />
        </div>
      )}
      {article.recommendedHospitals.length > 0 && (
        <>
          <TipDetailDivider />
          <TipRecommendedHospitals
            hospitals={article.recommendedHospitals}
            lang={lang}
            dict={dict}
          />
        </>
      )}
    </div>
  );
}
