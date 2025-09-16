import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'shared/lib/supabase/server';
import { prisma } from 'shared/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

interface ConsultationRequestBody {
  hospitalId: string;
  name: string;
  gender: 'MALE' | 'FEMALE';
  ageGroup: string;
  phoneNumber: string;
  preferredDate: string;
  content: string;
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

    const body: ConsultationRequestBody = await request.json();
    const { hospitalId, name, gender, ageGroup, phoneNumber, preferredDate, content } = body;

    // 입력 데이터 검증
    if (
      !hospitalId ||
      !name ||
      !gender ||
      !ageGroup ||
      !phoneNumber ||
      !preferredDate ||
      !content
    ) {
      return NextResponse.json(
        { success: false, error: 'MISSING_REQUIRED_FIELDS' },
        { status: 400 },
      );
    }

    // 병원 존재 여부 확인
    const hospital = await prisma.hospital.findUnique({
      where: { id: hospitalId },
      select: { id: true, name: true },
    });

    if (!hospital) {
      return NextResponse.json({ success: false, error: 'HOSPITAL_NOT_FOUND' }, { status: 404 });
    }

    // 해당 사용자와 병원 간의 기존 대화 확인
    const existingMessages = await prisma.consultationMessage.findFirst({
      where: {
        userId: session.user.id,
        hospitalId: hospitalId,
      },
    });

    const messages = [];

    // 첫 대화인 경우 병원 어드민의 환영 메시지 추가
    if (!existingMessages) {
      const welcomeMessage = {
        id: uuidv4(),
        userId: session.user.id,
        hospitalId: hospitalId,
        senderType: 'ADMIN' as const,
        content: '안녕하세요! 반갑습니다.\n성형과 관련된 무엇이든 물어보세요.',
        createdAt: new Date(),
      };
      messages.push(welcomeMessage);
    }

    // 나이대 매핑
    const ageGroupMap: Record<string, string> = {
      '10s': '10대',
      '20s': '20대',
      '30s': '30대',
      '40s': '40대',
      '50s': '50대',
      '60s': '60대 이상',
    };

    // 성별 매핑
    const genderMap: Record<string, string> = {
      MALE: '남성',
      FEMALE: '여성',
    };

    // 병원 이름 추출 (다국어 JSON에서 한국어 이름)
    const hospitalName =
      typeof hospital.name === 'object' && hospital.name !== null
        ? (hospital.name as any).ko || (hospital.name as any).en || '병원'
        : '병원';

    // 사용자의 상담신청 메시지 생성
    const consultationRequestMessage = {
      id: uuidv4(),
      userId: session.user.id,
      hospitalId: hospitalId,
      senderType: 'USER' as const,
      content: `(자동 생성 예약 신청서)
${hospitalName} 시술 상담 신청합니다.

이름: ${name}
성별: ${genderMap[gender] || gender}
나이대: ${ageGroupMap[ageGroup] || ageGroup}
휴대폰번호: ${phoneNumber}
예약 희망날짜: ${preferredDate}

기타 문의사항:
${content}`,
      createdAt: new Date(),
    };
    messages.push(consultationRequestMessage);

    // 데이터베이스에 메시지들 저장
    await prisma.consultationMessage.createMany({
      data: messages,
    });

    return NextResponse.json({
      success: true,
      data: {
        hospitalId,
        messageCount: messages.length,
      },
    });
  } catch (error) {
    console.error('Consultation request error:', error);
    return NextResponse.json({ success: false, error: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
  }
}
