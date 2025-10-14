'use client';

import { useState } from 'react';
import { isExpoWebView } from 'shared/lib/webview-detection';

interface ShareData {
  title?: string;
  text?: string;
  url?: string;
}

interface ShareResult {
  success: boolean;
  method?: 'native' | 'clipboard' | 'fallback';
  error?: string;
}

const shareViaReactNative = async (data: ShareData): Promise<ShareResult> => {
  try {
    if (typeof window === 'undefined') {
      throw new Error('Window is not available');
    }

    const webViewWindow = window as any;
    if (!webViewWindow.ReactNativeWebView?.postMessage) {
      throw new Error('ReactNativeWebView is not available');
    }

    const shareRequest = {
      source: 'kdoc-web',
      type: 'SHARE_REQUEST',
      url: typeof window !== 'undefined' ? window.location.href : '',
    };

    webViewWindow.ReactNativeWebView.postMessage(JSON.stringify(shareRequest));

    return { success: true, method: 'native' };
  } catch (error) {
    console.error('React Native 공유 실패:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

export function useShare() {
  const [isLoading, setIsLoading] = useState(false);

  const share = async (data: ShareData): Promise<ShareResult> => {
    setIsLoading(true);

    try {
      // React Native WebView 환경인지 확인
      if (isExpoWebView()) {
        return await shareViaReactNative(data);
      }

      // HTTPS 체크 (Web Share API는 HTTPS에서만 작동)
      const isSecureContext = typeof window !== 'undefined' && window.isSecureContext;

      // Web Share API 지원 확인
      const hasWebShareAPI =
        typeof navigator !== 'undefined' &&
        'share' in navigator &&
        typeof navigator.share === 'function';

      // Web Share API 사용 가능한 경우
      if (isSecureContext && hasWebShareAPI) {
        try {
          // canShare 메서드가 있는 경우 데이터 유효성 검사
          if ('canShare' in navigator && typeof navigator.canShare === 'function') {
            if (!navigator.canShare(data)) {
              throw new Error('Data cannot be shared');
            }
          }

          await navigator.share(data);
          return { success: true, method: 'native' };
        } catch (shareError) {
          // 사용자가 공유를 취소한 경우는 에러로 처리하지 않음
          if (shareError instanceof Error && shareError.name === 'AbortError') {
            return { success: false, error: 'Share cancelled by user' };
          }
          throw shareError;
        }
      }

      // Web Share API를 사용할 수 없는 경우 클립보드 복사
      if (typeof navigator !== 'undefined' && 'clipboard' in navigator) {
        const urlToShare = data.url || (typeof window !== 'undefined' ? window.location.href : '');
        await navigator.clipboard.writeText(urlToShare);
        return { success: true, method: 'clipboard' };
      }

      // 클립보드 API도 지원하지 않는 경우 fallback
      return { success: true, method: 'fallback' };
    } catch (error) {
      console.error('Share failed:', error);

      // 최종 fallback: 선택 가능한 텍스트로 만들기
      try {
        const urlToShare = data.url || (typeof window !== 'undefined' ? window.location.href : '');

        // 텍스트 선택을 위한 임시 요소 생성
        if (typeof document !== 'undefined') {
          const textArea = document.createElement('textarea');
          textArea.value = urlToShare;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();

          const successful = document.execCommand('copy');
          document.body.removeChild(textArea);

          if (successful) {
            return { success: true, method: 'fallback' };
          }
        }
      } catch (fallbackError) {
        console.error('Fallback copy failed:', fallbackError);
      }

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    share,
    isLoading,
  };
}
