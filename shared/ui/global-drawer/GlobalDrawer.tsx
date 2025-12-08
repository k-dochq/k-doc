'use client';

import { useDrawerStore } from 'shared/model/drawer';
import { Drawer, DrawerContent } from 'shared/ui/drawer';

export function GlobalDrawer() {
  const { isOpen, content, closeDrawer } = useDrawerStore();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeDrawer();
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={handleOpenChange}>
      <DrawerContent className='w-full bg-white'>{content}</DrawerContent>
    </Drawer>
  );
}
