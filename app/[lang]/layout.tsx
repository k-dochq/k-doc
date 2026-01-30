import { QueryProvider } from '@/shared/ui/providers';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { type Locale, SUPPORTED_LOCALES } from 'shared/config';
import { MaxWidthLayout } from 'widgets/max-width-layout';
import { GlobalModal } from 'shared/ui/global-modal';
import { GlobalDrawer } from 'shared/ui/global-drawer/GlobalDrawer';
import { GoogleAnalytics } from 'shared/ui/google-analytics';
import { ContentsquareAnalytics } from 'shared/ui/ContentsquareAnalytics';
import { MetaPixel } from 'shared/ui/meta-pixel';
import { GoogleTagManager } from 'shared/ui/google-tag-manager';
import { GoogleAdsGTM } from 'shared/ui/google-ads-gtm';
import { RedditPixel } from 'shared/ui/reddit-pixel';
import { MarketingAttributionTracker } from 'shared/ui/marketing-attribution/MarketingAttributionTracker';
import { Toaster } from 'sonner';
import { KoreaGateModal } from 'widgets/korea-gate-modal';
import { localeToDatabaseLocale } from 'shared/lib/utils/locale-mapper';

const pretendard = localFont({
  src: '../../fonts/pretendard/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
});

const notoSansThaiLooped = localFont({
  src: '../../fonts/notosansthai/NotoSansThaiLooped-VariableFont_wdth,wght.ttf',
  display: 'swap',
  weight: '100 900',
  variable: '--font-noto-thai',
  preload: false,
});

const notoSansTC = localFont({
  src: '../../fonts/notosanstc/NotoSansTC-VariableFont_wght.ttf',
  display: 'swap',
  weight: '100 900',
  variable: '--font-noto-tc',
  preload: false,
});

const notoSansDevanagari = localFont({
  src: '../../fonts/notosansdevanagari/NotoSansDevanagari-VariableFont_wdth,wght.ttf',
  display: 'swap',
  weight: '100 900',
  variable: '--font-noto-devanagari',
  preload: false,
});

const notoSansArabic = localFont({
  src: '../../fonts/notosansarabic/NotoSansArabic-VariableFont_wdth,wght.ttf',
  display: 'swap',
  weight: '100 900',
  variable: '--font-noto-arabic',
  preload: false,
});

/** 로케일별 적용 폰트 (특수 스크립트 미지원 로케일은 pretendard) */
const LOCALE_FONTS: Record<Locale, ReturnType<typeof localFont>> = {
  ko: pretendard,
  en: pretendard,
  ja: pretendard,
  tl: pretendard,
  th: notoSansThaiLooped,
  'zh-Hant': notoSansTC,
  hi: notoSansDevanagari,
  ar: notoSansArabic,
};

interface LangLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

// 모든 하위 페이지에 적용되는 정적 파라미터 생성
export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({
    lang,
  }));
}

