import { type ReactNode } from 'react';
import { useDrawerStore } from 'shared/model/drawer';

interface DrawerOptions<T = void> {
  content: ReactNode;
}

// Promise resolver를 저장할 변수
let currentResolver: ((value: unknown) => void) | null = null;

// Open Drawer API
export function openDrawer<T = void>(options: DrawerOptions<T>): Promise<T> {
  return new Promise((resolve) => {
    const { content } = options;

    currentResolver = resolve as (value: unknown) => void;

    const handleClose = () => {
      // Drawer가 닫힐 때 resolve 호출 (기본값: undefined)
      if (currentResolver) {
        currentResolver(undefined as T);
        currentResolver = null;
      }
      // closeDrawer는 onClose를 호출하므로 여기서는 직접 호출하지 않음
      // GlobalDrawer의 onOpenChange에서 closeDrawer를 호출하거나
      // resolveDrawer에서 closeDrawer를 호출함
    };

    useDrawerStore.getState().openDrawer({
      content,
      onClose: handleClose,
    });
  });
}

// Close Drawer API
export function closeDrawer(): void {
  useDrawerStore.getState().closeDrawer();
}

// Resolve Drawer API - content 내부에서 호출하여 값을 반환
export function resolveDrawer<T = void>(value?: T): void {
  if (currentResolver) {
    currentResolver((value ?? undefined) as T);
    currentResolver = null;
    useDrawerStore.getState().closeDrawer();
  }
}
