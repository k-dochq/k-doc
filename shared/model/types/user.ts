import type { MarketingAttribution } from 'shared/lib/marketing-attribution';

export interface UserProfile {
  id: string;
  email: string;
  nickName: string | null;
  displayName: string | null;
  name: string | null;
  genderType: 'MALE' | 'FEMALE' | null;
  phoneNumber: string | null;
  raw_user_meta_data: {
    passport_name?: string;
    gender?: string;
    country_code?: string;
    phone_number?: string;
    nationality?: string;
    birth_date?: string;
    nickname?: string;
    marketing_notifications?: boolean;
    marketing_attribution?: MarketingAttribution;
    [key: string]: unknown;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserProfileRequest {
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

export interface UpdateUserProfileResponse {
  success: boolean;
  data?: UserProfile;
  error?: string;
}
