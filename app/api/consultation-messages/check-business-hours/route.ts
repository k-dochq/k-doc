import { NextRequest, NextResponse } from 'next/server';
import {
  type CheckBusinessHoursRequest,
  type CheckBusinessHoursResponse,
  type CheckBusinessHoursDetectedLanguage,
} from 'features/consultation-chat/api/entities/types';
import { checkBusinessHoursInKorea } from 'shared/lib/business-hours';
import { detectLanguage } from 'features/consultation-chat/api/lib/language-detection-utils';
import {
  getAutoResponseMessage,
  shouldSendAutoResponse,
} from 'features/consultation-chat/api/lib/auto-response-utils';
import { formatNextBusinessDayForLanguage } from 'features/consultation-chat/api/lib/next-business-day-format';
import type { AutoResponseLanguage } from 'features/consultation-chat/api/config/auto-response-messages';
// ⚠️ [임시] 공휴일 기간 강제 자동응답용 (며칠 뒤 삭제 예정)
import { TEMP_HOLIDAY_NOTICE_MESSAGES } from 'features/consultation-chat/api/config/auto-response-messages';

// 개발 편의를 위한 강제 토글 (true로 설정하면 항상 영업시간 외로 처리)
const FORCE_OFF_BUSINESS_HOURS = false;

/**
 * 비즈니스 시간 체크 API
 * 한국 시간 기준 평일 09:00~18:00(공휴일 제외) 범위를 체크합니다.
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

    // 한국 시간 기준 비즈니스 시간 체크 (공휴일 여부·다음 영업일 포함)
    const {
      isBusinessHours: checkedBusinessHours,
      currentTime: currentTimeString,
      isPublicHoliday,
      nextBusinessDay,
    } = checkBusinessHoursInKorea();
    const result = FORCE_OFF_BUSINESS_HOURS ? false : checkedBusinessHours;

    // 언어 감지
    let detectedLanguage: CheckBusinessHoursDetectedLanguage | undefined = undefined;
    if (message.content && message.content.trim().length > 0) {
      const language = await detectLanguage(message.content);
      if (language) {
        detectedLanguage = language;
      }
    }

    let autoResponseMessage: string | undefined = undefined;

    // ⚠️ [임시] 공휴일 기간 강제 자동응답 (며칠 뒤 삭제 예정) ─────────────────────
    // 영업시간/공휴일 판별과 무관하게 무조건 아래 안내를 발송한다.
    // 언어 미감지 시 영어(en)로 발송. 기간 종료 후 이 블록과 아래 가드(!autoResponseMessage)를 삭제할 것.
    {
      const tempLang = (detectedLanguage ?? 'en') as AutoResponseLanguage;
      autoResponseMessage = TEMP_HOLIDAY_NOTICE_MESSAGES[tempLang] ?? TEMP_HOLIDAY_NOTICE_MESSAGES.en;
    }
    // ⚠️ [임시] 끝 ───────────────────────────────────────────────────────────────

    // 자동 응답 메시지 생성 (영업시간 외이고 언어가 감지된 경우)
    // [임시] 위 강제 블록이 값을 채우므로 임시 기간 동안 아래 원래 로직은 실행되지 않음
    if (!autoResponseMessage && shouldSendAutoResponse(result, detectedLanguage ?? null) && detectedLanguage) {
      if (isPublicHoliday && nextBusinessDay) {
        const formatted = formatNextBusinessDayForLanguage(
          nextBusinessDay,
          detectedLanguage as AutoResponseLanguage,
        );
        autoResponseMessage = getAutoResponseMessage(detectedLanguage, {
          isPublicHoliday: true,
          nextBusinessDayFormatted: formatted,
        });
      } else {
        autoResponseMessage = getAutoResponseMessage(detectedLanguage);
      }
    }

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
