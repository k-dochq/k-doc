'use client';

import { useMemo } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PageHeaderV2 } from 'shared/ui/page-header/PageHeaderV2';
import { MedicalSurveyFloatingButton } from './MedicalSurveyFloatingButton';
import { MedicalSurveyQuestions } from './MedicalSurveyQuestions';
import { useMedicalSurvey } from '../model/useMedicalSurvey';
import { loadQuestionsFromDictionary } from '../api/entities/question-loader';

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

  // Dictionary에서 질문 데이터 로드
  const questions = useMemo(() => loadQuestionsFromDictionary(dict), [dict]);

  const {
    currentQuestionIndex,
    currentQuestion,
    getAnswer,
    updateAnswer,
    isAllAnswered,
    getAllAnswers,
  } = useMedicalSurvey({ questions });

  const handleSubmit = () => {
    // TODO: 설문 제출 로직 구현
    const answers = getAllAnswers();
    console.log('Submit medical survey for consultation:', consultationId);
    console.log('Answers:', answers);
  };

  return (
    <div className='flex h-screen flex-col bg-white'>
      <PageHeaderV2 title={title} fallbackUrl={`/${lang}/consultation`} />

      <div className='h-[58px]' />

      {/* 메인 컨텐츠 영역 */}
      <div className='flex-1 overflow-y-auto pb-32'>
        <MedicalSurveyQuestions
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          currentQuestion={currentQuestion}
          getAnswer={getAnswer}
          updateAnswer={updateAnswer}
        />
      </div>

      <MedicalSurveyFloatingButton dict={dict} onClick={handleSubmit} disabled={!isAllAnswered()} />
    </div>
  );
}
