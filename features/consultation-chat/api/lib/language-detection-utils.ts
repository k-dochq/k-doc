/**
 * 언어 감지 관련 유틸리티 함수들
 * Vercel AI SDK의 GPT-4o-mini를 사용하여 텍스트의 언어를 감지합니다.
 */

import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

// OpenAI provider instance 생성 (환경변수 OPENAI_API_KEY 자동 사용)
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type DetectedLanguage =
  | 'ko'
  | 'en'
  | 'th'
  | 'zh-Hant'
  | 'ja'
  | 'hi'
  | 'ar'
  | 'ru'
  | 'tl';

function normalizeDetectedCode(raw: string): DetectedLanguage | null {
  const s = raw.trim().toLowerCase();
  if (s === 'zh-hant') return 'zh-Hant';
  if (['ko', 'en', 'th', 'ja', 'hi', 'ar', 'ru', 'tl'].includes(s)) return s as DetectedLanguage;
  return null;
}

/**
 * 텍스트의 언어를 감지합니다.
 * GPT-4o-mini를 사용하여 ko, en, th, zh-Hant, ja, hi, ar, ru, tl 중 하나를 반환합니다.
 *
 * @param text - 감지할 텍스트
 * @returns 감지된 언어 코드 또는 null (에러/미지원 시)
 */
export async function detectLanguage(text: string): Promise<DetectedLanguage | null> {
  // 빈 텍스트나 너무 짧은 텍스트는 처리하지 않음
  if (!text || text.trim().length < 2) {
    return null;
  }

  try {
    const { text: responseText } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Detect the language of the following text. Return ONLY one of these language codes: ko, en, th, zh-Hant, ja, hi, ar, ru, tl. No other text or explanation.

Text: "${text.trim()}"`,
      temperature: 0.1,
      maxOutputTokens: 16,
    });

    const detected = normalizeDetectedCode(responseText);
    return detected ?? null;
  } catch (error) {
    console.error('Error detecting language:', error);
    return null;
  }
}
