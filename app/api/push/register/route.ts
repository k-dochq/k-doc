import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import type { PushTokenRegisterResponse } from 'shared/types/push-token-api';

interface PushTokenRegisterRequest {
  token: string;
  platform: 'ios' | 'android';
  appVersion: string;
  userId: string;
}

export async function POST(request: NextRequest) {
  console.log('🚀 푸시 토큰 등록 API 요청 시작');

  try {
    const body: PushTokenRegisterRequest = await request.json();
    const { token, platform, appVersion, userId } = body;

    console.log('📝 요청 데이터:', {
      token: token ? token.substring(0, 20) + '...' : '없음',
      platform,
      appVersion,
      userId,
    });

    // 필수 필드 검증
    if (!token) {
      console.log('❌ 푸시 토큰이 없습니다');
      const response: PushTokenRegisterResponse = {
        success: false,
        error: '푸시 토큰이 필요합니다',
      };
      return NextResponse.json(response, { status: 400 });
    }

    if (!userId) {
      console.log('❌ 사용자 ID가 없습니다');
      const response: PushTokenRegisterResponse = {
        success: false,
        error: '사용자 ID가 필요합니다',
      };
      return NextResponse.json(response, { status: 400 });
    }

    console.log('✅ 요청 데이터 검증 완료');

    console.log('💾 데이터베이스 업데이트 시작...');
    // 사용자 정보 업데이트
    await prisma.user.update({
      where: { id: userId },
      data: {
        deviceToken: token,
        deviceInfo: JSON.stringify({
          platform,
          appVersion,
          updatedAt: new Date().toISOString(),
        }),
      },
    });

    console.log('✅ 푸시 토큰 등록 완료:', {
      userId,
      token: token.substring(0, 20) + '...',
      platform,
      appVersion,
    });

    const response: PushTokenRegisterResponse = {
      success: true,
      message: '푸시 토큰이 성공적으로 등록되었습니다',
      data: {
        userId,
        platform,
        appVersion,
      },
    };

    console.log('📤 성공 응답 전송:', {
      success: response.success,
      message: response.message,
      userId: response.data?.userId,
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('💥 푸시 토큰 등록 중 예외 발생:', error);

    const errorMessage = '푸시 토큰 등록 중 오류가 발생했습니다';
    let errorDetails = '알 수 없는 오류';

    if (error instanceof Error) {
      errorDetails = error.message;
      console.error('📋 에러 상세 정보:', {
        name: error.name,
        message: error.message,
        stack: error.stack?.split('\n').slice(0, 3).join('\n'), // 스택 트레이스 일부만
      });
    }

    const response: PushTokenRegisterResponse = {
      success: false,
      error: errorMessage,
      details: errorDetails,
    };

    console.log('📤 에러 응답 전송:', {
      success: response.success,
      error: response.error,
      details: response.details,
    });

    return NextResponse.json(response, { status: 500 });
  }
}
