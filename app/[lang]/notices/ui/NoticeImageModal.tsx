'use client';

import { ImageModalCarousel } from '@/shared/ui/image-modal-carousel';
import { type NoticeFile } from '@/entities/notice';

interface NoticeImageModalProps {
  images: NoticeFile[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function NoticeImageModal({ images, initialIndex, isOpen, onClose }: NoticeImageModalProps) {
  // ImageModalCarousel에 맞는 형태로 변환
  const modalImages = images.map((file) => ({
    id: file.id,
    imageUrl: file.fileUrl,
    alt: file.alt || file.fileName,
  }));

  return (
    <ImageModalCarousel
      images={modalImages}
      initialIndex={initialIndex}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
}
