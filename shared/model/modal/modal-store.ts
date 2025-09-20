import { create } from 'zustand';
import { ReactNode } from 'react';

export interface ModalState {
  isOpen: boolean;
  content: ReactNode | null;
  title?: string;
  description?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
}

interface ModalActions {
  openModal: (config: Omit<ModalState, 'isOpen'>) => void;
  closeModal: () => void;
  resetModal: () => void;
}

export interface ModalStore extends ModalState, ModalActions {}

const initialState: ModalState = {
  isOpen: false,
  content: null,
  title: undefined,
  description: undefined,
  showCloseButton: true,
  onClose: undefined,
};

export const useModalStore = create<ModalStore>((set, get) => ({
  ...initialState,

  openModal: (config) => {
    set({
      isOpen: true,
      ...config,
    });
  },

  closeModal: () => {
    const { onClose } = get();
    onClose?.();
    set({ isOpen: false });
  },

  resetModal: () => {
    set(initialState);
  },
}));
