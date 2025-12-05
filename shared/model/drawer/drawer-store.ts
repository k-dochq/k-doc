import { create } from 'zustand';
import { ReactNode } from 'react';

export interface DrawerState {
  isOpen: boolean;
  content: ReactNode | null;
  onClose?: () => void;
}

interface DrawerActions {
  openDrawer: (config: Omit<DrawerState, 'isOpen'>) => void;
  closeDrawer: () => void;
  resetDrawer: () => void;
}

export interface DrawerStore extends DrawerState, DrawerActions {}

const initialState: DrawerState = {
  isOpen: false,
  content: null,
  onClose: undefined,
};

export const useDrawerStore = create<DrawerStore>((set, get) => ({
  ...initialState,

  openDrawer: (config) => {
    set({
      isOpen: true,
      ...config,
    });
  },

  closeDrawer: () => {
    const { onClose } = get();
    // onClose를 먼저 저장하고 상태를 리셋하여 무한 루프 방지
    set({ isOpen: false, content: null, onClose: undefined });
    // 상태 리셋 후 onClose 호출 (이제 onClose는 undefined이므로 재귀 호출 방지)
    onClose?.();
  },

  resetDrawer: () => {
    set(initialState);
  },
}));
