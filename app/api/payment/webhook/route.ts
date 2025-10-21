import { NextRequest, NextResponse } from 'next/server';

/**
 * 결제 웹훅 API 라우트
 * Airwallex에서 payment link 생성 및 결제 완료 시 호출되는 엔드포인트
 */
export async function POST(request: NextRequest) {
  try {
    console.log(`[${new Date().toISOString()}] 결제 웹훅 요청 수신`);

    // 요청 헤더 로깅
    const headers = Object.fromEntries(request.headers.entries());
    console.log('요청 헤더:', headers);

    // 요청 본문 파싱
    const body = await request.json();
    console.log('요청 바디:', body);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('웹훅 처리 중 오류 발생:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
