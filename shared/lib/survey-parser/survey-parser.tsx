import { type SurveyButtonData } from './types';

/**
 * Survey flag 패턴: <survey>{JSON}</survey>
 */
const SURVEY_FLAG_REGEX = /<survey>([^<]+)<\/survey>/g;

/**
 * 메시지에서 survey flag를 추출하고 파싱
 * @param message 메시지 내용
 * @returns survey flag가 있으면 SurveyButtonData, 없으면 null
 */
export function extractSurveyFlag(message: string): SurveyButtonData | null {
  const match = message.match(SURVEY_FLAG_REGEX);

  if (!match || match.length === 0) {
    return null;
  }

  // 첫 번째 매치만 사용 (여러 개가 있을 경우)
  const flagContent = match[0].replace(/<\/?survey>/g, '');

  try {
    const surveyData: SurveyButtonData = JSON.parse(flagContent);

    // 필수 필드 검증
    if (
      !surveyData.consultationId ||
      !surveyData.userId ||
      !surveyData.hospitalId ||
      !surveyData.language ||
      !surveyData.buttonText
    ) {
      console.warn('Survey flag에 필수 필드가 누락되었습니다:', surveyData);
      return null;
    }

    return surveyData;
  } catch (error) {
    console.error('Survey flag JSON 파싱 실패:', error);
    return null;
  }
}

/**
 * 메시지에서 survey flag를 제거
 * @param message 메시지 내용
 * @returns survey flag가 제거된 메시지
 */
export function removeSurveyFlag(message: string): string {
  return message.replace(SURVEY_FLAG_REGEX, '').trim();
}
