import { ReactNode } from 'react';
import { useModalStore } from 'shared/model/modal';

interface ConfirmOptions {
  title?: string;
  message?: string | ReactNode;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
}

interface AlertOptions {
  title?: string;
  message?: string | ReactNode;
  confirmText?: string;
}

interface ModalOptions {
  title?: string;
  description?: string;
  content: ReactNode;
}

// Promise resolver를 저장할 변수
let currentResolver: ((value: boolean) => void) | null = null;

// Confirm 다이얼로그 컴포넌트
function ConfirmDialog({
  message,
  confirmText = '확인',
  cancelText = '취소',
  showCancel = true,
  onConfirm,
  onCancel,
}: {
  message: string | ReactNode;
  confirmText: string;
  cancelText: string;
  showCancel: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className='space-y-4 rounded-lg border bg-white p-6 shadow-lg'>
      <div className='text-sm'>{typeof message === 'string' ? <p>{message}</p> : message}</div>
      <div className='flex justify-end space-x-2'>
        {showCancel && (
          <button
            onClick={onCancel}
            className='rounded-md border px-4 py-2 text-sm hover:bg-gray-50'
          >
            {cancelText}
          </button>
        )}
        <button
          onClick={onConfirm}
          className='rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700'
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
}

// Alert 다이얼로그 컴포넌트
function AlertDialog({
  message,
  confirmText = '확인',
  onConfirm,
}: {
  message: string | ReactNode;
  confirmText: string;
  onConfirm: () => void;
}) {
  return (
    <div className='space-y-4 rounded-lg border bg-white p-6 shadow-lg'>
      <div className='text-sm'>{typeof message === 'string' ? <p>{message}</p> : message}</div>
      <div className='flex justify-end'>
        <button
          onClick={onConfirm}
          className='rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700'
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
}

// Confirm API
export function confirm(options: string | ConfirmOptions): Promise<boolean> {
  return new Promise((resolve) => {
    const config = typeof options === 'string' ? { message: options } : options;
    const { title, message, confirmText = '확인', cancelText = '취소', showCancel = true } = config;

    currentResolver = resolve;

    const handleConfirm = () => {
      useModalStore.getState().closeModal();
      resolve(true);
      currentResolver = null;
    };

    const handleCancel = () => {
      useModalStore.getState().closeModal();
      resolve(false);
      currentResolver = null;
    };

    const handleClose = () => {
      resolve(false);
      currentResolver = null;
    };

    useModalStore.getState().openModal({
      title,
      content: (
        <ConfirmDialog
          message={message || '계속하시겠습니까?'}
          confirmText={confirmText}
          cancelText={cancelText}
          showCancel={showCancel}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      ),
      onClose: handleClose,
    });
  });
}

// Alert API
export function alert(options: string | AlertOptions): Promise<void> {
  return new Promise((resolve) => {
    const config = typeof options === 'string' ? { message: options } : options;
    const { title, message, confirmText = '확인' } = config;

    const handleConfirm = () => {
      useModalStore.getState().closeModal();
      resolve();
    };

    const handleClose = () => {
      resolve();
    };

    useModalStore.getState().openModal({
      title,
      content: (
        <AlertDialog
          message={message || '알림'}
          confirmText={confirmText}
          onConfirm={handleConfirm}
        />
      ),
      onClose: handleClose,
    });
  });
}

// Custom Modal API
export function openModal(options: ModalOptions): void {
  const { title, description, content } = options;

  useModalStore.getState().openModal({
    title,
    description,
    content,
  });
}

// Close Modal API
export function closeModal(): void {
  useModalStore.getState().closeModal();
}
