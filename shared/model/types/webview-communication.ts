/**
 * 웹뷰와 React Native 간 통신을 위한 타입 정의
 */

// 요청 메시지
export interface NotificationPermissionRequest {
  source: 'kdoc-web';
  type: 'NOTIFICATION_PERMISSION_REQUEST';
}

// 응답 메시지
export interface NotificationPermissionResponse {
  source: 'kdoc-app';
  type: 'NOTIFICATION_PERMISSION_RESPONSE';
  granted: boolean;
  status: 'granted' | 'denied' | 'undetermined';
}
