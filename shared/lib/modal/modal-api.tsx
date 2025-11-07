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
