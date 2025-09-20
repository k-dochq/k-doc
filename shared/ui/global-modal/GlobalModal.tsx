'use client';

import { useModalStore } from 'shared/model/modal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from 'shared/ui/dialog';

export function GlobalModal() {
  const { isOpen, content, title, description, showCloseButton, closeModal } = useModalStore();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeModal();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className={`w-[80vw] max-w-[335px] ${showCloseButton ? '' : '[&>button]:hidden'}`}
      >
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}
        {content}
      </DialogContent>
    </Dialog>
  );
}
