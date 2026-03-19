import localFont from 'next/font/local';
import { type Locale } from 'shared/config';

// 언어별 컨시어지 타이틀 전용 폰트
// en, ko, tl 공용
const dmSerifText = localFont({
  src: '../../../public/images/premium_package/en/font/DM_Serif_Text/DMSerifText-Regular.ttf',
  display: 'swap',
  variable: '--font-concierge-dm-serif',
  preload: false,
});

const genRyuMin = localFont({
  src: '../../../public/images/premium_package/ja/font/genryu-font/GenRyuMin2JP-B.woff2',
  display: 'swap',
  variable: '--font-concierge-genryu',
  preload: false,
});

const hSiuNiu = localFont({
  src: '../../../public/images/premium_package/zh-Hant/font/H-XiuYue-CuTi/H-SiuNiu-Bold-2.woff2',
  display: 'swap',
  variable: '--font-concierge-siuniu',
  preload: false,
});

const taviraj = localFont({
  src: '../../../public/images/premium_package/th/font/Taviraj/Taviraj-SemiBold.ttf',
  display: 'swap',
  variable: '--font-concierge-taviraj',
  preload: false,
});

const spectral = localFont({
  src: '../../../public/images/premium_package/ru/font/Spectral/Spectral-Bold.ttf',
  display: 'swap',
  variable: '--font-concierge-spectral',
  preload: false,
});

const notoSerifDevanagari = localFont({
  src: '../../../public/images/premium_package/hi/font/Noto_Serif_Devanagari/NotoSerifDevanagari-Bold.ttf',
  display: 'swap',
  variable: '--font-concierge-devanagari',
  preload: false,
});

const scheherazadeNew = localFont({
  src: '../../../public/images/premium_package/ar/font/Scheherazade_New/ScheherazadeNew-Bold.ttf',
  display: 'swap',
  variable: '--font-concierge-scheherazade',
  preload: false,
});

/** 로케일 → CSS 변수명 매핑 (localFont의 variable 옵션에 지정한 이름) */
const CONCIERGE_TITLE_FONT_VAR: Record<Locale, string> = {
  en: '--font-concierge-dm-serif',
  ko: '--font-concierge-dm-serif',
  tl: '--font-concierge-dm-serif',
  ja: '--font-concierge-genryu',
  'zh-Hant': '--font-concierge-siuniu',
  th: '--font-concierge-taviraj',
  ru: '--font-concierge-spectral',
  hi: '--font-concierge-devanagari',
  ar: '--font-concierge-scheherazade',
};

const ALL_FONT_VARIABLES = [
  dmSerifText.variable,
  genRyuMin.variable,
  hSiuNiu.variable,
  taviraj.variable,
  spectral.variable,
  notoSerifDevanagari.variable,
  scheherazadeNew.variable,
].join(' ');

interface ConciergeLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function ConciergeLayout({ children, params }: ConciergeLayoutProps) {
  const { lang } = await params;
  const titleFontVar = CONCIERGE_TITLE_FONT_VAR[lang];

  return (
    <div
      className={ALL_FONT_VARIABLES}
      style={{ '--concierge-title-font': `var(${titleFontVar})` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
