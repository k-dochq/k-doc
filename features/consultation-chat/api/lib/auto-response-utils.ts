/**
 * 자동 응답 메시지 생성 유틸리티
 * 언어 코드에 따라 적절한 메시지를 반환합니다.
 */

import {
  AUTO_RESPONSE_MESSAGES,
  type AutoResponseLanguage,
} from '../config/auto-response-messages';
import { type DetectedLanguage } from './language-detection-utils';

/**
 * 감지된 언어에 해당하는 자동 응답 메시지를 반환합니다.
 *
 * @param language - 감지된 언어 코드
 * @returns 해당 언어의 자동 응답 메시지
 */
export function getAutoResponseMessage(language: DetectedLanguage): string {
  return AUTO_RESPONSE_MESSAGES[language as AutoResponseLanguage];
}

/**
 * 언어 코드가 유효한 자동 응답 메시지를 가지고 있는지 확인합니다.
 *
 * @param language - 확인할 언어 코드
 * @returns 유효한 언어 코드 여부
 */
export function hasAutoResponseMessage(language: string): language is AutoResponseLanguage {
  return language in AUTO_RESPONSE_MESSAGES;
}

/**
 * 영업시간 외일 때 자동 응답 메시지가 필요한지 판단합니다.
 *
 * @param isBusinessHours - 현재 영업시간 여부
 * @param detectedLanguage - 감지된 언어 (없을 수 있음)
 * @returns 자동 응답 메시지 필요 여부
 */
export function shouldSendAutoResponse(
  isBusinessHours: boolean,
  detectedLanguage?: DetectedLanguage | null,
): boolean {
  return !isBusinessHours && detectedLanguage != null && hasAutoResponseMessage(detectedLanguage);
}
