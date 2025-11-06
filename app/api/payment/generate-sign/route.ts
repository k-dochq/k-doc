import { NextRequest, NextResponse } from 'next/server';
import { generatePayverseSign } from 'features/payment/lib/sign-generator';
import { PAYVERSE_CONFIG } from 'features/payment/config/payverse';
import { routeErrorLogger } from 'shared/lib';

/**
 * Payverse 서명 생성 API 엔드포인트
 *
 * 보안을 위해 서버 사이드에서만 SecretKey를 사용하여 서명을 생성합니다.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const endpoint = '/api/payment/generate-sign';
  const method = 'POST';

  try {
    const body = await request.json();
    const { orderId, amount, reqDate } = body;

    // 필수 파라미터 검증
    if (!orderId || !amount || !reqDate) {
      const missingParamsError = new Error('Missing required parameters: orderId, amount, reqDate');
      const requestId = routeErrorLogger.logError({
        error: missingParamsError,
        endpoint,
        method,
        request,
      });

      return NextResponse.json(
        {
          success: false,
          error: 'MISSING_PARAMETERS',
          message: 'orderId, amount, reqDate are required',
          requestId,
        },
        { status: 400 },
      );
    }

    // 서명 생성에 사용할 파라미터
    const amountStr = String(amount);
    const plainText = `||${PAYVERSE_CONFIG.SECRET_KEY}||${PAYVERSE_CONFIG.MID}||${orderId}||${amountStr}||${reqDate}||`;

    console.log(
      '🔐 [Server Debug] 서명 생성 파라미터:',
      JSON.stringify(
        {
          secretKey: PAYVERSE_CONFIG.SECRET_KEY.substring(0, 4) + '***',
          mid: PAYVERSE_CONFIG.MID,
          orderId,
          amount: amountStr,
          reqDate,
        },
        null,
        2,
      ),
    );

    console.log('📝 [Server Debug] Plain Text:', plainText);

    // 서명 생성
    const sign = generatePayverseSign(
      PAYVERSE_CONFIG.SECRET_KEY,
      PAYVERSE_CONFIG.MID,
      orderId,
      amountStr,
      reqDate,
    );

    console.log('✅ [Server Debug] 생성된 서명:', sign);
    console.log('📊 [Server Debug] 서명 길이:', sign.length);

    return NextResponse.json({
      success: true,
      data: {
        sign,
      },
    });
  } catch (error) {
    const requestId = routeErrorLogger.logError({
      error: error as Error,
      endpoint,
      method,
      request,
    });

    return NextResponse.json(
      {
        success: false,
        error: 'INTERNAL_SERVER_ERROR',
        message: (error as Error).message,
        requestId,
      },
      { status: 500 },
    );
  }
}
