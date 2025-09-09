import { notFound } from 'next/navigation';
import { getDictionary } from '../../dictionaries';
import { type Locale } from 'shared/config';
import { extractLocalizedText } from 'shared/lib';
import { getHospitalDetail } from 'entities/hospital/api/use-cases/get-hospital-detail';
import { HospitalDetailCard } from 'entities/hospital/ui/HospitalDetailCard';

interface HospitalDetailPageProps {
  params: Promise<{
    lang: Locale;
    id: string;
  }>;
}

export default async function HospitalDetailPage({ params }: HospitalDetailPageProps) {
  const { lang, id } = await params;

  try {
    // 병원 상세 데이터 조회
    const { hospital } = await getHospitalDetail({ id });

    // 다국어 사전 조회
    const dict = await getDictionary(lang);

    return (
      <div className='container mx-auto px-4 py-6'>
        <HospitalDetailCard hospital={hospital} lang={lang} dict={dict} />
      </div>
    );
  } catch (error) {
    console.error('Error loading hospital detail:', error);
    notFound();
  }
}

// ISR 설정 - 10분마다 재검증
export const revalidate = 600;

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
