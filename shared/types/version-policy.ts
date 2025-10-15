/**
 * 앱 버전 정책 관련 타입 정의
 */

export interface VersionPolicy {
  minSupportedVersion: string;
  latestVersion: string;
  forceOn: boolean;
  storeUrl: string;
  message: string;
}

export interface VersionPolicyResponse {
  ios: VersionPolicy;
  android: VersionPolicy;
}

export type Platform = 'ios' | 'android';
