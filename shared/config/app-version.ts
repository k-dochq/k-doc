/**
 * 앱 버전 정책 관련 상수
 * 실제 서비스에서는 DB나 환경변수에서 관리하도록 확장 가능
 */

// 공통 버전 정보
export const APP_VERSION = {
  MIN_SUPPORTED_VERSION: '1.5.002',
  LATEST_VERSION: '1.5.006',
} as const;

// 공통 메시지
export const VERSION_MESSAGES = {
  UPDATE_RECOMMENDED: 'Please update to the latest version.',
  UPDATE_REQUIRED: 'Please update to the latest version to continue using the app.',
} as const;

// 스토어 URL (실제 앱 ID로 변경 필요)
export const STORE_URLS = {
  IOS: 'itms-apps://itunes.apple.com/app/id6502036150',
  ANDROID: 'market://details?id=io.drmiracle.app',
} as const;

// 플랫폼별 설정
export const PLATFORM_CONFIG = {
  ios: {
    minSupportedVersion: APP_VERSION.MIN_SUPPORTED_VERSION,
    latestVersion: APP_VERSION.LATEST_VERSION,
    forceOn: true,
    storeUrl: STORE_URLS.IOS,
    message: VERSION_MESSAGES.UPDATE_RECOMMENDED,
  },
  android: {
    minSupportedVersion: APP_VERSION.MIN_SUPPORTED_VERSION,
    latestVersion: APP_VERSION.LATEST_VERSION,
    forceOn: true,
    storeUrl: STORE_URLS.ANDROID,
    message: VERSION_MESSAGES.UPDATE_RECOMMENDED,
  },
} as const;
