'use client';

import Script from 'next/script';

interface RedditPixelProps {
  pixelId: string;
}

/**
 * Reddit Pixel 추적 스크립트를 삽입하는 컴포넌트
 * - head 영역에 Reddit Pixel 스크립트를 추가합니다.
 */
export function RedditPixel({ pixelId }: RedditPixelProps) {
  return (
    <Script
      id='reddit-pixel'
      strategy='afterInteractive'
      dangerouslySetInnerHTML={{
        __html: `
          !function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);rdt('init','${pixelId}');rdt('track', 'PageVisit');
        `,
      }}
    />
  );
}
