import { create } from 'zustand';
import { ReactNode } from 'react';

export interface ModalState {
  isOpen: boolean;
  content: ReactNode | null;
  title?: string;
  description?: string;
  onClose?: () => void;
  isLoading?: boolean;
}

interface ModalActions {
  openModal: (config: Omit<ModalState, 'isOpen'>) => void;
  closeModal: () => void;
  resetModal: () => void;
  setModalLoading: (isLoading: boolean) => void;
}

export interface ModalStore extends ModalState, ModalActions {}

const initialState: ModalState = {
  isOpen: false,
  content: null,
  title: undefined,
  description: undefined,
  onClose: undefined,
  isLoading: false,
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
    set({ isOpen: false, isLoading: false });
  },

  resetModal: () => {
    set(initialState);
  },

  setModalLoading: (isLoading: boolean) => {
    set({ isLoading });
  },
}));
