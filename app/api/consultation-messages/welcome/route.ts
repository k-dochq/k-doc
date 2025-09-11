import { NextRequest, NextResponse } from 'next/server';
import {
  ConsultationMessageRepository,
  AuthService,
  CreateWelcomeMessageUseCase,
} from 'features/consultation-message/api-server';
import { CreateWelcomeMessageSchema } from 'features/consultation-message/api/entities/schemas';
import { routeErrorLogger } from 'shared/lib';

// 환영 메시지 생성 (POST)
export async function POST(request: NextRequest) {
  const endpoint = '/api/consultation-messages/welcome';
  const method = 'POST';

  try {
    // 요청 본문 파싱
    const body = await request.json();
    const { hospitalId } = body;

    // 입력 검증
    const validationResult = CreateWelcomeMessageSchema.safeParse({
      hospitalId,
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
    const createWelcomeMessageUseCase = new CreateWelcomeMessageUseCase(
      consultationMessageRepository,
      authService,
    );

    // Use Case 실행
    const result = await createWelcomeMessageUseCase.execute(validationResult.data);

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
