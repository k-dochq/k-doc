/**
 * HTML 엔티티를 디코딩하는 유틸리티 함수들
 */

/**
 * HTML 엔티티를 일반 문자로 변환
 * @param text 변환할 텍스트
 * @returns 변환된 텍스트
 */
export function decodeHtmlEntities(text: string): string {
  if (!text) return text;

  // HTML 엔티티 매핑 테이블
  const htmlEntities: Record<string, string> = {
    '&#39;': "'",
    '&quot;': '"',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&nbsp;': ' ',
    '&#x27;': "'",
    '&#x2F;': '/',
    '&#x60;': '`',
    '&#x3D;': '=',
    '&#x2B;': '+',
    '&#x2D;': '-',
    '&#x2A;': '*',
    '&#x5F;': '_',
    '&#x7B;': '{',
    '&#x7D;': '}',
    '&#x5B;': '[',
    '&#x5D;': ']',
    '&#x28;': '(',
    '&#x29;': ')',
    '&#x3A;': ':',
    '&#x3B;': ';',
    '&#x2C;': ',',
    '&#x2E;': '.',
    '&#x21;': '!',
    '&#x3F;': '?',
    '&#x40;': '@',
    '&#x23;': '#',
    '&#x24;': '$',
    '&#x25;': '%',
    '&#x5E;': '^',
    '&#x7E;': '~',
    '&#x7C;': '|',
    '&#x5C;': '\\',
  };

  let decodedText = text;

  // HTML 엔티티를 일반 문자로 변환
  for (const [entity, char] of Object.entries(htmlEntities)) {
    decodedText = decodedText.replace(new RegExp(entity, 'g'), char);
  }

  return decodedText;
}

/**
 * 다국어 텍스트에서 HTML 엔티티를 디코딩
 * @param localizedText 다국어 텍스트 객체
 * @param lang 언어 코드
 * @returns 디코딩된 텍스트
 */
export function decodeLocalizedText(localizedText: any, lang: string): string {
  if (!localizedText) return '';

  // 다국어 텍스트에서 해당 언어의 텍스트 추출
  let text = '';
  if (typeof localizedText === 'string') {
    text = localizedText;
  } else if (typeof localizedText === 'object') {
    text =
      localizedText[lang] ||
      localizedText.ko_KR ||
      localizedText.en_US ||
      localizedText.th_TH ||
      '';
  }

  return decodeHtmlEntities(text);
}
