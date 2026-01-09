'use client';

import { useMemo, useEffect, useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { PageHeaderV2 } from 'shared/ui/page-header/PageHeaderV2';
import { MedicalSurveyFloatingButton } from './MedicalSurveyFloatingButton';
import { MedicalSurveyQuestions } from './MedicalSurveyQuestions';
import { useMedicalSurvey } from '../model/useMedicalSurvey';
import { loadQuestionsFromDictionary } from '../api/entities/question-loader';
import { useSubmitMedicalSurvey } from '../model/useSubmitMedicalSurvey';

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
  const router = useLocalizedRouter();
  const [cooldownDays, setCooldownDays] = useState<number | undefined>(undefined);
  const [hasCheckedCompletion, setHasCheckedCompletion] = useState(false);

  // consultationId에서 hospitalId 추출 (UUID는 36자)
  const hospitalId = consultationId.length >= 36 ? consultationId.substring(0, 36) : null;

  // 페이지 진입 시 설문 작성 완료 여부 확인
  useEffect(() => {
    if (hasCheckedCompletion) return;

    const storageKey = `medical-survey-${consultationId}`;
    const stored = localStorage.getItem(storageKey);

    if (stored) {
      try {
        const { completedAt } = JSON.parse(stored);
        // 설문 작성을 이미 했다면 알림 표시 후 상담페이지로 이동
        if (completedAt) {
          window.alert('이미 설문 작성을 완료하셨습니다.');
          if (hospitalId) {
            router.push(`/chat/${hospitalId}`);
          } else {
            router.push(`/consultation`);
          }
          setHasCheckedCompletion(true);
          return;
        }
      } catch (error) {
        console.error('로컬스토리지 데이터 파싱 실패:', error);
      }
    }

    setHasCheckedCompletion(true);
  }, [consultationId, hospitalId, router, hasCheckedCompletion]);

  // 로컬스토리지에서 cooldownDays 추출
  useEffect(() => {
    const tempStorageKey = `medical-survey-temp-${consultationId}`;
    const tempStored = localStorage.getItem(tempStorageKey);
    if (tempStored) {
      try {
        const { cooldownDays: storedCooldownDays } = JSON.parse(tempStored);
        setCooldownDays(storedCooldownDays);
        // 사용 후 삭제
        localStorage.removeItem(tempStorageKey);
      } catch (error) {
        console.error('로컬스토리지 데이터 파싱 실패:', error);
      }
    }
  }, [consultationId]);

  // 설문 작성 완료 확인 중이면 아무것도 렌더링하지 않음
  if (!hasCheckedCompletion) {
    return null;
  }

  // Dictionary에서 질문 데이터 로드
  const questions = useMemo(() => loadQuestionsFromDictionary(dict), [dict]);

  const {
    currentQuestionIndex,
    currentQuestion,
    availableQuestions,
    progressCurrentNumber,
    progressTotal,
    getAnswer,
    updateAnswer,
    goToNextQuestion,
    isAllAnswered,
    getAllAnswers,
    isCurrentQuestionAnswered,
    isLastQuestion,
  } = useMedicalSurvey({ questions });

  const submitMutation = useSubmitMedicalSurvey({
    consultationId,
    locale: lang,
    cooldownDays,
  });

  const handleButtonClick = () => {
    if (isLastQuestion()) {
      // 마지막 질문이면 제출
      const answers = getAllAnswers();
      submitMutation.mutate(answers);
    } else {
      // 다음 질문으로 이동
      goToNextQuestion();
    }
  };

  // 버튼 텍스트 결정 - 마지막 질문에서도 "다음" 표시
  const buttonText = dict.consultation?.medicalSurvey?.nextButton || '다음';

  // 버튼 활성화 조건: 현재 질문에 답변이 있을 때, 또는 제출 중일 때 비활성화
  const isButtonDisabled = !isCurrentQuestionAnswered() || submitMutation.isPending;

  return (
    <div className='flex h-screen flex-col bg-white'>
      <PageHeaderV2 title={title} fallbackUrl={`/${lang}/consultation`} />

      <div className='h-[58px]' />

      {/* 메인 컨텐츠 영역 */}
      <div className='flex-1 overflow-y-auto pb-32'>
        <MedicalSurveyQuestions
          questions={availableQuestions}
          progressCurrentNumber={progressCurrentNumber}
          progressTotal={progressTotal}
          currentQuestionIndex={currentQuestionIndex}
          currentQuestion={currentQuestion}
          getAnswer={getAnswer}
          updateAnswer={updateAnswer}
        />
      </div>

      <MedicalSurveyFloatingButton
        label={buttonText}
        onClick={handleButtonClick}
        disabled={isButtonDisabled}
      />
    </div>
  );
}
