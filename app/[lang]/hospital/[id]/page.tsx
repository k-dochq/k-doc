import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getDictionary } from '../../dictionaries';
import { type Locale, STATIC_GENERATION_LOCALES } from 'shared/config';
import { getAllHospitalIds } from 'entities/hospital/api/use-cases/get-hospital-detail';
import { generateHospitalMetadata } from 'entities/hospital/lib/generate-hospital-metadata';
import { HospitalDetailSkeleton } from './HospitalDetailSkeleton';
// import { HospitalDetailContent } from './HospitalDetailContent';
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

export async function generateMetadata({ params }: HospitalDetailPageProps) {
  const { lang, id } = await params;
  return generateHospitalMetadata({ id, lang, basePath: 'hospital' });
}
