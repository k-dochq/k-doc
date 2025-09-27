import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'shared/lib/supabase/server';
import { prisma } from 'shared/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { type Locale } from 'shared/config';

interface ConsultationRequestBody {
  hospitalId: string;
  name: string;
  gender: 'MALE' | 'FEMALE';
  ageGroup: string;
  countryCode: string;
  phoneNumberOnly: string;
  preferredDate: string;
  content: string;
}

interface ChatMessageBody {
  hospitalId: string;
  content: string;
  senderType?: 'USER' | 'ADMIN';
}

// 다국어 메시지 가져오기 함수
async function getLocalizedMessages(locale: Locale) {
  const dict = await import(`../../[lang]/dictionaries/${locale}.json`);
  return dict.default.consultation?.request?.form?.chatMessages || {};
}

// 요청에서 locale 추출
function extractLocaleFromRequest(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get('accept-language') || '';
  const referer = request.headers.get('referer') || '';

  // Referer URL에서 locale 추출
  const refererMatch = referer.match(/\/(ko|en|th)\//);
  if (refererMatch) {
    return refererMatch[1] as Locale;
  }

  // Accept-Language 헤더에서 locale 추출
  if (acceptLanguage.includes('ko')) return 'ko';
  if (acceptLanguage.includes('th')) return 'th';
  if (acceptLanguage.includes('en')) return 'en';

  // 기본값
  return 'ko';
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { session },
      error: authError,
    } = await supabase.auth.getSession();

    if (authError || !session?.user?.id) {
      return NextResponse.json({ success: false, error: 'UNAUTHORIZED' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const hospitalId = searchParams.get('hospitalId');
    const userId = searchParams.get('userId');

    if (!hospitalId || !userId) {
      return NextResponse.json(
        { success: false, error: 'MISSING_REQUIRED_PARAMS' },
        { status: 400 },
      );
    }

    // 현재 로그인한 사용자가 요청한 userId와 일치하는지 확인
    if (session.user.id !== userId) {
      return NextResponse.json({ success: false, error: 'FORBIDDEN' }, { status: 403 });
    }

    // 해당 사용자와 병원 간의 메시지 조회
    const messages = await prisma.consultationMessage.findMany({
      where: {
        userId: userId,
        hospitalId: hospitalId,
      },
      include: {
        User: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return NextResponse.json({
      success: true,
      messages: messages,
    });
  } catch (error) {
    console.error('Get consultation messages error:', error);
    return NextResponse.json({ success: false, error: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { session },
      error: authError,
    } = await supabase.auth.getSession();

    if (authError || !session?.user?.id) {
      return NextResponse.json({ success: false, error: 'UNAUTHORIZED' }, { status: 401 });
    }

    const body = await request.json();
    const locale = extractLocaleFromRequest(request);

    // 요청 타입 판별: 상담 신청 vs 일반 채팅 메시지
    const isConsultationRequest = 'name' in body && 'gender' in body && 'ageGroup' in body;

    if (isConsultationRequest) {
      // 상담 신청 처리
      return await handleConsultationRequest(
        body as ConsultationRequestBody,
        session.user.id,
        locale,
      );
    } else {
      // 일반 채팅 메시지 처리
      return await handleChatMessage(body as ChatMessageBody, session.user.id, locale);
    }
  } catch (error) {
    console.error('POST consultation messages error:', error);
    return NextResponse.json({ success: false, error: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
  }
}

async function handleChatMessage(body: ChatMessageBody, userId: string, _locale: Locale) {
  const { hospitalId, content, senderType = 'USER' } = body;

  if (!hospitalId || !content) {
    return NextResponse.json({ success: false, error: 'MISSING_REQUIRED_FIELDS' }, { status: 400 });
  }

  // 병원 존재 여부 확인
  const hospital = await prisma.hospital.findUnique({
    where: { id: hospitalId },
    select: { id: true },
  });

  if (!hospital) {
    return NextResponse.json({ success: false, error: 'HOSPITAL_NOT_FOUND' }, { status: 404 });
  }

  // 메시지 저장
  const message = await prisma.consultationMessage.create({
    data: {
      id: uuidv4(),
      userId: userId,
      hospitalId: hospitalId,
      senderType: senderType,
      content: content,
      createdAt: new Date(),
    },
  });

  return NextResponse.json({
    success: true,
    data: {
      messageId: message.id,
      hospitalId,
    },
  });
}

async function handleConsultationRequest(
  body: ConsultationRequestBody,
  userId: string,
  locale: Locale,
) {
  const {
    hospitalId,
    name,
    gender,
    ageGroup,
    countryCode,
    phoneNumberOnly,
    preferredDate,
    content,
  } = body;

  // 입력 데이터 검증
  if (
    !hospitalId ||
    !name ||
    !gender ||
    !ageGroup ||
    !countryCode ||
    !phoneNumberOnly ||
    !preferredDate
  ) {
    return NextResponse.json({ success: false, error: 'MISSING_REQUIRED_FIELDS' }, { status: 400 });
  }

  // 병원 존재 여부 확인
  const hospital = await prisma.hospital.findUnique({
    where: { id: hospitalId },
    select: { id: true, name: true },
  });

  if (!hospital) {
    return NextResponse.json({ success: false, error: 'HOSPITAL_NOT_FOUND' }, { status: 404 });
  }

  // 다국어 메시지 가져오기
  const messages = await getLocalizedMessages(locale);

  // 해당 사용자와 병원 간의 기존 대화 확인
  const existingMessages = await prisma.consultationMessage.findFirst({
    where: {
      userId: userId,
      hospitalId: hospitalId,
    },
  });

  const messageList = [];

  // 첫 대화인 경우 병원 어드민의 환영 메시지 추가
  if (!existingMessages) {
    const welcomeMessage = {
      id: uuidv4(),
      userId: userId,
      hospitalId: hospitalId,
      senderType: 'ADMIN' as const,
      content: messages.welcome || '안녕하세요! 반갑습니다.\n성형과 관련된 무엇이든 물어보세요.',
      createdAt: new Date(),
    };
    messageList.push(welcomeMessage);
  }

  // 병원 이름 추출 (요청한 locale에 맞는 이름)
  const hospitalName = extractLocalizedText(hospital.name, locale) || '병원';

  // 사용자의 상담신청 메시지 생성
  const consultationRequestMessage = {
    id: uuidv4(),
    userId: userId,
    hospitalId: hospitalId,
    senderType: 'USER' as const,
    content: `${messages.consultationRequest?.title || '(자동 생성 예약 신청서)'}
${hospitalName} ${messages.consultationRequest?.subtitle || '시술 상담 신청합니다.'}

${messages.consultationRequest?.name || '이름'}: ${name}
${messages.consultationRequest?.gender || '성별'}: ${messages.genders?.[gender] || gender}
${messages.consultationRequest?.ageGroup || '나이대'}: ${messages.ageGroups?.[ageGroup] || ageGroup}
${messages.consultationRequest?.phoneNumber || '휴대폰번호'}: ${countryCode} ${phoneNumberOnly}
${messages.consultationRequest?.preferredDate || '예약 희망날짜'}: ${preferredDate}${
      content
        ? `

${messages.consultationRequest?.additionalInquiry || '기타 문의사항'}:
${content}`
        : ''
    }`,
    createdAt: new Date(),
  };
  messageList.push(consultationRequestMessage);

  // 데이터베이스에 메시지들 저장
  await prisma.consultationMessage.createMany({
    data: messageList,
  });

  return NextResponse.json({
    success: true,
    data: {
      hospitalId,
      messageCount: messageList.length,
    },
  });
}
