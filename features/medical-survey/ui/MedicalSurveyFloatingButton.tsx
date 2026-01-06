'use client';

import { MAX_MOBILE_WIDTH_CLASS } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface MedicalSurveyFloatingButtonProps {
  dict: Dictionary;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export function MedicalSurveyFloatingButton({
  dict,
  onClick,
  disabled = false,
  className = '',
}: MedicalSurveyFloatingButtonProps) {
  const buttonText = dict.consultation?.medicalSurvey?.submitButton || '제출하기';

  return (
    <div
      className={`fixed right-0 bottom-0 left-0 z-30 mx-auto border-t border-neutral-200 bg-white px-5 pt-4 pb-8 ${MAX_MOBILE_WIDTH_CLASS} ${className}`}
    >
      <button
        type='button'
        onClick={onClick}
        disabled={disabled}
        className='bg-sub-900 hover:bg-sub-900/90 h-14 w-full rounded-xl text-base leading-6 font-medium text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400'
      >
        {buttonText}
      </button>
    </div>
  );
}
