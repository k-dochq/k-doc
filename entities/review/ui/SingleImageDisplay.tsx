'use client';

import { useState } from 'react';
import Image from 'next/image';
import { type DisplayImage } from '../model/types';
import { ImageTag } from './ImageTag';

interface SingleImageDisplayProps {
  image: DisplayImage;
  type: 'before' | 'after';
  className?: string;
  onImageClick?: (e: React.MouseEvent) => void;
}

export function SingleImageDisplay({
  image,
  type,
  className = '',
  onImageClick,
}: SingleImageDisplayProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className={`relative h-full cursor-pointer overflow-hidden ${className}`}
      onClick={onImageClick}
    >
      <Image
        src={imageError ? '/images/shared/default_image.png' : image.imageUrl}
        alt={image.alt || `${type === 'before' ? 'Before' : 'After'} 이미지`}
        fill
        className='object-cover'
        sizes='(max-width: 768px) 50vw, 168px'
        onError={handleImageError}
      />
      <ImageTag type={type} />
    </div>
  );
}
