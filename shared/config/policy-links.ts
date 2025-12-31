import { type Locale } from 'shared/config';

/**
 * 언어별 정책 링크 상수
 */
export const POLICY_LINKS = {
  termsOfService: {
    ko: 'https://hypnotic-dryosaurus-c5c.notion.site/279d3f7f900d80ba9598e70190e516f9?source=copy_link',
    en: 'https://hypnotic-dryosaurus-c5c.notion.site/Terms-of-Service-27ad3f7f900d80429ab7e9ff8b97744d?source=copy_link',
    th: 'https://hypnotic-dryosaurus-c5c.notion.site/27ad3f7f900d803e8626e3419ebdf1d2?source=copy_link',
    'zh-Hant':
      'https://hypnotic-dryosaurus-c5c.notion.site/Terms-of-Service-27ad3f7f900d80429ab7e9ff8b97744d?source=copy_link',
    ja: 'https://hypnotic-dryosaurus-c5c.notion.site/Terms-of-Service-27ad3f7f900d80429ab7e9ff8b97744d?source=copy_link',
  },
  privacyPolicy: {
    ko: 'https://hypnotic-dryosaurus-c5c.notion.site/279d3f7f900d80c8ae1bdf05a68961a4?source=copy_link',
    en: 'https://hypnotic-dryosaurus-c5c.notion.site/Privacy-Policy-27ad3f7f900d80d38997e64cad05ddc1?source=copy_link',
    th: 'https://hypnotic-dryosaurus-c5c.notion.site/27ad3f7f900d8077b3dad6848a30093c?source=copy_link',
    'zh-Hant':
      'https://hypnotic-dryosaurus-c5c.notion.site/Privacy-Policy-27ad3f7f900d80d38997e64cad05ddc1?source=copy_link',
    ja: 'https://hypnotic-dryosaurus-c5c.notion.site/Privacy-Policy-27ad3f7f900d80d38997e64cad05ddc1?source=copy_link',
  },
  dataRequest: {
    ko: 'https://forms.gle/Vf419Ke2TKBhwEK57',
    en: 'https://forms.gle/trZV5WsojheuNy5X8',
    th: 'https://forms.gle/FSY2anBUy8YgKGGz6',
    'zh-Hant': 'https://forms.gle/trZV5WsojheuNy5X8',
    ja: 'https://forms.gle/trZV5WsojheuNy5X8',
  },
} as const;

/**
 * 언어에 따른 서비스 이용약관 링크를 반환합니다.
 * @param locale 언어 설정
 * @returns 해당 언어의 서비스 이용약관 링크
 */
export const getTermsOfServiceLink = (locale: Locale): string => {
  return POLICY_LINKS.termsOfService[locale] as string;
};

/**
 * 언어에 따른 개인정보처리방침 링크를 반환합니다.
 * @param locale 언어 설정
 * @returns 해당 언어의 개인정보처리방침 링크
 */
export const getPrivacyPolicyLink = (locale: Locale): string => {
  return POLICY_LINKS.privacyPolicy[locale] as string;
};

/**
 * 언어에 따른 정보 수정/삭제 요청 링크를 반환합니다.
 * @param locale 언어 설정
 * @returns 해당 언어의 정보 수정/삭제 요청 링크
 */
export const getDataRequestLink = (locale: Locale): string => {
  return POLICY_LINKS.dataRequest[locale] as string;
};
