import { NextRequest, NextResponse } from 'next/server';
import {
  type CheckBusinessHoursRequest,
  type CheckBusinessHoursResponse,
} from 'features/consultation-chat/api/entities/types';
import { checkBusinessHoursInKorea } from 'features/consultation-chat/api/lib/business-hours-utils';

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
    const { isBusinessHours: result, currentTime: currentTimeString } = checkBusinessHoursInKorea();

    return NextResponse.json({
      success: true,
      isBusinessHours: result,
      currentTime: currentTimeString,
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
