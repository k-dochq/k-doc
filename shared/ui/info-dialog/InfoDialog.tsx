'use client';

import { type ReactNode } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useModalStore } from 'shared/model/modal';
import { LoadingSpinner } from 'shared/ui/loading-spinner';

interface InfoDialogProps {
  message: string | ReactNode;
  confirmText?: string;
  lang?: Locale;
  dict?: Dictionary;
  onConfirm: () => void;
}

export function InfoDialog({ message, confirmText, lang, dict, onConfirm }: InfoDialogProps) {
  // dictionary에서 확인 버튼 텍스트 가져오기 (우선순위: confirmText > dict > 기본값)
  const finalConfirmText =
    confirmText ||
    dict?.common?.confirm ||
    (lang === 'en' ? 'OK' : lang === 'th' ? 'ตกลง' : '확인');
  // 모달 스토어에서 로딩 상태 읽기
  const isLoading = useModalStore((state) => state.isLoading);

  return (
    <div className='box-border flex flex-col items-center gap-[32px] rounded-[12px] bg-white px-[20px] pt-[40px] pb-[20px]'>
      {/* Text Area */}
      <div className='flex w-full flex-col items-center gap-[12px] text-center'>
        {/* Message */}
        <div className='text-lg font-bold whitespace-pre-wrap text-neutral-900'>
          {typeof message === 'string' ? <p>{message}</p> : message}
        </div>
      </div>

      {/* Button Area */}
      <div className='flex w-full'>
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className='flex w-full items-center justify-center gap-2 rounded-[12px] bg-neutral-200 px-[40px] py-[16px] text-base font-medium text-neutral-900 disabled:cursor-not-allowed disabled:opacity-70'
        >
          {isLoading && <LoadingSpinner size={20} className='text-neutral-900' />}
          {finalConfirmText}
        </button>
      </div>
    </div>
  );
}
