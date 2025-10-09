import { QueryProvider } from '@/shared/ui/providers';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { type Locale, SUPPORTED_LOCALES } from 'shared/config';
import { MaxWidthLayout } from 'widgets/max-width-layout';
import { GlobalModal } from 'shared/ui/global-modal';
import { GradientBackground } from 'shared/ui/gradient-background/GradientBackground';
import { GoogleAnalytics } from 'shared/ui/google-analytics';
import { PushTokenListener } from 'shared/ui/push-token-listener';

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
});

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
    ko: 'K-DOC | เค-ด็อค',
    en: 'K-DOC | เค-ด็อค',
    th: 'K-DOC | เค-ด็อค',
  };

  const descriptions = {
    ko: '한국 성형 관광 필수 가이드 K-DOC - 의료 플랫폼에서 병원 비교·예약, 실제 시술 후기, 가격 정보, 이벤트/혜택, 시술비 할인',
    en: 'K-DOC: Your essential guide to Korean cosmetic surgery - compare clinics, book, check prices, events & deals, read real reviews, and get discounts.',
    th: 'K-DOC ไกด์ศัลยกรรมเกาหลีสำหรับคนไทย เปรียบเทียบคลินิก จองคิว อ่านรีวิวจริง ดูราคา โปรโมชัน/อีเวนต์ และรับส่วนลดค่าศัลยกรรม',
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
      siteName: 'K-DOC | เค-ด็อค',
      title: titles[lang],
      description: descriptions[lang],
      locale: lang === 'ko' ? 'ko_KR' : lang === 'en' ? 'en_US' : 'th_TH',
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

  // 언어별 폰트 선택
  const currentFont = lang === 'th' ? notoSansThaiLooped : pretendard;
  const allFontVariables = `${pretendard.variable} ${notoSansThaiLooped.variable}`;

  return (
    <html lang={lang} className={allFontVariables}>
      <body className={currentFont.className}>
        {/* Google Analytics */}
        <GoogleAnalytics gaId='G-8NMENMCDZH' />

        <QueryProvider>
          <MaxWidthLayout>
            <GradientBackground>{children}</GradientBackground>
          </MaxWidthLayout>
          <GlobalModal />
          <PushTokenListener />
        </QueryProvider>
      </body>
    </html>
  );
}
