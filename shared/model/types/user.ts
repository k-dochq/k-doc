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
}

export interface UpdateUserProfileResponse {
  success: boolean;
  data?: UserProfile;
  error?: string;
}
