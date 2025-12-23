'use client';

import { FieldLabel } from 'features/consultation-request/ui/FieldLabel';
import { ImageUploadSection } from 'features/review-write/ui/ImageUploadSection';
import { ExistingImageGrid } from './ExistingImageGrid';
import { type ReviewImageUpload } from 'entities/review/api/entities/types';

interface ReviewEditImageSectionProps {
  label: string;
  existingImageUrls: string[];
  onRemoveExisting: (index: number) => void;
  newImages: ReviewImageUpload[];
  onAdd: (file: File) => Promise<void>;
  onRemove: (index: number) => void;
  isUploading: boolean;
  addButtonText?: string;
  type: 'before' | 'after';
}

export function ReviewEditImageSection({
  label,
  existingImageUrls,
  onRemoveExisting,
  newImages,
  onAdd,
  onRemove,
  isUploading,
  addButtonText = '사진 추가',
  type,
}: ReviewEditImageSectionProps) {
  return (
    <div className='flex w-full flex-col gap-2'>
      <FieldLabel label={label} />
      <ExistingImageGrid imageUrls={existingImageUrls} onRemove={onRemoveExisting} type={type} />
      <ImageUploadSection
        images={newImages}
        onAdd={onAdd}
        onRemove={onRemove}
        isUploading={isUploading}
        addButtonText={addButtonText}
      />
    </div>
  );
}
