import { type Locale } from 'shared/config';
import { extractLocalizedText } from 'shared/lib';
import { getDoctorNameFromJsonValue } from 'shared/lib/doctor-name';
import { getDoctorDetail } from 'entities/doctor/api/use-cases/get-doctor-detail';

const BASE_URL = 'https://k-doc.kr';

interface GenerateDoctorMetadataParams {
  id: string;
  lang: Locale;
  /** 라우트별 path segment. 예: 'doctor' 또는 'v2/doctor' */
  basePath: 'doctor' | 'v2/doctor';
}

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

function buildTitleHead(name: string, position: string): string {
  if (!position) return name;
  return `${name} ${position}`;
}

function extractCareerSummary(career: unknown, lang: Locale): string {
  if (!career) return '';

  if (Array.isArray(career)) {
    return career.filter((v): v is string => typeof v === 'string').join(' · ');
  }

  if (typeof career === 'object' && career !== null) {
    const localized = extractLocalizedText(
      career as Parameters<typeof extractLocalizedText>[0],
      lang,
    );
    if (localized && !localized.startsWith('[object')) {
      return localized;
    }

    const obj = career as Record<string, unknown>;
    const candidateKeys: string[] = [];
    if (lang === 'zh-Hant') candidateKeys.push('zh_TW', 'zh-Hant', 'zh');
    else candidateKeys.push(`${lang}_${lang.toUpperCase()}`, lang);
    candidateKeys.push('en_US', 'en');

    for (const key of candidateKeys) {
      const value = obj[key];
      if (Array.isArray(value)) {
        return value.filter((v): v is string => typeof v === 'string').join(' · ');
      }
    }
  }

  if (typeof career === 'string') return career;
  return '';
}

function pickOgImageUrl(images: { imageType: string; imageUrl: string }[]): string | null {
  if (images.length === 0) return null;
  const profile = images.find((img) => img.imageType === 'PROFILE');
  if (profile) return profile.imageUrl;
  return images[0].imageUrl;
}

function buildFallbackTitle(lang: Locale): string {
  switch (lang) {
    case 'ko':
      return '의사 정보 - K-DOC';
    case 'en':
      return 'Doctor - K-DOC';
    case 'th':
      return 'ข้อมูลแพทย์ - K-DOC';
    case 'zh-Hant':
      return '醫師資訊 - K-DOC';
    case 'ja':
      return '医師情報 - K-DOC';
    case 'hi':
      return 'डॉक्टर की जानकारी - K-DOC';
    default:
      return 'Doctor - K-DOC';
  }
}

export async function generateDoctorMetadata({
  id,
  lang,
  basePath,
}: GenerateDoctorMetadataParams) {
  try {
    const { doctor } = await getDoctorDetail({ id });

    const doctorName = getDoctorNameFromJsonValue(doctor.name, lang) || 'Doctor';
    const position = doctor.position ? extractLocalizedText(doctor.position, lang) : '';

    const titleHead = buildTitleHead(doctorName, position);
    const title = `${titleHead} - K-DOC`;

    const careerSummary = extractCareerSummary(doctor.career, lang);
    const description = careerSummary || doctor.description || `${doctorName} - K-DOC`;

    const ogImage = pickOgImageUrl(doctor.DoctorImage ?? []);
    const url = `${BASE_URL}/${lang}/${basePath}/${id}`;

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
          ko: `${BASE_URL}/ko/${basePath}/${id}`,
          en: `${BASE_URL}/en/${basePath}/${id}`,
          th: `${BASE_URL}/th/${basePath}/${id}`,
          'zh-Hant': `${BASE_URL}/zh-Hant/${basePath}/${id}`,
          ja: `${BASE_URL}/ja/${basePath}/${id}`,
          hi: `${BASE_URL}/hi/${basePath}/${id}`,
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
