'use client';

import { useEffect, useState } from 'react';
import { isExpoWebView, isIOS, isAndroid } from 'shared/lib/webview-detection';
import { type BannerPlatform } from '@prisma/client';

function detectBannerPlatform(): BannerPlatform {
  if (!isExpoWebView()) return 'WEB';
  if (isIOS()) return 'IOS';
  if (isAndroid()) return 'ANDROID';
  return 'WEB';
}

/**
 * 현재 접속 환경에 해당하는 BannerPlatform을 반환합니다.
 * - 일반 브라우저 → 'WEB'
 * - iOS 앱 WebView → 'IOS'
 * - Android 앱 WebView → 'ANDROID'
 *
 * SSR에서는 'WEB'으로 초기화되어 hydration 오류가 발생하지 않습니다.
 */
export function useBannerPlatform(): BannerPlatform {
  const [platform, setPlatform] = useState<BannerPlatform>('WEB');

  useEffect(() => {
    setPlatform(detectBannerPlatform());
  }, []);

  return platform;
}
