// 푸시 토큰 이벤트 타입 정의
export interface PushTokenEventDetail {
  token: string;
  platform: 'ios' | 'android';
  appVersion: string;
}

export interface PushTokenEvent extends CustomEvent {
  detail: PushTokenEventDetail;
}

declare global {
  interface WindowEventMap {
    'expo:push-token': PushTokenEvent;
  }

  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}
