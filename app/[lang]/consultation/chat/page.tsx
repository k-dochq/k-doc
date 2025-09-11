import { Suspense } from 'react';
import { notFound, redirect } from 'next/navigation';
import { type Locale } from 'shared/config';
import { getHospitalDetail } from 'entities/hospital/api/use-cases/get-hospital-detail';
import { ConsultationChat } from 'features/consultation-chat';
import { extractLocalizedText } from 'shared/lib/localized-text';
import { getDictionary } from '../../dictionaries';

interface ConsultationChatPageProps {
  params: Promise<{
    lang: Locale;
  }>;
  searchParams: Promise<{
    hospitalId?: string;
  }>;
}

export default async function ConsultationChatPage({
  params,
  searchParams,
}: ConsultationChatPageProps) {
  const { lang } = await params;
  const { hospitalId } = await searchParams;

  // hospitalId가 없으면 상담 목록 페이지로 리다이렉트
  if (!hospitalId) {
    redirect(`/${lang}/consultation`);
  }

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

export const revalidate = 0;
export const dynamicParams = true;

export async function generateMetadata({ params, searchParams }: ConsultationChatPageProps) {
  const { lang } = await params;
  const { hospitalId } = await searchParams;

  if (!hospitalId) {
    return {
      title: '상담채팅',
      description: '병원과의 실시간 상담',
    };
  }

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
