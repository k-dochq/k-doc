'use client';

import Script from 'next/script';

interface GoogleAnalyticsProps {
  gaId: string;
}

/**
 * Google Analytics 4 (GA4) 컴포넌트
 * Next.js 15 App Router에서 GA4를 연동합니다.
 */
export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  return (
    <>
      {/* Google Analytics 스크립트 로드 */}
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />

      {/* Google Analytics 초기화 스크립트 */}
      <Script
        id='google-analytics'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
