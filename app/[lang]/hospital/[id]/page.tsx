import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getDictionary } from '../../dictionaries';
import { type Locale, STATIC_GENERATION_LOCALES } from 'shared/config';
import { extractLocalizedText } from 'shared/lib';
import {
  getHospitalDetail,
  getAllHospitalIds,
} from 'entities/hospital/api/use-cases/get-hospital-detail';
// import { HospitalDetailContent } from './HospitalDetailContent';
import { HospitalDetailSkeleton } from './HospitalDetailSkeleton';

interface HospitalDetailPageProps {
  params: Promise<{
    lang: Locale;
    id: string;
  }>;
}

export default async function HospitalDetailPage({ params }: HospitalDetailPageProps) {
  const { lang, id: _id } = await params;

  try {
    // 즉시 렌더링 가능한 데이터만 먼저 로드
    const _dict = await getDictionary(lang);

    return (
      <div className='container mx-auto space-y-8 px-4 py-6'>
        {/* 병원 상세 정보 - Suspense로 스트리밍 */}
        <Suspense fallback={<HospitalDetailSkeleton />}>
          {/* <HospitalDetailContent hospitalId={id} lang={lang} dict={dict} /> */}
          <HospitalDetailSkeleton />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error loading hospital detail page:', error);
    notFound();
  }
}

// ISR 설정 - 10분마다 재검증
export const revalidate = 600;

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
    const dict = await getDictionary(lang);

    const hospitalName = extractLocalizedText(hospital.name, lang) || '병원';

    return {
      title: `${hospitalName} - ${dict.hospitals.title}`,
      description: hospital.description || `${hospitalName}의 상세 정보를 확인하세요.`,
    };
  } catch (_error) {
    return {
      title: '병원 정보',
      description: '병원 상세 정보',
    };
  }
}
