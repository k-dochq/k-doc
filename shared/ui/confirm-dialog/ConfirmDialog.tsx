import { type ReactNode } from 'react';

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
  return (
    <div className='box-border flex flex-col items-center gap-[32px] rounded-[12px] bg-white px-[20px] pt-[40px] pb-[20px]'>
      {/* Text Area */}
      <div className='flex w-full flex-col items-center gap-[12px] text-center'>
        {/* Title - 필수 */}
        <p className='text-lg font-bold whitespace-pre-wrap text-neutral-900'>{title}</p>

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
          className='flex flex-1 items-center justify-center rounded-[12px] bg-neutral-200 px-[40px] py-[16px] text-base font-medium text-neutral-900'
        >
          {confirmText}
        </button>
        <button
          onClick={onCancel}
          className='flex flex-1 items-center justify-center rounded-[12px] bg-[#f9d1ff] px-[40px] py-[16px] text-base font-medium text-[#da47ef]'
        >
          {cancelText}
        </button>
      </div>
    </div>
  );
}
