import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getDictionary } from '../../dictionaries';
import { type Locale, STATIC_GENERATION_LOCALES } from 'shared/config';
import { extractLocalizedText } from 'shared/lib';
import {
  getHospitalDetail,
  getAllHospitalIds,
} from 'entities/hospital/api/use-cases/get-hospital-detail';
import { HospitalDetailSkeleton } from './HospitalDetailSkeleton';
import { HospitalDetailContent } from './HospitalDetailContent';
import { HospitalDetailContentV2 } from '../../v2/hospital/[id]/HospitalDetailContentV2';

interface HospitalDetailPageProps {
  params: Promise<{
    lang: Locale;
    id: string;
  }>;
}

export default async function HospitalDetailPage({ params }: HospitalDetailPageProps) {
  const { lang, id } = await params;

  try {
    // 즉시 렌더링 가능한 데이터만 먼저 로드
    const dict = await getDictionary(lang);

    return (
      <div className=''>
        {/* 병원 상세 정보 - Suspense로 스트리밍 */}
        <Suspense fallback={<HospitalDetailSkeleton />}>
          {/* <HospitalDetailContent hospitalId={id} lang={lang} dict={dict} /> */}
          <HospitalDetailContentV2 hospitalId={id} lang={lang} dict={dict} />;
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error loading hospital detail page:', error);
    notFound();
  }
}

// ISR 설정 - 3시간마다 재검증
export const revalidate = 10800;

// 빌드 타임에 생성되지 않은 경로도 동적으로 생성 허용
export const dynamicParams = true;

// 정적 생성을 위한 파라미터 생성
export async function generateStaticParams() {
  try {
    // 모든 병원 ID 조회
    const hospitalIds = await getAllHospitalIds();

    // 모든 언어와 병원 ID 조합 생성 (ko, th만)
    const params = [];
    for (const lang of STATIC_GENERATION_LOCALES) {
      for (const id of hospitalIds) {
        params.push({
          lang,
          id,
        });
      }
    }

    console.log(
      `[${new Date().toISOString()}] 정적 생성할 병원 페이지 수: ${params.length} (병원: ${hospitalIds.length}개 × 언어: ${STATIC_GENERATION_LOCALES.length}개)`,
    );
    return params;
  } catch (error) {
    console.error('Error generating static params:', error);
    // 에러 발생 시 빈 배열 반환하여 동적 렌더링으로 fallback
    return [];
  }
}

// 정적 생성을 위한 메타데이터
export async function generateMetadata({ params }: HospitalDetailPageProps) {
  const { lang, id } = await params;

  try {
    const { hospital } = await getHospitalDetail({ id });

    const hospitalName = extractLocalizedText(hospital.name, lang) || '병원';
    const hospitalDescription =
      extractLocalizedText(hospital.description, lang) ||
      `${hospitalName}의 상세 정보를 확인하세요.`;

    // 썸네일 이미지 찾기 (THUMBNAIL > MAIN > 첫 번째 이미지 순서)
    let ogImage = null;
    if (hospital.hospitalImages && hospital.hospitalImages.length > 0) {
      // THUMBNAIL 타입 이미지 우선 선택
      const thumbnailImage = hospital.hospitalImages.find((img) => img.imageType === 'THUMBNAIL');
      if (thumbnailImage) {
        ogImage = thumbnailImage.imageUrl;
      } else {
        // THUMBNAIL이 없으면 MAIN 타입 이미지 선택
        const mainImage = hospital.hospitalImages.find((img) => img.imageType === 'MAIN');
        if (mainImage) {
          ogImage = mainImage.imageUrl;
        } else {
          // 그것도 없으면 첫 번째 이미지 사용
          ogImage = hospital.hospitalImages[0].imageUrl;
        }
      }
    }

    // 언어별 title 형식 설정
    const title = (() => {
      switch (lang) {
        case 'ko':
          return `${hospitalName} - K-DOC`;
        case 'en':
          return `${hospitalName} - K-DOC`;
        case 'th':
          return `${hospitalName} - K-DOC | เค-ด็อค`;
        default:
          return `${hospitalName} - K-DOC`;
      }
    })();
    const description = hospitalDescription;

    const baseUrl = 'https://k-doc.kr';
    const url = `${baseUrl}/${lang}/hospital/${id}`;

    return {
      title: title,
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
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      alternates: {
        canonical: url,
        languages: {
          ko: `${baseUrl}/ko/hospital/${id}`,
          en: `${baseUrl}/en/hospital/${id}`,
          th: `${baseUrl}/th/hospital/${id}`,
        },
      },
      openGraph: {
        title,
        description,
        url,
        type: 'website',
        locale: lang === 'ko' ? 'ko_KR' : lang === 'en' ? 'en_US' : 'th_TH',
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
        card: 'summary_large_image',
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
    // 에러 시 언어별 기본 title 설정
    const fallbackTitle = (() => {
      switch (lang) {
        case 'ko':
          return '병원 정보 - K-DOC | 케이닥';
        case 'en':
          return 'Hospital Information - K-DOC';
        case 'th':
          return 'ข้อมูลโรงพยาบาล - K-DOC | เค-ด็อค';
        default:
          return 'Hospital Information - K-DOC';
      }
    })();

    return {
      title: fallbackTitle,
      description: '병원 상세 정보',
      openGraph: {
        title: fallbackTitle,
        description: '병원 상세 정보',
        type: 'website',
        siteName: 'K-DOC',
      },
      twitter: {
        card: 'summary_large_image',
        title: fallbackTitle,
        description: '병원 상세 정보',
      },
    };
  }
}
