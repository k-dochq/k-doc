'use client';

import { useModalStore } from 'shared/model/modal';
import { MAX_MOBILE_WIDTH_CLASS } from 'shared/config';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from 'shared/ui/dialog';

export function GlobalModal() {
  const { isOpen, content, title, description, closeModal } = useModalStore();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeModal();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className={`w-[calc(100vw-40px)] ${MAX_MOBILE_WIDTH_CLASS} border-none bg-transparent p-0 shadow-none`}
      >
        {(title || description) && (
          <DialogHeader className='p-6 pb-0'>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}
        <div className='p-0'>{content}</div>
      </DialogContent>
    </Dialog>
  );
}
