import { type Locale } from 'shared/config';

const INTRODUCE_VIDEO_IDS: Partial<Record<Locale, string>> = {
  'zh-Hant': 'LSC7xiZJTGY',
  ja: 'MDSQmmUK7e4',
};

const DEFAULT_VIDEO_ID = 'SXIiNQhr2mI';

export function getIntroduceVideoId(lang: Locale): string {
  return INTRODUCE_VIDEO_IDS[lang] ?? DEFAULT_VIDEO_ID;
}

export function getIntroduceEmbedUrl(lang: Locale): string {
  const videoId = getIntroduceVideoId(lang);
  return `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
}
