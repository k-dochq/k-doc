import { ConsultationTabs } from 'features/consultation-tabs';
import { type Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';

interface ConsultationPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function ConsultationPage({ params }: ConsultationPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const consultationDict = {
    chat: dict.consultation?.chat || '상담채팅',
    appointment: dict.consultation?.appointment || '예약신청',
    loading: dict.consultation?.loading || '로딩 중...',
    error: dict.consultation?.error || '데이터를 불러오는 중 오류가 발생했습니다.',
    retry: dict.consultation?.retry || '다시 시도',
    empty: {
      chat: {
        title: dict.consultation?.empty?.chat?.title || '진행 중인 상담이 없습니다',
        description: dict.consultation?.empty?.chat?.description || '병원과 상담을 시작해보세요',
      },
      appointment: {
        title: dict.consultation?.empty?.appointment?.title || '예약 신청 내역이 없습니다',
        description:
          dict.consultation?.empty?.appointment?.description || '원하는 병원에 예약을 신청해보세요',
      },
    },
  };

  return (
    <div className='space-y-6'>
      <div className='px-4'>
        <h1 className='text-2xl font-bold text-gray-900'>{dict.consultation?.title || '상담'}</h1>
      </div>

      <ConsultationTabs lang={lang} dict={consultationDict} />
    </div>
  );
}
