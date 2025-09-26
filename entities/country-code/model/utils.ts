import { type CountryCode } from './types';
import { type Locale } from 'shared/config';
import { COUNTRY_CODES } from './constants';

/**
 * 언어에 따라 국가명을 반환합니다.
 * @param country 국가 코드 객체
 * @param locale 언어 설정
 * @returns 해당 언어의 국가명
 */
export function getCountryName(country: CountryCode, locale: Locale): string {
  switch (locale) {
    case 'ko':
      return country.nameKo;
    case 'th':
      return country.nameTh;
    default:
      return country.name;
  }
}

/**
 * 국가 코드로 국가 정보를 찾습니다.
 * @param code 국가 코드 (예: '+82')
 * @returns 해당 국가 정보 또는 undefined
 */
export function findCountryByCode(code: string): CountryCode | undefined {
  return COUNTRY_CODES.find((country) => country.code === code);
}
