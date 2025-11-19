'use client';

import Script from 'next/script';

interface GoogleTagManagerProps {
  containerId: string;
  dataLayerName?: string;
}

/**
 * Google Tag Manager 스니펫을 삽입하는 컴포넌트
 * - head 영역에 GTM 스크립트를 주입하고
 * - body 바로 뒤에 noscript iframe을 렌더링합니다.
 */
export function GoogleTagManager({
  containerId,
  dataLayerName = 'dataLayer',
}: GoogleTagManagerProps) {
  const dataLayerSuffix = dataLayerName === 'dataLayer' ? '' : `&l=${dataLayerName}`;

  return (
    <>
      <Script
        id={`gtm-script-${containerId}`}
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','${dataLayerName}','${containerId}');
          `,
        }}
      />
      <noscript
        dangerouslySetInnerHTML={{
          __html: `
            <iframe src="https://www.googletagmanager.com/ns.html?id=${containerId}${dataLayerSuffix}"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
          `,
        }}
      />
    </>
  );
}
