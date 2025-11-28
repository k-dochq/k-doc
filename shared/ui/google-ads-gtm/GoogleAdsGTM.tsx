'use client';

import Script from 'next/script';

/**
 * Google Ads용 Google Tag Manager 스니펫을 삽입하는 컴포넌트
 * - head 영역에 GTM 스크립트를 주입하고
 * - body 바로 뒤에 noscript iframe을 렌더링합니다.
 * - GTM-WJZ4SK3N 컨테이너 ID 전용
 */
export function GoogleAdsGTM() {
  return (
    <>
      <Script
        id='google-ads-gtm-script'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WJZ4SK3N');
          `,
        }}
      />
      <noscript
        dangerouslySetInnerHTML={{
          __html: `
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WJZ4SK3N"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
          `,
        }}
      />
    </>
  );
}
