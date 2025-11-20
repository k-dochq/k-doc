'use client';

import { type ReactNode } from 'react';
import { useModalStore } from 'shared/model/modal';
import { LoadingSpinner } from 'shared/ui/loading-spinner';

interface InfoDialogProps {
  message: string | ReactNode;
  confirmText?: string;
  onConfirm: () => void;
}

export function InfoDialog({ message, confirmText = '확인', onConfirm }: InfoDialogProps) {
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
          {confirmText}
        </button>
      </div>
    </div>
  );
}
