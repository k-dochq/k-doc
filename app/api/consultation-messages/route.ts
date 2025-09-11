import { NextRequest, NextResponse } from 'next/server';
import {
  ConsultationMessageRepository,
  AuthService,
  GetConsultationMessagesUseCase,
  CreateConsultationMessageUseCase,
} from 'features/consultation-message/api-server';
import {
  GetConsultationMessagesSchema,
  CreateConsultationMessageSchema,
} from 'features/consultation-message/api/entities/schemas';
import { routeErrorLogger } from 'shared/lib';

// 채팅 메시지 조회 (GET)
export async function GET(request: NextRequest) {
  const endpoint = '/api/consultation-messages';
  const method = 'GET';

  try {
    // URL 파라미터 추출 및 검증
    const { searchParams } = new URL(request.url);
    const hospitalId = searchParams.get('hospitalId');
    const userId = searchParams.get('userId');

    if (!hospitalId || !userId) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 },
      );
    }

    // 입력 검증
    const validationResult = GetConsultationMessagesSchema.safeParse({
      hospitalId,
      userId,
    });

    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: validationResult.error.issues[0]?.message || 'Invalid input' },
        { status: 400 },
      );
    }

    // 의존성 주입
    const consultationMessageRepository = new ConsultationMessageRepository();
    const authService = new AuthService();
    const getConsultationMessagesUseCase = new GetConsultationMessagesUseCase(
      consultationMessageRepository,
      authService,
    );

    // Use Case 실행
    const result = await getConsultationMessagesUseCase.execute(validationResult.data);

    return NextResponse.json(result, { status: 200 });
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
        error: (error as Error).message || 'Internal server error',
        requestId,
      },
      { status: 500 },
    );
  }
}

// 채팅 메시지 생성 (POST)
export async function POST(request: NextRequest) {
  const endpoint = '/api/consultation-messages';
  const method = 'POST';

  try {
    // 요청 본문 파싱
    const body = await request.json();
    const { hospitalId, content, senderType = 'USER' } = body;

    // 입력 검증
    const validationResult = CreateConsultationMessageSchema.safeParse({
      hospitalId,
      content,
      senderType,
    });

    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: validationResult.error.issues[0]?.message || 'Invalid input' },
        { status: 400 },
      );
    }

    // 의존성 주입
    const consultationMessageRepository = new ConsultationMessageRepository();
    const authService = new AuthService();
    const createConsultationMessageUseCase = new CreateConsultationMessageUseCase(
      consultationMessageRepository,
      authService,
    );

    // Use Case 실행
    const result = await createConsultationMessageUseCase.execute(validationResult.data);

    return NextResponse.json(result, { status: 201 });
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
        error: (error as Error).message || 'Internal server error',
        requestId,
      },
      { status: 500 },
    );
  }
}
