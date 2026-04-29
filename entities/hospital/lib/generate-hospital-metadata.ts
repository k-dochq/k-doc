import { type Locale } from 'shared/config';
import { extractLocalizedText } from 'shared/lib';
import { getHospitalDetail } from 'entities/hospital/api/use-cases/get-hospital-detail';

const BASE_URL = 'https://k-doc.kr';

interface GenerateHospitalMetadataParams {
  id: string;
  lang: Locale;
  /** 라우트별 path segment. 예: 'hospital' 또는 'v2/hospital' */
  basePath: 'hospital' | 'v2/hospital';
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

function buildTitle(hospitalName: string, lang: Locale): string {
  if (lang === 'th') return `${hospitalName} - K-DOC | เค-ด็อค`;
  return `${hospitalName} - K-DOC`;
}

function pickOgImageUrl(
  images: { imageType: string; imageUrl: string }[] | null | undefined,
): string | null {
  if (!images || images.length === 0) return null;
  const thumbnail = images.find((img) => img.imageType === 'THUMBNAIL');
  if (thumbnail) return thumbnail.imageUrl;
  const main = images.find((img) => img.imageType === 'MAIN');
  if (main) return main.imageUrl;
  return images[0].imageUrl;
}

function buildFallbackTitle(lang: Locale): string {
  switch (lang) {
    case 'ko':
      return '병원 정보 - K-DOC | 케이닥';
    case 'en':
      return 'Hospital Information - K-DOC';
    case 'th':
      return 'ข้อมูลโรงพยาบาล - K-DOC | เค-ด็อค';
    case 'zh-Hant':
    case 'ja':
    case 'hi':
    default:
      return 'Hospital Information - K-DOC';
  }
}

export async function generateHospitalMetadata({
  id,
  lang,
  basePath,
}: GenerateHospitalMetadataParams) {
  try {
    const { hospital } = await getHospitalDetail({ id });

    const hospitalName = extractLocalizedText(hospital.name, lang) || '병원';
    const description =
      extractLocalizedText(hospital.description, lang) ||
      `${hospitalName}의 상세 정보를 확인하세요.`;

    const ogImage = pickOgImageUrl(hospital.hospitalImages);
    const title = buildTitle(hospitalName, lang);
    const url = `${BASE_URL}/${lang}/${basePath}/${id}`;

    return {
      title,
      description,
      keywords: [hospitalName, '병원', '의료', '성형외과', '미용외과', 'K-DOC'].join(', '),
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
        type: 'website' as const,
        locale: getOgLocale(lang),
        siteName: 'K-DOC',
        ...(ogImage && {
          images: [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: hospitalName,
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
              alt: hospitalName,
            },
          ],
        }),
      },
    };
  } catch (_error) {
    const fallbackTitle = buildFallbackTitle(lang);

    return {
      title: fallbackTitle,
      description: '병원 상세 정보',
      openGraph: {
        title: fallbackTitle,
        description: '병원 상세 정보',
        type: 'website' as const,
        siteName: 'K-DOC',
      },
      twitter: {
        card: 'summary_large_image' as const,
        title: fallbackTitle,
        description: '병원 상세 정보',
      },
    };
  }
}
