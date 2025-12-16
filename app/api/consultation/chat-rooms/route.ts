import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'shared/lib/supabase/server';
import { prisma } from 'shared/lib/prisma';
import { parseLocalizedText, type LocalizedText } from 'shared/model/types';

export interface ChatRoom {
  hospitalId: string;
  hospitalName: LocalizedText;
  hospitalThumbnailUrl?: string;
  hospitalLogoUrl?: string;
  districtName?: LocalizedText;
  lastMessageContent?: string;
  lastMessageDate?: string;
  lastMessageSenderType?: 'USER' | 'ADMIN';
  unreadCount?: number;
}

export async function GET(_request: NextRequest): Promise<NextResponse> {
  try {
    const supabase = await createClient();

    // 현재 사용자 세션 확인
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session?.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    // Prisma로 사용자가 대화한 병원별로 그룹화하여 마지막 메시지와 함께 조회
    const messages = await prisma.consultationMessage.findMany({
      where: {
        userId: userId,
      },
      include: {
        Hospital: {
          include: {
            District: true,
            HospitalImage: {
              where: {
                imageType: {
                  in: ['THUMBNAIL', 'LOGO'],
                },
                isActive: true,
              },
              orderBy: [{ imageType: 'asc' }, { order: 'asc' }],
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // 병원별로 그룹화하고 마지막 메시지 정보 추출
    const hospitalMap = new Map<string, ChatRoom>();

    messages.forEach((message) => {
      const hospitalId = message.hospitalId;

      if (!hospitalMap.has(hospitalId)) {
        const hospital = message.Hospital;
        const district = hospital.District;
        const thumbnailImage = hospital.HospitalImage.find((img) => img.imageType === 'THUMBNAIL');
        const logoImage = hospital.HospitalImage.find((img) => img.imageType === 'LOGO');

        hospitalMap.set(hospitalId, {
          hospitalId,
          hospitalName: parseLocalizedText(hospital.name),
          hospitalThumbnailUrl: thumbnailImage?.imageUrl,
          hospitalLogoUrl: logoImage?.imageUrl,
          districtName: hospital.displayLocationName
            ? parseLocalizedText(hospital.displayLocationName)
            : district
              ? district.displayName
                ? parseLocalizedText(district.displayName)
                : parseLocalizedText(district.name)
              : undefined,
          lastMessageContent: message.content,
          lastMessageDate: message.createdAt.toISOString(),
          lastMessageSenderType: message.senderType,
          unreadCount: 0, // TODO: 읽지 않은 메시지 수 계산 로직 추가
        });
      }
    });

    const chatRoomsList = Array.from(hospitalMap.values());

    return NextResponse.json({
      success: true,
      data: chatRoomsList,
    });
  } catch (error) {
    console.error('Error in chat rooms API:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
