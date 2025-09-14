'use client';

import Image from 'next/image';
import { type DisplayImage } from '../model/types';
import { ImageTag } from './ImageTag';

interface DualImageDisplayProps {
  images: [DisplayImage, DisplayImage];
  type: 'before' | 'after';
  className?: string;
}

export function DualImageDisplay({ images, type, className = '' }: DualImageDisplayProps) {
  const [firstImage, secondImage] = images;

  return (
    <div className={`flex h-full flex-col ${className}`}>
      {/* 첫 번째 이미지 (태그 포함) */}
      <div className='relative flex-1 overflow-hidden'>
        <Image
          src={firstImage.imageUrl}
          alt={firstImage.alt || `${type === 'before' ? 'Before' : 'After'} 이미지 1`}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 50vw, 168px'
        />
        <ImageTag type={type} />
      </div>

      {/* 두 번째 이미지 */}
      <div className='relative flex-1 overflow-hidden border-t border-white'>
        <Image
          src={secondImage.imageUrl}
          alt={secondImage.alt || `${type === 'before' ? 'Before' : 'After'} 이미지 2`}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 50vw, 168px'
        />
        <ImageTag type={type} />
      </div>
    </div>
  );
}
