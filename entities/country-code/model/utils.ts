import { type CountryCode } from './types';
import { COUNTRY_CODES } from './constants';

/**
 * 국가명을 반환합니다. (영어만 지원)
 * @param country 국가 코드 객체
 * @returns 국가명 (영어)
 */
export function getCountryName(country: CountryCode): string {
  return country.name;
}

/**
 * 국가 코드로 국가 정보를 찾습니다.
 * @param code 국가 코드 (예: '+82')
 * @returns 해당 국가 정보 또는 undefined
 */
export function findCountryByCode(code: string): CountryCode | undefined {
  return COUNTRY_CODES.find((country) => country.code === code);
}
