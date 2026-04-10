'use client';

import { type JSONContent } from '@tiptap/core';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useTipDetail } from 'entities/tip/model/useTipDetail';
import { TipDetailHeader } from 'entities/tip/ui/detail/TipDetailHeader';
import { TipDetailSkeleton } from 'entities/tip/ui/detail/TipDetailSkeleton';
import { TipContentRenderer } from 'entities/tip/ui/detail/TipContentRenderer';
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

  return (
    <div>
      <TipDetailHeader article={article} lang={lang} />
      {localizedContent && <TipContentRenderer content={localizedContent} />}
    </div>
  );
}
