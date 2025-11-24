import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from 'shared/lib/auth/server';
import { prisma } from 'shared/lib/prisma';
import { routeErrorLogger } from 'shared/lib';
import type { MarketingAttribution } from 'shared/lib/marketing-attribution';

interface UpdateUserRequest {
  nickName?: string;
  displayName?: string;
  name?: string;
  marketingNotifications?: boolean;
  // 추가정보 입력용 필드
  passportName?: string;
  nationality?: string;
  gender?: string;
  genderType?: 'MALE' | 'FEMALE';
  countryCode?: string;
  phoneNumber?: string;
  phoneNumberOnly?: string;
  birthDate?: string;
  locale?: string;
  // 마케팅 어트리뷰션
  marketingAttribution?: MarketingAttribution;
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  const endpoint = '/api/user/update';
  const method = 'PUT';

  try {
    // 사용자 인증 확인
    const authService = new AuthService();
    const user = await authService.getCurrentUser();

    // 요청 본문 파싱
    const body: UpdateUserRequest = await request.json();
    const {
      nickName,
      displayName,
      name,
      marketingNotifications,
      passportName,
      nationality,
      gender,
      genderType,
      countryCode,
      phoneNumber,
      phoneNumberOnly,
      birthDate,
      locale,
      marketingAttribution,
    } = body;

    // 업데이트할 필드가 없는 경우
    const hasFieldsToUpdate =
      nickName !== undefined ||
      displayName !== undefined ||
      name !== undefined ||
      marketingNotifications !== undefined ||
      passportName !== undefined ||
      nationality !== undefined ||
      gender !== undefined ||
      genderType !== undefined ||
      countryCode !== undefined ||
      phoneNumber !== undefined ||
      phoneNumberOnly !== undefined ||
      birthDate !== undefined ||
      locale !== undefined ||
      marketingAttribution !== undefined;

    if (!hasFieldsToUpdate) {
      return NextResponse.json(
        {
          success: false,
          error: 'No fields to update',
        },
        { status: 400 },
      );
    }

    // 기존 사용자 데이터 조회 (raw_user_meta_data 업데이트를 위해)
    const existingUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { raw_user_meta_data: true },
    });

    // 업데이트할 데이터 준비
    const updateData: Record<string, unknown> = {};
    const currentMetaData = (existingUser?.raw_user_meta_data as Record<string, unknown>) || {};
    let metaDataUpdated = false;

    // 직접 컬럼 업데이트
    if (nickName !== undefined) updateData.nickName = nickName;
    if (displayName !== undefined) updateData.displayName = displayName;
    if (name !== undefined) updateData.name = name;
    if (genderType !== undefined) updateData.genderType = genderType;
    if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;
    if (locale !== undefined) updateData.locale = locale;

    // raw_user_meta_data 업데이트
    const newMetaData = { ...currentMetaData };

    if (marketingNotifications !== undefined) {
      newMetaData.marketing_notifications = marketingNotifications;
      metaDataUpdated = true;
    }
    if (passportName !== undefined) {
      newMetaData.passport_name = passportName;
      metaDataUpdated = true;
    }
    if (nationality !== undefined) {
      newMetaData.nationality = nationality;
      metaDataUpdated = true;
    }
    if (gender !== undefined) {
      newMetaData.gender = gender;
      metaDataUpdated = true;
    }
    if (countryCode !== undefined) {
      newMetaData.country_code = countryCode;
      metaDataUpdated = true;
    }
    if (phoneNumberOnly !== undefined) {
      newMetaData.phone_number = phoneNumberOnly;
      metaDataUpdated = true;
    }
    if (birthDate !== undefined) {
      newMetaData.birth_date = birthDate;
      metaDataUpdated = true;
    }
    if (marketingAttribution !== undefined) {
      newMetaData.marketing_attribution = marketingAttribution;
      metaDataUpdated = true;
    }

    if (metaDataUpdated) {
      updateData.raw_user_meta_data = newMetaData;
    }

    // Prisma를 사용하여 User 테이블에서 사용자 정보 업데이트
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: updateData,
      select: {
        id: true,
        email: true,
        nickName: true,
        displayName: true,
        name: true,
        raw_user_meta_data: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    const requestId = routeErrorLogger.logError({
      error: error as Error,
      endpoint,
      method,
      request,
    });

    // 인증 에러 처리
    if (error instanceof Error && error.message.includes('not authenticated')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
          requestId,
        },
        { status: 401 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update user data',
        requestId,
      },
      { status: 500 },
    );
  }
}
