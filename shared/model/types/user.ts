export interface UserProfile {
  id: string;
  email: string;
  nickName: string | null;
  displayName: string | null;
  name: string | null;
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
