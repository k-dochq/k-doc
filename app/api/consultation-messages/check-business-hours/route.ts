import { NextRequest, NextResponse } from 'next/server';
import {
  type CheckBusinessHoursRequest,
  type CheckBusinessHoursResponse,
} from 'features/consultation-chat/api/entities/types';
import { checkBusinessHoursInKorea } from 'features/consultation-chat/api/lib/business-hours-utils';
import { detectLanguage } from 'features/consultation-chat/api/lib/language-detection-utils';
import {
  getAutoResponseMessage,
  shouldSendAutoResponse,
} from 'features/consultation-chat/api/lib/auto-response-utils';

// 개발 편의를 위한 강제 토글 (true로 설정하면 항상 영업시간 외로 처리)
const FORCE_OFF_BUSINESS_HOURS = false;

/**
 * 비즈니스 시간 체크 API
 * 한국 시간 기준 평일 09:00~18:00 범위를 체크합니다.
 */
export async function POST(
  request: NextRequest,
): Promise<NextResponse<CheckBusinessHoursResponse>> {
  try {
    const body: CheckBusinessHoursRequest = await request.json();
    const { hospitalId, userId, message } = body;

    // 필수 필드 검증
    if (!hospitalId || !userId || !message) {
      return NextResponse.json(
        {
          success: false,
          isBusinessHours: false,
          error: 'Missing required fields',
        },
        { status: 400 },
      );
    }

    // 한국 시간 기준 비즈니스 시간 체크
    const { isBusinessHours: checkedBusinessHours, currentTime: currentTimeString } =
      checkBusinessHoursInKorea();
    const result = FORCE_OFF_BUSINESS_HOURS ? false : checkedBusinessHours;

    // 언어 감지
    let detectedLanguage: 'ko' | 'en' | 'th' | undefined = undefined;
    if (message.content && message.content.trim().length > 0) {
      const language = await detectLanguage(message.content);
      if (language) {
        detectedLanguage = language;
      }
    }

    // 자동 응답 메시지 생성 (영업시간 외이고 언어가 감지된 경우)
    const autoResponseMessage = shouldSendAutoResponse(result, detectedLanguage)
      ? getAutoResponseMessage(detectedLanguage!)
      : undefined;

    return NextResponse.json({
      success: true,
      isBusinessHours: result,
      currentTime: currentTimeString,
      detectedLanguage,
      autoResponseMessage,
    });
  } catch (error) {
    console.error('Error in check business hours API:', error);
    return NextResponse.json(
      {
        success: false,
        isBusinessHours: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 },
    );
  }
}
