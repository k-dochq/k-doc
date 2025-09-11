import { notFound } from 'next/navigation';
import { getDictionary } from '../../../dictionaries';
import { type Locale } from 'shared/config';
import { getHospitalDetail } from 'entities/hospital/api/use-cases/get-hospital-detail';
import { ConsultationRequestForm } from 'features/consultation-request/ui/ConsultationRequestForm';

interface ConsultationRequestPageProps {
  params: Promise<{
    lang: Locale;
    id: string;
  }>;
}

export default async function ConsultationRequestPage({ params }: ConsultationRequestPageProps) {
  const { lang, id } = await params;

  try {
    // 병원 정보와 사전 데이터 병렬 로드
    const [{ hospital }, dict] = await Promise.all([
      getHospitalDetail({ id }),
      getDictionary(lang),
    ]);

    return (
      <div className='container mx-auto px-4 py-6'>
        <ConsultationRequestForm hospital={hospital} lang={lang} dict={dict} />
      </div>
    );
  } catch (error) {
    console.error('Error loading consultation request page:', error);
    notFound();
  }
}

// 메타데이터 생성
export async function generateMetadata({ params }: ConsultationRequestPageProps) {
  const { lang, id } = await params;

  try {
    const [{ hospital }, dict] = await Promise.all([
      getHospitalDetail({ id }),
      getDictionary(lang),
    ]);

    const hospitalName = hospital.name;
    const consultationTitle = dict.consultation?.request?.title || '상담신청';

    return {
      title: `${consultationTitle} - ${hospitalName}`,
      description: `${hospitalName}에 상담을 신청하세요.`,
    };
  } catch (_error) {
    return {
      title: '상담신청',
      description: '병원 상담신청',
    };
  }
}
