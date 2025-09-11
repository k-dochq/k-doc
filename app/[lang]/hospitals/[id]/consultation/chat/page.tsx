import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { type Locale } from 'shared/config';
import { getHospitalDetail } from 'entities/hospital/api/use-cases/get-hospital-detail';
import { ConsultationChat } from 'features/consultation-chat';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { getDictionary } from '../../../../dictionaries';

interface ConsultationChatPageProps {
  params: Promise<{
    lang: Locale;
    id: string;
  }>;
}

export default async function ConsultationChatPage({ params }: ConsultationChatPageProps) {
  const { lang, id: hospitalId } = await params;

  try {
    const [{ hospital }, dict] = await Promise.all([
      getHospitalDetail({ id: hospitalId }),
      getDictionary(lang),
    ]);

    if (!hospital) {
      notFound();
    }

    return (
      <div className='flex h-screen flex-col'>
        <Suspense fallback={<div className='flex-1 animate-pulse bg-gray-100' />}>
          <ConsultationChat hospitalId={hospitalId} hospital={hospital} lang={lang} dict={dict} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error loading consultation chat page:', error);
    notFound();
  }
}

export const revalidate = 0; // 실시간 채팅이므로 캐시 비활성화
export const dynamicParams = true;

export async function generateMetadata({ params }: ConsultationChatPageProps) {
  const { lang, id: hospitalId } = await params;

  try {
    const [{ hospital }, dict] = await Promise.all([
      getHospitalDetail({ id: hospitalId }),
      getDictionary(lang),
    ]);

    const hospitalName = extractLocalizedText(hospital.name, lang) || '병원';
    const chatTitle = dict.consultation?.chat || '상담채팅';

    return {
      title: `${hospitalName} - ${chatTitle}`,
      description: `${hospitalName}과의 실시간 상담채팅`,
    };
  } catch (_error) {
    return {
      title: '상담채팅',
      description: '병원과의 실시간 상담',
    };
  }
}
