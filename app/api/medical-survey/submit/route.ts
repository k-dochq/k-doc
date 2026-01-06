import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'shared/lib/supabase/server';
import { prisma } from 'shared/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import { type Locale } from 'shared/config';
import {
  extractHospitalIdFromRoomId,
  extractUserIdFromRoomId,
} from 'features/consultation-chat/lib/chat-utils';
import { type SurveyAnswer } from 'features/medical-survey/api/entities/types';

interface SubmitMedicalSurveyRequest {
  consultationId: string;
  answers: SurveyAnswer[];
  locale: Locale;
}

/**
 * 설문 완료 메시지 생성 (다국어 지원)
 */
function getCompletionMessage(locale: Locale): string {
  const messages: Record<Locale, string> = {
    ko: '의료 설문 작성이 정상적으로\n완료되었습니다.\n고객님의 안전한 시술을 위해\n입력해 주신 정보를 바탕으로\n시술 가능 여부를 검토 중입니다.\n다소 시간이 소요될 수 있으며\n확인되는 대로 상담을 안내드리겠습니다.',
    en: 'Medical survey has been\nsuccessfully completed.\nTo ensure your safe procedure,\nwe are reviewing the feasibility\nbased on the information you provided.\nThis may take some time, and\nwe will guide you through consultation\nas soon as the review is complete.',
    'zh-Hant':
      '醫療問卷已成功\n完成。\n為了確保您的安全治療，\n我們正在根據您提供的\n信息審查治療可行性。\n這可能需要一些時間，\n審查完成後我們將\n立即為您提供諮詢指導。',
    ja: '医療アンケートが正常に\n完了しました。\nお客様の安全な施術のため、\nご入力いただいた情報を基に\n施術の可否を審査中です。\n多少時間がかかる場合があり、\n確認次第、相談をご案内\nいたします。',
    th: 'แบบสอบถามทางการแพทย์\nเสร็จสมบูรณ์แล้ว\nเพื่อความปลอดภัยในการรักษาของคุณ\nเรากำลังตรวจสอบความเป็นไปได้\nตามข้อมูลที่คุณให้มา\nอาจใช้เวลาสักครู่\nและเราจะแนะนำการปรึกษา\nทันทีที่การตรวจสอบเสร็จสิ้น',
  };

  return messages[locale] || messages.ko;
}

/**
 * 설문 답변을 포맷팅된 메시지로 변환
 */
function formatSurveyAnswers(answers: SurveyAnswer[]): string {
  const formattedAnswers = answers.map((answer) => {
    const answerText =
      typeof answer.answer === 'boolean' ? (answer.answer ? '예' : '아니요') : answer.answer;
    return `Q${answer.questionId}: ${answerText}`;
  });

  return formattedAnswers.join('\n\n');
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const supabase = await createClient();
    const {
      data: { session },
      error: authError,
    } = await supabase.auth.getSession();

    if (authError || !session?.user?.id) {
      return NextResponse.json({ success: false, error: 'UNAUTHORIZED' }, { status: 401 });
    }

    const body: SubmitMedicalSurveyRequest = await request.json();
    const { consultationId, answers, locale } = body;

    if (!consultationId || !answers || !Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json(
        { success: false, error: 'MISSING_REQUIRED_FIELDS' },
        { status: 400 },
      );
    }

    // consultationId에서 hospitalId와 userId 추출
    // consultationId 형식: hospitalId-userId (둘 다 UUID)
    // UUID는 36자 (8-4-4-4-12 형식: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
    // 첫 번째 UUID는 36자이므로, 37번째 문자부터가 userId
    if (consultationId.length < 37) {
      return NextResponse.json(
        { success: false, error: 'INVALID_CONSULTATION_ID' },
        { status: 400 },
      );
    }

    // hospitalId는 처음 36자 (UUID 형식)
    const hospitalId = consultationId.substring(0, 36);
    // userId는 37번째 문자부터 (하이픈 제거 후)
    const userId = consultationId.substring(37);

    // 세션의 userId와 consultationId의 userId가 일치하는지 확인
    if (userId !== session.user.id) {
      console.error('User ID mismatch:', {
        extractedUserId: userId,
        sessionUserId: session.user.id,
        consultationId,
      });
      return NextResponse.json({ success: false, error: 'FORBIDDEN' }, { status: 403 });
    }

    // 병원 존재 여부 확인
    const hospital = await prisma.hospital.findUnique({
      where: { id: hospitalId },
      select: { id: true },
    });

    if (!hospital) {
      return NextResponse.json({ success: false, error: 'HOSPITAL_NOT_FOUND' }, { status: 404 });
    }

    // 1. 관리자 메시지 먼저 저장 (senderType: 'ADMIN')
    const completionMessage = getCompletionMessage(locale);
    await prisma.consultationMessage.create({
      data: {
        id: uuidv4(),
        userId: userId,
        hospitalId: hospitalId,
        senderType: 'ADMIN',
        content: completionMessage,
        createdAt: new Date(),
      },
    });

    // 2. 설문 데이터를 사용자 메시지로 저장 (senderType: 'USER')
    const surveyContent = formatSurveyAnswers(answers);
    await prisma.consultationMessage.create({
      data: {
        id: uuidv4(),
        userId: userId,
        hospitalId: hospitalId,
        senderType: 'USER',
        content: surveyContent,
        createdAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        hospitalId,
        consultationId,
      },
    });
  } catch (error) {
    console.error('POST medical survey submit error:', error);
    return NextResponse.json({ success: false, error: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
  }
}
