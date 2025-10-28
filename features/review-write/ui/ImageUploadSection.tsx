'use client';

import { X, Plus, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { type ReviewImageUpload } from 'entities/review/api/entities/types';

interface ImageUploadSectionProps {
  label: string;
  images: ReviewImageUpload[];
  onAdd: (file: File) => Promise<void>;
  onRemove: (index: number) => void;
  isUploading: boolean;
  maxCount?: number;
}

export function ImageUploadSection({
  label,
  images,
  onAdd,
  onRemove,
  isUploading,
  maxCount = 10,
}: ImageUploadSectionProps) {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await onAdd(file);
      // Reset input
      e.target.value = '';
    }
  };

  const canAddMore = images.length < maxCount;

  return (
    <div className='space-y-2'>
      <label className='text-sm font-medium text-gray-900'>{label}</label>

      <div className='flex gap-2 overflow-x-auto'>
        {images.map((image, index) => (
          <div key={index} className='relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-xl'>
            <Image
              src={image.preview}
              alt={`Upload ${index + 1}`}
              fill
              className='rounded-xl object-cover'
            />
            <button
              type='button'
              onClick={() => onRemove(index)}
              className='absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(23,23,23,0.7)] text-white transition-transform active:scale-90'
            >
              <X size={16} />
            </button>
          </div>
        ))}

        {canAddMore && (
          <label className='flex h-28 w-28 flex-shrink-0 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white transition-colors hover:border-gray-400'>
            {isUploading ? (
              <Loader2 size={32} className='animate-spin text-gray-400' />
            ) : (
              <Plus size={32} className='text-gray-400' />
            )}
            <input
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              className='hidden'
              disabled={isUploading}
            />
          </label>
        )}
      </div>

      <p className='text-xs text-gray-500'>
        {images.length}/{maxCount}
      </p>
    </div>
  );
}