export async function generateMetadata({ params }: LangLayoutProps): Promise<Metadata> {
  const { lang } = await params;

  const titles = {
    ko: 'K-DOC 10',
    en: 'K-DOC 10',
    th: 'K-DOC 10 | เค-ด็อค',
    'zh-Hant': 'K-DOC 10',
    ja: 'K-DOC 10',
    hi: 'K-DOC 10',
    tl: 'K-DOC 10',
    ar: 'K-DOC 10',
  };

  const descriptions = {
    ko: 'K-DOC은 한국 성형 관광의 필수 플랫폼입니다. 외국인환자유치업체, 검증된 병원 비교·예약, 리얼 후기, 시술 가격, 이벤트, 회원 전용 혜택까지 모두 제공합니다.',
    en: 'K-DOC, the essential Korean Plastic Surgery Guide — Compare top hospitals, read real reviews, book safely, and enjoy exclusive surgery benefits & beauty tour benefits.',
    th: 'K-DOC คู่มือศัลยกรรมตกแต่งเกาหลีที่จำเป็น — เปรียบเทียบโรงพยาบาลชั้นนำ อ่านรีวิวจริง จองอย่างปลอดภัย และเพลิดเพลินกับประโยชน์พิเศษด้านศัลยกรรมและทัวร์ความงาม',
    'zh-Hant':
      'K-DOC, the essential Korean Plastic Surgery Guide — Compare top hospitals, read real reviews, book safely, and enjoy exclusive surgery benefits & beauty tour benefits.',
    ja: 'K-DOC、韓国美容整形の必須ガイド — トップ病院を比較し、実際のレビューを読み、安全に予約し、専用の手術特典と美容ツアー特典をお楽しみください。',
    hi: 'K-DOC, the essential Korean Plastic Surgery Guide — Compare top hospitals, read real reviews, book safely, and enjoy exclusive surgery benefits & beauty tour benefits.',
    tl: 'K-DOC, the essential Korean Plastic Surgery Guide — Compare top hospitals, read real reviews, book safely, and enjoy exclusive surgery benefits & beauty tour benefits.',
    ar: 'K-DOC, the essential Korean Plastic Surgery Guide — Compare top hospitals, read real reviews, book safely, and enjoy exclusive surgery benefits & beauty tour benefits.',
  };

  // 기본 keywords
  const baseKeywords = [
    'Korean plastic surgery',
    'plastic surgery Korea',
    'Korean cosmetic surgery',
    'surgery booking Korea',
    'plastic surgery reviews',
    'Korean beauty clinics',
  ];

  // th 로케일일 때만 특별한 keywords 추가
  const keywords =
    lang === 'th'
      ? 'K-DOC, เค-ด็อค, เคด็อค, K DOC, เค ด็อค, K-Beauty, Korean plastic surgery, ศัลยกรรมเกาหลี, ทำศัลยกรรมที่เกาหลี, เมดิคัลทัวร์, ท่องเที่ยวเชิงการแพทย์, ส่วนลดศัลยกรรม, โปรศัลยกรรม, ราคาศัลยกรรม, รีวิวจริง, จองคลินิกเกาหลี, ล่ามภาษาไทย, ดูแลหลังทำ, โซล, กังนัม, อับกูจอง, คลินิกศัลยกรรมเกาหลี, เสริมจมูก, ศัลยกรรมจมูก, rhinoplasty, ตาสองชั้น, blepharoplasty, ดึงหน้า, facelift, ร้อยไหม, thread lift, V-line, ปรับรูปหน้า, โบท็อกซ์, botox, ฟิลเลอร์, filler, เลเซอร์ผิว, ดูดไขมัน, liposuction, ปลูกผม, hair transplant, เสริมหน้าอก, breast augmentation, ยกกระชับ, skin tightening, เคสรีวิว, ดีลพิเศษ, โปรโมชั่นเกาหลี, โรงพยาบาลศัลยกรรม, ที่ปรึกษาศัลยกรรม, แปลภาษาเกาหลีไทย, รับส่งสนามบิน, ที่พักใกล้คลินิก, 한국성형, 한국 성형 관광, 성형할인, 한국 성형외과, 실리프팅, 쌍꺼풀, 코성형, 지방흡입, 모발이식'
      : baseKeywords;

  return {
    title: {
      default: titles[lang],
      template: '%s', // 페이지에서 설정한 title을 그대로 사용
    },
    description: descriptions[lang],
    keywords: keywords,
    metadataBase: new URL('https://k-doc.kr'),
    other: {
      'content-language': lang,
      'naver-site-verification': 'bdfe5908db165fdf70b2bd909536cd4ba73998da',
    },
    openGraph: {
      type: 'website',
      siteName: titles[lang],
      title: titles[lang],
      description: descriptions[lang],
      locale: localeToDatabaseLocale(lang),
      images: [
        {
          url: '/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: 'K-DOC - Korean Plastic Surgery Platform',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[lang],
      description: descriptions[lang],
      images: ['/twitter-image.png'],
    },
  };
}

// Viewport 설정을 별도로 export
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover', // Safe Area를 위한 설정
};

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params;

  const currentFont = LOCALE_FONTS[lang];
  const allFontVariables = [
    pretendard.variable,
    notoSansThaiLooped.variable,
    notoSansTC.variable,
    notoSansDevanagari.variable,
    notoSansArabic.variable,
  ].join(' ');

  return (
    <html lang={lang} className={allFontVariables}>
      <body className={`${currentFont.className} bg-[#f5f5f5]`}>
        {/* Google Tag Manager */}
        <GoogleTagManager containerId='GTM-MBVD4CJR' />
        {/* Google Ads Tag Manager */}
        <GoogleAdsGTM />
        {/* Meta Pixel */}
        <MetaPixel pixelId='1160778096188076' />
        {/* Reddit Pixel */}
        <RedditPixel pixelId='a2_i7a0kzuf0009' />
        {/* Google Analytics */}
        <GoogleAnalytics gaId='G-8NMENMCDZH' />
        <GoogleAnalytics gaId='G-HB3H04LPPD' />
        {/* Contentsquare 히트맵 분석 */}
        <ContentsquareAnalytics />
        {/* 마케팅 어트리뷰션 추적 */}
        <MarketingAttributionTracker />

        <QueryProvider>
          <MaxWidthLayout>{children}</MaxWidthLayout>
          <KoreaGateModal />
          <GlobalModal />
          <GlobalDrawer />
          <Toaster position='top-center' richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
