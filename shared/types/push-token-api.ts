// API 응답 타입 정의
export interface PushTokenRegisterResponse {
  success: boolean;
  message?: string;
  error?: string;
  details?: string;
  data?: {
    userId: string;
    platform: 'ios' | 'android';
    appVersion: string;
  };
}
