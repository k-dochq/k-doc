'use client';

import { type Locale } from 'shared/config';
import { ShareButton } from 'shared/ui/share-button';
import { useTipDetail } from '../../model/useTipDetail';

interface TipShareButtonProps {
  id: string;
  lang: Locale;
}

function getLocalizedTitle(title: Record<string, string>, lang: Locale): string {
  const shortLang = lang === 'zh-Hant' ? 'zh' : lang;
  return title[shortLang] ?? title.ko ?? title.en ?? '';
}

export function TipShareButton({ id, lang }: TipShareButtonProps) {
  const { data: article } = useTipDetail(id);

  const articleTitle = article
    ? getLocalizedTitle(article.title as Record<string, string>, lang)
    : '';

  const shareTitle = articleTitle ? `${articleTitle} - K-DOC` : 'K-DOC';
  const shareText = articleTitle || 'K-DOC';

  return <ShareButton title={shareTitle} text={shareText} />;
}
