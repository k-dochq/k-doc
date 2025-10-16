'use client';

import Script from 'next/script';

/**
 * Contentsquare 히트맵 분석 컴포넌트
 * Next.js 15 App Router에서 Contentsquare를 연동합니다.
 */
export function ContentsquareAnalytics() {
  return (
    <Script
      id='contentsquare-analytics'
      strategy='afterInteractive'
      dangerouslySetInnerHTML={{
        __html: `
          (function (c, s, q, u, a, r, e) {
            c.hj=c.hj||function(){(c.hj.q=c.hj.q||[]).push(arguments)};
            c._hjSettings = { hjid: a };
            r = s.getElementsByTagName('head')[0];
            e = s.createElement('script');
            e.async = true;
            e.src = q + c._hjSettings.hjid + u;
            r.appendChild(e);
          })(window, document, 'https://static.hj.contentsquare.net/c/csq-', '.js', 6548293);
        `,
      }}
    />
  );
}
