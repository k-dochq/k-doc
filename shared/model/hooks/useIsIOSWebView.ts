'use client';

import { useEffect, useState } from 'react';
import { isExpoWebViewOnIOS } from 'shared/lib/webview-detection';

/**
 * iOS 앱 내 WebView 환경 여부를 반환합니다.
 * SSR에서는 false로 초기화되어 hydration 오류가 발생하지 않습니다.
 */
export function useIsIOSWebView(): boolean {
  const [isIOSWebView, setIsIOSWebView] = useState(false);

  useEffect(() => {
    setIsIOSWebView(isExpoWebViewOnIOS());
  }, []);

  return isIOSWebView;
}
