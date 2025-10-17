import { GoogleAnalytics as NextGoogleAnalytics } from '@next/third-parties/google';

interface GoogleAnalyticsProps {
  gaId: string;
}

/**
 * Google Analytics 4 (GA4) 컴포넌트
 * Next.js 15 App Router에서 GA4를 연동합니다.
 * @next/third-parties 패키지의 공식 GoogleAnalytics 컴포넌트를 사용합니다.
 */
export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  return <NextGoogleAnalytics gaId={gaId} />;
}
