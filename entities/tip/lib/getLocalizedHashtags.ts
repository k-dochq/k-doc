import { type Locale } from 'shared/config';

/**
 * hashtagsI18n JSON 에서 현재 locale 에 맞는 태그 배열을 반환.
 * - short locale(ko, en 등) key 를 우선 매칭.
 * - zh-Hant 는 DB key 'zh' 로 매핑.
 * - 해당 언어가 비어 있으면 fallback: ko → en → [].
 */
export function getLocalizedHashtags(
  hashtagsI18n: unknown,
  lang: Locale,
): string[] {
  if (!hashtagsI18n || typeof hashtagsI18n !== 'object' || Array.isArray(hashtagsI18n)) {
    return [];
  }
  const map = hashtagsI18n as Record<string, unknown>;
  const shortLang = lang === 'zh-Hant' ? 'zh' : lang;

  const pick = (key: string): string[] | null => {
    const v = map[key];
    if (Array.isArray(v)) {
      const filtered = v.filter((t): t is string => typeof t === 'string');
      return filtered.length > 0 ? filtered : null;
    }
    return null;
  };

  return pick(shortLang) ?? pick('ko') ?? pick('en') ?? [];
}
