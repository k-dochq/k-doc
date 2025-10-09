import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/shared/lib/supabase/server';
import { prisma } from '@/shared/lib/prisma';
import type { PushTokenRegisterResponse } from 'shared/types/push-token-api';

interface PushTokenRegisterRequest {
  token: string;
  platform: 'ios' | 'android';
  appVersion: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: PushTokenRegisterRequest = await request.json();
    const { token, platform, appVersion } = body;

    // 필수 필드 검증
    if (!token) {
      const response: PushTokenRegisterResponse = {
        success: false,
        error: '푸시 토큰이 필요합니다',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Supabase 클라이언트 생성
    const supabase = await createClient();

    // 현재 사용자 정보 가져오기
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      const response: PushTokenRegisterResponse = {
        success: false,
        error: '인증이 필요합니다',
      };
      return NextResponse.json(response, { status: 401 });
    }

    // 사용자 정보 업데이트
    await prisma.user.update({
      where: { id: user.id },
      data: {
        deviceToken: token,
        deviceInfo: JSON.stringify({
          platform,
          appVersion,
          updatedAt: new Date().toISOString(),
        }),
      },
    });

    console.log('푸시 토큰 등록 완료:', {
      userId: user.id,
      token: token.substring(0, 20) + '...',
      platform,
      appVersion,
    });

    const response: PushTokenRegisterResponse = {
      success: true,
      message: '푸시 토큰이 성공적으로 등록되었습니다',
      data: {
        userId: user.id,
        platform,
        appVersion,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('푸시 토큰 등록 실패:', error);

    const response: PushTokenRegisterResponse = {
      success: false,
      error: '푸시 토큰 등록 중 오류가 발생했습니다',
      details: error instanceof Error ? error.message : '알 수 없는 오류',
    };

    return NextResponse.json(response, { status: 500 });
  }
}
