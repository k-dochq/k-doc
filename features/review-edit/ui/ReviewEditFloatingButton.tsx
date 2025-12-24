'use client';

import { MAX_MOBILE_WIDTH_CLASS } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface ReviewEditFloatingButtonProps {
  dict: Dictionary;
  isValid: boolean;
  isSubmitting: boolean;
  isUploading: boolean;
}

export function ReviewEditFloatingButton({
  dict,
  isValid,
  isSubmitting,
  isUploading,
}: ReviewEditFloatingButtonProps) {
  const formDict = dict.reviewWrite?.form;

  return (
    <div
      className={`fixed right-0 bottom-0 left-0 z-50 mx-auto border-t border-neutral-200 bg-white px-5 pt-4 pb-8 ${MAX_MOBILE_WIDTH_CLASS}`}
    >
      <button
        type='submit'
        disabled={!isValid || isSubmitting || isUploading}
        className='bg-sub-900 hover:bg-sub-900/90 h-14 w-full rounded-xl text-base leading-6 font-medium text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400'
      >
        {isSubmitting
          ? formDict?.submitting || 'Updating...'
          : formDict?.editSubmitButton || '시술후기 수정'}
      </button>
    </div>
  );
}
