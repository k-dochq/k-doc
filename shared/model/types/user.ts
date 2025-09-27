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
    [key: string]: any;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserProfileRequest {
  nickName?: string;
  displayName?: string;
  name?: string;
}

export interface UpdateUserProfileResponse {
  success: boolean;
  data?: UserProfile;
  error?: string;
}
