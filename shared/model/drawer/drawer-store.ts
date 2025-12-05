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
    onClose?.();
    set({ isOpen: false });
  },

  resetDrawer: () => {
    set(initialState);
  },
}));
