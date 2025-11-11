import { type ReactNode } from 'react';
import { useModalStore } from 'shared/model/modal';
import { ConfirmDialog } from 'shared/ui/confirm-dialog';
import { AlertDialog } from 'shared/ui/alert-dialog';

interface ConfirmOptions {
  title: string;
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

// Confirm API
export function confirm(options: ConfirmOptions): Promise<boolean> {
  return new Promise((resolve) => {
    const {
      title,
      message,
      confirmText = '확인',
      cancelText = '취소',
      showCancel = true,
    } = options;

    currentResolver = resolve;

    const handleConfirm = () => {
      // Yes 클릭: resolve만 호출하고 모달은 열린 상태 유지 (호출한 쪽에서 닫기)
      resolve(true);
      currentResolver = null;
    };

    const handleCancel = () => {
      // No 클릭: resolve 후 모달 닫기
      resolve(false);
      currentResolver = null;
      useModalStore.getState().closeModal();
    };

    const handleClose = () => {
      // 모달 바깥 클릭: resolve 후 모달 닫기
      if (currentResolver) {
        resolve(false);
        currentResolver = null;
        useModalStore.getState().closeModal();
      }
    };

    useModalStore.getState().openModal({
      content: (
        <ConfirmDialog
          title={title}
          message={message}
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
