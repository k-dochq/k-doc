// React Native WebView 메시지 타입 정의
export interface LoginSuccessMessage {
  type: 'LOGIN_SUCCESS';
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email?: string;
    display_name?: string;
  };
}

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}
