'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PageHeaderV2 } from 'shared/ui/page-header/PageHeaderV2';
import { MedicalSurveyFloatingButton } from './MedicalSurveyFloatingButton';

interface MedicalSurveyContentV2Props {
  lang: Locale;
  dict: Dictionary;
  consultationId: string;
}

export function MedicalSurveyContentV2({
  lang,
  dict,
  consultationId,
}: MedicalSurveyContentV2Props) {
  const title = dict.consultation?.medicalSurvey?.title || '의료 설문 작성하기';

  const handleSubmit = () => {
    // TODO: 설문 제출 로직 구현
    console.log('Submit medical survey for consultation:', consultationId);
  };

  return (
    <div className='flex h-screen flex-col bg-white'>
      <PageHeaderV2 title={title} fallbackUrl={`/${lang}/consultation`} />

      <div className='h-[58px]' />

      {/* 메인 컨텐츠 영역 */}
      <div className='flex-1 overflow-y-auto px-5 pb-32'>
        {/* TODO: 설문 폼 컨텐츠 추가 */}
        <div className='py-8'>
          <p className='text-gray-500'>Consultation ID: {consultationId}</p>
          <p className='text-gray-500'>이 페이지는 현재 비어 있습니다.</p>
        </div>
      </div>

      <MedicalSurveyFloatingButton dict={dict} onClick={handleSubmit} disabled={false} />
    </div>
  );
}
