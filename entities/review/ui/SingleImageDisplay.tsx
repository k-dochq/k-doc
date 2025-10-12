'use client';

import { useState } from 'react';
import { type DisplayImage } from '../model/types';
import { ImageTag } from './ImageTag';
import { SmartImage } from './SmartImage';

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
      className={`relative h-full w-full cursor-pointer overflow-hidden bg-[#F9D1FF] ${className}`}
      onClick={onImageClick}
    >
      <SmartImage
        src={imageError ? '/images/shared/default_image.png' : image.imageUrl}
        alt={image.alt || `${type === 'before' ? 'Before' : 'After'} 이미지`}
        sizes='(max-width: 768px) 50vw, 168px'
        onError={handleImageError}
      />
      <ImageTag type={type} />
    </div>
  );
}
