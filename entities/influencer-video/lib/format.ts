import { type Locale } from 'shared/config';

export function maskHandle(handle: string): string {
  return `@${handle.slice(0, 5)}***`;
}

export function getLocalizedTitle(title: Record<string, string>, lang: Locale): string {
  const key = lang === 'zh-Hant' ? 'zh' : lang;
  return title[key] || title['en'] || '';
}
