import { NextResponse } from 'next/server';
import { PLATFORM_CONFIG } from 'shared/config/app-version';
import type { VersionPolicyResponse } from 'shared/types/version-policy';

/**
 * 앱 버전 정책 API
 * 클라이언트 앱에서 현재 버전과 비교하여 업데이트 필요 여부를 확인할 수 있음
 *
 * @returns {VersionPolicyResponse} iOS와 Android 플랫폼별 버전 정책 정보
 */
export async function GET(): Promise<NextResponse<VersionPolicyResponse>> {
  try {
    const versionPolicy: VersionPolicyResponse = {
      ios: PLATFORM_CONFIG.ios,
      android: PLATFORM_CONFIG.android,
    };

    return NextResponse.json(versionPolicy);
  } catch (error) {
    console.error('Error fetching version policy:', error);

    // 에러 발생 시 기본값 반환
    return NextResponse.json(
      {
        ios: PLATFORM_CONFIG.ios,
        android: PLATFORM_CONFIG.android,
      },
      { status: 200 },
    );
  }
}
