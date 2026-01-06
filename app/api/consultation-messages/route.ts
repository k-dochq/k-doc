import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'shared/lib/supabase/server';
import { prisma } from 'shared/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { type Locale } from 'shared/config';

interface ConsultationRequestBody {
  hospitalId: string;
  name: string;
  nationality: string;
  gender: 'MALE' | 'FEMALE';
  birthDate: string;
  countryCode: string;
  phoneNumberOnly: string;
  preferredDate: string;
  preferredDate2: string;
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
    const limitParam = searchParams.get('limit');
    const cursor = searchParams.get('cursor'); // ISO string of createdAt

    if (!hospitalId) {
      return NextResponse.json(
        { success: false, error: 'MISSING_REQUIRED_PARAMS' },
        { status: 400 },
      );
    }

    // 페이지네이션: 최신순으로 limit+1 조회 후 hasMore 판정, 응답은 ASC로 반환
    const limit = (() => {
      const n = parseInt(limitParam || '50', 10);
      if (Number.isNaN(n)) return 50;
      return Math.min(Math.max(n, 1), 100);
    })();

    const baseWhere = {
      userId: session.user.id,
      hospitalId: hospitalId,
      ...(cursor
        ? {
            createdAt: {
              lt: new Date(cursor),
            },
          }
        : {}),
    } as const;

    const items = await prisma.consultationMessage.findMany({
      where: baseWhere,
      include: {
        User: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit + 1, // hasMore 판단을 위해 한 개 더 요청
    });

    const hasMore = items.length > limit;
    const sliced = hasMore ? items.slice(0, -1) : items;
    // 화면 렌더 편의상 오래된→최신 순으로 반환
    const messages = sliced.reverse();
    const nextCursor = hasMore ? messages[0]?.createdAt?.toISOString() : null;

    return NextResponse.json({
      success: true,
      messages,
      hasMore,
      nextCursor,
      limit,
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
    const isConsultationRequest = 'name' in body && 'gender' in body && 'birthDate' in body;

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
    nationality,
    gender,
    birthDate,
    countryCode,
    phoneNumberOnly,
    preferredDate,
    preferredDate2,
    content,
  } = body;

  // 입력 데이터 검증
  if (
    !hospitalId ||
    !name ||
    !nationality ||
    !gender ||
    !birthDate ||
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
  const dict = await import(`../../[lang]/dictionaries/${locale}.json`);

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

${messages.consultationRequest?.name || '이름'}: ${name}${
      nationality
        ? `
${messages.consultationRequest?.nationality || dict.default.auth?.signup?.nationality || '국적'}: ${nationality}`
        : ''
    }
${messages.consultationRequest?.gender || '성별'}: ${messages.genders?.[gender] || gender}
${messages.consultationRequest?.birthDate || '생년월일'}: ${birthDate}
${messages.consultationRequest?.phoneNumber || '휴대폰번호'}: ${countryCode} ${phoneNumberOnly}
${messages.consultationRequest?.preferredDate || '예약 희망날짜'}: ${preferredDate}${
      preferredDate2
        ? `
${messages.consultationRequest?.preferredDate2 || '예약 희망날짜2'}: ${preferredDate2}`
        : ''
    }${
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
