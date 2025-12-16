'use client';

import { X, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { type ReviewImageUpload } from 'entities/review/api/entities/types';

interface ImageUploadSectionProps {
  label?: string;
  images: ReviewImageUpload[];
  onAdd: (file: File) => Promise<void>;
  onRemove: (index: number) => void;
  isUploading: boolean;
  maxCount?: number;
  addButtonText?: string;
}

export function ImageUploadSection({
  label,
  images,
  onAdd,
  onRemove,
  isUploading,
  maxCount = 10,
  addButtonText = '사진 추가',
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

  // 플러스 아이콘 SVG
  const PlusIcon = () => (
    <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
      <path
        d='M10.0026 9.99998V3.33331M10.0026 9.99998V16.6666M10.0026 9.99998H16.6693M10.0026 9.99998H3.33594'
        stroke='#A3A3A3'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );

  return (
    <div className='space-y-2'>
      {label && <label className='text-sm font-medium text-gray-900'>{label}</label>}

      {images.length === 0 ? (
        // 이미지가 없을 때: 큰 버튼 형태
        <label className='flex h-[100px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg bg-[#f5f5f5] p-4 transition-colors hover:bg-[#ebebeb]'>
          {isUploading ? (
            <Loader2 size={20} className='animate-spin text-[#a3a3a3]' />
          ) : (
            <PlusIcon />
          )}
          <p className='text-sm leading-5 font-medium text-[#a3a3a3]'>{addButtonText}</p>
          <input
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            className='hidden'
            disabled={isUploading}
          />
        </label>
      ) : (
        // 이미지가 있을 때: 기존 형태
        <div className='flex gap-2 overflow-x-auto'>
          {images.map((image, index) => (
            <div
              key={index}
              className='relative h-[100px] w-[100px] flex-shrink-0 overflow-hidden rounded-xl'
            >
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
            <label className='bg-primary-200 flex h-[100px] w-[100px] flex-shrink-0 cursor-pointer items-center justify-center rounded-xl transition-colors hover:border-gray-400'>
              {isUploading ? (
                <Loader2 size={32} className='animate-spin text-gray-400' />
              ) : (
                <div className='flex flex-col items-center gap-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    viewBox='0 0 20 20'
                    fill='none'
                  >
                    <path
                      d='M10.0026 10V3.33337M10.0026 10V16.6667M10.0026 10H16.6693M10.0026 10H3.33594'
                      stroke='#F15BFF'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  <span className='text-xs leading-4 font-medium'>
                    <span className='text-primary-900'>{images.length}</span>
                    <span className='text-neutral-700'> / {maxCount}</span>
                  </span>
                </div>
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
      )}
    </div>
  );
}
