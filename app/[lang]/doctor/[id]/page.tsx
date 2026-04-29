import { type Locale } from 'shared/config';
import { extractLocalizedText } from 'shared/lib';
import { getDoctorDetail } from 'entities/doctor/api/use-cases/get-doctor-detail';
import { getDictionary } from '../../dictionaries';
import { DoctorDetailContentV2 } from '../../v2/doctor/[id]/DoctorDetailContentV2';

interface V2DoctorDetailPageProps {
  params: Promise<{ lang: Locale; id: string }>;
}

export default async function V2DoctorDetailPage({ params }: V2DoctorDetailPageProps) {
  const { lang, id } = await params;
  const dict = await getDictionary(lang);

  return <DoctorDetailContentV2 doctorId={id} lang={lang} dict={dict} />;
}

// ────────────────────────────────────────────────────────────────
// generateMetadata 보조 헬퍼들 — 언어별 분기를 함수로 분리.
// ────────────────────────────────────────────────────────────────

/** Open Graph locale 코드 매핑 */
function getOgLocale(lang: Locale): string {
  switch (lang) {
    case 'ko':
      return 'ko_KR';
    case 'en':
      return 'en_US';
    case 'th':
      return 'th_TH';
    case 'zh-Hant':
      return 'zh_TW';
    case 'ja':
      return 'ja_JP';
    case 'hi':
      return 'hi_IN';
    default:
      return 'en_US';
  }
}

/**
 * "Name Position's detailed information" (영어) /
 * "이름 직책 상세 정보" (한국어) 등 언어별 title head 조립.
 */
function buildTitleHead(name: string, position: string, lang: Locale): string {
  const namePosition = position ? `${name} ${position}` : name;

  // 영어는 소유격 ('s) 으로 붙음 — 공백 없이.
  if (lang === 'en') {
    return `${namePosition}'s detailed information`;
  }

  const suffixByLang: Partial<Record<Locale, string>> = {
    ko: '상세 정보',
    th: 'ข้อมูลโดยละเอียด',
    'zh-Hant': '詳細資訊',
    ja: '詳細情報',
    hi: 'विस्तृत जानकारी',
    tl: 'detalyadong impormasyon',
    ar: 'معلومات تفصيلية',
    ru: 'подробная информация',
  };
  const suffix = suffixByLang[lang] ?? 'detailed information';
  return `${namePosition} ${suffix}`;
}

/**
 * career(약력) 데이터 추출 — 다국어 object / array / string 모두 처리해
 * 사람이 읽을 수 있는 한 줄로 합쳐 반환.
 */
function extractCareerSummary(career: unknown, lang: Locale): string {
  if (!career) return '';

  if (Array.isArray(career)) {
    return career
      .filter((v): v is string => typeof v === 'string')
      .join(' · ');
  }

  if (typeof career === 'object' && career !== null) {
    const localized = extractLocalizedText(
      career as Parameters<typeof extractLocalizedText>[0],
      lang,
    );
    if (localized && !localized.startsWith('[object')) {
      return localized;
    }

    // 다국어 object 의 값이 string array 인 경우 — { ko_KR: ["...", "..."] }
    const obj = career as Record<string, unknown>;
    const candidateKeys: string[] = [];
    if (lang === 'zh-Hant') candidateKeys.push('zh_TW', 'zh-Hant', 'zh');
    else candidateKeys.push(`${lang}_${lang.toUpperCase()}`, lang);
    candidateKeys.push('en_US', 'en');

    for (const key of candidateKeys) {
      const value = obj[key];
      if (Array.isArray(value)) {
        return value
          .filter((v): v is string => typeof v === 'string')
          .join(' · ');
      }
    }
  }

  if (typeof career === 'string') return career;
  return '';
}

/** 의사 프로필 이미지 선택 — PROFILE 우선, 없으면 첫 image */
function pickOgImageUrl(
  images: { imageType: string; imageUrl: string }[],
): string | null {
  if (images.length === 0) return null;
  const profile = images.find((img) => img.imageType === 'PROFILE');
  if (profile) return profile.imageUrl;
  return images[0].imageUrl;
}

/** 의사 정보 조회 실패 시 사용할 언어별 fallback title */
function buildFallbackTitle(lang: Locale): string {
  switch (lang) {
    case 'ko':
      return '의사 상세 정보 - K-DOC';
    case 'en':
      return "Doctor's detailed information - K-DOC";
    case 'th':
      return 'ข้อมูลแพทย์โดยละเอียด - K-DOC';
    case 'zh-Hant':
      return '醫師詳細資訊 - K-DOC';
    case 'ja':
      return '医師詳細情報 - K-DOC';
    case 'hi':
      return 'डॉक्टर की विस्तृत जानकारी - K-DOC';
    default:
      return "Doctor's detailed information - K-DOC";
  }
}

// ────────────────────────────────────────────────────────────────
// generateMetadata
// ────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: V2DoctorDetailPageProps) {
  const { lang, id } = await params;
  const baseUrl = 'https://k-doc.kr';

  try {
    const { doctor } = await getDoctorDetail({ id });

    const doctorName = extractLocalizedText(doctor.name, lang) || 'Doctor';
    const position = doctor.position
      ? extractLocalizedText(doctor.position, lang)
      : '';

    const titleHead = buildTitleHead(doctorName, position, lang);
    const title = `${titleHead} - K-DOC`;

    const careerSummary = extractCareerSummary(doctor.career, lang);
    const description =
      careerSummary || doctor.description || `${doctorName} - K-DOC`;

    const ogImage = pickOgImageUrl(doctor.DoctorImage ?? []);
    const url = `${baseUrl}/${lang}/doctor/${id}`;

    return {
      title,
      description,
      keywords: [doctorName, position, '의사', '성형외과', 'K-DOC']
        .filter(Boolean)
        .join(', '),
      authors: [{ name: 'K-DOC' }],
      creator: 'K-DOC',
      publisher: 'K-DOC',
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large' as const,
          'max-snippet': -1,
        },
      },
      alternates: {
        canonical: url,
        languages: {
          ko: `${baseUrl}/ko/doctor/${id}`,
          en: `${baseUrl}/en/doctor/${id}`,
          th: `${baseUrl}/th/doctor/${id}`,
          'zh-Hant': `${baseUrl}/zh-Hant/doctor/${id}`,
          ja: `${baseUrl}/ja/doctor/${id}`,
          hi: `${baseUrl}/hi/doctor/${id}`,
        },
      },
      openGraph: {
        title,
        description,
        url,
        type: 'profile' as const,
        locale: getOgLocale(lang),
        siteName: 'K-DOC',
        ...(ogImage && {
          images: [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: doctorName,
              type: 'image/jpeg',
            },
          ],
        }),
      },
      twitter: {
        card: 'summary_large_image' as const,
        site: '@kdoc_official',
        creator: '@kdoc_official',
        title,
        description,
        ...(ogImage && {
          images: [
            {
              url: ogImage,
              alt: doctorName,
            },
          ],
        }),
      },
    };
  } catch (_error) {
    const fallbackTitle = buildFallbackTitle(lang);

    return {
      title: fallbackTitle,
      description: '의사 상세 정보',
      openGraph: {
        title: fallbackTitle,
        description: '의사 상세 정보',
        type: 'profile' as const,
        siteName: 'K-DOC',
      },
      twitter: {
        card: 'summary_large_image' as const,
        title: fallbackTitle,
        description: '의사 상세 정보',
      },
    };
  }
}
