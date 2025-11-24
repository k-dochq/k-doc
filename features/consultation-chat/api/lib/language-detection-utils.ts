/**
 * 언어 감지 관련 유틸리티 함수들
 * Vercel AI SDK의 GPT-4o-mini를 사용하여 텍스트의 언어를 감지합니다.
 */

import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export type DetectedLanguage = 'ko' | 'en' | 'th';

/**
 * 텍스트의 언어를 감지합니다.
 * GPT-4o-mini 모델을 사용하여 한국어(ko), 영어(en), 태국어(th) 중 하나를 반환합니다.
 *
 * @param text - 감지할 텍스트
 * @returns 감지된 언어 코드 (ko, en, th) 또는 null (에러 발생 시)
 */
export async function detectLanguage(text: string): Promise<DetectedLanguage | null> {
  // 빈 텍스트나 너무 짧은 텍스트는 처리하지 않음
  if (!text || text.trim().length < 2) {
    return null;
  }

  try {
    const { text: responseText } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Detect the language of the following text. Return ONLY the language code as a single word: "ko" for Korean, "en" for English, or "th" for Thai. Do not include any other text or explanation.

Text: "${text.trim()}"`,
      temperature: 0.1, // 낮은 temperature로 일관된 결과
      maxOutputTokens: 10, // 짧은 응답만 필요
    });

    // 응답에서 언어 코드 추출 (공백 제거, 소문자 변환)
    const detectedLang = responseText.trim().toLowerCase() as DetectedLanguage;

    // 유효한 언어 코드인지 확인
    if (detectedLang === 'ko' || detectedLang === 'en' || detectedLang === 'th') {
      return detectedLang;
    }

    // 유효하지 않은 경우 null 반환
    return null;
  } catch (error) {
    console.error('Error detecting language:', error);
    // 에러 발생 시 null 반환 (기본값 처리)
    return null;
  }
}
