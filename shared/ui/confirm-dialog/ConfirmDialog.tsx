'use client';

import { type ReactNode } from 'react';
import { useModalStore } from 'shared/model/modal';
import { LoadingSpinner } from 'shared/ui/loading-spinner';

interface ConfirmDialogProps {
  title: string;
  message?: string | ReactNode;
  confirmText: string;
  cancelText: string;
  showCancel: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  title,
  message,
  confirmText = '확인',
  cancelText = '취소',
  showCancel = true,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  // 모달 스토어에서 로딩 상태 읽기
  const isLoading = useModalStore((state) => state.isLoading);
  return (
    <div className='box-border flex flex-col items-center gap-[32px] rounded-[12px] bg-white px-[20px] pt-[40px] pb-[20px]'>
      {/* Text Area */}
      <div className='flex w-full flex-col items-center gap-[12px] text-center'>
        {/* Title - 필수 */}
        <p className='text-lg font-bold whitespace-pre-wrap text-neutral-700'>{title}</p>

        {/* Message - 선택, 있을 때만 렌더링 */}
        {message && (
          <div className='text-base whitespace-pre-wrap text-neutral-500'>
            {typeof message === 'string' ? <p>{message}</p> : message}
          </div>
        )}
      </div>

      {/* Button Area */}
      <div className='flex w-full max-w-[295px] gap-[8px]'>
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className='flex flex-1 items-center justify-center gap-2 rounded-[12px] bg-neutral-200 px-[40px] py-[16px] text-base font-medium text-neutral-900 disabled:cursor-not-allowed disabled:opacity-70'
        >
          {isLoading && <LoadingSpinner size={20} className='text-neutral-900' />}
          {confirmText}
        </button>
        <button
          onClick={onCancel}
          disabled={isLoading}
          className='flex flex-1 items-center justify-center rounded-[12px] bg-primary-300 px-[40px] py-[16px] text-base font-medium text-primary-900 disabled:cursor-not-allowed disabled:opacity-70'
        >
          {cancelText}
        </button>
      </div>
    </div>
  );
}
